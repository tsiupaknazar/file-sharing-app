import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type RenameDialogProps = {
    setOpen: React.SetStateAction<boolean>
}

export const RenameDialog = ({setOpen}: RenameDialogProps) => {
    return (
        <DialogContent>
            <DialogHeader>Rename</DialogHeader>
            <DialogTitle>Rename</DialogTitle>
            <DialogDescription>
                <Label>Name</Label>
                <Input placeholder="Name" />
            </DialogDescription>
            <DialogFooter>
                <Button variant="ghost" size="sm">
                    Cancel
                </Button>
                <Button size="sm">Save</Button>
            </DialogFooter>
        </DialogContent>
    )
}