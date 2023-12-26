"use client";
import appwriteService from "@/utils/appwrite";
import { useEffect, useState } from "react";
import { File } from "./_components/file";

interface FileData {
    $createdAt: string;
    $id: string;
    $permissions: string[];
    $updatedAt: string;
    bucketId: string;
    chunksTotal: number;
    chunksUploaded: number;
    mimeType: string;
    name: string;
    signature: string;
    sizeOriginal: number;
}

type FileArray = FileData[]
const MainPage = () => {
    const [files, setFiles] = useState([])
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // appwriteService.getFiles()
        //     .then(response => {
        //         if (response && response.files) {
        //             setFiles(response.files);
        //         } else {
        //             setError('Files property not found in the response.');
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error fetching files:', error);
        //         setError('Error fetching files: ' + error.message);
        //     });
        async function fetchData() {
            try {
                const response = await appwriteService.getFilesFromStorage();
                setFiles(response || [])
            } catch (error) {
                // setError(error);
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);
    return (
        <div>
            {error && <p>Error: {error.message}</p>}
            {files.length > 0 ? (
                <ul className="flex items-center flex-col">
                    {files.map((file) => (
                        <li key={file.$id}>
                            <File file={file} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No files found in the collection.</p>
            )}
        </div>
    )
}

export default MainPage;