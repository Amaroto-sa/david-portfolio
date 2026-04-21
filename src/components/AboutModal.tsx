"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AboutProps = {
    bio: string;
    mission: string;
};

export default function AboutModal({ about }: { about: AboutProps }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="hidden md:inline-flex items-center space-x-2 bg-transparent border border-gray-600 hover:border-white text-gray-300 hover:text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 ml-4"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>About Me</span>
            </button>

            {/* Mobile simplified button for header/footer injection if needed */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden mt-4 inline-flex items-center space-x-2 bg-gray-900 border border-gray-700 text-white px-6 py-3 rounded-full font-bold transition w-full justify-center"
            >
                <span>Read About Me</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl w-full relative shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black rounded-full p-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <h2 className="text-3xl font-serif text-white mb-6">About Me</h2>

                            <div className="space-y-6 text-gray-300 leading-relaxed">
                                <div>
                                    <h3 className="text-sm tracking-widest uppercase text-gray-500 mb-2 font-bold">My Background</h3>
                                    <p className="text-lg">{about.bio}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm tracking-widest uppercase text-green-500 mb-2 font-bold">The Mission</h3>
                                    <p className="text-lg italic border-l-4 border-green-500 pl-4 py-1">{about.mission}</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
                                <a
                                    href="/resume"
                                    className="inline-flex items-center space-x-2 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full font-bold transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>View Full Resume</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
