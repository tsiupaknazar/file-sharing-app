import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import FirebaseStorageService, { FileInfo, TrashFileInfo } from '@/firebase/storageService';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { TrashFile } from './trashfile';
import { cn } from '@/lib/utils';
import EmptyPage from '@/components/empty-page';
import useSearchStore from '@/store/searchStore';

export const TrashList = () => {
    const { userId } = useAuth();

    const [files, setFiles] = useState<TrashFileInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { searchTerm } = useSearchStore();

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    const handleRestoreFromTrash = async () => {
        try {
            await FirebaseStorageService.restoreAllFromTrash(userId!)
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
                <div className='flex items-center justify-between gap-2'>
                    <Button
                        onClick={handleClearTrash}
                    >
                        Clear Trash
                    </Button>
                    <Button
                        onClick={handleRestoreFromTrash}
                    >
                        Restore All
                    </Button>
                </div>
            </div>
            <div className={cn(`mt-8 mx-auto w-[95%] ${files.length === 0 && 'hidden'}`)}>
                {loading && <Loader />}
                {error && <div>{error}</div>}
                <div className="flex gap-4">
                    {filteredFiles.map((file: any) => (
                        <TrashFile key={file.name} file={file} updateFiles={updateFiles} />
                    ))}
                </div>
            </div>
            {files.length === 0 && <EmptyPage iconName="Trash" contentHeader="Trash is Empty" content='Your trash is currently empty. Anything you delete will appear here for you to review or permanently remove.' />}
        </>
    );
}