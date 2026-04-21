"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import AboutModal from "./AboutModal";

type SettingsProps = {
    name: string;
    headline: string;
    subtext: string;
    profileImage: string;
    whatsappNumber?: string;
    contactEmail?: string;
    githubUrl?: string;
    linkedinUrl?: string;
};

type AboutProps = {
    bio: string;
    mission: string;
};

export default function Hero({ settings, aboutSettings }: { settings: SettingsProps; aboutSettings?: AboutProps }) {
    const formattedNumber = settings.whatsappNumber?.replace(/[^a-zA-Z0-9]/g, "") || "";

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
                    {settings.name}
                </p>
                <h1 className="text-5xl md:text-7xl text-white font-serif tracking-tight leading-tight whitespace-pre-line">
                    {settings.headline}
                </h1>
                <div className="flex items-center space-x-4 pt-6">
                    <p className="text-gray-300 font-sans text-sm md:text-base md:max-w-md">
                        {settings.subtext}
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-8 flex flex-wrap items-center gap-4"
                >
                    {formattedNumber && (
                        <a
                            href={`https://wa.me/${formattedNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-full font-bold transition transform hover:scale-105"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"></path>
                            </svg>
                            <span>Chat on WhatsApp</span>
                        </a>
                    )}
                    {settings.contactEmail && (
                        <a
                            href={`mailto:${settings.contactEmail}`}
                            className="inline-flex items-center space-x-2 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-full font-bold transition transform hover:scale-105"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <span>Email Me</span>
                        </a>
                    )}
                    {aboutSettings && <AboutModal about={aboutSettings} />}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex justify-center space-x-6 mt-8"
                >
                    {settings.githubUrl && (
                        <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform hover:scale-110">
                            <span className="sr-only">GitHub</span>
                            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    )}
                    {settings.linkedinUrl && (
                        <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition transform hover:scale-110">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                            </svg>
                        </a>
                    )}
                </motion.div>
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
                        src={settings.profileImage}
                        alt={`${settings.name} - Profile`}
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
