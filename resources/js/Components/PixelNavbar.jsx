// FILE: resources/js/Components/PixelNavbar.jsx
// MODERN STYLED VERSION

import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function PixelNavbar() {
    const { props } = usePage();
    const user = props.auth?.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    return (
        <nav className="bg-magical-pink/95 backdrop-blur-sm border-b-2 border-magical-dark shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* LOGO */}
                    <Link
                        href={route("home")}
                        className="flex items-center gap-3 hover:scale-105 transition-transform"
                    >
                        <div className="w-10 h-10 bg-white border-2 border-magical-dark flex items-center justify-center text-2xl shadow-md">
                            🧁
                        </div>
                        <span className="font-pixel text-white text-base drop-shadow-md hidden sm:inline">
                            PIXIE'S PANTRY
                        </span>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-2 font-pixel text-[10px]">
                        <Link
                            href={route("home")}
                            className="text-white px-4 py-2 hover:bg-white/20 rounded transition-all"
                        >
                            HOME
                        </Link>

                        <Link
                            href={route("community.feed")}
                            className="text-white px-4 py-2 hover:bg-white/20 rounded transition-all"
                        >
                            COMMUNITY
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    href={route("dashboard")}
                                    className="text-white px-4 py-2 hover:bg-white/20 rounded transition-all"
                                >
                                    MY KITCHEN
                                </Link>

                                <Link
                                    href={route("recipes.create")}
                                    className="bg-white text-magical-pink px-4 py-2 border-2 border-magical-dark hover:bg-magical-dark hover:text-white rounded transition-all"
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
                                        className="text-white px-4 py-2 hover:bg-white/20 rounded transition-all flex items-center gap-1"
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
                                    className="text-white px-4 py-2 hover:bg-white/20 rounded transition-all"
                                >
                                    LOGIN
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="bg-white text-magical-pink px-4 py-2 border-2 border-magical-dark hover:bg-magical-dark hover:text-white rounded transition-all"
                                >
                                    SIGN UP
                                </Link>
                            </>
                        )}
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white text-2xl"
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* MOBILE MENU */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 space-y-2 font-pixel text-[10px]">
                        <Link
                            href={route("home")}
                            className="block text-white px-4 py-2 hover:bg-white/20 rounded"
                        >
                            HOME
                        </Link>
                        <Link
                            href={route("community.feed")}
                            className="block text-white px-4 py-2 hover:bg-white/20 rounded"
                        >
                            COMMUNITY
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    href={route("dashboard")}
                                    className="block text-white px-4 py-2 hover:bg-white/20 rounded"
                                >
                                    MY KITCHEN
                                </Link>
                                <Link
                                    href={route("recipes.create")}
                                    className="block text-white px-4 py-2 hover:bg-white/20 rounded"
                                >
                                    + CREATE
                                </Link>
                                <Link
                                    href={route("profile.edit")}
                                    className="block text-white px-4 py-2 hover:bg-white/20 rounded"
                                >
                                    ⚙️ PROFILE
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block w-full text-left text-white px-4 py-2 hover:bg-red-600 rounded"
                                >
                                    🚪 LOGOUT
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="block text-white px-4 py-2 hover:bg-white/20 rounded"
                                >
                                    LOGIN
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="block text-white px-4 py-2 hover:bg-white/20 rounded"
                                >
                                    SIGN UP
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
