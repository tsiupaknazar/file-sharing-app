"use client";
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FirebaseStorageService from '@/firebase/storageService';

import { Upload } from 'lucide-react';
import { useAuth } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const { userId } = useAuth();
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      const uploadTask = FirebaseStorageService.uploadFile(userId!, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => {
          console.error("Error uploading file:", error);
          toast.error("Error uploading file.");
          setProgress(0);
          setIsUploading(false);
        },
        () => {
          setProgress(100);
          setIsUploading(false);
          toast.success("File uploaded successfully!");
        }
      );
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div className="max-w-3xl mx-auto mt-12">
        {progress > 0 && progress <= 100 && isUploading === true ? (
          <div className='w-full h-[500px] flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
              <Upload className="w-32 h-32 mb-3 text-gray-400" />
              <h1 className='font-bold text-center text-4xl p-4'>Uploading in progress</h1>
              <Progress value={progress} className="w-full h-8 my-4" />
            </div>
          </div>
        ) : (
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
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
