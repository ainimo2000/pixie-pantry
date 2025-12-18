// FILE: resources/js/Pages/Welcome.jsx
// COMPLETE REDESIGN - Fixed all spacing, animations, and sections

import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PixelNavbar from "@/Components/PixelNavbar";
import FoodShowcase from "@/Components/FoodShowcase";

export default function Welcome({ auth, recipes }) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Head title="Welcome to Pixie's Pantry" />

            <div className="min-h-screen bg-magical-bg overflow-x-hidden">
                {/* SHRINKING NAVBAR */}
                <motion.div
                    animate={{
                        paddingTop: scrollY > 100 ? "0.5rem" : "0.75rem",
                        paddingBottom: scrollY > 100 ? "0.5rem" : "0.75rem",
                    }}
                    className="sticky top-0 z-50"
                >
                    <PixelNavbar />
                </motion.div>

                <main>
                    {/* HERO - Different Background */}
                    <section
                        className="relative py-20"
                        style={{
                            background:
                                "linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #DDA0DD 100%)",
                        }}
                    >
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <div className="bg-yellow-300 border-2 border-magical-dark inline-block px-4 py-1 mb-6">
                                        <span className="font-pixel text-[10px] text-magical-dark">
                                            🎮 COOKING ENGINE v1.0
                                        </span>
                                    </div>

                                    <h1 className="font-pixel text-6xl md:text-8xl text-magical-dark leading-tight mb-6">
                                        TASTE
                                        <br />
                                        THE
                                        <br />
                                        <span className="text-white drop-shadow-lg">
                                            PIXELS
                                        </span>
                                    </h1>

                                    <p className="text-lg text-magical-dark mb-8 bg-white/70 p-4 border-l-4 border-magical-dark">
                                        Welcome to the ultimate RPG cookbook.
                                    </p>

                                    {auth?.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="inline-block bg-magical-dark text-white font-pixel text-sm px-8 py-4 border-2 border-white shadow-lg hover:bg-white hover:text-magical-dark transition-all"
                                        >
                                            ➤ GO TO MY KITCHEN
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route("register")}
                                            className="inline-block bg-magical-dark text-white font-pixel text-sm px-8 py-4 border-2 border-white shadow-lg hover:bg-white hover:text-magical-dark transition-all"
                                        >
                                            ➤ JOIN THE GUILD
                                        </Link>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <div className="bg-white border-4 border-magical-dark p-8 shadow-2xl">
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                        >
                                            <div className="text-8xl text-center">
                                                🧑‍🍳
                                            </div>
                                        </motion.div>
                                        <div className="bg-magical-pink border-2 border-magical-dark p-4 text-center mt-4">
                                            <button className="font-pixel text-white text-xs">
                                                CLICK ME!
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* LEGENDARY RECIPES */}
                    <section className="py-16 bg-magical-bg">
                        <FoodShowcase />
                    </section>

                    {/* FRESH DROPS - Auto-scrolling */}
                    <section className="py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="bg-white border-4 border-magical-border shadow-pixel p-6 mb-8">
                                <h2 className="font-pixel text-3xl text-magical-dark mb-2">
                                    🔥 FRESH DROPS
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Today's featured recipes
                                </p>
                            </div>

                            <div className="relative overflow-hidden">
                                <motion.div
                                    className="flex gap-6"
                                    animate={{ x: [0, -1600] }}
                                    transition={{
                                        duration: 30,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    {[...recipes, ...recipes].map(
                                        (recipe, index) => (
                                            <div
                                                key={`${recipe.idMeal}-${index}`}
                                                className="flex-shrink-0 w-72 bg-white border-4 border-magical-border p-4"
                                            >
                                                <img
                                                    src={recipe.strMealThumb}
                                                    alt={recipe.strMeal}
                                                    className="w-full h-48 object-cover border-2 border-magical-pink mb-4"
                                                />
                                                <h3 className="font-pixel text-sm mb-4">
                                                    {recipe.strMeal}
                                                </h3>
                                                {auth?.user ? (
                                                    <Link
                                                        href={route(
                                                            "recipes.store"
                                                        )}
                                                        method="post"
                                                        data={{
                                                            title: recipe.strMeal,
                                                            image: recipe.strMealThumb,
                                                            api_id: recipe.idMeal,
                                                        }}
                                                        className="block w-full bg-magical-pink text-white font-pixel text-[8px] px-4 py-2 text-center"
                                                    >
                                                        💾 SAVE
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        href={route("login")}
                                                        className="block w-full bg-gray-400 text-white font-pixel text-[8px] px-4 py-2 text-center"
                                                    >
                                                        🔒 LOGIN
                                                    </Link>
                                                )}
                                            </div>
                                        )
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* CTA BEFORE FOOTER */}
                    <section className="py-20 bg-magical-pink text-center">
                        <h2 className="font-pixel text-4xl text-white mb-6">
                            READY TO START YOUR ADVENTURE?
                        </h2>
                        <p className="text-white mb-8">
                            Join thousands of culinary adventurers!
                        </p>
                        {!auth?.user && (
                            <Link
                                href={route("register")}
                                className="inline-block bg-white text-magical-pink font-pixel px-12 py-4 border-4 border-magical-dark"
                            >
                                ⭐ JOIN THE GUILD
                            </Link>
                        )}
                    </section>

                    {/* FOOTER */}
                    <footer className="bg-magical-dark text-white py-8 text-center">
                        <p className="font-pixel text-[10px]">
                            🧁 PIXIE'S PANTRY © 2025
                        </p>
                    </footer>
                </main>
            </div>
        </>
    );
}
