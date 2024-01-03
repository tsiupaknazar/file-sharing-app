import { ref, uploadBytes, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage } from './firebaseConfig';

export interface FileInfo {
  name: string;
  type: string;
  downloadUrl: string;
}

class FirebaseStorageService {
  static async uploadFile(file: File): Promise<string | null> {
    try {
      const storageRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(storageRef, file);
      return await this.getDownloadUrl(storageRef);
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  }

  static async listFiles(): Promise<FileInfo[]> {
    try {
      const filesRef = ref(storage, 'uploads/');
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
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }

  private static async getDownloadUrl(storageRef: any): Promise<string> {
    return getDownloadURL(storageRef);
  }

  private static async getFileMetadata(storageRef: any): Promise<any> {
    return getMetadata(storageRef);
  }
}

export default FirebaseStorageService;
