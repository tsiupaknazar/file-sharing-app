"use client";

import { useEffect, useState } from "react";

// import { ConfirmModal } from "../modals/confirm-modal";
import { FileViewModal } from "../modals/file-view-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <FileViewModal />
        </>
    );
};