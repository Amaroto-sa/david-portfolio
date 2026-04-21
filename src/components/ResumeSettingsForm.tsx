"use client";

import { useTransition, useState } from "react";
import { updateResumeData } from "@/actions/resume";

export default function ResumeSettingsForm({ initialData }: { initialData: any }) {
    const [isPending, startTransition] = useTransition();
    const [jsonError, setJsonError] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            // Validate JSON before submission
            JSON.parse(formData.get("experiences") as string);
            JSON.parse(formData.get("education") as string);
            JSON.parse(formData.get("skills") as string);
            setJsonError("");

            startTransition(() => {
                updateResumeData(formData);
            });
        } catch (err: any) {
            setJsonError("Invalid JSON format. Please check your brackets and quotes.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-black p-8 rounded-lg border border-gray-800">
            {jsonError && <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded">{jsonError}</div>}

            <input type="hidden" name="id" value={initialData?.id || ""} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                        name="fullName"
                        required
                        defaultValue={initialData?.fullName}
                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-white focus:outline-none transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Headline Role</label>
                    <input
                        name="role"
                        required
                        defaultValue={initialData?.role}
                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-white focus:outline-none transition"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Professional Summary</label>
                <textarea
                    name="summary"
                    required
                    rows={4}
                    defaultValue={initialData?.summary}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-white focus:outline-none transition leading-relaxed"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Experiences (JSON Array)</label>
                <textarea
                    name="experiences"
                    required
                    rows={8}
                    defaultValue={JSON.stringify(initialData?.experiences, null, 2)}
                    className="w-full bg-gray-900 font-mono text-sm border border-gray-700 rounded p-3 text-green-400 focus:border-white focus:outline-none transition"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Education (JSON Array)</label>
                <textarea
                    name="education"
                    required
                    rows={6}
                    defaultValue={JSON.stringify(initialData?.education, null, 2)}
                    className="w-full bg-gray-900 font-mono text-sm border border-gray-700 rounded p-3 text-green-400 focus:border-white focus:outline-none transition"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Skills (JSON Array)</label>
                <textarea
                    name="skills"
                    required
                    rows={8}
                    defaultValue={JSON.stringify(initialData?.skills, null, 2)}
                    className="w-full bg-gray-900 font-mono text-sm border border-gray-700 rounded p-3 text-green-400 focus:border-white focus:outline-none transition"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-black font-bold py-3 rounded mt-4 hover:bg-gray-200 transition disabled:opacity-50"
            >
                {isPending ? "Saving..." : "Save Resume Document"}
            </button>
        </form>
    );
}
