"use server"

import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from 'next/navigation';
import { cookies } from "next/headers";
import { Client, Databases, Account, Query, ID } from "node-appwrite";

export async function initiateResetPassword(email) {
    try {
        const account = await getAdminAccount();
        const res = await account.createRecovery(email, process.env.NEXT_PUBLIC_COM_DOMAIN);
        return {
            success: true,
            body: res,
            error: null
        }

    }catch(error) {
        console.log("Error authenticating: ", error);
        return {
            success: false,
            body: null,
            error: error.message
        }
    }
}

export async function logoutUser() {

    try {
        const session = cookies().get("session");
        if (session) {
            const account = await getSessionClient(session);
            const res = await account.deleteSession('current').then(function (response) {
                cookies().set('session', 'EXPIRED', {
                    httpOnly: true,
                    secure: false, // TODO - switch to true once deployed and create an env variable to set the current environment
                    sameSite: "strict",
                    maxAge: -1,
                    path: "/"
                });
                return response;
            });
            return {
                success: true,
                body: res,
                error: null
            }
        }
    } catch(error) {
        return {
            message: error.message
        }
    }

}

export const verifySessionToken = async () => {
    try {
        const account = await getSessionClient();
        const res = await account.get();
        
        return {
            success: true,
            body: res,
            error: null
        };

    }catch(error) {
        console.log("Error authenticating: ", error);
        return {
            success: false,
            body: null,
            error: error.message
        }

    }
}

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const account = await getAdminAccount();
        const session = await account.createEmailPasswordSession(
            email,
            password
        );
        cookies().set('session', session.secret, {
            httpOnly:true,
            secure:false, // TODO - switch to true once deployed and create an env variable to set the current environment
            sameSite:true,
            maxAge: new Date(session.expire),
            path: '/'
        });
        return {
            success: true,
            body: session,
            error: null
        };
    }catch (error) {
        console.log("Error authenticating: ", error);
        return {
            success: false,
            body: null,
            error: error.message
        }
    }
}

export const verifyEmail = async () => {
    try {
        const account = await getAdminAccount();
        const res = await account.createVerification(process.env.NEXT_PUBLIC_SITE_URL)
        return res;
    }catch (error) {
        console.log("Error verifying your email address: ", error)
    }
}

export const createUserWithAdminAndPassword = async (data) => {
    try {
        const account = await getAdminAccount();
        const res = await account.create(
            ID.unique(),
            data.email,
            data.password,
            data.fullname
        )
        return {
            success: true,
            body: res,
            error: null
        };
    }catch (error) {
        console.log("Error creating account: ", error.message);
        return {
            success: false,
            body: null,
            error: error.message
        }
    }
}

const getAdminAccount = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY);

        return new Account(client);
}

const getSessionClient = async () => {
    const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

    const session = cookies().get("session");
    
    if (session) {
        client.setSession(session.value)
    }

    return new Account(client);
}