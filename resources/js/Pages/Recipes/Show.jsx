import { Head, Link } from "@inertiajs/react";
import PixelNavbar from "@/Components/PixelNavbar";

export default function Show({ auth, recipe }) {
    return (
        <>
            <Head title={recipe.title} />

            <div className="min-h-screen bg-magical-bg">
                <PixelNavbar />

                {/* Decorative background */}
                <div
                    className="fixed inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(#8B008B 2px, transparent 2px)",
                        backgroundSize: "20px 20px",
                    }}
                />

                <div className="max-w-4xl mx-auto px-6 py-10 relative z-10">
                    {/* Back button */}
                    <Link
                        href={route("dashboard")}
                        className="inline-flex items-center gap-2 bg-magical-dark text-white font-pixel text-xs px-4 py-2 border-2 border-magical-dark hover:bg-magical-pink transition-colors mb-6"
                    >
                        ← BACK TO QUEST LOG
                    </Link>

                    {/* Recipe Card */}
                    <div className="bg-white border-4 border-magical-border shadow-pixel p-8">
                        {/* Recipe Title */}
                        <h1 className="font-pixel text-4xl text-magical-pink mb-2 text-center border-b-4 border-magical-pink pb-4">
                            {recipe.title}
                        </h1>

                        <hr className="my-6 border-2 border-magical-border" />

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* LEFT: Image & Meta */}
                            <div>
                                {/* Recipe Image */}
                                <div className="w-full aspect-square bg-gray-200 border-4 border-magical-border mb-4 overflow-hidden">
                                    {recipe.image ? (
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-full h-full object-cover"
                                            style={{
                                                imageRendering: "pixelated",
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "https://via.placeholder.com/400x400?text=No+Image";
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-pixel text-sm">
                                            NO IMAGE
                                        </div>
                                    )}
                                </div>

                                {/* Created Date */}
                                <p className="text-xs text-gray-500">
                                    Created:{" "}
                                    {new Date(
                                        recipe.created_at
                                    ).toLocaleDateString()}
                                </p>

                                {/* Personal Note */}
                                <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-400">
                                    <h3 className="font-pixel text-sm text-magical-dark mb-2">
                                        PERSONAL NOTE
                                    </h3>
                                    <p className="text-xs text-gray-700">
                                        {recipe.notes ||
                                            "No notes for this entry."}
                                    </p>
                                </div>

                                {/* Edit Button */}
                                {auth.user.id === recipe.user_id && (
                                    <Link
                                        href={route("recipes.edit", recipe.id)}
                                        className="block w-full mt-4 bg-magical-pink text-white font-pixel text-sm px-6 py-3 border-2 border-magical-dark text-center hover:bg-magical-dark transition-colors"
                                    >
                                        ✏️ EDIT ENTRY
                                    </Link>
                                )}
                            </div>

                            {/* RIGHT: Ingredients & Instructions */}
                            <div>
                                {/* Ingredients */}
                                <div className="mb-8">
                                    <h2 className="font-pixel text-xl text-magical-dark mb-4 border-b-2 border-magical-pink pb-2">
                                        INGREDIENTS
                                    </h2>
                                    <div className="bg-purple-50 border-2 border-purple-300 p-4">
                                        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">
                                            {recipe.ingredients ||
                                                "No ingredients listed."}
                                        </pre>
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div>
                                    <h2 className="font-pixel text-xl text-magical-dark mb-4 border-b-2 border-magical-pink pb-2">
                                        INSTRUCTIONS / PROCEDURE
                                    </h2>
                                    <div className="bg-pink-50 border-2 border-pink-300 p-4">
                                        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                                            {recipe.instructions ||
                                                "No instructions provided."}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
