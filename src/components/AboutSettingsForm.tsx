"use client";

import { useTransition } from "react";
import { updateAboutSettings } from "@/actions/about";

export default function AboutSettingsForm({ initialData }: { initialData: any }) {
    const [isPending, startTransition] = useTransition();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => {
            updateAboutSettings(formData);
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-black p-8 rounded-lg border border-gray-800">
            <input type="hidden" name="id" value={initialData?.id || ""} />

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Detailed Biography</label>
                <textarea
                    name="bio"
                    required
                    rows={6}
                    defaultValue={initialData?.bio}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-white focus:outline-none transition leading-relaxed"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Mission Statement</label>
                <textarea
                    name="mission"
                    required
                    rows={4}
                    defaultValue={initialData?.mission}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-white focus:outline-none transition leading-relaxed"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-black font-bold py-3 rounded mt-4 hover:bg-gray-200 transition disabled:opacity-50"
            >
                {isPending ? "Saving..." : "Save About Settings"}
            </button>
        </form>
    );
}
