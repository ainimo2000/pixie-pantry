import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import PixelNavbar from "@/Components/PixelNavbar";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profile" />

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

                <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-block bg-white border-4 border-magical-dark p-6 mb-4">
                            <div className="text-6xl mb-2">👤</div>
                            <h1 className="font-pixel text-4xl text-magical-dark">
                                PROFILE SETTINGS
                            </h1>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Manage your account information and preferences
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        {/* Profile Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white border-4 border-magical-border shadow-pixel p-8"
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-magical-pink">
                                <span className="text-3xl">📝</span>
                                <h2 className="font-pixel text-2xl text-magical-dark">
                                    PROFILE INFORMATION
                                </h2>
                            </div>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </motion.div>

                        {/* Update Password */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white border-4 border-magical-border shadow-pixel p-8"
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-magical-pink">
                                <span className="text-3xl">🔒</span>
                                <h2 className="font-pixel text-2xl text-magical-dark">
                                    UPDATE PASSWORD
                                </h2>
                            </div>
                            <UpdatePasswordForm className="max-w-xl" />
                        </motion.div>

                        {/* Delete Account */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-red-50 border-4 border-red-500 shadow-pixel p-8"
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-red-500">
                                <span className="text-3xl">⚠️</span>
                                <h2 className="font-pixel text-2xl text-red-600">
                                    DANGER ZONE
                                </h2>
                            </div>
                            <DeleteUserForm className="max-w-xl" />
                        </motion.div>
                    </div>

                    {/* Stats Card (Optional) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-magical-dark p-6"
                    >
                        <h3 className="font-pixel text-xl text-magical-dark mb-4 text-center">
                            👨‍🍳 YOUR STATS
                        </h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-white border-2 border-magical-pink p-4">
                                <div className="text-3xl font-pixel text-magical-pink mb-1">
                                    0
                                </div>
                                <div className="text-xs text-gray-600">
                                    Recipes Saved
                                </div>
                            </div>
                            <div className="bg-white border-2 border-magical-pink p-4">
                                <div className="text-3xl font-pixel text-magical-pink mb-1">
                                    0
                                </div>
                                <div className="text-xs text-gray-600">
                                    Recipes Created
                                </div>
                            </div>
                            <div className="bg-white border-2 border-magical-pink p-4">
                                <div className="text-3xl font-pixel text-magical-pink mb-1">
                                    1
                                </div>
                                <div className="text-xs text-gray-600">
                                    Chef Level
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
