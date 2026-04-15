"use client";

import { useState } from "react";
import { submitInquiry } from "@/actions/contact";
import { motion } from "framer-motion";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const res = await submitInquiry(formData);

        if (res?.error) {
            setStatus("error");
            setMessage(res.error);
        } else {
            setStatus("success");
            setMessage("Message sent successfully! I will get back to you shortly.");
            (e.target as HTMLFormElement).reset();
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-24 px-8 lg:px-24 transition-colors duration-500">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
                <div className="flex-1 space-y-6">
                    <p className="text-gray-500 dark:text-gray-400 font-sans tracking-widest uppercase text-sm mb-2">✉️ Contact Me</p>
                    <h2 className="text-3xl md:text-5xl font-serif text-black dark:text-white">Let's start a project together</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Fill out the form with the details of your project. I will review it and get back to you with a direct plan of action. No spam, just serious business.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 bg-white dark:bg-black p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                            <input name="name" required className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:border-green-500 focus:outline-none transition" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input type="email" name="email" required className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:border-green-500 focus:outline-none transition" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Enquiry</label>
                            <textarea name="message" required rows={4} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:border-green-500 focus:outline-none transition" placeholder="I need a completely new branding strategy..."></textarea>
                        </div>

                        <button type="submit" disabled={status === "loading"} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50">
                            {status === "loading" ? "Sending..." : "Send Message"}
                        </button>

                        {status === "error" && <p className="text-red-500 text-sm mt-4 text-center">{message}</p>}
                        {status === "success" && <p className="text-green-500 text-sm mt-4 text-center">{message}</p>}
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
