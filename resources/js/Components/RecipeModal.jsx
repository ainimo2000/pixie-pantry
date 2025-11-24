import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RecipeModal({ recipe, onClose }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch full details (Ingredients + Instructions) when modal opens
    useEffect(() => {
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
        )
            .then((res) => res.json())
            .then((data) => {
                setDetails(data.meals[0]);
                setLoading(false);
            });
    }, [recipe.idMeal]);

    // Helper to extract ingredients into a list
    const getIngredients = () => {
        if (!details) return [];
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            if (details[`strIngredient${i}`]) {
                ingredients.push(
                    `${details[`strMeasure${i}`]} ${
                        details[`strIngredient${i}`]
                    }`
                );
            }
        }
        return ingredients;
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* 1. The Dark Overlay (Click to close) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-magical-dark/60 backdrop-blur-sm"
            ></motion.div>

            {/* 2. The Floating Scroll (Modal Box) */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white w-full max-w-2xl max-h-[85vh] overflow-hidden border-4 border-magical-border shadow-pixel relative rounded-lg flex flex-col md:flex-row"
            >
                {/* Close Button (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-magical-pink text-white w-8 h-8 font-pixel border-2 border-magical-dark z-10 hover:bg-magical-dark"
                >
                    X
                </button>

                {/* Left Side: Image */}
                <div className="w-full md:w-1/2 bg-magical-bg p-4 flex flex-col items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-magical-border">
                    <div className="border-4 border-magical-pink p-1 bg-white shadow-sm rotate-1">
                        <img
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            className="w-48 h-48 md:w-64 md:h-64 object-cover"
                            style={{ imageRendering: "pixelated" }}
                        />
                    </div>
                    <h2 className="mt-4 font-pixel text-xs md:text-sm text-center text-magical-dark leading-relaxed">
                        {recipe.strMeal}
                    </h2>
                </div>

                {/* Right Side: Scroll Text */}
                <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-magical-card custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            <div className="animate-spin text-4xl">🧁</div>
                            <p className="font-pixel text-[10px] text-magical-dark">
                                READING SCROLL...
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Ingredients List */}
                            <div className="mb-6">
                                <h3 className="font-pixel text-[10px] text-magical-pink mb-3 border-b-2 border-magical-border inline-block">
                                    ★ INGREDIENTS
                                </h3>
                                <ul className="text-xs font-bold text-gray-700 space-y-1">
                                    {getIngredients().map((ing, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2"
                                        >
                                            <span className="text-magical-pink">
                                                •
                                            </span>{" "}
                                            {ing}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Instructions */}
                            <div>
                                <h3 className="font-pixel text-[10px] text-magical-pink mb-3 border-b-2 border-magical-border inline-block">
                                    ★ INSTRUCTIONS
                                </h3>
                                <p className="text-xs leading-6 text-gray-800 font-medium whitespace-pre-line">
                                    {details.strInstructions}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
