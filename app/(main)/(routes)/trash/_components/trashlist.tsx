import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import FirebaseStorageService, { FileInfo } from '@/firebase/storageService';
import { Loader } from '@/components/loader';
import { File } from '../../dashboard/_components/file';

export const TrashList = () => {
    // TODO: Implement this component
    const { userId } = useAuth();
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            try {
                const files = await FirebaseStorageService.getTrashFiles(userId!);
                setFiles(files);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFiles();
    }, [userId]);

    return (
        <>
            <div className="mt-4 mx-auto w-[95%]">
                {loading && <Loader />}
                {error && <div>{error}</div>}
                <div className="flex gap-4">
                    {files.map((file: FileInfo) => (
                        <File key={file.name} file={file} />
                    ))}
                </div>
            </div>
            <button className="bg-red-700 w-32 h-12" onClick={() => FirebaseStorageService.clearTrash(userId!)}>Clear Trash</button>
        </>
    )
}