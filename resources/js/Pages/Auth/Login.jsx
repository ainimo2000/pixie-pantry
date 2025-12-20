import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen bg-gradient-to-br from-magical-pink via-purple-500 to-magical-dark flex items-center justify-center p-6 relative overflow-hidden">
                {/* Animated stars background */}
                {[...Array(50)].map((_, i) => (
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
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md relative z-10"
                >
                    {/* Logo/Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-20 h-20 mx-auto bg-white border-4 border-magical-dark flex items-center justify-center text-5xl mb-4"
                            >
                                🧁
                            </motion.div>
                        </Link>
                        <h1 className="font-pixel text-4xl text-white drop-shadow-lg">
                            PIXIE'S PANTRY
                        </h1>
                        <p className="font-pixel text-sm text-white/80 mt-2">
                            LOGIN TO YOUR KITCHEN
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white border-4 border-magical-dark shadow-2xl p-8">
                        {status && (
                            <div className="mb-4 bg-green-100 border-2 border-green-500 p-3 font-pixel text-xs text-green-700">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
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

                            {/* Password */}
                            <div>
                                <label className="font-pixel text-xs text-magical-dark block mb-2">
                                    🔒 PASSWORD
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full px-4 py-3 border-2 border-magical-pink font-pixel text-xs focus:border-magical-dark focus:ring-0"
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-2 text-xs text-red-600 font-pixel">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="w-4 h-4 border-2 border-magical-pink text-magical-pink focus:ring-0"
                                />
                                <label className="ml-2 font-pixel text-xs text-gray-700">
                                    REMEMBER ME
                                </label>
                            </div>

                            {/* Buttons */}
                            <div className="space-y-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-magical-pink text-white font-pixel text-sm py-3 border-2 border-magical-dark shadow-pixel hover:bg-magical-dark transition-colors disabled:opacity-50"
                                >
                                    {processing ? "LOGGING IN..." : "⚔️ LOGIN"}
                                </motion.button>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="block text-center font-pixel text-xs text-magical-pink hover:text-magical-dark"
                                    >
                                        FORGOT PASSWORD?
                                    </Link>
                                )}
                            </div>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-6 pt-6 border-t-2 border-gray-200 text-center">
                            <p className="font-pixel text-xs text-gray-600 mb-3">
                                DON'T HAVE AN ACCOUNT?
                            </p>
                            <Link
                                href={route("register")}
                                className="inline-block bg-white text-magical-pink font-pixel text-sm px-6 py-2 border-2 border-magical-pink hover:bg-magical-pink hover:text-white transition-colors"
                            >
                                CREATE ACCOUNT
                            </Link>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center mt-6">
                        <Link
                            href="/"
                            className="font-pixel text-xs text-white/80 hover:text-white"
                        >
                            ← BACK TO HOME
                        </Link>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
