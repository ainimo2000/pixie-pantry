import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Confirm Password" />

            <div className="min-h-screen bg-gradient-to-br from-magical-pink via-purple-500 to-magical-dark flex items-center justify-center p-6 relative overflow-hidden">
                {/* Shield animation */}
                <motion.div
                    className="absolute text-9xl opacity-5"
                    style={{
                        top: "20%",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                    }}
                >
                    🛡️
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md relative z-10"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className="w-20 h-20 mx-auto bg-white border-4 border-magical-dark flex items-center justify-center text-5xl mb-4"
                        >
                            🔐
                        </motion.div>
                        <h1 className="font-pixel text-3xl text-white drop-shadow-lg mb-2">
                            SECURE AREA
                        </h1>
                        <p className="font-pixel text-xs text-white/80">
                            CONFIRM YOUR IDENTITY
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white border-4 border-magical-dark shadow-2xl p-8">
                        <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-400">
                            <p className="text-sm text-gray-700 font-pixel text-xs">
                                ⚠️ This is a secure area. Please confirm your
                                password to continue.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
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
                                    autoFocus
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-2 text-xs text-red-600 font-pixel">
                                        {errors.password}
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
                                {processing ? "CONFIRMING..." : "✓ CONFIRM"}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
