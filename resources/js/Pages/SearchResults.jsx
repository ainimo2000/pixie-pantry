import { Head, Link } from "@inertiajs/react";
import PixelNavbar from "@/Components/PixelNavbar";
import SearchBar from "@/Components/SearchBar";
import { motion } from "framer-motion";

export default function SearchResults({
    auth,
    myRecipes,
    communityRecipes,
    searchQuery,
}) {
    // Helper function to get the correct route for a recipe
    const getRecipeRoute = (recipe) => {
        // Check if it's an API recipe
        if (
            recipe.source === "api" ||
            recipe.id.toString().startsWith("api_")
        ) {
            // For API recipes, extract the API ID
            const apiId =
                recipe.api_id || recipe.id.toString().replace("api_", "");
            return route("api.recipe.show", apiId);
        }
        // For user recipes, use normal show route
        return route("recipes.show", recipe.id);
    };

    return (
        <>
            <Head title={`Search: ${searchQuery}`} />

            <div className="min-h-screen bg-magical-bg">
                <PixelNavbar />

                <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 sm:mb-8"
                    >
                        <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-magical-dark mb-4">
                            🔍 SEARCH RESULTS
                        </h1>

                        {/* Search Bar */}
                        <SearchBar
                            placeholder="Search recipes..."
                            route={route("search")}
                            initialQuery={searchQuery}
                        />

                        {/* Results Count */}
                        <p className="text-xs sm:text-sm text-gray-600 mt-4">
                            Searching for:{" "}
                            <span className="font-bold">"{searchQuery}"</span>
                            {" • "}
                            Found {myRecipes.length +
                                communityRecipes.length}{" "}
                            results
                        </p>
                    </motion.div>

                    {/* My Recipes Section */}
                    {myRecipes.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-10 sm:mb-12"
                        >
                            <h2 className="font-pixel text-xl sm:text-2xl text-magical-pink mb-4 sm:mb-6 flex items-center gap-2">
                                <span>📚 MY RECIPES</span>
                                <span className="text-sm sm:text-base bg-magical-pink text-white px-2 py-1 rounded">
                                    {myRecipes.length}
                                </span>
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {myRecipes.map((recipe, index) => (
                                    <motion.div
                                        key={recipe.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={getRecipeRoute(recipe)}
                                            className="block bg-white border-4 border-magical-border shadow-pixel p-4 hover:shadow-xl hover:translate-y-[-4px] transition-all"
                                        >
                                            <img
                                                src={recipe.image}
                                                alt={recipe.title}
                                                className="w-full h-40 sm:h-48 object-cover border-2 border-magical-pink mb-3"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "https://via.placeholder.com/400x300?text=No+Image";
                                                }}
                                            />
                                            <h3 className="font-pixel text-xs sm:text-sm text-magical-dark mb-2 line-clamp-2">
                                                {recipe.title}
                                            </h3>
                                            <span className="inline-block text-[10px] bg-purple-100 text-purple-600 px-2 py-1 border border-purple-300 font-pixel">
                                                MY RECIPE
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* Community Recipes Section */}
                    {communityRecipes.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="font-pixel text-xl sm:text-2xl text-magical-pink mb-4 sm:mb-6 flex items-center gap-2">
                                <span>🌍 COMMUNITY</span>
                                <span className="text-sm sm:text-base bg-magical-pink text-white px-2 py-1 rounded">
                                    {communityRecipes.length}
                                </span>
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {communityRecipes.map((recipe, index) => (
                                    <motion.div
                                        key={recipe.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={getRecipeRoute(recipe)}
                                            className="block bg-white border-4 border-magical-border shadow-pixel p-4 hover:shadow-xl hover:translate-y-[-4px] transition-all"
                                        >
                                            <img
                                                src={recipe.image}
                                                alt={recipe.title}
                                                className="w-full h-40 sm:h-48 object-cover border-2 border-magical-pink mb-3"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "https://via.placeholder.com/400x300?text=No+Image";
                                                }}
                                            />
                                            <h3 className="font-pixel text-xs sm:text-sm text-magical-dark mb-2 line-clamp-2">
                                                {recipe.title}
                                            </h3>
                                            <p className="text-[10px] sm:text-xs text-gray-600 mb-2">
                                                by{" "}
                                                {recipe.user?.name || "Unknown"}
                                            </p>
                                            {recipe.source === "api" && (
                                                <span className="inline-block text-[10px] bg-green-100 text-green-600 px-2 py-1 border border-green-300 font-pixel">
                                                    🌐 THEMEALDB
                                                </span>
                                            )}
                                            {recipe.source === "user" && (
                                                <span className="inline-block text-[10px] bg-blue-100 text-blue-600 px-2 py-1 border border-blue-300 font-pixel">
                                                    👤 USER RECIPE
                                                </span>
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* No Results */}
                    {myRecipes.length === 0 &&
                        communityRecipes.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12 sm:py-20"
                            >
                                <div className="bg-white border-4 border-magical-border shadow-pixel p-8 sm:p-12 max-w-md mx-auto">
                                    <p className="text-4xl sm:text-5xl mb-4">
                                        😢
                                    </p>
                                    <h3 className="font-pixel text-lg sm:text-xl text-magical-dark mb-3">
                                        NO RECIPES FOUND
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 mb-2">
                                        No recipes found for "
                                        <span className="font-bold">
                                            {searchQuery}
                                        </span>
                                        "
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500 mb-6">
                                        Try searching for something else!
                                    </p>

                                    <div className="space-y-3">
                                        <Link
                                            href={route("community.feed")}
                                            className="block bg-magical-pink text-white font-pixel text-xs sm:text-sm px-6 py-3 border-2 border-magical-dark hover:bg-magical-dark transition-colors"
                                        >
                                            🌍 BROWSE COMMUNITY
                                        </Link>
                                        <Link
                                            href={route("dashboard")}
                                            className="block bg-white text-magical-pink font-pixel text-xs sm:text-sm px-6 py-3 border-2 border-magical-pink hover:bg-magical-pink hover:text-white transition-colors"
                                        >
                                            📚 MY KITCHEN
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                </main>
            </div>
        </>
    );
}
