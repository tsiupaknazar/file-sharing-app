import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import FirebaseStorageService, { FileInfo } from '@/firebase/storageService';
import { File } from './file';
import { Loader } from '@/components/loader';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import EmptyPage from '@/components/empty-page';
// import { parseDate } from '@/utils/parseDate';
import useSearchStore from '@/store/searchStore';
// import useSortStore from '@/store/sortStore';
import { FoldersList } from './folders-list';
import { SortSelect } from './sort-select';

export const FileList = () => {
  const { userId } = useAuth();

  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { searchTerm } = useSearchStore();

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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


  const updateFiles = (updatedFiles: FileInfo[]) => {
    setFiles(updatedFiles);
  };

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
        <SortSelect files={files} setFiles={setFiles} />
        <FoldersList />
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
          {filteredFiles.map((file: any) => (
            <div key={file.name} className='border-2 border-green-400'>
              <File file={file} updateFiles={updateFiles} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};