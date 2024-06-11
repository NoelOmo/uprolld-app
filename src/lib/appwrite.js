import { Client, Account, Teams, Databases, Users } from "node-appwrite";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const getAccountFromSession = async (session) => {
    const client =  new Client()
    .setEndpoint(process.env.REACT_APP_APPWRITE_BASE_URL)
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_KEY)
    .setSelfSigned(true) // TODO - Set this to false once deployed with an actual ssl certificate

    if (session) {
        client.setSession(session.value)
    }

    return new Account(client);
}

const createAdminClient = async () => {
     const client = new Client()
     .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
     .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY)
     .setSelfSigned(true) // TODO - Set this to false once deployed with an actual ssl certificate

    return new Account(client);
}


const createSessionClient = async (request) => {
    const client = new Client()
    .setEndpoint(process.env.REACT_APP_APPWRITE_BASE_URL)
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_KEY)
    .setSelfSigned(true) // TODO - Set this to false once deployed with an actual ssl certificate

    const cookies = parseCookie(request.headers.get('cookie') ?? '');
    const session = cookies.get('session') ?? '';


    if (session) {
        client.setSession(session);
    }

    return new Account(client);
        
}

const createAdminTeamClient = async (request) => {
    const client = new Client()
        .setEndpoint(process.env.REACT_APP_APPWRITE_BASE_URL)
        .setProject(process.env.REACT_APP_APPWRITE_PROJECT_KEY)
        .setKey(process.env.REACT_APP_APPWRITE_API_KEY)
        .setSelfSigned(true) // TODO - Set this to false once deployed with an actual ssl certificate

   return new Teams(client);
}

const createAdminDatabase = async () => {
    const client = new Client()
        .setEndpoint(process.env.REACT_APP_APPWRITE_BASE_URL)
        .setProject(process.env.REACT_APP_APPWRITE_PROJECT_KEY)
        .setKey(process.env.REACT_APP_APPWRITE_API_KEY)
        .setSelfSigned(true) // TODO - Set this to false once deployed with an actual ssl certificate

   return new Databases(client);
}

const createClientDatabase = async () => {
    const client = new Client()
        .setEndpoint(process.env.REACT_APP_APPWRITE_BASE_URL)
        .setProject(process.env.REACT_APP_APPWRITE_PROJECT_KEY)
        .setSelfSigned(true) // TODO - Set this to false once deployed with an actual ssl certificate

   return new Databases(client);
}

const getTeamsClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.REACT_APP_APPWRITE_BASE_URL)
        .setProject(process.env.REACT_APP_APPWRITE_PROJECT_KEY)
        .setKey(process.env.REACT_APP_APPWRITE_API_KEY)
        .setSelfSigned(true) // TODO - Set this to false once deployed with an actual ssl certificate
    return new Teams(client);
}


const createAdminUsersClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.REACT_APP_APPWRITE_BASE_URL)
        .setProject(process.env.REACT_APP_APPWRITE_PROJECT_KEY)
        .setKey(process.env.REACT_APP_APPWRITE_API_KEY)
        .setSelfSigned(true) // TODO - Set this to false once deployed with an actual ssl certificate
        return new Users(client);

}

export { createAdminClient, createSessionClient, getTeamsClient, getAccountFromSession, createAdminTeamClient, createAdminDatabase, createClientDatabase, createAdminUsersClient }