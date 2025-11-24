import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import PixelCard from "@/Components/PixelCard";
import RecipeModal from "@/Components/RecipeModal"; // Import the new modal

export default function Welcome({ auth, recipes }) {
    // State to track which recipe is currently open
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    return (
        <>
            <Head title="Pixie's Pantry" />

            <div className="min-h-screen bg-magical-bg font-sans text-magical-dark relative selection:bg-magical-pink selection:text-white">
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(#8B008B 2px, transparent 2px)",
                        backgroundSize: "20px 20px",
                    }}
                ></div>

                {/* --- NAVIGATION --- */}
                <nav className="bg-magical-pink border-b-4 border-magical-border p-4 sticky top-0 z-50 shadow-lg">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white border-2 border-magical-dark flex items-center justify-center text-xl shadow-sm rounded-sm">
                                🧁
                            </div>
                            <h1 className="font-pixel text-white text-xs md:text-sm drop-shadow-md tracking-wider">
                                PIXIE'S PANTRY
                            </h1>
                        </div>

                        <div className="flex gap-4 font-pixel text-[8px] md:text-[10px] text-white">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="bg-magical-dark px-3 py-2 border-2 border-white hover:bg-white hover:text-magical-dark transition-colors"
                                >
                                    MY QUESTS
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="hover:underline decoration-wavy underline-offset-4"
                                    >
                                        LOGIN
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="hover:underline decoration-wavy underline-offset-4"
                                    >
                                        JOIN
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* --- MAIN CONTENT --- */}
                <main className="max-w-6xl mx-auto px-6 py-10 relative z-10">
                    <div className="bg-white border-4 border-magical-border shadow-pixel p-8 text-center mb-12 rounded-lg relative overflow-hidden">
                        <div className="absolute top-2 left-2 text-2xl animate-pulse">
                            ✨
                        </div>
                        <div className="absolute bottom-2 right-2 text-2xl animate-pulse">
                            ✨
                        </div>
                        <h2 className="font-pixel text-xl md:text-3xl mb-4 text-magical-dark">
                            <span className="text-magical-pink">SWEET</span>{" "}
                            RECIPE COLLECTION
                        </h2>
                        <p className="font-bold text-xs bg-magical-bg inline-block px-4 py-2 rounded-full border border-magical-border text-magical-border">
                            Current Realm: Desserts
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {recipes && recipes.length > 0 ? (
                            recipes.map((recipe) => (
                                <PixelCard
                                    key={recipe.idMeal}
                                    recipe={recipe}
                                    auth={auth || {}}
                                    // Pass the open function
                                    onOpen={setSelectedRecipe}
                                />
                            ))
                        ) : (
                            <div className="col-span-4 bg-white/80 p-12 text-center border-4 border-dotted border-magical-border">
                                <p className="font-pixel text-xs text-magical-border animate-bounce">
                                    LOADING YUMMY DATA...
                                </p>
                            </div>
                        )}
                    </div>
                </main>

                <footer className="bg-magical-dark text-white p-6 text-center border-t-4 border-magical-pink mt-12 relative z-10">
                    <p className="font-pixel text-[8px] opacity-80">
                        MADE WITH ♥ BY GROUP 1 • 2025
                    </p>
                </footer>

                {/* --- THE MAGICAL MODAL --- */}
                {/* Only show if a recipe is selected */}
                {selectedRecipe && (
                    <RecipeModal
                        recipe={selectedRecipe}
                        onClose={() => setSelectedRecipe(null)}
                    />
                )}
            </div>
        </>
    );
}
