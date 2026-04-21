"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Faq = {
    id: string;
    question: string;
    answer: string;
};

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
    const [openId, setOpenId] = useState<string | null>(null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="py-24 px-8 lg:px-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-gray-500 font-sans tracking-widest uppercase text-sm mb-2">Clarity</p>
                    <h2 className="text-3xl md:text-5xl font-serif text-black dark:text-white">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black overflow-hidden">
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                            >
                                <span className="text-lg font-bold text-gray-900 dark:text-white">{faq.question}</span>
                                <svg
                                    className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${openId === faq.id ? "rotate-180" : ""}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
