import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/Components/SearchBar";

export default function PixelNavbar() {
    const { props } = usePage();
    const user = props.auth?.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className={`transition-all duration-300 ${
                scrolled ? "bg-white shadow-lg py-2" : "bg-magical-pink py-3"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center gap-4">
                    {/* LOGO */}
                    <Link
                        href={route("home")}
                        className="flex items-center gap-3"
                    >
                        <motion.div
                            className={`w-10 h-10 border-2 flex items-center justify-center text-2xl transition-colors ${
                                scrolled
                                    ? "border-magical-dark bg-magical-pink"
                                    : "border-white bg-white"
                            }`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            🧁
                        </motion.div>
                        <span
                            className={`font-pixel text-base transition-colors ${
                                scrolled ? "text-magical-dark" : "text-white"
                            }`}
                        >
                            PIXIE'S PANTRY
                        </span>
                    </Link>

                    {/* SEARCH BAR - DESKTOP */}
                    {user && (
                        <div className="hidden md:block flex-1 max-w-md">
                            <SearchBar
                                placeholder="Search recipes..."
                                route={route("search")}
                            />
                        </div>
                    )}

                    {/* NAVIGATION LINKS */}
                    <div className="hidden md:flex items-center gap-2 font-pixel text-[10px]">
                        <Link
                            href={route("home")}
                            className={`px-4 py-2 rounded transition-all ${
                                scrolled
                                    ? "text-magical-dark hover:bg-magical-pink/20"
                                    : "text-white hover:bg-white/20"
                            }`}
                        >
                            HOME
                        </Link>
                        <Link
                            href={route("community.feed")}
                            className={`px-4 py-2 rounded transition-all ${
                                scrolled
                                    ? "text-magical-dark hover:bg-magical-pink/20"
                                    : "text-white hover:bg-white/20"
                            }`}
                        >
                            COMMUNITY
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    href={route("dashboard")}
                                    className={`px-4 py-2 rounded transition-all ${
                                        scrolled
                                            ? "text-magical-dark hover:bg-magical-pink/20"
                                            : "text-white hover:bg-white/20"
                                    }`}
                                >
                                    MY KITCHEN
                                </Link>
                                <Link
                                    href={route("recipes.create")}
                                    className={`px-4 py-2 border-2 rounded transition-all ${
                                        scrolled
                                            ? "bg-magical-pink text-white border-magical-dark hover:bg-magical-dark"
                                            : "bg-white text-magical-pink border-white hover:bg-magical-dark hover:text-white"
                                    }`}
                                >
                                    + CREATE
                                </Link>

                                {/* USER DROPDOWN */}
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setUserDropdownOpen(
                                                !userDropdownOpen
                                            )
                                        }
                                        className={`px-4 py-2 hover:bg-white/20 rounded flex items-center gap-1 ${
                                            scrolled
                                                ? "text-magical-dark"
                                                : "text-white"
                                        }`}
                                    >
                                        👤 {user.name}
                                        <svg
                                            className="w-3 h-3"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </button>

                                    {userDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-magical-dark shadow-xl z-50">
                                            <Link
                                                href={route("profile.edit")}
                                                className="block px-4 py-2 text-magical-dark hover:bg-magical-pink hover:text-white"
                                            >
                                                ⚙️ PROFILE
                                            </Link>
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="w-full text-left px-4 py-2 text-magical-dark hover:bg-red-600 hover:text-white"
                                            >
                                                🚪 LOGOUT
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className={`px-4 py-2 ${
                                        scrolled
                                            ? "text-magical-dark"
                                            : "text-white"
                                    }`}
                                >
                                    LOGIN
                                </Link>
                                <Link
                                    href={route("register")}
                                    className={`px-4 py-2 border-2 rounded ${
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

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`md:hidden text-2xl ${
                            scrolled ? "text-magical-dark" : "text-white"
                        }`}
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* SEARCH BAR - MOBILE */}
                {user && (
                    <div className="mt-3 md:hidden">
                        <SearchBar
                            placeholder="Search..."
                            route={route("search")}
                        />
                    </div>
                )}

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 space-y-2 font-pixel text-[10px]">
                        <Link
                            href={route("home")}
                            className={`block px-4 py-2 hover:bg-white/20 rounded ${
                                scrolled ? "text-magical-dark" : "text-white"
                            }`}
                        >
                            HOME
                        </Link>
                        <Link
                            href={route("community.feed")}
                            className={`block px-4 py-2 hover:bg-white/20 rounded ${
                                scrolled ? "text-magical-dark" : "text-white"
                            }`}
                        >
                            COMMUNITY
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    href={route("dashboard")}
                                    className={`block px-4 py-2 hover:bg-white/20 rounded ${
                                        scrolled
                                            ? "text-magical-dark"
                                            : "text-white"
                                    }`}
                                >
                                    MY KITCHEN
                                </Link>
                                <Link
                                    href={route("recipes.create")}
                                    className={`block px-4 py-2 hover:bg-white/20 rounded ${
                                        scrolled
                                            ? "text-magical-dark"
                                            : "text-white"
                                    }`}
                                >
                                    + CREATE
                                </Link>
                                <Link
                                    href={route("profile.edit")}
                                    className={`block px-4 py-2 hover:bg-white/20 rounded ${
                                        scrolled
                                            ? "text-magical-dark"
                                            : "text-white"
                                    }`}
                                >
                                    ⚙️ PROFILE
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className={`block w-full text-left px-4 py-2 hover:bg-red-600 rounded ${
                                        scrolled
                                            ? "text-magical-dark"
                                            : "text-white"
                                    }`}
                                >
                                    🚪 LOGOUT
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className={`block px-4 py-2 hover:bg-white/20 rounded ${
                                        scrolled
                                            ? "text-magical-dark"
                                            : "text-white"
                                    }`}
                                >
                                    LOGIN
                                </Link>
                                <Link
                                    href={route("register")}
                                    className={`block px-4 py-2 hover:bg-white/20 rounded ${
                                        scrolled
                                            ? "text-magical-dark"
                                            : "text-white"
                                    }`}
                                >
                                    SIGN UP
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </motion.nav>
    );
}
