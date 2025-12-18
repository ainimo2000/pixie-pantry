import { useState } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import PixelNavbar from "@/Components/PixelNavbar";

export default function Dashboard({ auth, myRecipes }) {
    const { post } = useForm();
    const [editingId, setEditingId] = useState(null);
    const [noteText, setNoteText] = useState("");

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

    const handleDelete = (recipeId) => {
        if (confirm("Are you sure you want to discard this recipe?")) {
            router.delete(route("recipes.destroy", recipeId), {
                preserveScroll: true,
            });
        }
    };

    const startEditing = (recipe) => {
        setEditingId(recipe.id);
        setNoteText(recipe.notes || "");
    };

    const saveNote = (id) => {
        router.put(
            route("recipes.update", id),
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
            <Head title="My Kitchen" />
            <div className="min-h-screen bg-magical-bg font-sans text-magical-dark relative selection:bg-magical-pink selection:text-white">
                {/* DECORATIVE BACKGROUND */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(#8B008B 2px, transparent 2px)",
                        backgroundSize: "20px 20px",
                    }}
                ></div>

                {/* NAVIGATION - Now using PixelNavbar */}
                <PixelNavbar />

                <main className="max-w-6xl mx-auto px-6 py-10 relative z-10">
                    {/* INVENTORY STATUS */}
                    <div className="bg-white border-4 border-magical-border shadow-pixel p-6 mb-12 rounded-lg">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h2 className="font-pixel text-lg md:text-2xl text-magical-dark mb-2">
                                    <span className="text-magical-pink">
                                        MY
                                    </span>{" "}
                                    KITCHEN
                                </h2>
                                <p className="text-xs font-bold text-gray-500">
                                    You have collected{" "}
                                    {myRecipes ? myRecipes.length : 0} recipes.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href={route("community.feed")}
                                    className="bg-magical-pink text-white font-pixel text-[8px] px-6 py-3 border-2 border-magical-dark shadow-pixel-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center"
                                >
                                    🔍 EXPLORE COMMUNITY
                                </Link>

                                <Link
                                    href={route("recipes.create")}
                                    className="bg-magical-dark text-white font-pixel text-[8px] px-6 py-3 border-2 border-magical-pink shadow-pixel-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center"
                                >
                                    + CREATE NEW RECIPE
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* RECIPES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myRecipes && myRecipes.length > 0 ? (
                            myRecipes.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-magical-card border-4 border-magical-border p-4 shadow-pixel relative group"
                                >
                                    {/* DELETE BUTTON */}
                                    <div className="absolute top-2 right-2 z-10">
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="bg-red-600 text-white w-8 h-8 flex items-center justify-center text-md font-bold font-pixel border-2 border-black hover:bg-red-800 transition-colors shadow-sm"
                                            title="Delete Recipe"
                                        >
                                            🗑️
                                        </button>
                                    </div>

                                    <div className="flex gap-4">
                                        {/* Recipe Image */}
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
                                            {/* Recipe Title - Clickable */}
                                            <Link
                                                href={route(
                                                    "recipes.show",
                                                    item.id
                                                )}
                                                className="hover:text-magical-pink transition-colors inline-block"
                                            >
                                                <h3 className="font-pixel text-[10px] text-magical-dark leading-snug mb-2 pr-10">
                                                    {item.title}
                                                </h3>
                                            </Link>

                                            {/* Edit Button */}
                                            <Link
                                                href={route(
                                                    "recipes.edit",
                                                    item.id
                                                )}
                                                className="bg-magical-dark text-white font-pixel text-[8px] px-2 py-1 border-2 border-magical-pink shadow-pixel-sm hover:bg-magical-pink hover:text-white transition-colors mt-1 inline-block text-center"
                                                title="Edit Recipe Details"
                                            >
                                                ⚔️ EDIT RECIPE
                                            </Link>

                                            {/* Timestamps */}
                                            <div className="mt-2 pt-2 border-t border-gray-200 text-[8px] text-gray-500 font-sans">
                                                <p>
                                                    Created:{" "}
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
                                    YOUR KITCHEN IS EMPTY
                                </p>
                                <Link
                                    href={route("home")}
                                    className="inline-block bg-magical-pink text-white font-pixel text-[8px] px-6 py-3 border-2 border-magical-dark hover:bg-magical-dark transition-colors"
                                >
                                    START COLLECTING RECIPES
                                </Link>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
