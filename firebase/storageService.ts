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
    if (!fileRef) {
      throw new Error('fileRef is missing fullPath property.');
    }

    const originalRef = ref(storage, `${userId}/uploads/${fileRef.name}`);

    const originalDownloadURL = await this.getDownloadUrl(originalRef);

    const trashRef = ref(storage, `${userId}/trash/${fileRef.name}`);
    await uploadBytes(trashRef, fileRef, { contentType: fileRef.contentType });

    await deleteObject(originalRef);

    return true;
  }


  static async deleteFromTrash(fileRef: any) {
    await deleteObject(fileRef);
  }

  static async restoreFromTrash(userId: string | null, fileRef: any): Promise<boolean> {
    try {
      // Check if fileRef is valid and contains necessary properties
      if (!fileRef || !fileRef.fullPath) {
        throw new Error('Invalid file reference.');
      }

      // Create a reference to the original location in the uploads folder
      const originalRef = ref(storage, `${userId}/uploads/${fileRef.name}`);

      // Upload the file back to its original location
      await uploadBytes(originalRef, fileRef);

      // Delete the file from the trash
      await deleteObject(fileRef);

      return true; // Restoration successful
    } catch (error) {
      console.error('Error restoring file from trash:', error);
      return false; // Restoration failed
    }
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
    if (!fileRef) {
      throw new Error('Error');
    }
    const storageRef = ref(storage, `${userId}/uploads/${newName}`);
    console.log("Before: ", storageRef, fileRef);
    await uploadBytes(storageRef, fileRef);
    await deleteObject(fileRef);
    console.log("After: ", storageRef, fileRef);
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
