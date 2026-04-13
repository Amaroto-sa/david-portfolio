"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { createProject, updateProject } from "@/actions/projects";

type ProjectFormProps = {
    mode?: "create" | "edit";
    projectId?: string;
    initialData?: {
        title: string;
        slug: string;
        description: string;
        client: string;
        categories: string[];
        thumbnailUrl: string | null;
        galleryUrls: string[];
    };
};

export default function ProjectForm({ mode = "create", projectId, initialData }: ProjectFormProps) {
    const [galleryUrls, setGalleryUrls] = useState<string[]>(initialData?.galleryUrls || []);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(initialData?.thumbnailUrl || null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (mode === "edit" && projectId) {
            await updateProject(projectId, formData, galleryUrls, thumbnailUrl);
        } else {
            await createProject(formData, galleryUrls, thumbnailUrl);
        }
    }

    function removeImage(index: number) {
        setGalleryUrls(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-black p-8 rounded-lg border border-gray-800">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
                <input
                    name="title"
                    required
                    defaultValue={initialData?.title || ""}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-white focus:outline-none transition"
                    placeholder="Awesome Branding"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Slug (URL)</label>
                <input
                    name="slug"
                    required
                    defaultValue={initialData?.slug || ""}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-white focus:outline-none transition"
                    placeholder="awesome-branding"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Client</label>
                <input
                    name="client"
                    defaultValue={initialData?.client || ""}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-white focus:outline-none transition"
                    placeholder="Acme Corp"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Categories (comma separated)</label>
                <input
                    name="categories"
                    defaultValue={initialData?.categories?.join(", ") || ""}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-white focus:outline-none transition"
                    placeholder="UI/UX Design, Brand Identity, Web Development, Marketing Graphics"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                    name="description"
                    required
                    rows={6}
                    defaultValue={initialData?.description || ""}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-white focus:outline-none transition"
                    placeholder="Describe the design problem and your solution..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Upload Images</label>
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    signatureEndpoint="/api/upload"
                    onSuccess={(result) => {
                        if (typeof result.info === 'object' && result.info !== null && 'secure_url' in result.info) {
                            const url = result.info.secure_url as string;
                            setGalleryUrls((prev) => [...prev, url]);
                            if (!thumbnailUrl) setThumbnailUrl(url);
                        }
                    }}
                >
                    {({ open }) => (
                        <button type="button" onClick={() => open()} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                            Upload via Cloudinary
                        </button>
                    )}
                </CldUploadWidget>

                {galleryUrls.length > 0 && (
                    <div className="flex gap-2 mt-4 flex-wrap">
                        {galleryUrls.map((url, i) => (
                            <div key={i} className="relative group">
                                <img src={url} alt="upload" className="w-24 h-24 object-cover rounded border border-gray-700" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded mt-6 hover:bg-gray-200 transition">
                {mode === "edit" ? "Update Project" : "Save Project"}
            </button>
        </form>
    );
}
