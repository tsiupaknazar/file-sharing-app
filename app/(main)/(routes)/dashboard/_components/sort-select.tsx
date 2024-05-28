import { FileInfo } from '@/firebase/storageService';
import React, { useState, useEffect } from 'react';

type SortSelectProps = {
    files: FileInfo[];
    setFiles: (files: FileInfo[]) => void;
};

export const SortSelect = ({ files, setFiles }: SortSelectProps) => {
    const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'date-asc' | 'date-desc' | 'default'>('default');

    const sortFiles = (sortBy: string) => {
        switch (sortBy) {
            case 'name-asc':
                sortByName('asc');
                break;
            case 'name-desc':
                sortByName('desc');
                break;
            case 'date-asc':
                sortByDate('asc');
                break;
            case 'date-desc':
                sortByDate('desc');
                break;
            default:
                break;
        }
    };

    const sortByName = (order: 'asc' | 'desc') => {
        const sortedFiles = [...files].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
        setFiles(sortedFiles);
    };

    const parseDate = (dateString: string) => {
        const parts = dateString.split(" at ");
        const datePart = parts[0];
        const timePart = parts[1];
        const [day, month, year] = datePart.split(" ");
        const [hour, minute, second] = timePart.split(":");
        const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month);
        return `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${day.padStart(2, '0')}T${hour}:${minute}:${second}`;
    };

    const sortByDate = (order: 'asc' | 'desc') => {
        const sortedFiles = [...files].sort((a, b) => {
            const dateA = new Date(parseDate(a.uploadTime)).getTime();
            const dateB = new Date(parseDate(b.uploadTime)).getTime();
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setFiles(sortedFiles);
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sortValue = e.target.value as 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';
        setSortBy(sortValue);
        sortFiles(sortValue);
    };

    useEffect(() => {
        sortFiles(sortBy);
    }, []);

    return (
        <div className='w-full px-4 py-4 flex justify-end border border-blue-900'>
            <div className="w-[300px] px-8 py-2 rounded-xl bg-accent dark:bg-accent">
                <select className='w-full px-2 py-2 bg-accent dark:bg-accent focus:outline-none' value={sortBy} onChange={handleSortChange}>
                    <option value="default">Sort by:</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                    <option value="date-asc">Date: Oldest first</option>
                    <option value="date-desc">Date: Newest first</option>
                </select>
            </div>
        </div>
    );
};
