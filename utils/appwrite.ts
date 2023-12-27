import { Client, Account, ID, Storage } from 'appwrite'
import conf from './config'
// import { FileArray } from './fileArray'

type CreateUserAccount = {
    email: string,
    password: string,
    name: string,
}

type LoginUserAccount = {
    email: string,
    password: string,
}

const appwriteClient = new Client()

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient)
const storage = new Storage(appwriteClient);

export class AppwriteService {
    //create a new record of user inside appwrite
    async createUserAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error: any) {
            throw error
        }
    }

    async login({ email, password }: LoginUserAccount) {
        try {
            return await account.createEmailSession(email, password)
        } catch (error: any) {
            throw error
        }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data)
        } catch (error) { }

        return false
    }

    async getCurrentUser() {
        try {
            return account.get()
        } catch (error) {
            console.log("getcurrentUser error: " + error)

        }
        return null
    }

    async logout() {
        try {
            return await account.deleteSession("current")
        } catch (error) {
            console.log("logout error: " + error)
        }
    }
    // async getFiles(): Promise<{ files: FileArray } | undefined> {
    //     try {
    //         const response = await storage.listFiles('6581b3bdc170dd95ff6e');
    //         return { files: response };
    //     } catch (error) {
    //         console.error('Error fetching files:', error);
    //         return undefined;
    //     }
    // }
    async getFilesFromStorage(): Promise<any> {
        try {
            const fileId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
            const response = await storage.listFiles(fileId);
            const files = response.files;
            if (files.length > 0) {
                console.log('Files in the collection:');
                files.forEach((file) => {
                    console.log(`- File ID: ${file.$id}, Filename: ${file.name}`);
                });
            } else {
                console.log('No files found in the collection.');
            }
            return files;
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async uploadFileToStorage(file: File): Promise<any> {
        try {
            const fileId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
            // Upload the file
            const uploadResponse = await storage.createFile(
                fileId, // Bucket ID
                file.name, // File ID (you can customize this)
                file // The actual File object
            );
            console.log('File uploaded to Appwrite Storage:', uploadResponse);
            return uploadResponse;
        } catch (error) {
            console.error('Error uploading file to storage:', error);
            throw error; // Rethrow the error for the component to handle
        }
    }
}

const appwriteService = new AppwriteService()

export default appwriteService
export { ID } from 'appwrite'
