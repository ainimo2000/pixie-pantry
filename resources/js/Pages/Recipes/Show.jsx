import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function ShowRecipe({ recipe }) {
    // Helper function for date formatting
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <>
            <Head title={recipe.title} />
            <div className="min-h-screen bg-magical-bg font-sans text-magical-dark relative p-6">
                {/* Back Button */}
                <Link
                    href={window.route("dashboard")}
                    className="absolute top-6 left-6 bg-magical-dark text-white font-pixel text-[8px] px-3 py-2 border-2 border-magical-pink shadow-pixel-sm hover:bg-magical-pink hover:text-white transition-colors"
                >
                    &lt; BACK TO QUEST LOG
                </Link>

                {/* Main Recipe Container */}
                <div className="max-w-4xl mx-auto bg-white border-4 border-magical-border shadow-pixel p-8 mt-16">
                    {/* Title */}
                    <h1 className="font-pixel text-3xl text-center text-magical-pink mb-8 border-b-2 border-magical-border pb-4">
                        {recipe.title}
                    </h1>

                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {/* Column 1: Image and Metadata */}
                        <div className="md:col-span-1">
                            {/* Image */}
                            <div className="w-full border-4 border-magical-border p-1 bg-white mb-4">
                                <img
                                    // CRITICAL CHECK: Using the verified 'image_url' property
                                    src={recipe.image_url}
                                    alt={recipe.title}
                                    className="w-full h-auto object-cover"
                                    style={{ imageRendering: "pixelated" }}
                                />
                            </div>

                            <p className="text-[10px] text-gray-500 mt-2">
                                Created: {formatDate(recipe.created_at)}
                            </p>

                            {/* Personal Note Display */}
                            <div className="mt-4 pt-2 border-t border-gray-200">
                                <h3 className="font-pixel text-[10px] text-magical-dark mb-1">
                                    PERSONAL NOTE
                                </h3>
                                <p className="text-sm whitespace-pre-wrap">
                                    {recipe.notes || "No notes for this entry."}
                                </p>
                            </div>

                            {/* Edit Button */}
                            <div className="mt-8">
                                <Link
                                    href={window.route(
                                        "recipes.edit",
                                        recipe.id
                                    )}
                                    className="bg-magical-pink text-white font-pixel text-[10px] px-4 py-2 border-2 border-magical-dark shadow-pixel-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all inline-block text-center"
                                >
                                    ⚔️ EDIT ENTRY
                                </Link>
                            </div>
                        </div>

                        {/* Column 2: Ingredients */}
                        <div className="md:col-span-2">
                            <h2 className="font-pixel text-xl text-magical-dark mb-3">
                                INGREDIENTS
                            </h2>
                            <pre className="whitespace-pre-wrap text-sm border-2 border-magical-dark p-4 bg-gray-100 h-64 overflow-y-auto">
                                {recipe.ingredients}
                            </pre>
                        </div>
                    </div>

                    {/* Instructions (Full Width) */}
                    <div className="mt-6">
                        <h2 className="font-pixel text-xl text-magical-dark mb-3">
                            INSTRUCTIONS / PROCEDURE
                        </h2>
                        <pre className="whitespace-pre-wrap text-sm border-2 border-magical-dark p-4 bg-gray-100 min-h-32">
                            {recipe.instructions}
                        </pre>
                    </div>
                </div>
            </div>
        </>
    );
}
