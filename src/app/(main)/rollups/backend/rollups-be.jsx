

import { Client, Databases, Query } from "node-appwrite";

export async function getRollUpsForUser() {
    try {
        const database = await getAdminDatabase();
    
        const emails = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB,
            process.env.NEXT_PUBLIC_APPWRITE_ROLLUPS_COLLECTION,
            [
                Query.orderDesc("$createdAt")
            ]
        );
        return emails;
    } catch (error) {
        console.error("Error fetching rollups:", error);
        return null;
    }
}

export async function getRollUpById(rollupId) {
    try {
        const database = await getAdminDatabase();
    
        const emails = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB,
            process.env.NEXT_PUBLIC_APPWRITE_ROLLUPS_COLLECTION,
            rollupId
        );
        return emails;
    } catch (error) {
        console.error("Error fetching rollups:", error);
        return null;
    }
}

export async function getEmailsByRollUpId(rollupId) {
    try {
        const database = await getAdminDatabase();
    
        const emails = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB,
            process.env.NEXT_PUBLIC_APPWRITE_EMAILS_COLLECTION,
            [
                Query.equal("rollup", rollupId),
                Query.orderDesc("$createdAt"),
                Query.limit(5)
            ]
        );
        return emails;
    } catch (error) {
        console.error("Error fetching rollups:", error);
        return null;
    }
}

export async function getEmailById(emailId) {
    try {
        const database = await getAdminDatabase();
    
        const emails = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB,
            process.env.NEXT_PUBLIC_APPWRITE_EMAILS_COLLECTION,
            emailId
        );
        return emails;
    } catch (error) {
        console.error("Error fetching rollups:", error);
        return null;
    }
}

export async function searchEmail(searchTerm) {
    try {
        const database = await getAdminDatabase();
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB,
            process.env.NEXT_PUBLIC_APPWRITE_EMAILS_COLLECTION,
            [
                Query.search("rawEmail", searchTerm),
                Query.limit(5),
                Query.select(["subject", "sender", "$id"])

            ]
        );
        return response;
    }catch (error) {
        console.error("Error searching emails", error.message);
        return null;
    }
}

const getAdminDatabase = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY)
        .setSelfSigned(true) // TODO - Set this to false once deployed with an actual ssl certificate

        const databases = new Databases(client);
        return databases;
}