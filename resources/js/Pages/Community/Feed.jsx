import React from "react";
import { Head, Link } from "@inertiajs/react";
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const formatPostDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function CommunityFeed({ auth, recipes }) {
    const DUMMY_HEART_COUNT = 15; // Placeholder

    // Function to handle the "long press" or click on the heart
    const handleLike = (recipeId) => {
        // In a real application, you would send a POST request here
        // router.post(window.route('recipes.like', recipeId));
        alert(`Recipe ID ${recipeId} liked! (Feature under development)`);
    };

    return (
        <>
            <Head title="Community Feed" />

            <div className="min-h-screen bg-magical-bg font-sans text-magical-dark relative p-6">
                {/* --- HEADER --- */}
                <div className="max-w-6xl mx-auto mb-10 text-center">
                    <div className="bg-magical-pink border-4 border-magical-border p-4 shadow-pixel mb-4">
                        <h1 className="font-pixel text-4xl text-white">
                            PIXIE'S PANTRY
                        </h1>
                    </div>
                    <h2 className="font-pixel text-3xl text-magical-dark mt-8 mb-12">
                        COMMUNITY LOOT CHEST
                    </h2>
                </div>

                {/* --- RECIPE GRID --- */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {recipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="bg-white border-4 border-magical-border shadow-pixel p-3 transform hover:scale-105 transition-transform duration-200 ease-in-out"
                            >
                                {/* 1. IMAGE (NO LINK HERE) */}
                                <div className="block relative overflow-hidden mb-3">
                                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center border-2 border-magical-border">
                                        <img
                                            src={recipe.image_url}
                                            alt={recipe.title}
                                            className="w-full h-full object-cover"
                                            style={{
                                                imageRendering: "pixelated",
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* 2. TITLE (Clickable to Show Page) */}
                                {/* Link element wraps the title */}
                                <Link
                                    href={window.route(
                                        "recipes.show",
                                        recipe.id
                                    )}
                                    className="block hover:text-magical-pink transition-colors"
                                >
                                    <h3 className="font-pixel text-lg text-magical-dark truncate">
                                        {recipe.title}
                                    </h3>
                                </Link>

                                {/* 3. AUTHOR & DATE */}
                                <p className="text-[10px] text-gray-600 mt-1 flex justify-between items-center">
                                    <span>By: **{recipe.user.name}**</span>
                                    <span className="text-gray-400">
                                        Posted:{" "}
                                        {formatPostDate(recipe.created_at)}
                                    </span>
                                </p>

                                {/* 4. HEARTS (Long Press/Tap for Like) */}
                                <div className="mt-2 flex items-center justify-end">
                                    <span className="text-red-500 text-sm mr-1">
                                        {/* Using onMouseDown/onTouchStart to simulate a "long press" / click */}
                                        <button
                                            className="focus:outline-none text-red-500 hover:text-red-700 transition-colors"
                                            title="Like this recipe"
                                            // Call the handleLike function on click
                                            onClick={() =>
                                                handleLike(recipe.id)
                                            }
                                        >
                                            ❤️
                                        </button>
                                    </span>
                                    <span className="font-pixel text-sm text-magical-dark">
                                        {DUMMY_HEART_COUNT}{" "}
                                        {/* Replace with actual recipe.likes_count */}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Handle case where no recipes exist */}
                    {recipes.length === 0 && (
                        <div className="text-center font-pixel text-xl text-gray-500 mt-20">
                            The Loot Chest is Empty! Be the first to post a
                            recipe.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
