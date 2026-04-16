"use client";

import { useState, useTransition } from "react";
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
        isPublished?: boolean;
        isFeatured?: boolean;
    };
};

export default function ProjectForm({ mode = "create", projectId, initialData }: ProjectFormProps) {
    const [galleryUrls, setGalleryUrls] = useState<string[]>(initialData?.galleryUrls || []);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(initialData?.thumbnailUrl || null);
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [isPending, startTransition] = useTransition();

    // Auto-generate slug from title
    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (mode === "create") {
            const autoSlug = e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .trim();
            setSlug(autoSlug);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            if (mode === "edit" && projectId) {
                await updateProject(projectId, formData, galleryUrls, thumbnailUrl);
            } else {
                await createProject(formData, galleryUrls, thumbnailUrl);
            }
        });
    }

    function removeImage(index: number) {
        const removedUrl = galleryUrls[index];
        setGalleryUrls(prev => prev.filter((_, i) => i !== index));
        // If we removed the thumbnail, reset it
        if (removedUrl === thumbnailUrl) {
            const remaining = galleryUrls.filter((_, i) => i !== index);
            setThumbnailUrl(remaining.length > 0 ? remaining[0] : null);
        }
    }

    function selectThumbnail(url: string) {
        setThumbnailUrl(url);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-black p-8 rounded-lg border border-gray-800">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
                <input
                    name="title"
                    required
                    defaultValue={initialData?.title || ""}
                    onChange={handleTitleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-white focus:outline-none transition"
                    placeholder="Awesome Branding"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Slug (URL) — auto-generated from title</label>
                <input
                    name="slug"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
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
                    <div className="mt-4">
                        <p className="text-xs text-gray-500 mb-2">Click an image to set it as the thumbnail (highlighted in green)</p>
                        <div className="flex gap-2 flex-wrap">
                            {galleryUrls.map((url, i) => (
                                <div
                                    key={i}
                                    className={`relative group cursor-pointer rounded border-2 ${url === thumbnailUrl ? "border-green-500" : "border-gray-700"}`}
                                    onClick={() => selectThumbnail(url)}
                                >
                                    <img src={url} alt="upload" className="w-24 h-24 object-cover rounded" />
                                    {url === thumbnailUrl && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-black text-[10px] text-center font-bold py-0.5">
                                            THUMBNAIL
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex space-x-8">
                <label className="flex items-center space-x-2 text-sm text-gray-300">
                    <input
                        type="checkbox"
                        name="isPublished"
                        defaultChecked={initialData?.isPublished ?? true}
                        className="w-4 h-4 text-green-500 focus:ring-green-500 bg-gray-900 border-gray-700 rounded"
                    />
                    <span>Publish (Live to Public)</span>
                </label>

                <label className="flex items-center space-x-2 text-sm text-gray-300">
                    <input
                        type="checkbox"
                        name="isFeatured"
                        defaultChecked={initialData?.isFeatured ?? false}
                        className="w-4 h-4 text-yellow-500 focus:ring-yellow-500 bg-gray-900 border-gray-700 rounded"
                    />
                    <span>Featured (Pin to Top)</span>
                </label>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-black font-bold py-3 rounded mt-6 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? "Saving..." : mode === "edit" ? "Update Project" : "Save Project"}
            </button>
        </form>
    );
}
