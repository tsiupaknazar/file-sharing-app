import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog"
import FirebaseStorageService, { FileInfo } from "@/firebase/storageService";
import { getFileExtension } from "@/utils/getExtensionIcon";

interface FileViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileInfo: FileInfo;
}

export const FileViewModal = ({ isOpen, onClose, fileInfo }: FileViewModalProps) => {
    const renderFileContent = () => {
        if (!fileInfo || !fileInfo.downloadUrl) {
            return <p>No file to display</p>;
        }

        const fileExtension = getFileExtension(fileInfo.name);

        switch (fileExtension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return <img src={fileInfo.downloadUrl} alt="file preview" className="w-full h-auto" />;
            case 'mp4':
            case 'webm':
            case 'ogg':
                return (
                    <video controls className="w-full h-auto">
                        <source src={fileInfo.downloadUrl} />
                        Your browser does not support the video tag.
                    </video>
                );
            // case 'pdf':
            //     return (
            //         <Document file={fileInfo.downloadUrl}>
            //             <Page pageNumber={1} />
            //         </Document>
            //     );
            default:
                return <p>Unsupported file type</p>;
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{fileInfo?.name}</DialogTitle>
                    <DialogDescription>
                        <p><strong>Type:</strong> {fileInfo?.type}</p>
                        <p><strong>Last modified:</strong> {fileInfo?.uploadTime}</p>
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4">
                    {renderFileContent()}
                </div>
            </DialogContent>
        </Dialog>
    )
}