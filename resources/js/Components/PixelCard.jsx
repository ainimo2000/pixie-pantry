import { motion } from "framer-motion";

// Now accepting "onOpen" prop
export default function PixelCard({ recipe, auth, onOpen }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-magical-card border-4 border-magical-border shadow-pixel p-3 flex flex-col relative"
        >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-magical-pink border-2 border-magical-border opacity-80"></div>

            <div className="border-4 border-magical-pink p-1 bg-white mb-3">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-40 object-cover"
                    style={{ imageRendering: "pixelated" }}
                />
            </div>

            <h3 className="font-pixel text-[10px] text-magical-dark leading-relaxed mb-4 h-10 overflow-hidden text-center">
                {recipe.strMeal}
            </h3>

            {/* CLICKING THIS BUTTON NOW OPENS THE MODAL */}
            <button
                onClick={() => onOpen(recipe)}
                className="mt-auto w-full bg-magical-pink text-white font-pixel text-[8px] py-2 border-2 border-magical-dark shadow-pixel-sm active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
            >
                <span>📜</span>
                READ RECIPE
            </button>
        </motion.div>
    );
}
