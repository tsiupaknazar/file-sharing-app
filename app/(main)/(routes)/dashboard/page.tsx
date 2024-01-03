"use client";
import { useState, useEffect } from 'react';
import { listAll, getDownloadURL, ref, getMetadata } from 'firebase/storage';
import { storage } from '@/firebase/firebaseConfig';
import { File } from './_components/file';
import FirebaseStorageService, { FileInfo } from '@/firebase/storageService';

const DashboardPage = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const fileInfos = await FirebaseStorageService.listFiles();
      setFiles(fileInfos);
    };

    fetchFiles();
  }, []);
  return (
    <div className="mt-4 mx-auto w-[95%]">
      {files.length > 0 ? (
        <div className="flex gap-4">
          {files.map((file, index) => (
            <File key={index} file={file} />
            // <li key={index}>
            //   <p>
            //     <strong>Name:</strong> {file.name} | <strong>Type:</strong> {file.type}
            //   </p>
            //   <a href={file.downloadUrl} target="_blank" rel="noopener noreferrer">
            //     Download
            //   </a>
            // </li>
          ))}
        </div>
      ) : (
        <p>No files available.</p>
      )}
    </div>
  );
};

export default DashboardPage;