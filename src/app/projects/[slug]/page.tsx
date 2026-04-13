import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/actions/projects";
import { notFound } from "next/navigation";

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black py-20 px-8 lg:px-24">
            <div className="max-w-4xl mx-auto space-y-8">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    &larr; Back to Portfolio
                </Link>
                <h1 className="text-4xl md:text-6xl font-serif text-white">{project.title}</h1>
                <div className="flex space-x-4 text-sm text-gray-400">
                    <p>Client: {project.client || "N/A"}</p>
                    <p>&bull;</p>
                    <p>{project.categories.join(", ")}</p>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed font-sans mt-8 whitespace-pre-wrap">
                    {project.description}
                </p>

                <div className="pt-12 space-y-8">
                    {project.galleryUrls.map((url, idx) => (
                        <div key={idx} className="w-full h-96 md:h-[32rem] bg-gray-900 rounded-lg overflow-hidden relative">
                            <Image src={url} alt={`${project.title} image ${idx + 1}`} layout="fill" objectFit="cover" />
                        </div>
                    ))}
                    {project.galleryUrls.length === 0 && (
                        <div className="w-full h-96 bg-gray-900 rounded-lg flex items-center justify-center text-gray-500 font-sans">
                            No gallery images provided.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
