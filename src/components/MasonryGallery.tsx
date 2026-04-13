"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Project = {
    id: string;
    title: string;
    slug: string;
    thumbnailUrl: string | null;
    galleryUrls: string[];
};

export default function MasonryGallery({ initialProjects = [] }: { initialProjects?: Project[] }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // In a real app we'd determine aspect ratio before hand, for now we randomize or fixed
    const aspects = ["aspect-square", "aspect-[3/4]", "aspect-video"];

    return (
        <div className="bg-black py-20 px-8 lg:px-24">
            {initialProjects.length === 0 ? (
                <p className="text-center text-gray-500">No projects yet.</p>
            ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {initialProjects.map((project, idx) => {
                        const aspect = aspects[idx % aspects.length];
                        const displayImage = project.thumbnailUrl || (project.galleryUrls.length > 0 ? project.galleryUrls[0] : null);

                        return (
                            <motion.div
                                key={project.id}
                                whileHover={{ scale: 1.02 }}
                                className={`relative overflow-hidden cursor-pointer ${aspect} break-inside-avoid bg-gray-900 rounded-lg group`}
                                onClick={() => displayImage && setSelectedImage(displayImage)}
                            >
                                {displayImage ? (
                                    <>
                                        <Image
                                            src={displayImage}
                                            alt={project.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg transition"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center opacity-0 group-hover:opacity-100 flex-col">
                                            <p className="text-white font-bold text-lg">{project.title}</p>
                                            <Link href={`/projects/${project.slug}`} onClick={(e) => e.stopPropagation()} className="mt-2 text-sm text-gray-300 hover:text-white underline">
                                                Read Case Study
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-sm p-4 text-center">
                                        <p>{project.title}</p>
                                        <Link href={`/projects/${project.slug}`} onClick={(e) => e.stopPropagation()} className="mt-2 text-sm text-blue-400 hover:underline">
                                            View Project
                                        </Link>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full max-w-5xl h-[80vh]"
                        >
                            <Image
                                src={selectedImage}
                                alt="Selected"
                                layout="fill"
                                objectFit="contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
