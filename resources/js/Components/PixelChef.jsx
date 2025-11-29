import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PixelChef() {
    const [showBubble, setShowBubble] = useState(false);
    const [quote, setQuote] = useState("Welcome to my kitchen!");

    const quotes = [
        "Did you wash your hands?",
        "Sugar is the secret ingredient!",
        "Don't burn the cookies!",
        "Pixel food has 0 calories!",
        "Let's cook something magic!",
    ];

    const handleChefClick = () => {
        setShowBubble(true);
        // Hide after 5 seconds
        setTimeout(() => setShowBubble(false), 5000);
    };

    const handleBubbleClick = (e) => {
        e.stopPropagation();
        // Pick random quote
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(random);
        // Reset timer
        setShowBubble(true);
    };

    return (
        <div className="relative inline-block">
            {/* SPEECH BUBBLE */}
            <AnimatePresence>
                {showBubble && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={handleBubbleClick}
                        className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white border-4 border-black p-4 rounded-xl shadow-pixel cursor-pointer z-20 w-48 text-center"
                    >
                        <p className="font-pixel text-[10px] text-black leading-tight">
                            {quote}
                        </p>
                        {/* Triangle pointer */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-black"></div>
                        <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CHEF CHARACTER (Using Emoji for now, replace with Image if you have one) */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleChefClick}
                className="text-9xl cursor-pointer filter drop-shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                👩‍🍳
            </motion.div>
            <p className="font-pixel text-[8px] text-magical-dark mt-2 bg-white/80 px-2 py-1 rounded border-2 border-black inline-block">
                CLICK ME!
            </p>
        </div>
    );
}
