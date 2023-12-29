"use client";
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import appwriteService from '@/utils/appwrite';
import { useToast } from '@/components/ui/use-toast';

export default function UploadPage() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setUploadError(null);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const uploadFile = async () => {
    // const user = await appwriteService.getCurrentUser();
    if (file) {
      try {
        await appwriteService.uploadFileToStorage(file);
        toast({
          title: "Success",
          description: "File uploaded successfully",
        });
        setFile(null);
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadError("Error uploading file. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div
        {...getRootProps()}
        className={`w-96 h-48 p-6 border-4 border-dashed rounded-md cursor-pointer ${uploadError ? 'border-red-500' : ''
          }`}
      >
        <input {...getInputProps()} />
        <p className={`text-center ${uploadError ? 'text-red-500' : 'text-gray-500'}`}>
          {uploadError || (file ? `File: ${file.name}` : 'Drag n drop a file here, or click to select a file')}
        </p>
      </div>
      <button
        onClick={uploadFile}
        disabled={!file}
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${!file && 'opacity-50 cursor-not-allowed'
          }`}
      >
        Upload
      </button>
    </div>
  );
};
