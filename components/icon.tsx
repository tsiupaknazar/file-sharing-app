import React from 'react';
import { icons } from 'lucide-react'

type IconProps = {
    name: string;
}

const IconComponent = ({ name }: IconProps) => {
    const LucideIcon = icons[name as keyof typeof icons];
    if (!LucideIcon) {
        return null;
    }
    return <LucideIcon className="h-24 w-24 text-gray-500 dark:text-gray-400" />;
};

export default IconComponent;