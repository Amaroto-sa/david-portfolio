"use client";

import { useState, useTransition } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { updateSiteSettings } from "@/actions/settings";

type SettingsFormProps = {
    settings: {
        id: string;
        name: string;
        headline: string;
        subtext: string;
        profileImage: string;
        whatsappNumber: string;
        contactEmail: string;
    };
};

export default function SettingsForm({ settings }: SettingsFormProps) {
    const [profileImage, setProfileImage] = useState(settings.profileImage);
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            await updateSiteSettings(formData, profileImage);
            alert("Settings saved successfully!");
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-black p-8 rounded-lg border border-gray-800">
            <input type="hidden" name="id" value={settings.id} />

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                <input
                    name="name"
                    required
                    defaultValue={settings.name}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-white focus:outline-none transition"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Main Headline</label>
                <textarea
                    name="headline"
                    required
                    rows={3}
                    defaultValue={settings.headline}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-white focus:outline-none transition"
                />
                <p className="text-xs text-gray-500 mt-1">Note: You can use line breaks (Enter) to format the headline</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Call to Action Subtext</label>
                <input
                    name="subtext"
                    required
                    defaultValue={settings.subtext}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-white focus:outline-none transition"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp Number (For Floating Button)</label>
                <input
                    name="whatsappNumber"
                    required
                    defaultValue={settings.whatsappNumber}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-white focus:outline-none transition"
                    placeholder="+2349045729555"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email (Home Banner)</label>
                <input
                    name="contactEmail"
                    required
                    defaultValue={settings.contactEmail}
                    type="email"
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-white focus:outline-none transition"
                    placeholder="hello@example.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
                <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 relative overflow-hidden rounded-[50%] border-2 border-gray-700">
                        <img src={profileImage} alt="Profile" className="object-cover w-full h-full" />
                    </div>

                    <CldUploadWidget
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                        signatureEndpoint="/api/upload"
                        onSuccess={(result) => {
                            if (typeof result.info === 'object' && result.info !== null && 'secure_url' in result.info) {
                                setProfileImage(result.info.secure_url as string);
                            }
                        }}
                    >
                        {({ open }) => (
                            <button type="button" onClick={() => open()} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                                Upload New Image
                            </button>
                        )}
                    </CldUploadWidget>
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-black font-bold py-3 rounded mt-6 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? "Saving..." : "Save Settings"}
            </button>
        </form>
    );
}
