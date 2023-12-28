import { getIconForMimeType } from "@/utils/mimeTypeToIcon";
import Image from "next/image";
import { MoreVertical } from "lucide-react";

interface IFile {
  $id: string;
  name: string;
  mimeType: string;
  // Add other properties as needed
}

interface IFileComponentProps {
  file: IFile;
}

export const File = ({ file }: IFileComponentProps) => {
  return (
    <div
      key={file.$id}
      className="bg-accent rounded-md hover:bg-gray-200 dark:bg-accent dark:hover:bg-[#3d3d3d] cursor-pointer"
    // onDoubleClick={() => handleFileView(info!)}
    >
      <div className="flex justify-between items-center px-4 h-10">
        <span>
          {file.name.length > 15
            ? file.name.slice(0, 15) + "..."
            : file.name}
        </span>
        <MoreVertical />
      </div>
      <figure className="w-full aspect-square p-4">
        <Image
          src={getIconForMimeType(file.mimeType)}
          width={100}
          height={100}
          alt="image"
          className="w-full h-full object-none bg-white rounded-sm"
        />
      </figure>
    </div>
  );
};