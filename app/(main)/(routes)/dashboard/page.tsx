"use client";
// import { useState, useEffect } from 'react';
import { listAll, getDownloadURL, ref, getMetadata } from 'firebase/storage';
import { storage } from '@/firebase/firebaseConfig';
import { File } from './_components/file';
import FirebaseStorageService, { FileInfo } from '@/firebase/storageService';
import { useAuth } from '@clerk/nextjs';

const DashboardPage = () => {
  const { userId } = useAuth();

  const getFiles = async () => {
    const files = await FirebaseStorageService.listFiles(userId!);
    return files;
  };

  const files = getFiles();

  return (
    <div className="mt-4 mx-auto w-[95%]">
      {files?.then((files) =>
        files.length > 0 ? (
          <div className="flex gap-4">
            {files.map((file: FileInfo) => (
              <File key={file.name} file={file} />
            ))}
          </div>
        ) : (
          <p>No files available.</p>
        )
      )}
    </div>
  );
};

export default DashboardPage;