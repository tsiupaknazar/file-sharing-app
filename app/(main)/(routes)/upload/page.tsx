"use client";
// import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FirebaseStorageService from '@/firebase/storageService';
import { storage } from '@/firebase/firebaseConfig';

import { Button, buttonVariants } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, Card } from "@/components/ui/card"
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from "@clerk/nextjs";
import { cn } from '@/lib/utils';

export default function UploadPage() {
  const { userId } = useAuth();

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const url = await FirebaseStorageService.uploadFile(userId!, file);
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
    // <div>
    //   <div {...getRootProps({ style: dropzoneStyle })}>
    //     <input {...getInputProps()} />
    //     <p>Drag n drop a file here, or click to select a file</p>
    //   </div>
    //   <button onClick={() => onDrop}>Upload</button>
    //   <div>
    //     <p>File uploaded successfully!</p>
    //   </div>
    // </div>
    <>
      <h2 className="font-bold text-center mb-5">Upload Your Files</h2>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center w-full" {...getRootProps()}>
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" {...getInputProps()} className="hidden" />
          </label>
        </div>
        <Button size="lg" className={cn(buttonVariants())} onClick={() => onDrop}>Upload</Button>
      </div>
    </>
  );
}
