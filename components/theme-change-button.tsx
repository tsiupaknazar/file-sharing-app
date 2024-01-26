import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button"

const ThemeButton = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Button
            variant="outline"
            size="icon"
            className="flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none"
            onClick={toggleTheme}
        >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </Button>
    );
};

export default ThemeButton;