"use client";
import { Folder } from "lucide-react";
export const FoldersList: React.FC = () => {
    return (
        <div className="w-full my-4 h-auto flex items-center justify-start flex-wrap gap-10 border border-yellow-400">
            <div className="w-40 h-40 p-4 border border-pink-700">
                <Folder width={100} height={100} />
                <p className="text-lg font-bold text-center">Folder Name</p>
            </div>
            <div className="w-40 h-40 p-4 border border-pink-700">
                <Folder width={100} height={100} />
                <p className="text-lg font-bold text-center">Folder Name</p>
            </div>
            <div className="w-40 h-40 p-4 border border-pink-700">
                <Folder width={100} height={100} />
                <p className="text-lg font-bold text-center">Folder Name</p>
            </div>
            <div className="w-40 h-40 p-4 border border-pink-700">
                <Folder width={100} height={100} />
                <p className="text-lg font-bold text-center">Folder Name</p>
            </div>
        </div>
    );
}