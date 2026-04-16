"use client";

import { motion } from "framer-motion";

const services = [
    { title: "Website Design", desc: "Mobile-friendly, lightning-fast, and conversion-optimized websites that build trust." },
    { title: "Landing Pages", desc: "High-converting single-page designs crafted specifically to turn your visitors into real customers." },
    { title: "Logo & Branding", desc: "Clean, modern, and professional logos that define your brand identity and set you apart." }
];

export default function ServicesSection() {
    return (
        <section className="bg-black py-24 px-8 lg:px-24">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <p className="text-gray-400 font-sans tracking-widest uppercase text-sm mb-2">My Services</p>
                    <h2 className="text-3xl md:text-5xl font-serif text-white">What I Can Do For You</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-gray-900 border border-gray-800 p-8 rounded-lg hover:border-white transition-colors"
                        >
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                                {index + 1}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
