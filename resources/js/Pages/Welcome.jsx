import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
} from "framer-motion";
// Using relative paths to be safe
import PixelCard from "../Components/PixelCard";
import RecipeModal from "../Components/RecipeModal";
import PixelChef from "../Components/PixelChef";

// --- LOADING SCREEN ---
function LoadingScreen({ visible }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[9999] bg-magical-bg flex flex-col items-center justify-center font-pixel"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-6xl mb-6"
                    >
                        🧙‍♀️
                    </motion.div>
                    <div className="w-48 h-4 border-2 border-magical-dark p-1 rounded-full">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2 }}
                            className="h-full bg-magical-pink rounded-full"
                        />
                    </div>
                    <h2 className="mt-4 text-magical-dark text-xs tracking-widest animate-pulse">
                        GENERATING PIXELS...
                    </h2>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function Welcome({ auth, recipes }) {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    // SCROLL ANIMATIONS (Parallax)
    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 1000], [0, 300]); // Background moves slow
    const floatY = useTransform(scrollY, [0, 1000], [0, -100]); // Floating items move fast

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Stagger animation for grid
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <>
            <Head title="Pixie's Pantry" />
            <LoadingScreen visible={isLoading} />

            <div className="bg-magical-bg font-sans text-magical-dark relative selection:bg-magical-pink selection:text-white overflow-x-hidden">
                {/* PARALLAX BACKGROUND LAYER */}
                <motion.div
                    style={{ y: bgY }}
                    className="fixed inset-0 opacity-10 pointer-events-none"
                >
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage:
                                "radial-gradient(#8B008B 2px, transparent 2px)",
                            backgroundSize: "30px 30px",
                        }}
                    ></div>
                </motion.div>

                {/* --- NAV BAR --- */}
                <motion.nav
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                        scrolled
                            ? "bg-magical-pink/95 py-2 border-b-4 border-magical-border shadow-lg"
                            : "bg-transparent py-6"
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="text-2xl"
                            >
                                🧁
                            </motion.div>
                            <h1 className="font-pixel text-white text-xs md:text-sm drop-shadow-md tracking-wider">
                                PIXIE'S PANTRY
                            </h1>
                        </div>
                        <div className="flex gap-4 font-pixel text-[8px] md:text-[10px] text-white items-center">
                            <Link
                                href={window.route("about")}
                                className="hover:text-yellow-200 transition-colors"
                            >
                                ABOUT
                            </Link>
                            {auth?.user ? (
                                <Link
                                    href={window.route("dashboard")}
                                    className="bg-white text-magical-dark px-4 py-1 border-2 border-magical-dark hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                                >
                                    QUESTS
                                </Link>
                            ) : (
                                <Link
                                    href={window.route("login")}
                                    className="bg-white text-magical-dark px-4 py-1 border-2 border-magical-dark hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                                >
                                    LOGIN
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.nav>

                {/* --- SECTION 1: INTERACTIVE HERO --- */}
                <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
                    {/* Floating Background Props */}
                    <motion.div
                        style={{ y: floatY }}
                        className="absolute top-20 left-10 text-8xl opacity-20 rotate-12 pointer-events-none"
                    >
                        🥄
                    </motion.div>
                    <motion.div
                        style={{ y: floatY }}
                        className="absolute bottom-40 right-10 text-8xl opacity-20 -rotate-12 pointer-events-none"
                    >
                        🥣
                    </motion.div>

                    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 z-10">
                        <div className="flex-1 text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-block bg-yellow-300 border-2 border-black px-3 py-1 font-pixel text-[10px] mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
                                    ✨ COOKING ENGINE V1.0
                                </div>
                                <h1 className="font-pixel text-5xl md:text-7xl mb-6 leading-tight text-magical-dark drop-shadow-white">
                                    TASTE THE <br />{" "}
                                    <span className="text-magical-pink">
                                        PIXELS
                                    </span>
                                </h1>
                                <p className="text-sm font-bold text-gray-600 mb-8 max-w-md leading-relaxed bg-white/80 backdrop-blur-sm p-6 rounded-lg border-2 border-magical-border shadow-sm">
                                    Welcome to the ultimate RPG cookbook.
                                    Collect ingredients, unlock recipes, and
                                    level up your real-life cooking skills.
                                </p>
                                {!auth?.user && (
                                    <Link
                                        href={window.route("register")}
                                        className="inline-block bg-magical-pink text-white font-pixel text-xs px-8 py-4 border-4 border-magical-dark shadow-[6px_6px_0px_0px_rgba(75,0,130,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(75,0,130,1)] transition-all"
                                    >
                                        JOIN THE GUILD ➤
                                    </Link>
                                )}
                            </motion.div>
                        </div>

                        {/* ANIMATED CHEF HERE */}
                        <div className="flex-1 flex justify-center relative">
                            <PixelChef />
                        </div>
                    </div>
                </section>

                {/* --- SECTION 2: THE STORY (Interactive Cards) --- */}
                <section className="py-24 bg-white border-y-4 border-magical-border relative overflow-hidden">
                    {/* Animated Pixies in Background */}
                    <motion.div
                        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute top-10 left-0 text-6xl opacity-20 pointer-events-none"
                    >
                        🧚‍♀️
                    </motion.div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="font-pixel text-3xl text-magical-dark mb-4">
                                HOW TO PLAY
                            </h2>
                            <p className="text-xs font-bold text-gray-400">
                                YOUR JOURNEY BEGINS HERE
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: "🔍",
                                    title: "1. DISCOVER",
                                    text: "Browse the API Realm to find rare dessert recipes hidden in the code.",
                                },
                                {
                                    icon: "💾",
                                    title: "2. COLLECT",
                                    text: "Save your favorites to your Quest Log. They are yours forever!",
                                },
                                {
                                    icon: "🍳",
                                    title: "3. CRAFT",
                                    text: "Use the ingredients list to craft these items in your real-life kitchen.",
                                },
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    whileHover={{
                                        y: -10,
                                        rotate: [0, 1, -1, 0],
                                    }}
                                    className="bg-magical-bg p-8 border-4 border-black shadow-pixel text-center group cursor-pointer"
                                >
                                    <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">
                                        {step.icon}
                                    </div>
                                    <h3 className="font-pixel text-sm text-magical-dark mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs leading-relaxed font-medium">
                                        {step.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- SECTION 3: SHOWCASE (Animated Grid) --- */}
                <section className="py-24 bg-magical-card relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="font-pixel text-2xl text-magical-dark mb-2">
                                    FRESH DROPS
                                </h2>
                                <p className="text-xs font-bold text-gray-500">
                                    Trending items from the server
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <span className="font-pixel text-[10px] bg-black text-white px-3 py-1">
                                    SCROLL DOWN ▼
                                </span>
                            </div>
                        </div>

                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                        >
                            {recipes.slice(0, 4).map((recipe) => (
                                <motion.div
                                    key={recipe.idMeal}
                                    variants={itemAnim}
                                >
                                    <PixelCard
                                        recipe={recipe}
                                        auth={auth || {}}
                                        onOpen={setSelectedRecipe}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="text-center mt-12">
                            <button className="font-pixel text-xs border-b-2 border-magical-dark pb-1 hover:text-magical-pink transition-colors">
                                LOAD MORE ITEMS...
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 4: THE DYNAMIC FINALE --- */}
                <section className="py-32 bg-magical-dark text-white text-center relative overflow-hidden">
                    {/* Rotating Background */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 60,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
                    ></motion.div>

                    <div className="relative z-10 max-w-2xl mx-auto px-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="inline-block mb-6 text-6xl"
                        >
                            🎮
                        </motion.div>
                        <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-yellow-300">
                            READY PLAYER ONE?
                        </h2>
                        <p className="font-pixel text-xs mb-10 leading-loose tracking-widest max-w-lg mx-auto">
                            THE KITCHEN IS A DANGEROUS PLACE TO GO ALONE. <br />
                            TAKE THESE RECIPES WITH YOU.
                        </p>

                        {!auth?.user ? (
                            <Link
                                href={window.route("register")}
                                className="bg-magical-pink text-white font-pixel text-sm px-10 py-5 border-4 border-white shadow-[0px_0px_20px_rgba(255,105,180,0.6)] hover:bg-white hover:text-magical-pink transition-all transform hover:scale-105"
                            >
                                CREATE FREE ACCOUNT
                            </Link>
                        ) : (
                            <Link
                                href={window.route("dashboard")}
                                className="bg-green-400 text-black font-pixel text-sm px-10 py-5 border-4 border-white shadow-[0px_0px_20px_rgba(74,222,128,0.6)] hover:bg-white hover:text-green-500 transition-all transform hover:scale-105"
                            >
                                ENTER DASHBOARD
                            </Link>
                        )}
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-black text-gray-500 p-8 text-center border-t-4 border-gray-800 font-pixel text-[8px]">
                    <p>PIXIE'S PANTRY © 2025 • DEVELOPED BY GROUP 1</p>
                </footer>

                {/* MODAL */}
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
