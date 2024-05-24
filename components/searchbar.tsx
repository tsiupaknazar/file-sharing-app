import { Input } from "./ui/input"
import { Search } from "lucide-react"

import useSearchStore from "@/store/searchStore"

export const SearchBar = () => {
    const { searchTerm, setSearchTerm } = useSearchStore();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    return (
        <div className="relative w-96 hidden md:block">
            <Search className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3" />
            <Input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                className="flex-grow bg-transparent pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-accent rounded-md"
                placeholder="Search..."
            />
        </div>
    )
}