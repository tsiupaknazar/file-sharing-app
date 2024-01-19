import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import FirebaseStorageService, { FileInfo, TrashFileInfo} from '@/firebase/storageService';
import { StorageReference } from 'firebase/storage';
import { Loader } from '@/components/loader';
import { File } from '../../dashboard/_components/file';
import { Button } from '@/components/ui/button';
import { TrashFile } from './trashfile';
import { ConfirmModal } from '@/components/modals/confirm-modal';

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

    return (
        <>
            <div className="flex items-center justify-between w-full px-8 py-2">
                <h1>Trash page</h1>
                {/* <ConfirmModal onConfirm={FirebaseStorageService.clearTrash(userId!)}> */}
                <Button
                    disabled={files.length === 0}
                    onClick={() => FirebaseStorageService.clearTrash(userId!)}
                >
                    Clear Trash
                </Button>
                {/* </ConfirmModal> */}
            </div>
            <div className="mt-8 mx-auto w-[95%]">
                {loading && <Loader />}
                {error && <div>{error}</div>}
                <div className="flex gap-4">
                    {files.map((file: any) => (
                        <TrashFile key={file.name} file={file} />
                    ))}
                    {files.length === 0 && <div>No files in trash</div>}
                </div>
            </div>
        </>
    );
}