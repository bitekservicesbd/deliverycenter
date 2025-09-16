import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowDown } from 'lucide-react';

const TopDropdownButton = ({ icon: Icon, label, onClick, type = 'button', dropdownItems = [] }) => {
    return (
        <div className="flex items-stretch">
            {/* Main Button */}
            <button
                type={type}
                onClick={onClick}
                className="flex flex-col items-center justify-center rounded-l border border-r-slate-300 bg-slate-200 px-3 py-2 hover:bg-slate-300 dark:bg-slate-700 hover:dark:bg-slate-800"
            >
                <Icon className="text-2xl text-orange-400" />
                <p className="mt-1 text-center text-sm font-medium">{label}</p>
            </button>

            {/* Dropdown Button */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center rounded-r bg-slate-200 px-3 hover:bg-slate-300 dark:bg-slate-700 hover:dark:bg-slate-800">
                        <ArrowDown className="text-orange-400" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="right" className="ml-[-1px]">
                    {dropdownItems.map((item, index) => (
                        <DropdownMenuItem key={index} onClick={item.onClick}>
                            {item.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default TopDropdownButton;
