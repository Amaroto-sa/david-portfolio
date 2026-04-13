"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-between px-8 py-20 lg:px-24">
            {/* Text Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 space-y-6"
            >
                <p className="text-gray-400 font-sans tracking-widest uppercase text-sm">
                    David
                </p>
                <h1 className="text-5xl md:text-7xl text-white font-serif tracking-tight leading-tight">
                    Welcome to My<br />Design Portfolio
                </h1>
                <div className="flex items-center space-x-4 pt-6">
                    <p className="text-gray-300 font-sans text-sm md:text-base">
                        Work with me today
                    </p>
                    {/* Minimalist Curved Arrow */}
                    <motion.svg
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ repeat: Infinity, duration: 1.8, repeatType: "reverse", ease: "easeInOut" }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 40 40"
                        stroke="currentColor"
                    >
                        {/* Curved arc path */}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 28 C 10 10, 30 8, 32 14"
                        />
                        {/* Small arrowhead at end of curve */}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M28 10 L32 14 L27 16"
                        />
                    </motion.svg>
                </div>
            </motion.div>

            {/* Profile Image with Classic Portrait Oval Masking */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex-1 flex justify-center md:justify-end mt-12 md:mt-0"
            >
                <div className="relative w-64 h-80 md:w-80 md:h-[28rem] overflow-hidden rounded-[50%] border border-gray-800 shadow-2xl">
                    <Image
                        src="/images/profile.jpg"
                        alt="David - Web and Graphic Designer"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 256px, 320px"
                    />
                </div>
            </motion.div>
        </section>
    );
}
