import { convertTime } from '../utils/timeUtils';
import { ref, uploadBytes, listAll, getDownloadURL, getMetadata, deleteObject, UploadTask, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebaseConfig';


export interface FileInfo {
  name: string;
  type: string;
  downloadUrl: string;
  uploadTime: string;
}

export interface TrashFileInfo {
  name: string;
}

class FirebaseStorageService {
  static uploadFile(userId: string | null, file: File): UploadTask {
      const storageRef = ref(storage, `${userId}/uploads/${file.name}`);
      return uploadBytesResumable(storageRef, file);
  }

  static async listFiles(userId: string | null): Promise<FileInfo[]> {
    try {
      const filesRef = ref(storage, `${userId}/uploads/`);
      const filesList = await listAll(filesRef);

      const fileInfos = await Promise.all(
        filesList.items.map(async (item) => {
          const downloadUrl = await this.getDownloadUrl(item);
          const metadata = await this.getFileMetadata(item);
          console.log(metadata);
          console.log(downloadUrl);
          return {
            name: item.name,
            type: metadata.contentType || 'Unknown Type',
            downloadUrl,
            uploadTime: convertTime(metadata.timeCreated),
          };
        })
      );
      console.log("FileInfos: ", fileInfos);
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
    const storageRef = ref(storage, `${userId}/uploads/${fileRef.name}`);
    const newStorageRef = ref(storage, `${userId}/uploads/${newName}`);
    const metadata = await this.getFileMetadata(storageRef);
    const downloadUrl = metadata.downloadURL;
    await fetch(downloadUrl)
      .then((response) => response.blob())
      .then(async (blob) => {
        await uploadBytes(newStorageRef, blob);
      });
    await deleteObject(storageRef);
    return newName;
  }

  private static async getDownloadUrl(storageRef: any): Promise<string> {
    return getDownloadURL(storageRef);
  }

  private static async getFileMetadata(storageRef: any): Promise<any> {
    return getMetadata(storageRef);
  }

  static async downloadFile(userId: string | null, fileName: string): Promise<void> {
    try {
      const fileRef = ref(storage, `${userId}/uploads/${fileName}`);
      const downloadUrl = await this.getDownloadUrl(fileRef);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  static async viewFile(userId: string | null, fileName: string): Promise<void> {
    try {
      const fileRef = ref(storage, `${userId}/uploads/${fileName}`);
      const metadata = await getMetadata(fileRef);
      const downloadUrl = await this.getDownloadUrl(fileRef);
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      const content = document.createElement('div');
      content.style.backgroundColor = '#fff';
      content.style.padding = '20px';

      // Check the file type
      if (metadata.contentType?.startsWith('text/')) {
        // Text file
        const textContent = document.createElement('pre');
        const text = await this.getFileText(fileRef);
        textContent.textContent = text;
        content.appendChild(textContent);
      } else if (metadata.contentType?.startsWith('video/')) {
        // Video file
        const video = document.createElement('video');
        video.src = downloadUrl;
        video.controls = true;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';
        content.appendChild(video);
      } else {
        // Other file types (e.g., images)
        const image = document.createElement('img');
        image.src = downloadUrl;
        image.style.maxWidth = '100%';
        image.style.maxHeight = '100%';
        content.appendChild(image);
      }

      modal.appendChild(content);
      document.body.appendChild(modal);
      modal.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
    } catch (error) {
      console.error('Error viewing file:', error);
    }
  }

  static async getFileInfo(userId: string | null, fileName: string): Promise<FileInfo> {
    const fileRef = ref(storage, `${userId}/uploads/${fileName}`);
    const downloadUrl = await this.getDownloadUrl(fileRef);
    const metadata = await this.getFileMetadata(fileRef);
    return {
      name: fileName,
      type: metadata.contentType || 'Unknown Type',
      downloadUrl,
      uploadTime: convertTime(metadata.timeCreated),
    };
  }

  private static async getFileText(storageRef: any): Promise<string> {
    const response = await fetch(await this.getDownloadUrl(storageRef));
    return response.text();
  }
  //Function which allows to share the file between users by user email
  static async shareFile(userId: string | null, fileRef: any, email: string) {
    if (!fileRef) {
      throw new Error('Error');
    }
    const storageRef = ref(storage, `${userId}/uploads/${fileRef.name}`);
    const downloadUrl = await this.getDownloadUrl(storageRef);
    const metadata = await this.getFileMetadata(storageRef);
    const shareRef = ref(storage, `${email}/shared/${fileRef.name}`);
    await uploadBytes(shareRef, fileRef, { contentType: metadata.contentType });
    return true;
  }
}

export default FirebaseStorageService;
