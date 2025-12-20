import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="min-h-screen bg-gradient-to-br from-magical-dark via-purple-600 to-magical-pink flex items-center justify-center p-6 relative overflow-hidden">
                {/* Animated background stars */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md relative z-10"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-20 h-20 mx-auto bg-white border-4 border-magical-dark flex items-center justify-center text-5xl mb-4"
                            >
                                🔑
                            </motion.div>
                        </Link>
                        <h1 className="font-pixel text-3xl text-white drop-shadow-lg mb-2">
                            FORGOT PASSWORD?
                        </h1>
                        <p className="font-pixel text-xs text-white/80">
                            NO WORRIES, WE'LL HELP YOU RECOVER IT
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white border-4 border-magical-dark shadow-2xl p-8">
                        <p className="text-sm text-gray-600 mb-6">
                            Enter your email address and we'll send you a
                            password reset link.
                        </p>

                        {status && (
                            <div className="mb-4 bg-green-100 border-2 border-green-500 p-3 font-pixel text-xs text-green-700">
                                ✓ {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="font-pixel text-xs text-magical-dark block mb-2">
                                    📧 EMAIL ADDRESS
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full px-4 py-3 border-2 border-magical-pink font-pixel text-xs focus:border-magical-dark focus:ring-0"
                                    autoFocus
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-2 text-xs text-red-600 font-pixel">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={processing}
                                className="w-full bg-magical-pink text-white font-pixel text-sm py-3 border-2 border-magical-dark shadow-pixel hover:bg-magical-dark transition-colors disabled:opacity-50"
                            >
                                {processing
                                    ? "SENDING..."
                                    : "📨 SEND RESET LINK"}
                            </motion.button>
                        </form>

                        {/* Back to Login */}
                        <div className="mt-6 pt-6 border-t-2 border-gray-200 text-center">
                            <Link
                                href={route("login")}
                                className="font-pixel text-xs text-magical-pink hover:text-magical-dark"
                            >
                                ← BACK TO LOGIN
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
