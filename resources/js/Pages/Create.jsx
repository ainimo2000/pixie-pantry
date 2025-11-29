import { Head, useForm } from "@inertiajs/react";
// No component imports here to fix
export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        image: "",
        ingredients: "",
        instructions: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("recipes.store_custom"));
    };

    return (
        <div className="min-h-screen bg-magical-bg font-sans text-magical-dark p-6">
            <Head title="Craft New Recipe" />

            <div className="max-w-2xl mx-auto bg-white border-4 border-magical-border shadow-pixel p-8">
                <h1 className="font-pixel text-2xl mb-6 text-center border-b-4 border-magical-pink pb-4">
                    CRAFT NEW RECIPE
                </h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="font-pixel text-xs block mb-2">
                            RECIPE TITLE
                        </label>
                        <input
                            type="text"
                            className="w-full border-2 border-magical-dark p-2 font-bold focus:ring-4 ring-magical-pink"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="e.g. Legendary Strawberry Cake"
                        />
                        {errors.title && (
                            <div className="text-red-500 text-xs mt-1 font-pixel">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="font-pixel text-xs block mb-2">
                            IMAGE URL
                        </label>
                        <input
                            type="text"
                            className="w-full border-2 border-magical-dark p-2 text-sm"
                            value={data.image}
                            onChange={(e) => setData("image", e.target.value)}
                            placeholder="https://..."
                        />
                    </div>

                    <div>
                        <label className="font-pixel text-xs block mb-2">
                            INGREDIENTS
                        </label>
                        <textarea
                            className="w-full border-2 border-magical-dark p-2 h-24"
                            value={data.ingredients}
                            onChange={(e) =>
                                setData("ingredients", e.target.value)
                            }
                            placeholder="List your items here..."
                        />
                    </div>

                    <div>
                        <label className="font-pixel text-xs block mb-2">
                            INSTRUCTIONS
                        </label>
                        <textarea
                            className="w-full border-2 border-magical-dark p-2 h-32"
                            value={data.instructions}
                            onChange={(e) =>
                                setData("instructions", e.target.value)
                            }
                            placeholder="How do you craft this?"
                        />
                    </div>

                    <button
                        disabled={processing}
                        className="w-full bg-magical-pink text-white font-pixel py-4 border-2 border-black shadow-pixel-sm hover:shadow-none hover:translate-y-1 transition-all"
                    >
                        {processing ? "CRAFTING..." : "SAVE TO INVENTORY"}
                    </button>
                </form>
            </div>
        </div>
    );
}
