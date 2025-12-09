import { motion } from "framer-motion";
import { useForm, Link } from "@inertiajs/react";
import React, { useState } from "react"; // <-- ADD THIS IMPORT

export default function PixelCard({
    recipe,
    auth,
    onOpen,
    isDashboard = false,
    onDelete,
    onEdit,
}) {
    // 1. STATE FOR EDITING NOTES (NEW)
    const [isNotesEditing, setIsNotesEditing] = useState(false);

    // 2. INERTIA FORM FOR SAVING NOTES (NEW)
    // We use 'notes' as the key since your text field code used 'notes'
    const {
        data: notesData, // Renamed to avoid collision with other 'data'
        setData: setNotesData,
        patch, // Use patch for updating existing resource
        processing: notesProcessing,
    } = useForm({
        // Initialize with the recipe's existing note (assuming it's called 'entry' or 'notes' on the recipe object)
        entry: recipe.entry || "",
    });

    const handleNotesUpdate = (e) => {
        e.preventDefault();

        // Send a PATCH request to update the specific recipe note
        patch(window.route("recipes.update", recipe.id), {
            preserveScroll: true,
            onSuccess: () => {
                // HIDE THE INPUT FIELD on successful update
                setIsNotesEditing(false);
            },
        });
    };

    // Form helper for "Saving" from Home Page (Existing Code)
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

    // REMOVE THE UNUSED RecipeCard function that was inside PixelCard.

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

            {isDashboard && ( // Only show the notes area on the Dashboard/Quest Log
                <div className="notes-container my-2 p-1 border-2 border-dashed border-magical-dark/50">
                    {isNotesEditing ? (
                        <form
                            onSubmit={handleNotesUpdate}
                            className="flex flex-col gap-1"
                        >
                            {/* 🎯 MISSING TEXT INPUT FIELD GOES HERE */}
                            <textarea
                                value={notesData.entry}
                                onChange={(e) =>
                                    setNotesData("entry", e.target.value)
                                }
                                placeholder="Enter your quest notes..."
                                className="w-full p-1 text-[10px] border-magical-pink"
                            />

                            <div className="flex gap-1">
                                <button
                                    type="submit"
                                    disabled={notesProcessing}
                                    className="flex-1 bg-green-500 text-white font-pixel text-[8px] py-1 border-2 border-black hover:bg-green-600"
                                >
                                    ✓ OK
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsNotesEditing(false)}
                                    className="flex-1 bg-gray-500 text-white font-pixel text-[8px] py-1 border-2 border-black hover:bg-gray-600"
                                >
                                    X CANCEL
                                </button>
                            </div>
                        </form>
                    ) : (
                        // 2. VIEW MODE: This is the invisible click area
                        <p
                            onClick={() => setIsNotesEditing(true)}
                            className="text-[9px] cursor-pointer hover:text-magical-pink transition-colors p-1"
                        ></p>
                    )}
                                   {" "}
                </div>
            )}

            {/* --- BUTTONS AREA (Existing Code) --- */}
            <div className="flex gap-2 mt-auto">
                {/* 1. READ BUTTON */}
                {/* ... (Existing Read Button code remains here) ... */}
                {onOpen && (
                    <button
                        onClick={() => onOpen(recipe)}
                        className="flex-1 bg-white text-magical-dark font-pixel text-[8px] py-2 border-2 border-magical-dark shadow-pixel-sm hover:bg-gray-50 flex items-center justify-center gap-1"
                    >
                        <span>📜</span> READ
                    </button>
                )}

                {/* 2. DASHBOARD BUTTONS (Edit/Delete) - Remains the same */}
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
                ) : /* 3. HOME PAGE BUTTON (Save/Login) - Remains the same */
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
