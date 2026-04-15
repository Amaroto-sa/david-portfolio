"use client";

import { motion } from "framer-motion";

const skills = [
    "Figma", "UI/UX Design", "Wireframing", "Prototyping", "Adobe Photoshop",
    "Illustrator", "Brand Identity", "Web Design", "Responsive Layouts",
    "Tailwind CSS", "React", "Next.js", "Creative Direction", "Typography"
];

export default function SkillsMarquee() {
    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex space-x-8 whitespace-nowrap">
                <motion.div
                    className="flex space-x-12 min-w-max items-center"
                    animate={{ x: [0, -1035] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear"
                        }
                    }}
                >
                    {/* Render the list twice for seamless infinite scrolling */}
                    {[...skills, ...skills, ...skills].map((skill, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <span className="text-xl md:text-2xl font-sans font-bold text-gray-300 dark:text-gray-700 tracking-wider uppercase">
                                {skill}
                            </span>
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
