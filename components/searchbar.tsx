import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search } from "lucide-react"

export const SearchBar = () => {
    return (
        <div className="relative w-96">
            <Search className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3" />
            <Input type="text" className="pl-12 pr-4 dark:bg-primary bg-primary" placeholder="Search..." />
        </div>
    )
}