import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import FirebaseStorageService, { FileInfo } from '@/firebase/storageService';
import { File } from './file';
import { Loader } from '@/components/loader';
import { StorageReference } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const FileList = () => {
  const { userId } = useAuth();

  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'date-asc' | 'date-desc'>('name-asc');

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
        // sortByDate('asc');
        break;
      case 'date-desc':
        // sortByDate('desc');
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

  // const sortByDate = (order: 'asc' | 'desc') => {
  //   const sortedFiles = [...files].sort((a, b) => {
  //     const dateA = new Date(a.date).getTime();
  //     const dateB = new Date(b.date).getTime();
  //     return order === 'asc' ? dateA - dateB : dateB - dateA;
  //   });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc');
  };

  return (
    <div className="mt-4 w-full mx-auto border-2 border-red-700">
      {loading && <Loader />}
      {error && <div>{error}</div>}
      <div className='w-full px-2 py-4'>
        <Select value={sortBy} onChange={handleSortChange}>
          <SelectTrigger className="w-[180px] ml-0">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name: A-Z</SelectItem>
            <SelectItem value="name-desc">Name: Z-A</SelectItem>
            {/* <SelectItem value="dateold">Date: Oldest first</SelectItem> */}
            {/* <SelectItem value="datenew">Date: Newest first</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8">
        {files.map((file: any) => (
          <div key={file.name}>
            <File file={file} />
          </div>
        ))}
      </div>
    </div>
  );
};
