import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Reset Password" />

            <div className="min-h-screen bg-gradient-to-br from-purple-700 via-magical-pink to-orange-500 flex items-center justify-center p-6 relative overflow-hidden">
                {/* Floating lock emojis */}
                {["🔒", "🔑", "🛡️"].map((emoji, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-6xl opacity-10"
                        style={{
                            top: `${20 + i * 30}%`,
                            left: `${10 + i * 30}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                        }}
                    >
                        {emoji}
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md relative z-10"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-20 h-20 mx-auto bg-white border-4 border-magical-dark flex items-center justify-center text-5xl mb-4 shadow-xl"
                            >
                                🔐
                            </motion.div>
                        </Link>
                        <h1 className="font-pixel text-3xl text-white drop-shadow-lg mb-2">
                            RESET PASSWORD
                        </h1>
                        <p className="font-pixel text-xs text-white/90">
                            CHOOSE A NEW SECURE PASSWORD
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white border-4 border-magical-dark shadow-2xl p-8">
                        <form onSubmit={submit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="font-pixel text-xs text-magical-dark block mb-2">
                                    📧 EMAIL
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full px-4 py-3 border-2 border-magical-pink font-pixel text-xs focus:border-magical-dark focus:ring-0 bg-gray-50"
                                    readOnly
                                />
                                {errors.email && (
                                    <p className="mt-2 text-xs text-red-600 font-pixel">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="font-pixel text-xs text-magical-dark block mb-2">
                                    🔒 NEW PASSWORD
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full px-4 py-3 border-2 border-magical-pink font-pixel text-xs focus:border-magical-dark focus:ring-0"
                                    autoFocus
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-2 text-xs text-red-600 font-pixel">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="font-pixel text-xs text-magical-dark block mb-2">
                                    🔒 CONFIRM PASSWORD
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-3 border-2 border-magical-pink font-pixel text-xs focus:border-magical-dark focus:ring-0"
                                    required
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-2 text-xs text-red-600 font-pixel">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={processing}
                                className="w-full bg-magical-pink text-white font-pixel text-sm py-4 border-2 border-magical-dark shadow-pixel hover:bg-magical-dark transition-colors disabled:opacity-50 mt-6"
                            >
                                {processing
                                    ? "RESETTING..."
                                    : "✨ RESET PASSWORD"}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
