import React from "react";
import { Head, Link } from "@inertiajs/react";
import PixelNavbar from "@/Components/PixelNavbar";

const formatPostDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function CommunityFeed({ auth, recipes }) {
    const DUMMY_HEART_COUNT = 15;

    const handleLike = (recipeId) => {
        alert(`Recipe ID ${recipeId} liked! (Feature under development)`);
    };

    return (
        <>
            <Head title="Community Feed" />

            <div className="min-h-screen bg-magical-bg font-sans text-magical-dark relative">
                {/* NAVIGATION */}
                <PixelNavbar />

                {/* DECORATIVE BACKGROUND */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(#8B008B 2px, transparent 2px)",
                        backgroundSize: "20px 20px",
                    }}
                ></div>

                <main className="relative z-10">
                    {/* HEADER */}
                    <div className="max-w-6xl mx-auto px-6 py-10 text-center">
                        <div className="bg-white border-4 border-magical-border shadow-pixel p-8 mb-8">
                            <h1 className="font-pixel text-4xl text-magical-dark mb-2">
                                🌟 COMMUNITY LOOT CHEST
                            </h1>
                            <p className="text-sm text-gray-600">
                                Discover recipes shared by fellow adventurers
                            </p>
                        </div>
                    </div>

                    {/* RECIPE GRID */}
                    <div className="max-w-6xl mx-auto px-6 pb-20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {recipes && recipes.length > 0 ? (
                                recipes.map((recipe) => (
                                    <div
                                        key={recipe.id}
                                        className="bg-white border-4 border-magical-border shadow-pixel p-3 transform hover:scale-105 transition-transform duration-200 ease-in-out"
                                    >
                                        {/* RECIPE IMAGE */}
                                        <div className="block relative overflow-hidden mb-3">
                                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center border-2 border-magical-border">
                                                <img
                                                    src={recipe.image}
                                                    alt={recipe.title}
                                                    className="w-full h-full object-cover"
                                                    style={{
                                                        imageRendering:
                                                            "pixelated",
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* RECIPE TITLE - Clickable */}
                                        <Link
                                            href={route(
                                                "recipes.show",
                                                recipe.id
                                            )}
                                            className="block hover:text-magical-pink transition-colors"
                                        >
                                            <h3 className="font-pixel text-sm text-magical-dark truncate">
                                                {recipe.title}
                                            </h3>
                                        </Link>

                                        {/* AUTHOR & DATE */}
                                        <div className="text-[10px] text-gray-600 mt-2 space-y-1">
                                            <p>
                                                <span className="font-pixel text-magical-pink">
                                                    By:
                                                </span>{" "}
                                                {recipe.user?.name || "Unknown"}
                                            </p>
                                            <p className="text-gray-400">
                                                Posted:{" "}
                                                {formatPostDate(
                                                    recipe.created_at
                                                )}
                                            </p>
                                        </div>

                                        {/* LIKE BUTTON */}
                                        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                                            <button
                                                className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors focus:outline-none"
                                                title="Like this recipe"
                                                onClick={() =>
                                                    handleLike(recipe.id)
                                                }
                                            >
                                                <span className="text-lg">
                                                    ❤️
                                                </span>
                                                <span className="font-pixel text-xs text-magical-dark">
                                                    {DUMMY_HEART_COUNT}
                                                </span>
                                            </button>

                                            <Link
                                                href={route(
                                                    "recipes.show",
                                                    recipe.id
                                                )}
                                                className="bg-magical-pink text-white font-pixel text-[8px] px-3 py-1 border-2 border-magical-dark hover:bg-magical-dark transition-colors"
                                            >
                                                VIEW
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-4 text-center py-20">
                                    <p className="font-pixel text-xl text-gray-500 mb-4">
                                        The Loot Chest is Empty!
                                    </p>
                                    {auth?.user && (
                                        <Link
                                            href={route("recipes.create")}
                                            className="inline-block bg-magical-pink text-white font-pixel text-sm px-8 py-4 border-2 border-magical-dark shadow-pixel hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                                        >
                                            Be the First to Post!
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
