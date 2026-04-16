"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type SettingsProps = {
    name: string;
    headline: string;
    subtext: string;
    profileImage: string;
    whatsappNumber?: string;
};

export default function Hero({ settings }: { settings: SettingsProps }) {
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

                {formattedNumber && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="pt-8"
                    >
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
                    </motion.div>
                )}
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
