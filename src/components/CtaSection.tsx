"use client";

import { motion } from "framer-motion";

export default function CtaSection({ whatsappNumber }: { whatsappNumber: string }) {
    if (!whatsappNumber) return null;
    const formattedNumber = whatsappNumber.replace(/[^a-zA-Z0-9]/g, "");

    return (
        <section className="bg-black py-32 px-8 lg:px-24">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
                        Ready to upgrade your business image?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Message me on WhatsApp to get started 👇🏽<br />
                        <span className="text-gray-500 text-base mt-2 block">I can also create a quick preview for your business.</span>
                    </p>

                    <a
                        href={`https://wa.me/${formattedNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full transition transform hover:scale-105"
                    >
                        Contact on WhatsApp: {whatsappNumber}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
