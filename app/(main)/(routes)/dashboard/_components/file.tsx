import { getExtensionIcon } from "@/utils/getExtensionIcon";
import Image from "next/image";
import {
  MoreVertical,
  Download,
  FileSignature,
  Trash,
  Share,
  Info
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import FirebaseStorageService from "@/firebase/storageService";
import { useAuth } from "@clerk/nextjs";
import { FileViewModal } from "@/components/modals/file-view-modal";

interface FileInfo {
  name: string;
  type: string;
  downloadUrl: string;
}

interface IFileComponentProps {
  file: FileInfo;
  updateFiles: (updatedFiles: FileInfo[]) => void;
}

export const File = ({ file, updateFiles }: IFileComponentProps) => {
  const { userId } = useAuth();

  const handleDelete = async () => {
    try {
      await FirebaseStorageService.moveToTrash(userId!, file);
      const updatedFiles = await FirebaseStorageService.listFiles(userId!);
      updateFiles(updatedFiles);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  const handleDownloadFile = async () => {
    try {
      await FirebaseStorageService.downloadFile(userId!, file.downloadUrl!);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }
  return (
    <div className="bg-accent w-full m-auto md:w-72 h-auto md:h-72 rounded-md hover:bg-gray-200 dark:bg-accent dark:hover:bg-[#3d3d3d] cursor-pointer">
      <div className="flex justify-between items-center px-4 h-10">
        <span className="whitespace-nowrap">
          {file.name.length > 15 ? file.name.slice(0, 15) + "..." : file.name}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => FirebaseStorageService.viewFile(userId!, file.name)}>
              <Info className="mr-2 h-4 w-4" />
              <span>Info</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => FirebaseStorageService.renameFile(userId!, file.name, "TestName")}>
              <FileSignature className="mr-2 h-4 w-4" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownloadFile}>
              <Download className="mr-2 h-4 w-4" />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <figure className="aspect-auto p-4 h-auto md:h-64">
        <Image
          src={getExtensionIcon(file.name)}
          width={85}
          height={85}
          alt="image"
          className="w-full h-full object-none bg-white dark:bg-accent rounded-sm"
        />
      </figure>
    </div>
  );
};