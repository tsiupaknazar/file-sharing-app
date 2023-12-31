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

export const RenameDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    {/* <Pencil /> */}Pencil
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Rename</DialogHeader>
                <DialogTitle>Rename</DialogTitle>
                <DialogDescription>
                    <Label>Name</Label>
                    <Input placeholder="Name" />
                </DialogDescription>
            </DialogContent>
            <DialogFooter>
                <Button variant="ghost" size="sm">
                    Cancel
                </Button>
                <Button size="sm">Save</Button>
            </DialogFooter>
        </Dialog>
    )   
}