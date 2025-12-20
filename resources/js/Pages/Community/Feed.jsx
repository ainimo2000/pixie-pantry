import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import PixelNavbar from "@/Components/PixelNavbar";
import SearchBar from "@/Components/SearchBar";

const formatPostDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function CommunityFeed({ auth, recipes, searchQuery = "" }) {
    const [featuredRecipes, setFeaturedRecipes] = useState([]);

    // Get 3 random recipes for the top showcase
    useEffect(() => {
        if (recipes && recipes.length > 0) {
            const shuffled = [...recipes].sort(() => 0.5 - Math.random());
            setFeaturedRecipes(shuffled.slice(0, 3));
        }
    }, [recipes]);

    const handleLike = (recipeId) => {
        alert(`Recipe ID ${recipeId} liked! (Feature under development)`);
    };

    return (
        <>
            <Head title="Community Feed" />

            <div className="min-h-screen bg-magical-bg font-sans text-magical-dark">
                {/* NAVIGATION */}
                <PixelNavbar />

                <main>
                    {/* FEATURED SHOWCASE - FULL VIEWPORT HEIGHT */}
                    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-50 flex items-center justify-center relative py-8">
                        {/* DECORATIVE BACKGROUND */}
                        <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{
                                backgroundImage:
                                    "radial-gradient(#8B008B 2px, transparent 2px)",
                                backgroundSize: "20px 20px",
                            }}
                        />

                        <div className="max-w-6xl mx-auto px-6 relative z-10">
                            {/* LOOT CHEST HEADER */}
                            <div className="text-center mb-8">
                                <div className="inline-block bg-white border-4 border-magical-dark p-6 mb-3">
                                    <div className="text-6xl mb-2">🎁</div>
                                    <h1 className="font-pixel text-3xl text-magical-dark">
                                        COMMUNITY LOOT CHEST
                                    </h1>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Discover recipes shared by fellow
                                    adventurers
                                </p>
                            </div>

                            {/* FEATURED RECIPES - SLANTED CARDS */}
                            {featuredRecipes.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {featuredRecipes.map((recipe, index) => (
                                        <div key={recipe.id} className="group">
                                            <Link
                                                href={
                                                    recipe.source === "api"
                                                        ? route(
                                                              "api.recipe.show",
                                                              recipe.api_id
                                                          )
                                                        : route(
                                                              "recipes.show",
                                                              recipe.id
                                                          )
                                                }
                                                onClick={(e) => {
                                                    if (
                                                        recipe.source === "api"
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                <div
                                                    className="relative bg-white border-4 border-magical-dark shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                                                    style={{
                                                        transform: `rotate(${
                                                            index === 0
                                                                ? "-3deg"
                                                                : index === 2
                                                                ? "3deg"
                                                                : "0deg"
                                                        })`,
                                                    }}
                                                >
                                                    {/* SLANTED IMAGE CONTAINER */}
                                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-magical-pink to-purple-400">
                                                        <img
                                                            src={recipe.image}
                                                            alt={recipe.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            style={{
                                                                imageRendering:
                                                                    "pixelated",
                                                            }}
                                                        />
                                                        <div className="absolute top-2 right-2 text-yellow-300 text-2xl">
                                                            ✨
                                                        </div>
                                                        <div className="absolute bottom-2 left-2 text-yellow-300 text-2xl">
                                                            ✨
                                                        </div>
                                                    </div>

                                                    {/* RECIPE INFO */}
                                                    <div className="p-4 bg-white">
                                                        <h3 className="font-pixel text-lg text-magical-dark mb-2 truncate">
                                                            {recipe.title}
                                                        </h3>
                                                        <p className="text-xs text-gray-600">
                                                            <span className="text-magical-pink font-pixel">
                                                                By:
                                                            </span>{" "}
                                                            {recipe.user
                                                                ?.name ||
                                                                "Unknown"}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            Posted:{" "}
                                                            {formatPostDate(
                                                                recipe.created_at
                                                            )}
                                                        </p>

                                                        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-200">
                                                            <span className="text-red-500">
                                                                ❤️
                                                            </span>
                                                            <span className="font-pixel text-xs text-magical-dark">
                                                                15
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* SCROLL DOWN INDICATOR */}
                            <div className="text-center mt-8">
                                <p className="font-pixel text-xs text-magical-dark mb-2">
                                    SCROLL FOR MORE
                                </p>
                                <div className="animate-bounce text-2xl">
                                    ⬇️
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ALL RECIPES SECTION */}
                    <div className="bg-magical-bg relative">
                        {/* DECORATIVE BACKGROUND */}
                        <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{
                                backgroundImage:
                                    "radial-gradient(#8B008B 2px, transparent 2px)",
                                backgroundSize: "20px 20px",
                            }}
                        />

                        {/* SEARCH BAR */}
                        <div className="max-w-6xl mx-auto px-6 pt-16 pb-8 relative z-10">
                            <SearchBar
                                placeholder="Search community recipes..."
                                route={route("community.search")}
                                initialQuery={searchQuery}
                            />
                            {searchQuery && (
                                <p className="text-sm text-gray-600 mt-4">
                                    Found {recipes.length} recipe(s) for "
                                    {searchQuery}"
                                </p>
                            )}
                        </div>

                        {/* ALL RECIPES GRID */}
                        <div className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
                            <h2 className="font-pixel text-2xl text-magical-dark mb-8 text-center">
                                📚 ALL COMMUNITY RECIPES
                            </h2>

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

                                            {/* RECIPE TITLE */}
                                            <Link
                                                href={
                                                    recipe.source === "api"
                                                        ? "#"
                                                        : route(
                                                              "recipes.show",
                                                              recipe.id
                                                          )
                                                }
                                                onClick={(e) => {
                                                    if (
                                                        recipe.source === "api"
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
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
                                                    {recipe.user?.name ||
                                                        "Unknown"}
                                                    {recipe.source ===
                                                        "api" && (
                                                        <span className="ml-1 text-[8px] bg-blue-100 text-blue-600 px-1 rounded font-pixel">
                                                            API
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-gray-400">
                                                    Posted:{" "}
                                                    {formatPostDate(
                                                        recipe.created_at
                                                    )}
                                                </p>
                                            </div>

                                            {/* LIKE & ACTION BUTTONS */}
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
                                                        15
                                                    </span>
                                                </button>

                                                {recipe.source === "api" ? (
                                                    <Link
                                                        href={route(
                                                            "recipes.store"
                                                        )}
                                                        method="post"
                                                        data={{
                                                            api_id: recipe.api_id,
                                                            title: recipe.title,
                                                            image: recipe.image,
                                                        }}
                                                        className="bg-green-500 text-white font-pixel text-[8px] px-3 py-1 border-2 border-green-700 hover:bg-green-600 transition-colors"
                                                    >
                                                        💾 SAVE
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        href={route(
                                                            "recipes.show",
                                                            recipe.id
                                                        )}
                                                        className="bg-magical-pink text-white font-pixel text-[8px] px-3 py-1 border-2 border-magical-dark hover:bg-magical-dark transition-colors"
                                                    >
                                                        VIEW
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-4 text-center py-20">
                                        <p className="font-pixel text-xl text-gray-500 mb-4">
                                            {searchQuery
                                                ? `No recipes found for "${searchQuery}"`
                                                : "The Loot Chest is Empty!"}
                                        </p>
                                        {auth?.user && !searchQuery && (
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
                    </div>
                </main>
            </div>
        </>
    );
}
