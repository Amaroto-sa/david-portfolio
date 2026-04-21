"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Client",
        company: "Verified Review",
        text: "Clean design and fast delivery. Highly recommend.",
        rating: 5
    },
    {
        name: "Client",
        company: "Verified Review",
        text: "Very professional and easy to work with.",
        rating: 5
    },
    {
        name: "Client",
        company: "Verified Review",
        text: "Great communication and quality work.",
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 px-8 lg:px-24 bg-white dark:bg-black">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-gray-500 dark:text-gray-400 font-sans tracking-widest uppercase text-sm mb-2">★ Client Reviews</p>
                    <h2 className="text-3xl md:text-5xl font-serif text-black dark:text-white">What clients say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-2xl flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex space-x-1 mb-4 text-yellow-500">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
                                    "{testimonial.text}"
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold text-gray-800 dark:text-white">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-black dark:text-white text-sm">{testimonial.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
