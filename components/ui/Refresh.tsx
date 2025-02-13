import React from "react";
import { RotateCw } from "lucide-react";

interface RefreshProps {
    buttonClass?: string;
}

const Refresh = ({ buttonClass }: RefreshProps) => {
    return (
        <div className="relative">
            <button
                type="button"
                className={`group relative flex items-center justify-between w-[150px] h-[40px] cursor-pointer border-2 border-accent bg-secondary
                  rounded-lg shadow-[4px_4px_#443dff] overflow-hidden transition-all active:translate-x-[4px] active:translate-y-[4px] 
                  active:shadow-none ${buttonClass}`}
            >
                <span className="font-semibold transition-all group-hover:text-transparent w-[111px] text-center">
                    Refresh
                </span>
                <span className="absolute right-0 flex h-full w-[39px] text-accent items-center justify-center bg-secondary transition-all duration-300 group-hover:w-[148px]">
                    <RotateCw />
                </span>
            </button>
        </div>
    );
};

export default Refresh;
