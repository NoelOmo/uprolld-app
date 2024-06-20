'use server'

import { cookies } from "next/headers";
import { Account, Client, Databases, ID, Query, Users } from "node-appwrite";

export async function addPreferences(data, mailboxId) {
    try {
        const database = await getAdminDatabase();
        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB,
            process.env.NEXT_PUBLIC_APPWRITE_MAILBOX_COLLECTION,
            mailboxId,
            {
                "frequency": data.frequency,
                "rollupCount": parseInt(data.rollups)
            }
        );
        return {
            success: true,
            body: response,
            error: null
        };
    }catch (error) {
        console.error("Error searching emails", error);
        return {
            success: false,
            body: error.message,
            error: error.type
        };
    }
}

async function createMailcowMailbox(email, fullname) {
    
    try {
        const pword = Math.random().toString(36).substring(2, 14);
        const response = await fetch(process.env.NEXT_MAILBOX_API_ENDPOINT + "/add/mailbox", {
          method: 'POST',
          headers: {
            'X-API-Key': process.env.MAILCOW_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            local_part: email,
            domain: "uprolld.email",
            name: fullname,
            quota: "1",
            password: pword,
            password2:pword,
            active: "1",
            force_pw_update: "1",
            tls_enforce_in: "1",
            tls_enforce_out: "1"
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log('Mailbox added:', result);
        return result;
      } catch (error) {
        console.error('Error adding mailbox:', error);
      }
}

export async function createMailbox(data) {
    try {

        const database = await getAdminDatabase();
        const session = cookies().get("session");
        if(session) {
            const account = await getAccountFromSession(session);
            const currentUser = await account.get();

            const mailBoxRes = await createMailcowMailbox(data.email, currentUser.name);
            
            if (mailBoxRes[0].type !== "success") {
                if (mailBoxRes[0].msg[0] === "danger") {
                    return {
                        success: false,
                        body: "There was an error creating your mailbox.",
                        error: "error_creating_mailbox"
                    };
                }
            }
            const emailAddress = mailBoxRes[0].msg[1];

            const r = await database.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DB,
                process.env.NEXT_PUBLIC_APPWRITE_MAILBOX_COLLECTION,
                [
                    Query.equal("userId", currentUser.$id),
                ]
            );
            if (r.total > 0) {
                return {
                    success: true,
                    body: {
                        email: emailAddress,
                        mailbox: r.documents[0].$id
                    },
                    error: "user_has_mailbox"
                };
            }
            
            const response = await database.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DB,
                process.env.NEXT_PUBLIC_APPWRITE_MAILBOX_COLLECTION,
                ID.unique(),
                {
                    "emailAddress": emailAddress,
                    "userId": currentUser.$id
                }
            );
            return {
                success: true,
                body: {
                    email: emailAddress,
                    mailbox: response.$id
                },
                error: null
            };
        }
        return {
            success: false,
            body: null,
            error: "Failed to Authenticate"
        };
    }catch (error) {
        console.error("Error searching emails", error);
        return {
            success: false,
            body: error.message,
            error: error.type
        };
    }
}

const getAccountFromSession = async (session) => {
    const client =  new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

    if (session) {
        client.setSession(session.value)
    }

    return new Account(client);
}

const getAdminUsersClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY)
        return new Users(client);

}


const getAdminDatabase = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY)

        const databases = new Databases(client);
        return databases;
}