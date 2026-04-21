"use client";

import { useTransition } from "react";
import { createFaq } from "@/actions/faq";

export default function FaqForm() {
    const [isPending, startTransition] = useTransition();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => {
            createFaq(formData);
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-black p-8 rounded-lg border border-gray-800">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
                <input
                    name="question"
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-white focus:outline-none transition"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Answer</label>
                <textarea
                    name="answer"
                    required
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-white focus:outline-none transition leading-relaxed"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Order (e.g. 1, 2, 3)</label>
                <input
                    name="order"
                    type="number"
                    required
                    defaultValue={0}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-white focus:outline-none transition"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-black font-bold py-3 rounded mt-4 hover:bg-gray-200 transition disabled:opacity-50"
            >
                {isPending ? "Creating..." : "Create FAQ"}
            </button>
        </form>
    );
}
