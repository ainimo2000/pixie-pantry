import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "", // Corresponds to recipe title
        image: "", // Corresponds to image URL
        ingredients: "",
        instructions: "",
    });

    const submit = (e) => {
        e.preventDefault();
        // This POST request sends the data to the Laravel 'store' method
        post(route("recipes.store")); // Make sure this matches your route name
    };

    return (
        <>
            <Head title="Craft New Recipe" />
            <div className="min-h-screen bg-magical-bg font-sans text-magical-dark relative p-6">
                {/* Back to Quest Log Link */}
                <Link
                    href={route("dashboard")}
                    className="absolute top-4 left-4 bg-magical-dark text-white font-pixel text-[8px] px-3 py-2 border-2 border-white hover:bg-white hover:text-magical-dark transition-colors shadow-sm"
                >
                    ⮜ BACK TO QUEST LOG
                </Link>

                <div className="max-w-2xl mx-auto py-10">
                    <div className="bg-white border-4 border-magical-border shadow-pixel p-8">
                        <h2 className="font-pixel text-2xl text-magical-pink mb-4 text-center border-b-4 border-magical-pink pb-2">
                            CRAFT NEW RECIPE
                        </h2>

                        <form onSubmit={submit} className="space-y-6">
                            {/* RECIPE TITLE */}
                            <div>
                                <label className="font-pixel text-xs text-magical-dark mb-1 block">
                                    RECIPE TITLE
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    // 🎯 FIX: Placeholder text without quotes
                                    placeholder="e.g. Legendary Strawberry Cake"
                                    required
                                    className="w-full text-sm p-3 border-2 border-magical-dark focus:border-magical-pink focus:ring-0 font-sans"
                                />
                                {errors.title && (
                                    <div className="text-red-600 text-xs mt-1 font-sans">
                                        {errors.title}
                                    </div>
                                )}
                            </div>

                            {/* IMAGE URL */}
                            <div>
                                <label className="font-pixel text-xs text-magical-dark mb-1 block">
                                    IMAGE URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={data.image}
                                    onChange={(e) =>
                                        setData("image", e.target.value)
                                    }
                                    placeholder="https://..."
                                    required
                                    className="w-full text-sm p-3 border-2 border-magical-dark focus:border-magical-pink focus:ring-0 font-sans"
                                />
                                {errors.image && (
                                    <div className="text-red-600 text-xs mt-1 font-sans">
                                        {errors.image}
                                    </div>
                                )}
                            </div>

                            {/* INGREDIENTS */}
                            <div>
                                <label className="font-pixel text-xs text-magical-dark mb-1 block">
                                    INGREDIENTS
                                </label>
                                <textarea
                                    name="ingredients"
                                    value={data.ingredients}
                                    onChange={(e) =>
                                        setData("ingredients", e.target.value)
                                    }
                                    placeholder="List your items here..."
                                    rows="4"
                                    className="w-full text-sm p-3 border-2 border-magical-dark focus:border-magical-pink focus:ring-0 font-sans resize-none"
                                />
                                {errors.ingredients && (
                                    <div className="text-red-600 text-xs mt-1 font-sans">
                                        {errors.ingredients}
                                    </div>
                                )}
                            </div>

                            {/* INSTRUCTIONS */}
                            <div>
                                <label className="font-pixel text-xs text-magical-dark mb-1 block">
                                    INSTRUCTIONS
                                </label>
                                <textarea
                                    name="instructions"
                                    value={data.instructions}
                                    onChange={(e) =>
                                        setData("instructions", e.target.value)
                                    }
                                    placeholder="How do you craft this?"
                                    rows="6"
                                    className="w-full text-sm p-3 border-2 border-magical-dark focus:border-magical-pink focus:ring-0 font-sans resize-none"
                                />
                                {errors.instructions && (
                                    <div className="text-red-600 text-xs mt-1 font-sans">
                                        {errors.instructions}
                                    </div>
                                )}
                            </div>

                            {/* SUBMIT BUTTON */}
                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-magical-pink text-white font-pixel text-sm px-8 py-4 border-2 border-magical-dark shadow-pixel-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                                >
                                    {processing
                                        ? "CRAFTING..."
                                        : "SAVE TO INVENTORY"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
