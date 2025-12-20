import { Head, Link, useForm } from "@inertiajs/react";
import PixelNavbar from "@/Components/PixelNavbar";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        image: null,
        ingredients: "",
        instructions: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("recipes.store_custom"), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Create New Recipe" />
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

                <div className="max-w-2xl mx-auto py-10 px-6 relative z-10">
                    <div className="bg-white border-4 border-magical-border shadow-pixel p-8">
                        <h2 className="font-pixel text-2xl text-magical-pink mb-4 text-center border-b-4 border-magical-pink pb-2">
                            ✨ CRAFT NEW RECIPE
                        </h2>

                        <form onSubmit={submit} className="space-y-6">
                            {/* RECIPE TITLE */}
                            <div>
                                <label className="font-pixel text-xs text-magical-dark mb-1 block">
                                    RECIPE TITLE *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
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

                            {/* IMAGE UPLOAD */}
                            <div>
                                <label className="font-pixel text-xs text-magical-dark mb-1 block">
                                    📸 RECIPE IMAGE *
                                </label>

                                {/* File input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                    required
                                    className="w-full text-sm p-3 border-2 border-magical-dark focus:border-magical-pink focus:ring-0 font-sans file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-pixel file:bg-magical-pink file:text-white hover:file:bg-magical-dark file:cursor-pointer"
                                />

                                {/* Image preview */}
                                {data.image && (
                                    <div className="mt-3">
                                        <p className="text-xs font-pixel text-magical-dark mb-2">
                                            PREVIEW:
                                        </p>
                                        <img
                                            src={URL.createObjectURL(
                                                data.image
                                            )}
                                            alt="Preview"
                                            className="w-40 h-40 object-cover border-4 border-magical-pink shadow-pixel"
                                            style={{
                                                imageRendering: "pixelated",
                                            }}
                                        />
                                    </div>
                                )}

                                {errors.image && (
                                    <div className="text-red-600 text-xs mt-1 font-sans">
                                        {errors.image}
                                    </div>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Accepted: JPG, PNG, GIF, WEBP (Max 2MB)
                                </p>
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
                                    placeholder="Example:&#10;- 2 cups flour&#10;- 1 cup sugar&#10;- 3 eggs&#10;- 1 tsp vanilla"
                                    rows="6"
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
                                    placeholder="Step-by-step cooking instructions..."
                                    rows="8"
                                    className="w-full text-sm p-3 border-2 border-magical-dark focus:border-magical-pink focus:ring-0 font-sans resize-none"
                                />
                                {errors.instructions && (
                                    <div className="text-red-600 text-xs mt-1 font-sans">
                                        {errors.instructions}
                                    </div>
                                )}
                            </div>

                            {/* BUTTONS */}
                            <div className="flex gap-4 pt-4">
                                <Link
                                    href={route("dashboard")}
                                    className="flex-1 bg-gray-400 text-white font-pixel text-sm px-8 py-4 border-2 border-gray-600 text-center hover:bg-gray-500 transition-colors"
                                >
                                    CANCEL
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-magical-pink text-white font-pixel text-sm px-8 py-4 border-2 border-magical-dark shadow-pixel-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing
                                        ? "CRAFTING..."
                                        : "💾 SAVE RECIPE"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
