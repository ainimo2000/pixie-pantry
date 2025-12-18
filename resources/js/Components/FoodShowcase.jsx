// FILE: resources/js/Components/FoodShowcase.jsx
// FIXED: Proper spacing between cards

import { motion } from "framer-motion";

export default function FoodShowcase() {
    return (
        <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="font-pixel text-4xl text-magical-dark mb-4">
                    LEGENDARY RECIPES
                </h2>
                <p className="text-gray-600 text-sm">
                    Scroll to discover pixel-perfect pastries
                </p>
            </div>

            <div className="space-y-40">
                {pastries.map(([image, name, description, hueA, hueB], i) => (
                    <FoodCard
                        key={i}
                        image={image}
                        name={name}
                        description={description}
                        hueA={hueA}
                        hueB={hueB}
                    />
                ))}
            </div>
        </div>
    );
}

function FoodCard({ image, name, description, hueA, hueB }) {
    const background = `linear-gradient(306deg, hsl(${hueA}, 100%, 50%), hsl(${hueB}, 100%, 50%))`;

    return (
        <motion.div
            className="relative flex justify-center"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
        >
            <div
                className="absolute w-full h-96"
                style={{ background, clipPath: `ellipse(60% 50% at 50% 50%)` }}
            />

            <motion.div
                variants={{
                    offscreen: { y: 100, opacity: 0, rotate: 0 },
                    onscreen: {
                        y: 0,
                        opacity: 1,
                        rotate: -10,
                        transition: {
                            type: "spring",
                            bounce: 0.4,
                            duration: 0.8,
                        },
                    },
                }}
                className="relative bg-white border-4 border-magical-border shadow-2xl w-80"
            >
                <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                    <h3 className="font-pixel text-lg text-magical-dark mb-2">
                        {name}
                    </h3>
                    <p className="text-xs text-gray-600">{description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

const pastries = [
    [
        "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg",
        "STRAWBERRY CAKE",
        "Legendary berry sweetness",
        340,
        10,
    ],
    [
        "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
        "APPLE FRANGIPAN",
        "Epic apple fusion",
        20,
        40,
    ],
    [
        "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
        "CHOCOLATE MOUSSE",
        "Rare chocolate delight",
        60,
        90,
    ],
    [
        "https://www.themealdb.com/images/media/meals/uuxwvq1483907861.jpg",
        "KEY LIME PIE",
        "Mythic citrus treasure",
        80,
        120,
    ],
];
