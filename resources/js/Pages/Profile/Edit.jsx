import { useState, useRef } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import PixelNavbar from "@/Components/PixelNavbar";

// Profile Information Form Component
function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <div onSubmit={submit}>
                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block font-pixel text-sm text-magical-dark mb-2"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="w-full border-4 border-magical-border p-3 font-pixel focus:border-magical-pink focus:outline-none"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            autoComplete="name"
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block font-pixel text-sm text-magical-dark mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border-4 border-magical-border p-3 font-pixel focus:border-magical-pink focus:outline-none"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm text-gray-800">
                                Your email address is unverified.
                            </p>
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={submit}
                            disabled={processing}
                            className="bg-magical-pink hover:bg-magical-dark text-white font-pixel px-6 py-3 border-4 border-magical-dark shadow-pixel hover:shadow-none transition-all disabled:opacity-50"
                        >
                            SAVE
                        </button>
                        {recentlySuccessful && (
                            <p className="text-sm text-green-600 font-pixel">
                                ✓ Saved!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Update Password Form Component
function UpdatePasswordForm({ className = "" }) {
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                }
                if (errors.current_password) {
                    reset("current_password");
                }
            },
        });
    };

    return (
        <section className={className}>
            <div>
                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="current_password"
                            className="block font-pixel text-sm text-magical-dark mb-2"
                        >
                            Current Password
                        </label>
                        <input
                            id="current_password"
                            type="password"
                            className="w-full border-4 border-magical-border p-3 font-pixel focus:border-magical-pink focus:outline-none"
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            autoComplete="current-password"
                        />
                        {errors.current_password && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.current_password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block font-pixel text-sm text-magical-dark mb-2"
                        >
                            New Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full border-4 border-magical-border p-3 font-pixel focus:border-magical-pink focus:outline-none"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            autoComplete="new-password"
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block font-pixel text-sm text-magical-dark mb-2"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            className="w-full border-4 border-magical-border p-3 font-pixel focus:border-magical-pink focus:outline-none"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            autoComplete="new-password"
                        />
                        {errors.password_confirmation && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={updatePassword}
                            disabled={processing}
                            className="bg-magical-pink hover:bg-magical-dark text-white font-pixel px-6 py-3 border-4 border-magical-dark shadow-pixel hover:shadow-none transition-all disabled:opacity-50"
                        >
                            UPDATE
                        </button>
                        {recentlySuccessful && (
                            <p className="text-sm text-green-600 font-pixel">
                                ✓ Password Updated!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Delete User Form Component
function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={className}>
            <header>
                <h2 className="font-pixel text-lg text-red-600 mb-2">
                    DELETE ACCOUNT
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <button
                type="button"
                onClick={confirmUserDeletion}
                className="bg-red-600 hover:bg-red-700 text-white font-pixel px-6 py-3 border-4 border-red-700 shadow-pixel hover:shadow-none transition-all"
            >
                DELETE ACCOUNT
            </button>

            {confirmingUserDeletion && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white border-4 border-red-600 p-8 max-w-md w-full">
                        <h2 className="font-pixel text-2xl text-red-600 mb-4">
                            ⚠️ CONFIRM DELETION
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete your account? Once
                            your account is deleted, all of its resources and
                            data will be permanently deleted. Please enter your
                            password to confirm you would like to permanently
                            delete your account.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block font-pixel text-sm text-gray-700 mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full border-4 border-gray-300 p-3 font-pixel focus:border-red-500 focus:outline-none"
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-pixel px-4 py-2 border-4 border-gray-400"
                                >
                                    CANCEL
                                </button>
                                <button
                                    type="button"
                                    onClick={deleteUser}
                                    disabled={processing}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-pixel px-4 py-2 border-4 border-red-700 disabled:opacity-50"
                                >
                                    DELETE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

// Main Profile Edit Component
export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profile" />

            <div className="min-h-screen bg-magical-bg">
                <PixelNavbar user={auth.user} />

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

                    {/* Stats Card */}
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
