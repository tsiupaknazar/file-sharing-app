"use client";
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FirebaseStorageService from '@/firebase/storageService';

import { Upload } from 'lucide-react';
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast"

import { Progress } from "@/components/ui/progress"
import { cn } from '@/lib/utils';

export default function UploadPage() {
  const { userId } = useAuth();
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

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
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Error uploading your file.",
            variant: "destructive",
            duration: 3000,
            className: cn(
              'top-0 right-0 flex fixed md:max-w-[340px] md:top-4 md:right-4'
            ),
          })
          setProgress(0);
          setIsUploading(false);
        },
        () => {
          setProgress(100);
          setIsUploading(false);
          toast({
            title: "Success!!",
            description: "File uploaded successfully.",
            duration: 3000,
            className: cn(
              'top-0 right-0 flex fixed bg-accent dark:bg-accent md:max-w-[320px] md:top-4 md:right-4'
            ),
          })
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
              <div className="flex flex-col items-center justify-center pt-8 pb-10">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-lg text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
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
    </>
  );
}
