import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function PixieChef() {
    const [showMessage, setShowMessage] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [isWinking, setIsWinking] = useState(false);
    const [isWaving, setIsWaving] = useState(false);

    useEffect(() => {
        const winkInterval = setInterval(() => {
            setIsWinking(true);
            setTimeout(() => setIsWinking(false), 200);
        }, 4000);
        return () => clearInterval(winkInterval);
    }, []);

    useEffect(() => {
        const waveInterval = setInterval(() => {
            setIsWaving(true);
            setTimeout(() => setIsWaving(false), 1000);
        }, 6000);
        return () => clearInterval(waveInterval);
    }, []);

    const handleChefClick = () => {
        setShowMessage(true);
    };

    const handleBubbleClick = () => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
    };

    const handleCloseBubble = (e) => {
        e.stopPropagation();
        setShowMessage(false);
    };

    return (
        <div className="relative flex justify-center items-center">
            {/* MESSAGE BUBBLE */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        className="absolute -top-28 left-1/2 -translate-x-1/2 z-20"
                    >
                        <div
                            onClick={handleBubbleClick}
                            className="relative bg-white rounded-3xl px-6 py-3 shadow-2xl cursor-pointer hover:bg-yellow-50 transition-colors border-2 border-yellow-400"
                        >
                            <button
                                onClick={handleCloseBubble}
                                className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full text-sm font-bold hover:bg-red-600 shadow-lg flex items-center justify-center"
                            >
                                ✕
                            </button>

                            <p className="font-pixel text-[11px] text-magical-dark">
                                {messages[currentMessage]}
                            </p>

                            {/* Speech pointer */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-yellow-400" />
                        </div>

                        <p className="text-center text-[9px] text-white/80 mt-3 font-pixel animate-pulse">
                            CLICK FOR MORE!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PIXIE CHEF CHARACTER */}
            <motion.div
                onClick={handleChefClick}
                className="relative cursor-pointer select-none"
                animate={{ y: [0, -12, 0] }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Soft glow */}
                <motion.div
                    className="absolute inset-0 bg-yellow-200/40 rounded-full blur-3xl -z-10"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Main container - BIGGER */}
                <div className="relative w-72 h-80 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
                    {/* CHEF HEAD - Better positioned */}
                    <motion.div
                        className="absolute top-16 left-1/2 -translate-x-1/2"
                        animate={{ rotate: isWaving ? [0, -3, 3, -3, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Face */}
                        <div className="relative w-32 h-32 bg-yellow-100 rounded-full border-4 border-white shadow-xl">
                            {/* Chef Hat - BETTER DESIGN */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                                {/* Hat top */}
                                <div className="w-24 h-12 bg-white rounded-t-3xl border-4 border-white shadow-lg" />
                                {/* Hat rim */}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-6 bg-white rounded-full border-4 border-white shadow-md" />
                            </div>

                            {/* Eyes - BIGGER & CUTER */}
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-8">
                                {/* Left eye */}
                                <motion.div
                                    className="relative"
                                    animate={{ scaleY: isWinking ? 0.2 : 1 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <div className="w-5 h-5 bg-magical-dark rounded-full" />
                                    <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
                                </motion.div>

                                {/* Right eye */}
                                <motion.div
                                    className="relative"
                                    animate={{ scaleY: isWinking ? 0.2 : 1 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <div className="w-5 h-5 bg-magical-dark rounded-full" />
                                    <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
                                </motion.div>
                            </div>

                            {/* Happy smile - BIGGER */}
                            <div className="absolute top-20 left-1/2 -translate-x-1/2">
                                <div className="w-12 h-6 border-b-4 border-magical-dark rounded-full" />
                            </div>

                            {/* Rosy cheeks */}
                            <div className="absolute top-16 left-3 w-7 h-4 bg-pink-300/60 rounded-full blur-sm" />
                            <div className="absolute top-16 right-3 w-7 h-4 bg-pink-300/60 rounded-full blur-sm" />
                        </div>
                    </motion.div>

                    {/* CHEF BODY - BIGGER & BETTER */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-40 bg-white rounded-t-full border-4 border-white shadow-xl">
                        {/* Chef's apron detail */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-gray-50 rounded-t-full" />
                    </div>

                    {/* WAVING HAND - BETTER POSITION */}
                    <motion.div
                        className="absolute top-36 right-16 z-10"
                        animate={{
                            rotate: isWaving ? [0, -25, 25, -25, 0] : 0,
                            y: isWaving ? [0, -5, 0, -5, 0] : 0,
                        }}
                        transition={{ duration: 0.6, repeat: isWaving ? 2 : 0 }}
                    >
                        <div className="w-10 h-10 bg-yellow-100 rounded-full border-4 border-white shadow-lg">
                            {/* Fingers */}
                            <div className="absolute -top-1 left-1 w-2 h-4 bg-yellow-100 border-2 border-white rounded-full" />
                            <div className="absolute -top-2 left-3.5 w-2 h-5 bg-yellow-100 border-2 border-white rounded-full" />
                            <div className="absolute -top-1 right-1 w-2 h-4 bg-yellow-100 border-2 border-white rounded-full" />
                        </div>
                    </motion.div>
                </div>

                {/* SPARKLES - PRETTIER */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl"
                        style={{
                            top: `${15 + i * 13}%`,
                            left: i % 2 === 0 ? "-12%" : "112%",
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.2, 0.5],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                        }}
                    >
                        {i % 3 === 0 ? "✨" : i % 3 === 1 ? "💫" : "⭐"}
                    </motion.div>
                ))}

                {/* CLICK HINT */}
                {!showMessage && (
                    <motion.p
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[11px] text-white font-pixel whitespace-nowrap drop-shadow-lg"
                        animate={{ opacity: [0.6, 1, 0.6], y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ✨ CLICK ME! ✨
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}

const messages = [
    "🎮 LET'S COOK SOME PIXELS!",
    "🧁 WELCOME TO MY PANTRY!",
    "✨ MAGIC RECIPES AHEAD!",
    "🍰 TIME TO LEVEL UP!",
    "⭐ COLLECT LEGENDARY RECIPES!",
    "🔥 FEELING HUNGRY? ME TOO!",
    "💖 COOKING IS LOVE!",
    "🎯 READY FOR YOUR QUEST?",
    "🌟 EVERY RECIPE HAS A STORY!",
    "🏆 BECOME A MASTER CHEF!",
    "💫 KITCHEN ADVENTURE AWAITS!",
    "🎨 LET'S PAINT WITH FLAVORS!",
];
