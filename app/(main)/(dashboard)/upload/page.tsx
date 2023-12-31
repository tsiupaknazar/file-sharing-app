"use client";
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import appwriteService from '@/utils/appwrite';
import { useToast } from '@/components/ui/use-toast';

import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, Card } from "@/components/ui/card"
import { Upload } from 'lucide-react';

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
    // <div className="flex flex-col items-center justify-center mt-8">
    //   <div
    //     {...getRootProps()}
    //     className={`w-96 h-48 p-6 border-4 border-dashed rounded-md cursor-pointer ${uploadError ? 'border-red-500' : ''
    //       }`}
    //   >
    //     <input {...getInputProps()} />
    //     <p className={`text-center ${uploadError ? 'text-red-500' : 'text-gray-500'}`}>
    //       {uploadError || (file ? `File: ${file.name}` : 'Drag n drop a file here, or click to select a file')}
    //     </p>
    //   </div>
    //   <button
    //     onClick={uploadFile}
    //     disabled={!file}
    //     className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${!file && 'opacity-50 cursor-not-allowed'
    //       }`}
    //   >
    //     Upload
    //   </button>
    // </div>
    <main className="p-8" {...getRootProps()}>
      <section className="p-6 border-dashed border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-medium text-gray-500">Drag and drop files here</p>
        <p className="text-sm text-gray-400">or</p>
        <input {...getInputProps()} />
        <Button className="px-4 py-2" variant="outline">
          Click to Browse
          <Upload className="ml-2 w-4 h-4" />
        </Button>
      </section>
      {file && (
        <section className="mt-8">
          <Card className="p-4 flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage alt="File thumbnail" src="/placeholder.svg?height=64&width=64" />
              <AvatarFallback>File Icon</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-lg">{file ? file.name : 'Filename.ext'}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {file ? file.type : 'File Type'}
              </CardDescription>
            </div>
            <Button className="text-sm" variant="ghost" onClick={uploadFile}>
              Upload
            </Button>
          </Card>
        </section>
      )}
    </main>

  );
};
