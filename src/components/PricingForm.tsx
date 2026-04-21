"use client";

import { useTransition } from "react";
import { createPricingPlan, updatePricingPlan } from "@/actions/pricing";

type Props = {
    mode?: "create" | "edit";
    planId?: string;
    initialData?: {
        name: string;
        price: string;
        order: number;
    };
};

export default function PricingForm({ mode = "create", planId, initialData }: Props) {
    const [isPending, startTransition] = useTransition();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(() => {
            if (mode === "edit" && planId) {
                updatePricingPlan(planId, formData);
            } else {
                createPricingPlan(formData);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-black p-8 rounded-lg border border-gray-800">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Plan Name (e.g., Basic, Pro, Ultra)</label>
                <input
                    name="name"
                    required
                    defaultValue={initialData?.name}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-white focus:outline-none transition"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price Value (e.g., $100)</label>
                <input
                    name="price"
                    required
                    defaultValue={initialData?.price}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-white focus:outline-none transition"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Order (1 = First, 2 = Second)</label>
                <input
                    name="order"
                    type="number"
                    step="1"
                    required
                    defaultValue={initialData?.order || 0}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-white focus:outline-none transition"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-black font-bold py-3 rounded mt-4 hover:bg-gray-200 transition disabled:opacity-50"
            >
                {isPending ? "Saving..." : mode === "create" ? "Create Pricing Plan" : "Save Changes"}
            </button>
        </form>
    );
}
