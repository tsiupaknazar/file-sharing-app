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
const bucketID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;

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
    async getFilesFromStorage(): Promise<any> {
        try {
            if (!bucketID) {
                throw new Error('Bucket ID is undefined');
            }
            const response = await storage.listFiles(bucketID);
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
            if (!bucketID) {
                throw new Error("Bucket ID is undefined");
            }

            const uploadResponse = await storage.createFile(
                bucketID,
                file.name,
                file
            );
            console.log("File uploaded to Appwrite Storage:", uploadResponse);
            return uploadResponse;
        } catch (error) {
            console.error("Error uploading file to storage:", error);
            throw error;
        }
    }
    async downloadFileFromStorage(fileId: string): Promise<Blob> {
        try {
            if (!bucketID) {
                throw new Error('Bucket ID is undefined');
            }

            const response = await storage.getFileDownload(bucketID, fileId);

            if (response instanceof URL) {
                const blob = await fetch(response.toString()).then((res) => res.blob());
                return blob;
            } else {
                throw new Error('Unexpected response type');
            }
        } catch (error) {
            console.error('Error downloading file from storage:', error);
            throw error;
        }
    }

    async deleteFileFromStorage(fileId: string) {
        try {
            if (!bucketID) {
                throw new Error('Bucket ID is undefined');
            }
            await storage.deleteFile(bucketID, fileId);
            console.log('File deleted from storage:', fileId);
        } catch (error) {
            console.error('Error deleting file from storage:', error);
            throw error;
        }
    }
    async getFilePreviewFromStorage(fileId: string): Promise<Blob> {
        try {
            if (!bucketID) {
                throw new Error('Bucket ID is undefined');
            }

            const response = await storage.getFilePreview(bucketID, fileId);

            if (response instanceof URL) {
                const blob = await fetch(response.toString()).then((res) => res.blob());
                return blob;
            } else {
                throw new Error('Unexpected response type');
            }
        } catch (error) {
            console.error('Error downloading file preview from storage:', error);
            throw error;
        }
    }


}

const appwriteService = new AppwriteService()

export default appwriteService
export { ID } from 'appwrite'
