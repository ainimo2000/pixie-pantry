import { useState } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { Button } from "@headlessui/react";

export default function Dashboard({ auth, myRecipes }) {
    const { post } = useForm();

    // Helper function to format the date
    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleLogout = () => {
        post(window.route("logout"));
    };

    const handleDelete = (recipeId) => {
        if (confirm("Are you sure you want to discard this loot?")) {
            router.delete(route("recipes.destroy", recipeId), {
                preserveScroll: true,
            });
        }
    };

    const startEditing = (recipe) => {
        setEditingId(recipe.id);
        setNoteText(recipe.notes || "");
    };

    // This handles the 'Update' logic
    const saveNote = (id) => {
        router.put(
            window.route("recipes.update", id),
            { notes: noteText },
            {
                onSuccess: () => setEditingId(null),
                onError: (errors) => {
                    console.error(errors);
                    alert(
                        "Error saving entry. Please ensure the note is not too long."
                    );
                },
            }
        );
    };

    const handleKeyDown = (e, id) => {
        if (e.key === "Enter") {
            e.preventDefault();
            saveNote(id);
        }
    };

    return (
        <>
            <Head title="My Quest Log" />
            <div className="min-h-screen bg-magical-bg font-sans text-magical-dark relative selection:bg-magical-pink selection:text-white">
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(#8B008B 2px, transparent 2px)",
                        backgroundSize: "20px 20px",
                    }}
                ></div>

                {/* NAVIGATION */}
                <nav className="bg-magical-pink border-b-4 border-magical-border p-4 sticky top-0 z-50 shadow-lg">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                className="w-10 h-10 bg-white border-2 border-magical-dark flex items-center justify-center text-xl shadow-sm rounded-sm hover:scale-105 transition-transform"
                            >
                                🏠
                            </Link>
                            <h1 className="font-pixel text-white text-xs md:text-sm drop-shadow-md tracking-wider">
                                QUEST LOG
                            </h1>
                        </div>
                        <div className="flex items-center gap-4 font-pixel text-[8px] md:text-[10px] text-white">
                            <span className="hidden md:inline">
                                HERO: {auth?.user?.name || "Guest"}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-magical-dark px-3 py-2 border-2 border-white hover:bg-white hover:text-magical-dark transition-colors"
                            >
                                LOGOUT
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="max-w-6xl mx-auto px-6 py-10 relative z-10">
                    {/* INVENTORY STATUS */}
                    <div className="bg-white border-4 border-magical-border shadow-pixel p-6 mb-12 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h2 className="font-pixel text-lg md:text-2xl text-magical-dark mb-2">
                                <span className="text-magical-pink">
                                    INVENTORY
                                </span>{" "}
                                STATUS
                            </h2>
                            <p className="text-xs font-bold text-gray-500">
                                You have collected{" "}
                                {myRecipes ? myRecipes.length : 0} recipes.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/"
                                className="bg-magical-pink text-white font-pixel text-[8px] px-6 py-3 border-2 border-magical-dark shadow-pixel-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                            >
                                + FIND MORE LOOT
                            </Link>

                            <Link
                                href={window.route("recipes.create")}
                                className="bg-magical-dark text-white font-pixel text-[8px] px-6 py-3 border-2 border-magical-pink shadow-pixel-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                            >
                                + SUBMIT NEW RECIPE
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myRecipes && myRecipes.length > 0 ? (
                            myRecipes.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-magical-card border-4 border-magical-border p-4 shadow-pixel relative group"
                                >
                                    {/* DELETE BUTTON: Centered Icon, Larger Size */}
                                    <div className="absolute top-0 right-0 p-2 z-10">
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="bg-red-600 text-white w-8 h-8 flex items-center justify-center text-md font-bold font-pixel border-2 border-black hover:bg-red-800 transition-colors shadow-sm"
                                            title="Discard Recipe"
                                        >
                                            🗑️
                                        </button>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="border-2 border-magical-pink p-1 bg-white shrink-0 h-20 w-20">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                                style={{
                                                    imageRendering: "pixelated",
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <Link
                                                href={window.route(
                                                    "recipes.show",
                                                    item.id
                                                )} // <-- Points to the new detail page
                                                className="hover:text-magical-pink transition-colors inline-block" // Add hover effect
                                            >
                                                <h3 className="font-pixel text-[10px] text-magical-dark leading-snug mb-2 pr-10">
                                                    {item.title}
                                                </h3>
                                            </Link>

                                            <Link
                                                href={window.route(
                                                    "recipes.edit",
                                                    item.id
                                                )}
                                                className="bg-magical-dark text-white font-pixel text-[8px] px-2 py-1 border-2 border-magical-pink shadow-pixel-sm hover:bg-magical-pink hover:text-white transition-colors mt-1 inline-block text-center"
                                                title="Edit Recipe Details"
                                            >
                                                ⚔️ EDIT RECIPE DETAILS
                                            </Link>

                                            {/* DATE TIMESTAMPS (Orange Box fix) */}
                                            <div className="mt-2 pt-2 border-t border-gray-200 text-[8px] text-gray-500 font-sans">
                                                <p>
                                                    Created:
                                                    {formatDate(
                                                        item.created_at
                                                    )}
                                                </p>
                                                <p>
                                                    Updated:{" "}
                                                    {formatDate(
                                                        item.updated_at
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 opacity-50">
                                <p className="font-pixel text-xs text-magical-dark mb-4">
                                    YOUR BAG IS EMPTY
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
