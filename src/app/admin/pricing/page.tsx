import Link from "next/link";
import { getPricingPlans, deletePricingPlan } from "@/actions/pricing";
import DeleteButton from "@/components/DeleteButton";

export default async function PricingAdminPage() {
    const plans = await getPricingPlans();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Manage Pricing Plans</h1>
                <Link href="/admin/pricing/new" className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition">
                    + Add Plan
                </Link>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-900 text-gray-400">
                        <tr>
                            <th className="p-4">Order Index</th>
                            <th className="p-4">Plan Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 text-gray-300">
                        {plans.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-900/50 transition">
                                <td className="p-4 font-bold text-gray-500">{p.order}</td>
                                <td className="p-4 font-medium text-white">{p.name}</td>
                                <td className="p-4 text-green-400 font-bold">{p.price}</td>
                                <td className="p-4 text-right space-x-3">
                                    <Link href={`/admin/pricing/edit/${p.id}`} className="text-blue-400 hover:underline">
                                        Edit
                                    </Link>
                                    <form action={deletePricingPlan.bind(null, p.id)} className="inline-block">
                                        <DeleteButton />
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {plans.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">No pricing plans found. Generate default ones by visiting the live homepage!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
