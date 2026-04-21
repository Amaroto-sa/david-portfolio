"use client";

import { motion } from "framer-motion";

type Testimonial = {
    id: string;
    name: string;
    company: string;
    text: string;
    rating: number;
    imageUrl?: string | null;
};

function renderStars(rating: number) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<span key={i} className="text-yellow-500 text-xl">★</span>);
        } else if (i - 0.5 <= rating) {
            // Half star
            stars.push(
                <span key={i} className="relative inline-block text-xl">
                    <span className="absolute overflow-hidden w-1/2 text-yellow-500">★</span>
                    <span className="text-gray-300 dark:text-gray-800">★</span>
                </span>
            );
        } else {
            stars.push(<span key={i} className="text-gray-300 dark:text-gray-800 text-xl">★</span>);
        }
    }
    return <div className="flex space-x-1 mb-6 justify-center items-center">{stars} <span className="ml-2 text-sm text-gray-500 font-bold">{rating.toFixed(1)}</span></div>;
}

export default function Testimonials({ data }: { data: Testimonial[] }) {
    return (
        <section className="py-24 px-8 lg:px-24 bg-white dark:bg-black">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-gray-500 dark:text-gray-400 font-sans tracking-widest uppercase text-sm mb-2">★ Client Reviews</p>
                    <h2 className="text-3xl md:text-5xl font-serif text-black dark:text-white">What clients say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.id}
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
                            <div className="flex items-center space-x-4">
                                {testimonial.imageUrl ? (
                                    <img src={testimonial.imageUrl} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-800" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-lg font-bold text-gray-500">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                )}
                                <div className="text-left">
                                    <h4 className="font-bold text-black dark:text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
