import { getIconForMimeType } from "@/utils/mimeTypeToIcon";

interface IFile {
    $id: string;
    name: string;
    mimeType: string;
    // Add other properties as needed
}

interface IFileComponentProps {
    file: IFile;
}

export const File = ({ file }): IFileComponentProps => {
    return (
        <div className="flex items-center justify-center mb-5">
            <span>{getIconForMimeType(file.mimeType)}</span>
            <h2>{file.name}</h2>
        </div>
    )
}