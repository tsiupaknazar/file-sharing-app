import React from 'react'
import { Trash } from "lucide-react"

const EmptyTrashPage = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[90vh] dark:bg-[#1F1F1F]">
            <div className="flex flex-col items-center space-y-4">
                <Trash className="h-24 w-24 text-gray-500 dark:text-gray-400" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Trash is Empty</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
                    Your trash is currently empty. Anything you delete will appear here for you to review or permanently remove.
                </p>
            </div>
        </div>
    )
}

export default EmptyTrashPage