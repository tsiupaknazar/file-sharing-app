import { getIconForMimeType } from "@/utils/mimeTypeToIcon";
import Image from "next/image";
import {
  MoreVertical,
  Cloud,
  CreditCard,
  Download,
  FileSignature,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Trash,
  Settings,
  Share,
  User,
  UserPlus,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import appwriteService from "@/utils/appwrite";
import { Button } from "@/components/ui/button";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
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
            <DropdownMenuItem onClick={() => appwriteService.deleteFileFromStorage(file.$id)}>
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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