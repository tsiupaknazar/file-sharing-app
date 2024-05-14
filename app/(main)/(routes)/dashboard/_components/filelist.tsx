import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import FirebaseStorageService, { FileInfo } from '@/firebase/storageService';
import { File } from './file';
import { Loader } from '@/components/loader';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import EmptyPage from '@/components/empty-page';
// import { parseDate } from '@/utils/parseDate';

export const FileList = () => {
  const { userId } = useAuth();

  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'date-asc' | 'date-desc' | 'default'>('default');

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const files = await FirebaseStorageService.listFiles(userId!);
        setFiles(files);
        console.log(files);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [userId]);

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
  }

  const sortByDate = (order: 'asc' | 'desc') => {
    const sortedFiles = [...files].sort((a, b) => {
      const dateA = new Date(parseDate(a.uploadTime)).getTime();
      const dateB = new Date(parseDate(b.uploadTime)).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setFiles(sortedFiles);
  }


  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc');
    sortFiles(e.target.value);
  };

  const updateFiles = (updatedFiles: FileInfo[]) => {
    setFiles(updatedFiles);
  };

  useEffect(() => {
    sortFiles(sortBy);
  }, []);

  return (
    <>
      {files.length === 0 && (
        <EmptyPage
          iconName='File'
          contentHeader='Your file storage is empty'>
          <Link href="/upload" className='font-bold underline'>Upload</Link> your first file to get started
        </EmptyPage>
      )}
      <div className={cn(`w-full mx-auto border-2 border-red-700 ${files.length === 0 && 'hidden'}`)}>
        {loading && <Loader />}
        {error && <div>{error}</div>}
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
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
          {files.map((file: any) => (
            <div key={file.name} className='border-2 border-green-400'>
              <File file={file} updateFiles={updateFiles} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};