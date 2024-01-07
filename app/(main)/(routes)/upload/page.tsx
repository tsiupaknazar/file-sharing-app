"use client";
// import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FirebaseStorageService from '@/firebase/storageService';
import { storage } from '@/firebase/firebaseConfig';

import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, Card } from "@/components/ui/card"
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from "@clerk/nextjs";

export default function UploadPage() {
  const { userId } = useAuth();

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const url = await FirebaseStorageService.uploadFile(userId, file);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const dropzoneStyle: React.CSSProperties = {
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  };

  return (
    <div>
      <div {...getRootProps({ style: dropzoneStyle })}>
        <input {...getInputProps()} />
        <p>Drag n drop a file here, or click to select a file</p>
      </div>
      <button onClick={() => onDrop}>Upload</button>
      <div>
        <p>File uploaded successfully!</p>
      </div>
    </div>
  );
}
