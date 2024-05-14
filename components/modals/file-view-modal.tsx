import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { create } from "zustand";

interface DialogProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: any;
    setData(data: any): void;
}

export const useDialog = create<DialogProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    data: {},
    setData: (data) => set({ data }),
}));

export const FileViewModal = () => {
    const { isOpen, onClose } = useDialog();
    return (
        <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>Dialog Description</DialogDescription>
                </DialogHeader>
                <div>Dialog Content</div>
            </DialogContent>
        </Dialog>
    )
}