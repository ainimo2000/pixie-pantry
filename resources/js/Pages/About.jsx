import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function About() {
    const members = [
        { name: "Member 1", role: "Lead Developer", color: "bg-red-200" },
        { name: "Member 2", role: "UI Designer", color: "bg-blue-200" },
        { name: "Member 3", role: "Content Mage", color: "bg-green-200" },
        { name: "Member 4", role: "Tester/QA", color: "bg-yellow-200" },
    ];

    return (
        <div className="min-h-screen bg-magical-bg p-8 font-sans">
            <Head title="About Us" />

            <Link
                href="/"
                className="inline-block mb-8 font-pixel text-xs bg-white border-2 border-black px-4 py-2 hover:bg-gray-100"
            >
                ← BACK TO REALM
            </Link>

            <div className="max-w-4xl mx-auto text-center">
                <h1 className="font-pixel text-3xl md:text-5xl text-magical-dark mb-12 drop-shadow-md">
                    MEET THE CREATORS
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className={`border-4 border-black shadow-pixel p-6 ${member.color} flex flex-col items-center`}
                        >
                            <div className="w-20 h-20 bg-white border-2 border-black rounded-full mb-4 flex items-center justify-center text-3xl">
                                👤
                            </div>
                            <h2 className="font-pixel text-xs font-bold mb-2">
                                {member.name}
                            </h2>
                            <p className="text-xs bg-white/50 px-2 py-1 rounded">
                                {member.role}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 bg-white border-4 border-magical-border p-8 shadow-pixel text-left">
                    <h3 className="font-pixel text-xl mb-4 text-magical-pink">
                        OUR MISSION
                    </h3>
                    <p className="leading-relaxed text-sm font-medium">
                        To bring magic back to cooking! We built Pixie's Pantry
                        to prove that recipe apps don't have to be boring lists.
                        By combining the
                        <span className="text-magical-pink font-bold">
                            {" "}
                            TheMealDB API
                        </span>{" "}
                        with
                        <span className="text-magical-dark font-bold">
                            {" "}
                            React & Laravel
                        </span>
                        , we created an interactive experience that feels like
                        opening a treasure chest.
                    </p>
                </div>
            </div>
        </div>
    );
}
