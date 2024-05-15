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
import { FileViewModal, useDialog } from "@/components/modals/file-view-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FileInfo {
  name: string;
  type: string;
  downloadUrl: string;
  uploadTime: string;
}

interface IFileComponentProps {
  file: FileInfo;
  updateFiles: (updatedFiles: FileInfo[]) => void;
}

export const File = ({ file, updateFiles }: IFileComponentProps) => {
  const { userId } = useAuth();
  const dialog = useDialog();

  const [newName, setNewName] = useState<string>("");

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
      console.log("Downloading file:", file.downloadUrl);
      await FirebaseStorageService.downloadFile(userId!, file.downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }
  const handleRename = async () => {
    try {
      if (newName) {
        await FirebaseStorageService.renameFile(userId!, file.name, newName);
        const updatedFiles = await FirebaseStorageService.listFiles(userId!);
        updateFiles(updatedFiles);
      }
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  return (
    <Dialog>
      <div className="bg-accent w-full m-auto md:w-72 h-auto md:h-72 rounded-md hover:bg-gray-200 dark:bg-accent dark:hover:bg-[#3d3d3d] cursor-pointer">
        <div className="flex justify-between items-center px-4 h-10">
          <span className="whitespace-nowrap">
            {file.name.length > 15 ? file.name.slice(0, 15) + "..." : file.name}
            {/* {file.downloadUrl} */}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => dialog.onOpen()}>
                <Info className="mr-2 h-4 w-4" />
                <span>Info</span>
              </DropdownMenuItem>
              <DialogTrigger>
                <DropdownMenuItem>
                  <FileSignature className="mr-2 h-4 w-4" />
                  <span>Rename</span>
                </DropdownMenuItem>
              </DialogTrigger>
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
                <span>Move to trash</span>
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
            priority
            className="w-full h-full object-none bg-white dark:bg-accent rounded-sm"
          />
        </figure>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename file</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              New Name
            </Label>
            <Input
              id="newname"
              value={newName}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleRename}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};