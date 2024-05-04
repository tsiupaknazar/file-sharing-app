import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import FirebaseStorageService, { FileInfo, TrashFileInfo } from '@/firebase/storageService';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { TrashFile } from './trashfile';
import EmptyTrashPage from './empty-trash';
import { cn } from '@/lib/utils';

export const TrashList = () => {
    const { userId } = useAuth();

    const [files, setFiles] = useState<TrashFileInfo[]>([]);
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

    const handleClearTrash = async () => {
        try {
            await FirebaseStorageService.clearTrash(userId!)
            const updatedFiles = await FirebaseStorageService.getTrashFiles(userId!);
            setFiles(updatedFiles);
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const updateFiles = (updatedFiles: TrashFileInfo[]) => {
        setFiles(updatedFiles);
    };

    return (
        <>
            <div className={cn(`flex items-center justify-between w-full px-8 py-8 ${files.length === 0 && 'hidden'}`)}>
                <h1 className="text-transparent">Trash page</h1>
                <Button
                    onClick={handleClearTrash}
                >
                    Clear Trash
                </Button>
            </div>
            <div className={cn(`mt-8 mx-auto w-[95%] ${files.length === 0 && 'hidden'}`)}>
                {loading && <Loader />}
                {error && <div>{error}</div>}
                <div className="flex gap-4">
                    {files.map((file: any) => (
                        <TrashFile key={file.name} file={file} updateFiles={updateFiles} />
                    ))}
                </div>
            </div>
            {files.length === 0 && <EmptyTrashPage />}
        </>
    );
}