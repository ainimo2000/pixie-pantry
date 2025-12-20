import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import PixelNavbar from "@/Components/PixelNavbar";

export default function About() {
    const features = [
        {
            icon: "🎮",
            title: "RPG THEME",
            desc: "Level up your cooking skills",
        },
        {
            icon: "📚",
            title: "SAVE RECIPES",
            desc: "Build your recipe collection",
        },
        { icon: "🌍", title: "SHARE", desc: "Join the community" },
        { icon: "🔍", title: "SEARCH", desc: "Find any recipe instantly" },
    ];

    const team = [
        { name: "AIRAH", role: "Backend Developer", emoji: "⚙️" },
        { name: "MARIA", role: "Frontend Developer", emoji: "🎨" },
        { name: "YLLE", role: "UI/UX Designer", emoji: "✨" },
        { name: "RAMELA", role: "QA Tester", emoji: "🔍" },
    ];

    return (
        <>
            <Head title="About" />

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

                <main className="relative z-10">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-br from-magical-pink via-purple-500 to-magical-dark py-20">
                        <div className="max-w-4xl mx-auto px-6 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.8 }}
                                className="inline-block mb-6"
                            >
                                <div className="w-32 h-32 bg-white border-4 border-magical-dark flex items-center justify-center text-7xl shadow-2xl">
                                    🧁
                                </div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="font-pixel text-5xl text-white mb-4 drop-shadow-lg"
                            >
                                ABOUT PIXIE'S PANTRY
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-white/90 text-lg max-w-2xl mx-auto"
                            >
                                An RPG-themed recipe platform where cooking
                                meets adventure! Save, share, and discover
                                magical recipes from around the world.
                            </motion.p>
                        </div>
                    </div>

                    {/* Story Section */}
                    <div className="max-w-4xl mx-auto px-6 py-16">
                        <div className="bg-white border-4 border-magical-border shadow-pixel p-8 mb-12">
                            <h2 className="font-pixel text-3xl text-magical-dark mb-6 text-center">
                                📖 OUR STORY
                            </h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    <strong className="text-magical-pink">
                                        Pixie's Pantry
                                    </strong>{" "}
                                    was created as part of our
                                    <strong className="text-magical-dark">
                                        {" "}
                                        IT110 Final Project
                                    </strong>{" "}
                                    by FP1 Group 4. We wanted to build something
                                    different - a recipe platform that feels
                                    like an adventure game!
                                </p>
                                <p>
                                    Instead of boring recipe cards, we created a
                                    magical world where every recipe is a
                                    treasure to collect, every ingredient is a
                                    quest item, and every chef is an adventurer
                                    on a culinary journey.
                                </p>
                                <p className="text-magical-pink font-bold">
                                    Our mission: Make cooking fun, social, and
                                    magical! ✨
                                </p>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <h2 className="font-pixel text-3xl text-magical-dark mb-8 text-center">
                            ⚡ FEATURES
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-16">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white border-4 border-magical-border shadow-pixel p-6 hover:shadow-xl transition-shadow"
                                >
                                    <div className="text-5xl mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-pixel text-xl text-magical-dark mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Team Section */}
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-magical-dark p-8 mb-12">
                            <h2 className="font-pixel text-3xl text-magical-dark mb-8 text-center">
                                👥 OUR TEAM
                            </h2>
                            <div className="grid md:grid-cols-4 gap-6">
                                {team.map((member, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white border-2 border-magical-pink p-6 text-center"
                                    >
                                        <div className="text-5xl mb-3">
                                            {member.emoji}
                                        </div>
                                        <h3 className="font-pixel text-sm text-magical-dark mb-1">
                                            {member.name}
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            {member.role}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                            <p className="text-center font-pixel text-xs text-gray-600 mt-6">
                                FP1 GROUP 4 • IT110 FINAL PROJECT • 2025
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="bg-white border-4 border-magical-border shadow-pixel p-8 text-center">
                            <h2 className="font-pixel text-2xl text-magical-dark mb-6">
                                🛠️ BUILT WITH
                            </h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                {[
                                    "Laravel",
                                    "React",
                                    "Inertia.js",
                                    "Tailwind CSS",
                                    "TheMealDB API",
                                ].map((tech) => (
                                    <span
                                        key={tech}
                                        className="bg-magical-pink text-white font-pixel text-xs px-4 py-2 border-2 border-magical-dark"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center mt-12">
                            <p className="font-pixel text-lg text-magical-dark mb-6">
                                READY TO START YOUR CULINARY ADVENTURE?
                            </p>
                            <Link
                                href={route("register")}
                                className="inline-block bg-magical-pink text-white font-pixel text-sm px-8 py-4 border-2 border-magical-dark shadow-pixel hover:bg-magical-dark transition-colors"
                            >
                                🎮 JOIN NOW
                            </Link>
                        </div>
                    </div>
                </main>
            </div>

            {/* FOOTER */}
            <footer className="bg-magical-dark text-white py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-6">
                        <div>
                            <h3 className="font-pixel text-xs mb-3 text-magical-pink">
                                ABOUT
                            </h3>
                            <p className="text-[10px] text-gray-300">
                                Pixie's Pantry - RPG-themed recipe platform
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
                            🧁 PIXIE'S PANTRY © 2025 - IT110 - FP1 Group 4
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
