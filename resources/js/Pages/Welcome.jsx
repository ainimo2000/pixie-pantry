import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PixieChef from "@/Components/PixieChef";

export default function Welcome({ auth, recipes }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-white">
                {/* NAVBAR - NO MARGIN, TIGHT */}
                <motion.nav
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                        scrolled
                            ? "bg-white shadow-lg py-2"
                            : "bg-magical-pink py-3"
                    }`}
                >
                    <div className="px-4 flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xl ${
                                    scrolled
                                        ? "border-magical-dark bg-magical-pink"
                                        : "border-white bg-white"
                                }`}
                            >
                                🧁
                            </div>
                            <span
                                className={`font-pixel text-sm ${
                                    scrolled
                                        ? "text-magical-dark"
                                        : "text-white"
                                }`}
                            >
                                {scrolled ? "PIXIE'S PANTRY" : "PIXIE'S PANTRY"}
                            </span>
                        </Link>

                        <div className="flex items-center gap-1 font-pixel text-[9px]">
                            <Link
                                href={route("community.feed")}
                                className={`px-3 py-1.5 rounded ${
                                    scrolled
                                        ? "text-magical-dark hover:bg-gray-100"
                                        : "text-white hover:bg-white/20"
                                }`}
                            >
                                COMMUNITY
                            </Link>
                            {auth?.user ? (
                                <>
                                    <Link
                                        href={route("dashboard")}
                                        className={`px-3 py-1.5 rounded ${
                                            scrolled
                                                ? "text-magical-dark hover:bg-gray-100"
                                                : "text-white hover:bg-white/20"
                                        }`}
                                    >
                                        MY KITCHEN
                                    </Link>
                                    <Link
                                        href={route("recipes.create")}
                                        className={`px-3 py-1.5 border rounded ${
                                            scrolled
                                                ? "bg-magical-pink text-white border-magical-dark hover:bg-magical-dark"
                                                : "bg-white text-magical-pink border-white hover:bg-magical-dark hover:text-white"
                                        }`}
                                    >
                                        + CREATE
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className={`px-3 py-1.5 rounded ${
                                            scrolled
                                                ? "text-magical-dark"
                                                : "text-white"
                                        }`}
                                    >
                                        LOGIN
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className={`px-3 py-1.5 border rounded ${
                                            scrolled
                                                ? "bg-magical-pink text-white border-magical-dark"
                                                : "bg-white text-magical-pink border-white"
                                        }`}
                                    >
                                        SIGN UP
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </motion.nav>

                <main className="pt-12">
                    {/* SECTION 1: HERO - Twinkling Stars */}
                    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-magical-pink to-pink-500 flex items-center overflow-hidden">
                        {[...Array(40)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                }}
                                transition={{
                                    duration: Math.random() * 3 + 1,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}

                        <div className="w-full px-6 py-16 relative z-10">
                            <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <div className="bg-yellow-300 border-2 border-white inline-block px-3 py-1 mb-4">
                                        <span className="font-pixel text-[8px] text-magical-dark">
                                            🎮 COOKING ENGINE v1.0
                                        </span>
                                    </div>
                                    <h1 className="font-pixel text-6xl md:text-8xl text-white leading-none mb-4">
                                        TASTE
                                        <br />
                                        THE
                                        <br />
                                        <span className="text-yellow-300">
                                            PIXELS
                                        </span>
                                    </h1>
                                    <p className="text-lg text-white/90 mb-6">
                                        Welcome to the ultimate RPG cookbook.
                                    </p>
                                    <Link
                                        href={
                                            auth?.user
                                                ? route("dashboard")
                                                : route("register")
                                        }
                                        className="inline-block bg-white text-magical-pink font-pixel text-xs px-6 py-3 border-2 border-white hover:bg-magical-pink hover:text-white"
                                    >
                                        {auth?.user
                                            ? "➤ MY KITCHEN"
                                            : "➤ JOIN THE GUILD"}
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex justify-center items-center"
                                >
                                    <PixieChef />
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: LEGENDARY RECIPES - Spinning Food */}
                    <section className="relative py-16 bg-gradient-to-b from-pink-100 to-purple-100 overflow-hidden">
                        {["🍰", "🍪", "🧁", "🍩", "🎂"].map((emoji, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-5xl opacity-5"
                                style={{
                                    left: `${(i * 20) % 100}%`,
                                    top: `${(i * 25) % 100}%`,
                                }}
                                animate={{ rotate: 360, y: [0, -20, 0] }}
                                transition={{
                                    rotate: { duration: 10, repeat: Infinity },
                                    y: { duration: 3, repeat: Infinity },
                                }}
                            >
                                {emoji}
                            </motion.div>
                        ))}

                        <div className="max-w-5xl mx-auto px-6 relative z-10">
                            <div className="text-center mb-12">
                                <h2 className="font-pixel text-3xl text-magical-dark mb-2">
                                    🌟 LEGENDARY RECIPES
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Discover pixel-perfect pastries
                                </p>
                            </div>

                            <div className="space-y-20">
                                {/* Card 1 - LEFT */}
                                <motion.div
                                    className="flex flex-col md:flex-row gap-6 items-center"
                                    initial={{ opacity: 0, x: -100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <div className="w-full md:w-1/2">
                                        <img
                                            src="https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg"
                                            className="w-full h-64 object-cover border-4 border-magical-border"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <div className="bg-white border-4 border-magical-border p-6">
                                            <h3 className="font-pixel text-xl text-magical-dark mb-3">
                                                STRAWBERRY CAKE
                                            </h3>
                                            <p className="text-sm text-gray-700 mb-3">
                                                A legendary dessert blessed by
                                                the Berry Goddess herself.
                                            </p>
                                            <span className="text-xs text-magical-pink font-pixel">
                                                ⭐ LEGENDARY
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Card 2 - RIGHT */}
                                <motion.div
                                    className="flex flex-col md:flex-row-reverse gap-6 items-center"
                                    initial={{ opacity: 0, x: 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <div className="w-full md:w-1/2">
                                        <img
                                            src="https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg"
                                            className="w-full h-64 object-cover border-4 border-magical-border"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <div className="bg-white border-4 border-magical-border p-6">
                                            <h3 className="font-pixel text-xl text-magical-dark mb-3">
                                                APPLE FRANGIPAN
                                            </h3>
                                            <p className="text-sm text-gray-700 mb-3">
                                                Forged in the Ancient Bakers'
                                                Guild ovens.
                                            </p>
                                            <span className="text-xs text-magical-pink font-pixel">
                                                ⭐ EPIC
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Card 3 - LEFT */}
                                <motion.div
                                    className="flex flex-col md:flex-row gap-6 items-center"
                                    initial={{ opacity: 0, x: -100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <div className="w-full md:w-1/2">
                                        <img
                                            src="https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"
                                            className="w-full h-64 object-cover border-4 border-magical-border"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <div className="bg-white border-4 border-magical-border p-6">
                                            <h3 className="font-pixel text-xl text-magical-dark mb-3">
                                                CHOCOLATE MOUSSE
                                            </h3>
                                            <p className="text-sm text-gray-700 mb-3">
                                                A forbidden recipe from the Dark
                                                Chocolate Realm.
                                            </p>
                                            <span className="text-xs text-magical-pink font-pixel">
                                                ⭐ RARE
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Card 4 - RIGHT */}
                                <motion.div
                                    className="flex flex-col md:flex-row-reverse gap-6 items-center"
                                    initial={{ opacity: 0, x: 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <div className="w-full md:w-1/2">
                                        <img
                                            src="https://www.themealdb.com/images/media/meals/uuxwvq1483907861.jpg"
                                            className="w-full h-64 object-cover border-4 border-magical-border"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <div className="bg-white border-4 border-magical-border p-6">
                                            <h3 className="font-pixel text-xl text-magical-dark mb-3">
                                                KEY LIME PIE
                                            </h3>
                                            <p className="text-sm text-gray-700 mb-3">
                                                Discovered on a tropical island
                                                by brave adventurers.
                                            </p>
                                            <span className="text-xs text-magical-pink font-pixel">
                                                ⭐ LEGENDARY
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: FRESH DROPS */}
                    <section className="py-16 bg-gradient-to-b from-orange-100 to-yellow-100">
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="text-center mb-10">
                                <h2 className="font-pixel text-3xl text-magical-dark mb-2">
                                    🔥 FRESH DROPS
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Today's featured recipes
                                </p>
                            </div>
                            <div className="overflow-hidden">
                                <motion.div
                                    className="flex gap-4"
                                    animate={{ x: [0, -1600] }}
                                    transition={{
                                        duration: 30,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    {[...recipes, ...recipes].map(
                                        (recipe, i) => (
                                            <div
                                                key={i}
                                                className="flex-shrink-0 w-60 bg-white border-4 border-magical-border p-3"
                                            >
                                                <img
                                                    src={recipe.strMealThumb}
                                                    className="w-full h-40 object-cover border-2 border-magical-pink mb-3"
                                                />
                                                <h3 className="font-pixel text-xs mb-3 h-10">
                                                    {recipe.strMeal}
                                                </h3>
                                                <Link
                                                    href={
                                                        auth?.user
                                                            ? route(
                                                                  "recipes.store"
                                                              )
                                                            : route("login")
                                                    }
                                                    method={
                                                        auth?.user
                                                            ? "post"
                                                            : "get"
                                                    }
                                                    data={
                                                        auth?.user
                                                            ? {
                                                                  api_id: recipe.idMeal,
                                                                  title: recipe.strMeal,
                                                                  image: recipe.strMealThumb,
                                                              }
                                                            : undefined
                                                    }
                                                    className="block w-full bg-magical-pink text-white font-pixel text-[8px] px-3 py-2 text-center hover:bg-magical-dark"
                                                >
                                                    {auth?.user
                                                        ? "💾 SAVE"
                                                        : "🔒 LOGIN"}
                                                </Link>
                                            </div>
                                        )
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: CTA */}
                    <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-center">
                        <h2 className="font-pixel text-4xl text-white mb-4">
                            READY TO START?
                        </h2>
                        <p className="text-white text-lg mb-6">
                            Join thousands of culinary adventurers!
                        </p>
                        {!auth?.user && (
                            <Link
                                href={route("register")}
                                className="inline-block bg-white text-magical-pink font-pixel text-sm px-10 py-3 border-4 border-white hover:bg-magical-pink hover:text-white"
                            >
                                ⭐ JOIN THE GUILD
                            </Link>
                        )}
                    </section>

                    {/* FOOTER */}
                    <footer className="bg-magical-dark text-white py-10">
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="grid md:grid-cols-4 gap-8 mb-6">
                                <div>
                                    <h3 className="font-pixel text-xs mb-3 text-magical-pink">
                                        ABOUT
                                    </h3>
                                    <p className="text-[10px] text-gray-300">
                                        Pixie's Pantry - RPG-themed recipe
                                        platform
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-pixel text-xs mb-3 text-magical-pink">
                                        QUICK LINKS
                                    </h3>
                                    <ul className="space-y-1 text-[10px]">
                                        <li>
                                            <Link
                                                href="/"
                                                className="hover:text-magical-pink"
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route("community.feed")}
                                                className="hover:text-magical-pink"
                                            >
                                                Community
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-pixel text-xs mb-3 text-magical-pink">
                                        CONTACT
                                    </h3>
                                    <ul className="space-y-1 text-[10px] text-gray-300">
                                        <li>📧 pixiespantry@email.com</li>
                                        <li>📍 Manila, PH</li>
                                        <li>🎓 IT110 Project</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-pixel text-xs mb-3 text-magical-pink">
                                        SOCIAL
                                    </h3>
                                    <div className="flex gap-2">
                                        <a
                                            href="https://github.com"
                                            className="w-8 h-8 bg-white/10 hover:bg-magical-pink flex items-center justify-center rounded text-sm"
                                        >
                                            <img
                                                src="../image/gemini_baking.png"
                                                alt="gemini_baking"
                                            />
                                        </a>
                                        <a
                                            href="https://facebook.com"
                                            className="w-8 h-8 bg-white/10 hover:bg-magical-pink flex items-center justify-center rounded text-sm"
                                        >
                                            👍
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-white/20 pt-4 text-center">
                                <p className="font-pixel text-[8px] text-gray-400">
                                    🧁 PIXIE'S PANTRY © 2025 - IT110 - FP1 Group
                                    4
                                </p>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </>
    );
}
