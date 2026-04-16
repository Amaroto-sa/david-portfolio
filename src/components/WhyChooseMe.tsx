"use client";

import { motion } from "framer-motion";

const reasons = [
    "Fast delivery (24–72 hours)",
    "Clean modern design",
    "Affordable pricing",
    "Mobile-friendly"
];

export default function WhyChooseMe() {
    return (
        <section className="bg-gray-950 border-t border-b border-gray-900 py-24 px-8 lg:px-24 overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                    <div>
                        <p className="text-gray-400 font-sans tracking-widest uppercase text-sm mb-2">⚡ Why Choose Me</p>
                        <h2 className="text-3xl md:text-5xl font-serif text-white">Value Driven Designs</h2>
                    </div>

                    <ul className="space-y-4">
                        {reasons.map((reason, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="flex items-center space-x-4 text-lg text-gray-300"
                            >
                                <span className="text-green-500 font-bold">✓</span>
                                <span>{reason}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 relative"
                >
                    <div className="aspect-square bg-gray-900 rounded-2xl p-8 flex items-center justify-center border border-gray-800 shadow-2xl">
                        <div className="text-center space-y-4">
                            <h3 className="text-3xl font-serif text-white">Let's build trust.</h3>
                            <p className="text-gray-400">Professional branding directly translates to customer confidence.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
