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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import FirebaseStorageService from "@/firebase/storageService";
import { useAuth } from "@clerk/nextjs";
import { StorageReference } from "firebase/storage";

interface FileInfo {
  name: string;
  type: string;
  downloadUrl: string;
}

interface IFileComponentProps {
  file: StorageReference;
}

export const File = ({ file }: IFileComponentProps) => {
  const { userId } = useAuth();
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
            <DropdownMenuItem>
              <Info className="mr-2 h-4 w-4" />
              <span>Info</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { }}>
              <FileSignature className="mr-2 h-4 w-4" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => FirebaseStorageService.moveToTrash(userId!, file)}>
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