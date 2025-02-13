import { useEffect, useState } from "react";

function Alert({
    text = "Alert",
    type = "info",
    duration = 5000,
    className = "",
}) {
    const [progress, setProgress] = useState(100);
    const [isVis, setIsVis] = useState(true);

    useEffect(() => {
        if (duration > 0) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = Math.max(
                        prev - 100 / (duration / 100),
                        0
                    );
                    if (newProgress === 0) {
                        clearInterval(interval);
                        setIsVis(false);
                    }
                    return newProgress;
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [duration]);

    const getBackgroundColor = (type: string) => {
        switch (type) {
            case "danger":
                return "bg-red-500";
            case "success":
                return "bg-green-500";
            case "warning":
                return "bg-yellow-500";
            default:
                return "bg-gray-500";
        }
    };

    if (!isVis) return null;

    return (
        <div className={`fixed top-4 right-4 z-50 p-2 rounded-md shadow-lg w-64 transition-opacity ${className} `}>
            <div
                className={`w-full ${getBackgroundColor(
                    type
                )} brightness-50 h-full absolute top-0 left-0 rounded z-10`}
            ></div>
            <div
                className={`h-full ${getBackgroundColor(type)} 
                opacity-20 rounded absolute top-0 left-0 z-20`}
                style={{
                    width: `${progress}%`,
                    transition: "width 0.1s linear",
                }}
            ></div>
            <p className="text-white relative z-10 p-2">{text}</p>
        </div>
    );
}

export default Alert;
