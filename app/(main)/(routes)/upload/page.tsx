"use client";
import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FirebaseStorageService from '@/firebase/storageService';
import { storage } from '@/firebase/firebaseConfig';

import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, Card } from "@/components/ui/card"
import { Upload } from 'lucide-react';
import Image from 'next/image';

export default function UploadPage() {
  // const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        setUploading(true);
        const url = await FirebaseStorageService.uploadFile(file);
        setDownloadURL(url);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const dropzoneStyle: React.CSSProperties = useMemo(
    () => ({
      border: "2px dashed #cccccc",
      borderRadius: "4px",
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
    }),
    []
  );

  return (
    // <main className="p-8" {...getRootProps()}>
    //   <section className="p-6 border-dashed border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center gap-4">
    //     <p className="text-lg font-medium text-gray-500">Drag and drop files here</p>
    //     <p className="text-sm text-gray-400">or</p>
    //     <input {...getInputProps()} />
    //     <Button className="px-4 py-2" variant="outline">
    //       Click to Browse
    //       <Upload className="ml-2 w-4 h-4" />
    //     </Button>
    //   </section>
    //   {file && (
    //     <section className="mt-8">
    //       <Card className="p-4 flex items-center gap-4">
    //         <Avatar className="h-16 w-16">
    //           <AvatarImage alt="File thumbnail" src="/placeholder.svg?height=64&width=64" />
    //           <AvatarFallback>File Icon</AvatarFallback>
    //         </Avatar>
    //         <div className="flex-1">
    //           <CardTitle className="text-lg">{file ? file.name : 'Filename.ext'}</CardTitle>
    //           <CardDescription className="text-sm text-gray-500">
    //             {file ? file.type : 'File Type'}
    //           </CardDescription>
    //         </div>
    //         {/* <Button type='button' className="text-sm" variant="ghost" onClick={uploadFile}>
    //           Upload
    //         </Button> */}
    //         <Button type='button' className="text-sm" variant="ghost">
    //           Upload
    //         </Button>
    //       </Card>
    //     </section>
    //   )}
    // </main>
    <div>
      <div {...getRootProps({ style: dropzoneStyle })}>
        <input {...getInputProps()} />
        <p>Drag n drop a file here, or click to select a file</p>
      </div>
      <button disabled={uploading} onClick={() => onDrop}>
        Upload
      </button>
      {uploading && <p>Uploading...</p>}
      {downloadURL && (
        <div>
          <p>File uploaded successfully!</p>
          {/* <Image
            src={downloadURL}
            alt="Uploaded file"
            style={{ maxWidth: "100%" }}
          /> */}
        </div>
      )}
    </div>
  );
}
