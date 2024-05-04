"use client";
import { FolderOpen } from "lucide-react"

export default function SharedFilesPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[90vh] dark:bg-[#1F1F1F]">
            <div className="flex flex-col items-center space-y-4">
                <FolderOpen className="h-24 w-24 text-gray-500 dark:text-gray-400" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">No files shared yet</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
                    Invite your team members to share files, or upload your own to get started.
                </p>
            </div>
        </div>
    )
}