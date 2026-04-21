"use client";

import { useState, useTransition } from "react";
import { createTestimonial, updateTestimonial } from "@/actions/testimonials";
import { CldUploadWidget } from "next-cloudinary";

type Props = {
    mode?: "create" | "edit";
    testimonialId?: string;
    initialData?: {
        name: string;
        company: string;
        text: string;
        rating: number;
        imageUrl?: string | null;
    };
};

export default function TestimonialForm({ mode = "create", testimonialId, initialData }: Props) {
    const [isPending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState<string | null>(initialData?.imageUrl || null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (imageUrl) formData.set("imageUrl", imageUrl);

        startTransition(() => {
            if (mode === "edit" && testimonialId) {
                updateTestimonial(testimonialId, formData);
            } else {
                createTestimonial(formData);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-black p-8 rounded-lg border border-gray-800">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reviewer Profile Image</label>
                <div className="flex items-center space-x-4">
                    {imageUrl && (
                        <img src={imageUrl} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-gray-700" />
                    )}
                    <CldUploadWidget
                        uploadPreset="ml_default"
                        onSuccess={(result: any) => {
                            if (result.info?.secure_url) {
                                setImageUrl(result.info.secure_url);
                            }
                        }}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                onClick={() => open?.()}
                                className="bg-gray-800 text-sm hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border border-gray-700 transition"
                            >
                                {imageUrl ? "Change Image" : "Upload Image"}
                            </button>
                        )}
                    </CldUploadWidget>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reviewer Name</label>
                <input
                    name="name"
                    required
                    defaultValue={initialData?.name || "Client"}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reviewer Title/Company</label>
                <input
                    name="company"
                    required
                    defaultValue={initialData?.company || "Verified Review"}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rating (1-5)</label>
                <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    required
                    defaultValue={initialData?.rating || 5}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Review Text</label>
                <textarea
                    name="text"
                    required
                    rows={4}
                    defaultValue={initialData?.text || ""}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                    placeholder="Clean design and fast delivery. Highly recommend."
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-black font-bold py-3 rounded mt-6 hover:bg-gray-200 transition disabled:opacity-50"
            >
                {isPending ? "Saving..." : mode === "edit" ? "Update Testimonial" : "Save Testimonial"}
            </button>
        </form>
    );
}
