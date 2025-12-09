import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function EditRecipe({ recipe }) {
    // 1. Initialize the form with the existing recipe data
    const { data, setData, put, processing, errors } = useForm({
        title: recipe.title || "",
        image_url: recipe.image_url || "",
        ingredients: recipe.ingredients || "",
        instructions: recipe.instructions || "",
    });

    const submit = (e) => {
        e.preventDefault();

        // 2. Use the PUT method to update the existing resource
        // Submits the form data to your backend update route
        put(window.route("recipes.update", recipe.id), {
            preserveScroll: true,
            onSuccess: () =>
                alert(`Recipe "${data.title}" successfully updated!`),
        });
    };

    return (
        <>
            <Head title={`Edit ${recipe.title}`} />
            <div className="min-h-screen bg-magical-bg font-sans text-magical-dark relative p-6">
                <Link
                    href={window.route("dashboard")}
                    className="absolute top-6 left-6 bg-magical-dark text-white font-pixel text-[8px] px-3 py-2 border-2 border-magical-pink shadow-pixel-sm hover:bg-magical-pink hover:text-white transition-colors"
                >
                    &lt; BACK TO QUEST LOG
                </Link>

                <div className="max-w-xl mx-auto bg-white border-4 border-magical-border shadow-pixel p-8 mt-16">
                    <h2 className="font-pixel text-xl text-center text-magical-pink mb-6">
                        MODIFY QUEST ENTRY
                    </h2>

                    <form onSubmit={submit} className="flex flex-col gap-4">
                        {/* RECIPE TITLE */}
                        <div>
                            <label className="block font-pixel text-[10px] mb-1">
                                RECIPE TITLE
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full p-2 border-2 border-magical-dark focus:border-magical-pink focus:ring-magical-pink text-[12px]"
                                required
                            />
                            {errors.title && (
                                <div className="text-red-500 text-[10px] font-pixel mt-1">
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        {/* IMAGE URL */}
                        <div>
                            <label className="block font-pixel text-[10px] mb-1">
                                IMAGE URL
                            </label>
                            <input
                                type="url"
                                value={data.image_url}
                                onChange={(e) =>
                                    setData("image_url", e.target.value)
                                }
                                className="w-full p-2 border-2 border-magical-dark focus:border-magical-pink focus:ring-magical-pink text-[12px]"
                                placeholder="https://..."
                                required
                            />
                            {errors.image_url && (
                                <div className="text-red-500 text-[10px] font-pixel mt-1">
                                    {errors.image_url}
                                </div>
                            )}
                        </div>

                        {/* INGREDIENTS */}
                        <div>
                            <label className="block font-pixel text-[10px] mb-1">
                                INGREDIENTS
                            </label>
                            <textarea
                                value={data.ingredients}
                                onChange={(e) =>
                                    setData("ingredients", e.target.value)
                                }
                                className="w-full p-2 border-2 border-magical-dark focus:border-magical-pink focus:ring-magical-pink text-[12px]"
                                rows="6"
                                placeholder="List your items here, one per line..."
                                required
                            />
                            {errors.ingredients && (
                                <div className="text-red-500 text-[10px] font-pixel mt-1">
                                    {errors.ingredients}
                                </div>
                            )}
                        </div>

                        {/* INSTRUCTIONS */}
                        <div>
                            <label className="block font-pixel text-[10px] mb-1">
                                INSTRUCTIONS
                            </label>
                            <textarea
                                value={data.instructions}
                                onChange={(e) =>
                                    setData("instructions", e.target.value)
                                }
                                className="w-full p-2 border-2 border-magical-dark focus:border-magical-pink focus:ring-magical-pink text-[12px]"
                                rows="6"
                                placeholder="How do you craft this?"
                                required
                            />
                            {errors.instructions && (
                                <div className="text-red-500 text-[10px] font-pixel mt-1">
                                    {errors.instructions}
                                </div>
                            )}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-magical-pink text-white font-pixel text-[12px] px-6 py-3 border-2 border-magical-dark shadow-pixel-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all mt-4 disabled:opacity-50"
                        >
                            {processing
                                ? "UPDATING..."
                                : "SAVE CHANGES TO ENTRY"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
