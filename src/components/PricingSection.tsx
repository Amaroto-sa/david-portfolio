"use client";

import { motion } from "framer-motion";

const pricingPlans = [
    { name: "Basic", price: "$100" },
    { name: "Pro", price: "$150" },
    { name: "Premium", price: "$300" },
    { name: "Ultra", price: "$600" },
];

export default function PricingSection() {
    return (
        <section className="py-24 px-8 lg:px-24 bg-gray-50 dark:bg-gray-950 border-t border-b border-gray-200 dark:border-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-gray-500 dark:text-gray-400 font-sans tracking-widest uppercase text-sm mb-2">Investment</p>
                    <h2 className="text-3xl md:text-5xl font-serif text-black dark:text-white">Pricing Packages</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pricingPlans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-8 rounded-xl text-center shadow-sm hover:border-green-500 dark:hover:border-green-500 transition-colors"
                        >
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{plan.name}</h3>
                            <div className="text-3xl font-bold text-black dark:text-white">{plan.price}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-500 dark:text-gray-400 italic">
                        "Prices may vary depending on project requirements."
                    </p>
                </div>
            </div>
        </section>
    );
}
