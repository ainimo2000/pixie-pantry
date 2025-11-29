import { motion } from "framer-motion";
import { useForm, Link } from "@inertiajs/react";

export default function PixelCard({
    recipe,
    auth,
    onOpen,
    isDashboard = false,
    onDelete,
    onEdit,
}) {
    // Form helper for "Saving" from Home Page
    const { post, processing } = useForm({
        api_id: recipe.idMeal,
        title: recipe.strMeal,
        image: recipe.strMealThumb,
    });

    const handleSave = (e) => {
        e.preventDefault();
        post(window.route("recipes.store"), {
            preserveScroll: true,
        });
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-magical-card border-4 border-magical-border shadow-pixel p-3 flex flex-col relative h-full justify-between"
        >
            {/* Cute Tape Decoration */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-magical-pink border-2 border-magical-border opacity-80"></div>

            {/* Image */}
            <div className="border-4 border-magical-pink p-1 bg-white mb-3">
                <img
                    src={recipe.strMealThumb || recipe.image}
                    alt={recipe.strMeal || recipe.title}
                    className="w-full h-40 object-cover"
                    style={{ imageRendering: "pixelated" }}
                />
            </div>

            {/* Title */}
            <h3 className="font-pixel text-[10px] text-magical-dark leading-relaxed mb-4 h-10 overflow-hidden text-center">
                {recipe.strMeal || recipe.title}
            </h3>

            {/* --- BUTTONS AREA --- */}
            <div className="flex gap-2 mt-auto">
                {/* 1. READ BUTTON (Always Visible) */}
                {onOpen && (
                    <button
                        onClick={() => onOpen(recipe)}
                        className="flex-1 bg-white text-magical-dark font-pixel text-[8px] py-2 border-2 border-magical-dark shadow-pixel-sm hover:bg-gray-50 flex items-center justify-center gap-1"
                    >
                        <span>📜</span> READ
                    </button>
                )}

                {/* 2. DASHBOARD BUTTONS (Edit/Delete) */}
                {isDashboard ? (
                    <>
                        <button
                            onClick={() => onEdit(recipe)}
                            className="flex-1 bg-yellow-300 text-magical-dark font-pixel text-[8px] py-2 border-2 border-black shadow-pixel-sm hover:bg-yellow-400 text-center"
                        >
                            ✎
                        </button>
                        <button
                            onClick={() => onDelete(recipe.id)}
                            className="flex-1 bg-red-400 text-white font-pixel text-[8px] py-2 border-2 border-black shadow-pixel-sm hover:bg-red-500 text-center"
                        >
                            🗑
                        </button>
                    </>
                ) : /* 3. HOME PAGE BUTTON (Save) */
                auth?.user ? (
                    <button
                        onClick={handleSave}
                        disabled={processing}
                        className="flex-1 bg-magical-pink text-white font-pixel text-[8px] py-2 border-2 border-magical-dark shadow-pixel-sm hover:bg-pink-400 flex items-center justify-center gap-1"
                    >
                        ♥ SAVE
                    </button>
                ) : (
                    <Link
                        href={window.route("login")}
                        className="flex-1 bg-gray-300 text-gray-600 font-pixel text-[8px] py-2 border-2 border-gray-500 text-center pt-3 no-underline hover:bg-gray-400"
                    >
                        LOGIN
                    </Link>
                )}
            </div>
        </motion.div>
    );
}
