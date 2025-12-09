import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function ShowRecipe({ recipe }) {
    return (
        <>
            <Head title={recipe.title} />
            <div className="min-h-screen bg-magical-bg font-sans text-magical-dark relative p-6">
                <Link
                    href={window.route("dashboard")}
                    className="absolute top-6 left-6 bg-magical-dark text-white font-pixel text-[8px] px-3 py-2 border-2 border-magical-pink shadow-pixel-sm hover:bg-magical-pink hover:text-white transition-colors"
                >
                    &lt; BACK TO QUEST LOG
                </Link>

                <div className="max-w-3xl mx-auto bg-white border-4 border-magical-border shadow-pixel p-8 mt-16">
                    <h1 className="font-pixel text-2xl text-center text-magical-pink mb-6 border-b-2 border-magical-border pb-2">
                        {recipe.title}
                    </h1>

                    {/* IMAGE AND DETAILS GRID */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <img
                                src={recipe.image_url}
                                alt={recipe.title}
                                className="w-full border-4 border-magical-border p-1 bg-white"
                                style={{ imageRendering: "pixelated" }}
                            />
                            <p className="text-[10px] text-gray-500 mt-2">
                                Created:{" "}
                                {new Date(
                                    recipe.created_at
                                ).toLocaleDateString()}
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
                        </div>

                        {/* INGREDIENTS */}
                        <div>
                            <h2 className="font-pixel text-lg text-magical-dark mb-2">
                                INGREDIENTS
                            </h2>
                            <pre className="whitespace-pre-wrap text-sm border-2 border-magical-dark p-3 bg-gray-100">
                                {recipe.ingredients}
                            </pre>
                        </div>
                    </div>

                    {/* INSTRUCTIONS */}
                    <div className="mt-6">
                        <h2 className="font-pixel text-lg text-magical-dark mb-2">
                            INSTRUCTIONS
                        </h2>
                        <pre className="whitespace-pre-wrap text-sm border-2 border-magical-dark p-3 bg-gray-100">
                            {recipe.instructions}
                        </pre>
                    </div>

                    {/* EDIT BUTTON */}
                    <div className="mt-8 text-center">
                        <Link
                            href={window.route("recipes.edit", recipe.id)}
                            className="bg-magical-pink text-white font-pixel text-[10px] px-6 py-3 border-2 border-magical-dark shadow-pixel-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all inline-block"
                        >
                            ⚔️ EDIT ENTRY
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
