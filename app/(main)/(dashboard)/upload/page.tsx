"use client";
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import appwriteService from '@/utils/appwrite';
import { useToast } from "@/components/ui/use-toast"

export default function UploadPage() {
    const { toast } = useToast()

    const [file, setFile] = useState<File | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const uploadFile = async () => {
        if (file) {
            try {
                await appwriteService.uploadFileToStorage(file);
                toast({
                    title: "Success",
                    description: "Success",
                })
            } catch (error) {
                console.error('Error uploading file:', error);
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "Error",
                })
            }
        }
    };
    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <div
                {...getRootProps()}
                className="w-64 h-32 p-6 border-4 border-dashed rounded-md cursor-pointer"
            >
                <input {...getInputProps()} />
                <p className="text-center text-gray-500">
                    Drag n drop a file here, or click to select a file
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
    )
}