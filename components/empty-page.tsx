import React, { ReactNode } from 'react'
import IconComponent from './icon';

type EmptyPageProps = {
    iconName: string;
    contentHeader: string;
    content?: string;
    children?: ReactNode | JSX.Element;
}

const EmptyPage = ({ iconName, contentHeader, content, children }: EmptyPageProps) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[90vh] dark:bg-[#1F1F1F]">
            <div className="flex flex-col items-center space-y-4">
                <IconComponent name={iconName} />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{contentHeader}</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
                    {content}
                    {children}
                </p>
            </div>
        </div>
    )
}

export default EmptyPage