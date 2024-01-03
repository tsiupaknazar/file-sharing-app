"use client";
import { useState, useEffect } from 'react';
import { listAll, getDownloadURL, ref, getMetadata } from 'firebase/storage';
import { storage } from '@/firebase/firebaseConfig';

interface FileInfo {
  name: string;
  type: string;
  downloadUrl: string;
}

const DashboardPage = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const filesRef = ref(storage, 'uploads/');
        const filesList = await listAll(filesRef);

        const fileInfos = await Promise.all(
          filesList.items.map(async (item) => {
            const downloadUrl = await getDownloadURL(item);
            const metadata = await getMetadata(item);
            return {
              name: item.name,
              type: metadata.contentType || 'Unknown Type',
              downloadUrl,
            };
          })
        );

        setFiles(fileInfos);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);
  return (
    <div className="mt-4 mx-auto w-[95%]">
      {files.length > 0 ? (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <p>
                <strong>Name:</strong> {file.name} | <strong>Type:</strong> {file.type}
              </p>
              <a href={file.downloadUrl} target="_blank" rel="noopener noreferrer">
                Download
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files available.</p>
      )}
    </div>
  );
};

export default DashboardPage;