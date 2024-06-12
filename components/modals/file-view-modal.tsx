'use client';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog"
import FirebaseStorageService, { FileInfo } from "@/firebase/storageService";
import { getFileExtension } from "@/utils/getExtensionIcon";
import { useRef, useEffect } from "react";
import VideoPlayer from "../video-player";

interface FileViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileInfo: FileInfo;
}

export const FileViewModal = ({ isOpen, onClose, fileInfo }: FileViewModalProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    // useEffect(() => {
    //     const container = containerRef.current;
    //     let PSPDFKit;

    //     async function loadPSPDFKit() {
    //         PSPDFKit = await import("pspdfkit");
    //         await PSPDFKit.load({
    //             container,
    //             document: `${fileInfo?.downloadUrl}`,
    //             baseUrl: `${window.location.protocol}//${window.location.host}/`,
    //         });
    //     }

    //     loadPSPDFKit();

    //     return () => {
    //         if (PSPDFKit) {
    //             PSPDFKit.unload(container);
    //         }
    //     };
    // }, [fileInfo?.downloadUrl]);
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
                // return <iframe src={fileInfo.downloadUrl} className="w-full h-auto" />;
                return "Work in progress..."
            case 'mp4':
            case 'webm':
            case 'ogg':
                return <VideoPlayer videoSrc={fileInfo.downloadUrl} />;
            case 'pdf':
            case 'pptx':
            case 'ppt':
                // return <iframe
                //     ref={containerRef}
                //     src={fileInfo.downloadUrl}
                //     className="w-full h-[80%]"
                //     title={fileInfo.name}
                // />
                // return <div ref={containerRef} className="w-full h-[80%]"></div>
            default:
                return <p>Unsupported file type</p>;
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                {/* <DialogHeader>
                    <DialogTitle>{fileInfo?.name}</DialogTitle>
                    <DialogDescription>
                        <p><strong>Type:</strong> {fileInfo?.type}</p>
                        <p><strong>Last modified:</strong> {fileInfo?.uploadTime}</p>
                    </DialogDescription>
                </DialogHeader> */}
                {renderFileContent()}
            </DialogContent>
        </Dialog>
    )
}