import { ref, uploadBytes, listAll, getDownloadURL, getMetadata, deleteObject, StorageReference, uploadString } from 'firebase/storage';
import { storage } from './firebaseConfig';

export interface FileInfo {
  name: string;
  type: string;
  downloadUrl: string;
}

export interface TrashFileInfo {
  name: string;
}

class FirebaseStorageService {
  static async uploadFile(userId: string | null, file: File): Promise<string | null> {
    try {
      const storageRef = ref(storage, `${userId}/uploads/${file.name}`);
      await uploadBytes(storageRef, file);
      return await this.getDownloadUrl(storageRef);
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  }

  static async listFiles(userId: string | null): Promise<FileInfo[]> {
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
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }

  static async getTrashFiles(userId: string | null): Promise<TrashFileInfo[]> {
    const trashRef = ref(storage, `${userId}/trash/`);
    const trashFiles = await listAll(trashRef);

    return trashFiles.items;
  }

  static async moveToTrash(userId: string | null, fileRef: any) {
    // Ensure fileRef is correctly constructed
    if (!fileRef) {
      throw new Error('fileRef is missing fullPath property.');
    }

    // Construct a reference to the file in the original location (uploads folder)
    const originalRef = ref(storage, fileRef.fullPath);

    // Get the download URL of the original file
    const originalDownloadURL = await getDownloadURL(originalRef);

    // Upload the file to the trash location
    const trashRef = ref(storage, `${userId}/trash/${fileRef.name}`);
    await uploadString(trashRef, originalDownloadURL, 'data_url');

    // Delete the file from the original location
    await deleteObject(originalRef);

    return true; // Indicate success
  }

  static async deleteFromTrash(userId: string | null, fileRef: any) {
    await deleteObject(fileRef);
  }

  static async restoreFromTrash(userId: string | null, fileRef: any) {
    const storageRef = ref(storage, `${userId}/uploads/${fileRef.name}`);
    await uploadBytes(storageRef, fileRef);
    return deleteObject(fileRef);
  }

  static async clearTrash(userId: string | null) {
    const trashRef = ref(storage, `${userId}/trash/`);
    const trashFiles = await listAll(trashRef);

    await Promise.all(
      trashFiles.items.map(async (fileRef) => {
        await deleteObject(fileRef);
      })
    );
  }

  static async renameFile(userId: string | null, fileRef: any, newName: string) {
    const storageRef = ref(storage, `${userId}/uploads/${newName}`);
    await uploadBytes(storageRef, fileRef);
    await deleteObject(fileRef);
    return newName;
  }

  private static async getDownloadUrl(storageRef: any): Promise<string> {
    return getDownloadURL(storageRef);
  }

  private static async getFileMetadata(storageRef: any): Promise<any> {
    return getMetadata(storageRef);
  }
}

export default FirebaseStorageService;
