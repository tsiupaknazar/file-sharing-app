import { ref, uploadBytes, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage } from './firebaseConfig';
import { useAuth } from "@clerk/nextjs";

export interface FileInfo {
  name: string;
  type: string;
  downloadUrl: string;
}

// const { userId } = useAuth();

class FirebaseStorageService {
  static async uploadFile(userId: string | null,file: File): Promise < string | null > {
  try {
    const storageRef = ref(storage, `${userId}/uploads/${file.name}`);
    await uploadBytes(storageRef, file);
      return await this.getDownloadUrl(storageRef);
  } catch(error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

  static async listFiles(userId: string | null): Promise < FileInfo[] > {
  try {
    const filesRef = ref(storage, `${userId}/uploads/`);
    const filesList = await listAll(filesRef);

    const fileInfos = await Promise.all(
      filesList.items.map(async (item) => {
        const downloadUrl = await this.getDownloadUrl(item);
        const metadata = await this.getFileMetadata(item);
        return {
          name: item.name,
          type: metadata.contentType || 'Unknown Type',
          downloadUrl,
        };
      })
    );

    return fileInfos;
  } catch(error) {
    console.error('Error listing files:', error);
    return [];
  }
}

  private static async getDownloadUrl(storageRef: any): Promise < string > {
  return getDownloadURL(storageRef);
}

  private static async getFileMetadata(storageRef: any): Promise < any > {
  return getMetadata(storageRef);
}
}

export default FirebaseStorageService;
