import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function DonutLoader({ visible }) {
    // Determine when the loading is "done" to trigger the exit
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (visible) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1; // Adjust speed (1 = normal, 5 = fast)
                });
            }, 30);
            return () => clearInterval(interval);
        } else {
            setProgress(0);
        }
    }, [visible]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-magical-bg flex flex-col items-center justify-center font-pixel"
                >
                    <div className="relative w-48 h-48">
                        {/* 1. BOTTOM LAYER (The "Empty" State - Pink) */}
                        {/* Make sure you have public/images/donut-empty.png */}
                        <img
                            src="/images/donut-empty.png"
                            alt="Loading..."
                            className="absolute inset-0 w-full h-full object-contain opacity-50"
                        />

                        {/* 2. TOP LAYER (The "Filled" State - Dark) */}
                        {/* This image reveals from Left to Right based on progress */}
                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            style={{
                                // clipPath: inset(top right bottom left)
                                // We reduce the 'right' inset from 100% to 0% to reveal it left-to-right
                                clipPath: `inset(0 ${100 - progress}% 0 0)`,
                            }}
                        >
                            {/* Make sure you have public/images/donut-filled.png */}
                            <img
                                src="/images/donut-full.png"
                                alt="Filled"
                                className="w-full h-full object-contain"
                            />
                        </motion.div>

                        {/* Percentage Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-pixel text-black text-xl font-bold drop-shadow-md">
                                {progress}%
                            </span>
                        </div>
                    </div>

                    <motion.h2
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mt-8 text-magical-dark text-lg tracking-widest uppercase"
                    >
                        BAKING ASSETS...
                    </motion.h2>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
