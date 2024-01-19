import { metadata } from './../app/layout';
import { ref, uploadBytes, listAll, getDownloadURL, getMetadata, deleteObject, StorageReference, getBlob } from 'firebase/storage';
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

  static async moveToTrash(userId: string | null, fileRef: StorageReference) {
    try {
      if (!fileRef || typeof fileRef.name !== 'string') {
        console.error('Invalid fileRef:', fileRef);
        return false;
      }

      const fileName = fileRef.name;
      const trashRef = ref(storage, `${userId}/trash/${fileName}`);
      const blob = await getBlob(fileRef);

      console.log('File properties:', {
        name: fileName,
        fullPath: fileRef.fullPath,
        contentType: blob.type,
        size: blob.size,
        // lastModified: blob.lastModified,
      });

      await uploadBytes(trashRef, blob);
      await deleteObject(fileRef);

      return true;
    } catch (error) {
      console.error("Error moving file to trash:", error);
      return false;
    }
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
  }

  private static async getDownloadUrl(storageRef: any): Promise<string> {
    return getDownloadURL(storageRef);
  }

  private static async getFileMetadata(storageRef: any): Promise<any> {
    return getMetadata(storageRef);
  }
}

export default FirebaseStorageService;
