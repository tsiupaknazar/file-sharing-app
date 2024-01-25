import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search } from "lucide-react"

export const SearchBar = () => {
    return (
        <div className="relative w-96 hidden md:block">
            <Search className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3" />
            <Input type="text" className="flex-grow bg-transparent pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-accent rounded-md" placeholder="Search..." />
        </div>
    )
}