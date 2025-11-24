import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", "sans-serif"],
                pixel: ['"Press Start 2P"', "cursive"],
            },
            boxShadow: {
                // Hard candy shadows
                pixel: "6px 6px 0px 0px #8B008B", // Dark Magenta shadow
                "pixel-sm": "3px 3px 0px 0px #8B008B",
            },
            colors: {
                // YOUR NEW PALETTE
                "magical-bg": "#FFE4E1", // Misty Rose (Background)
                "magical-dark": "#4B0082", // Indigo/Deep Violet (Text)
                "magical-border": "#8B008B", // Dark Magenta (Borders)
                "magical-pink": "#FF69B4", // Hot Pink (Buttons)
                "magical-card": "#FFF0F5", // Lavender Blush (Card BG)
            },
            backgroundImage: {
                // A cute dot pattern for the background
                "pixel-pattern":
                    "radial-gradient(#FF69B4 15%, transparent 16%), radial-gradient(#FF69B4 15%, transparent 16%)",
            },
        },
    },
    plugins: [forms],
};
