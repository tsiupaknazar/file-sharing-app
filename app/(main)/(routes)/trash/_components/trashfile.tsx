import { getExtensionIcon } from "@/utils/getExtensionIcon";
import Image from "next/image";
import {
  MoreVertical,
  ArchiveRestore,
  Trash,
  Share,
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
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { StorageReference } from "firebase/storage";

interface TrashFileInfo {
  name: string;
}

interface IFileComponentProps {
  file: StorageReference;
  updateFiles: (updatedFiles: TrashFileInfo[]) => void;
}

export const TrashFile = ({ file, updateFiles }: IFileComponentProps) => {
  const { userId } = useAuth();

  const handleRestoreFile = async () => {
    try {
      await FirebaseStorageService.restoreFromTrash(userId!, file)
      const updatedFiles = await FirebaseStorageService.getTrashFiles(userId!);
      updateFiles(updatedFiles);
    } catch (error) {
      console.error("Error restoring file:", error);
    }
  }
  const handleDeleteFile = async () => {
    try {
      await FirebaseStorageService.deleteFromTrash(file)
      const updatedFiles = await FirebaseStorageService.getTrashFiles(userId!);
      updateFiles(updatedFiles);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <div
      className="bg-accent w-96 h-96 rounded-md hover:bg-gray-200 dark:bg-accent dark:hover:bg-[#3d3d3d] cursor-pointer"
    >
      <div className="flex justify-between items-center px-4 h-10">
        <span>
          {file.name.length > 15
            ? file.name.slice(0, 15) + "..."
            : file.name}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={handleRestoreFile}>
              <ArchiveRestore className="mr-2 h-4 w-4" />
              <span>Restore</span>
            </DropdownMenuItem>
            {/* <ConfirmModal onConfirm={() => {}}> */}
            <DropdownMenuItem onClick={handleDeleteFile}>
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
            {/* </ConfirmModal> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <figure className="aspect-auto p-4 h-80">
        <Image
          src={getExtensionIcon(file.name)}
          width={85}
          height={85}
          alt="image"
          priority
          className="w-full h-full object-none bg-white dark:bg-accent rounded-sm"
        />
      </figure>
    </div>
  );
};