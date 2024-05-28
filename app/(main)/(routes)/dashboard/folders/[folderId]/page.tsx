"use client";

import { useRouter } from 'next/navigation';

const FolderPage = () => {
    const router = useRouter();
    // const { folderId } = router.query;

    return (
        <div>
            <h1>Dashboard Folder:</h1>
        </div>
    );
};

export default FolderPage;
