import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { create } from "zustand";

interface DialogProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: any;
    setData(data: any): void;
}

const useDialog = create<DialogProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    data: {},
    setData: (data) => set({ data }),
}));

const DialogComponent = () => {
    const { isOpen, onClose } = useDialog();
    return (
        <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
            <DialogTrigger>
                <button>Open Dialog</button>
            </DialogTrigger>
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