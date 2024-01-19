"use client";
import React, { useState } from 'react';
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

  const [filePreview, setFilePreview] = useState<any>(null);
  const [fileData, setFileData] = useState<any>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const url = await FirebaseStorageService.uploadFile(userId!, file);

        // Add file preview
        const objectUrl = URL.createObjectURL(file);
        setFilePreview(objectUrl);
        setFileData(file);
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
    <>
      <div className="max-w-2xl mx-auto mt-12">
        <div
          className="flex items-center justify-center w-full"
          {...getRootProps()}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              {...getInputProps()}
              className="hidden"
            />
          </label>
        </div>
        {filePreview && (
          <div>
            <Image src={filePreview} width={50} height={50} alt="File preview" />
            <div className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              {fileData.name}
              <br />
              {fileData.size} bytes
              <br />
              {fileData.type}
              {/* <br />
              {filePreview.lastModified}
              <br /> */}
            </div>
          </div>
        )}
        <Button
          size="lg"
          className={cn(buttonVariants())}
          onClick={() => onDrop}
        >
          Upload
        </Button>
      </div>
    </>
  );
}
