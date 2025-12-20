import { Head, Link } from "@inertiajs/react";
import PixelNavbar from "@/Components/PixelNavbar";
import SearchBar from "@/Components/SearchBar";

export default function SearchResults({
    auth,
    myRecipes,
    communityRecipes,
    searchQuery,
}) {
    // Helper function to get the correct route for a recipe
    const getRecipeRoute = (recipe) => {
        if (
            recipe.source === "api" ||
            recipe.id.toString().startsWith("api_")
        ) {
            // For API recipes, use the api_id or extract from id
            const apiId =
                recipe.api_id || recipe.id.toString().replace("api_", "");
            return route("recipes.showApi", apiId);
        }
        // For user recipes, use normal route
        return route("recipes.show", recipe.id);
    };

    return (
        <>
            <Head title={`Search: ${searchQuery}`} />

            <div className="min-h-screen bg-magical-bg">
                <PixelNavbar />

                <main className="max-w-6xl mx-auto px-6 py-10">
                    <h1 className="font-pixel text-4xl text-magical-dark mb-4">
                        🔍 SEARCH RESULTS
                    </h1>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <SearchBar
                            placeholder="Search recipes"
                            route={route("search")}
                            initialQuery={searchQuery}
                        />
                    </div>

                    {/* My Recipes Section */}
                    {myRecipes.length > 0 && (
                        <section className="mb-12">
                            <h2 className="font-pixel text-2xl text-magical-pink mb-4">
                                📚 MY RECIPES ({myRecipes.length})
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {myRecipes.map((recipe) => (
                                    <Link
                                        key={recipe.id}
                                        href={getRecipeRoute(recipe)}
                                        className="bg-white border-4 border-magical-border shadow-pixel p-4 hover:shadow-xl transition-shadow"
                                    >
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-full h-48 object-cover border-2 border-magical-pink mb-4"
                                        />
                                        <h3 className="font-pixel text-sm text-magical-dark mb-2">
                                            {recipe.title}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Community Recipes Section */}
                    {communityRecipes.length > 0 && (
                        <section>
                            <h2 className="font-pixel text-2xl text-magical-pink mb-4">
                                🌍 COMMUNITY RECIPES ({communityRecipes.length})
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {communityRecipes.map((recipe) => (
                                    <Link
                                        key={recipe.id}
                                        href={getRecipeRoute(recipe)}
                                        className="bg-white border-4 border-magical-border shadow-pixel p-4 hover:shadow-xl transition-shadow"
                                    >
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-full h-48 object-cover border-2 border-magical-pink mb-4"
                                        />
                                        <h3 className="font-pixel text-sm text-magical-dark mb-2">
                                            {recipe.title}
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            by {recipe.user?.name || "Unknown"}
                                        </p>
                                        {recipe.source === "api" && (
                                            <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 border border-purple-300 font-pixel">
                                                API RECIPE
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* No Results */}
                    {myRecipes.length === 0 &&
                        communityRecipes.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-2xl mb-4">😢</p>
                                <p className="text-gray-600 mb-2">
                                    No recipes found for "{searchQuery}"
                                </p>
                                <p className="text-sm text-gray-500">
                                    Try searching for something else!
                                </p>
                            </div>
                        )}
                </main>
            </div>
        </>
    );
}
