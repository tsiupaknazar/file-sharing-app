import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search } from "lucide-react"

export const SearchBar = () => {
    return (
        <div className="flex items-center space-x-2">
            <Input type="text" className="px-3 w-96 dark:bg-primary bg-primary" placeholder="Search..." />
            <Button variant="ghost">
                <Search />
            </Button>
        </div>
    )
}