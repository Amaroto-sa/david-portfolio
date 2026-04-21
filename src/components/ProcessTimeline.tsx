"use client";

import { motion } from "framer-motion";

type Step = {
    id: string;
    title: string;
    description: string;
    order: number;
};

export default function ProcessTimeline({ steps }: { steps: Step[] }) {
    if (!steps || steps.length === 0) return null;

    return (
        <section className="py-24 px-8 lg:px-24 bg-white dark:bg-black transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-gray-500 font-sans tracking-widest uppercase text-sm mb-2">Workflow</p>
                    <h2 className="text-3xl md:text-5xl font-serif text-black dark:text-white">How I Work</h2>
                </div>

                <div className="space-y-12 relative border-l border-gray-200 dark:border-gray-800 ml-4 md:ml-8">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute w-6 h-6 bg-green-500 rounded-full -left-[13px] top-1 border-4 border-white dark:border-black shadow"></div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                <span className="text-green-500 mr-2">0{idx + 1}.</span> {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
