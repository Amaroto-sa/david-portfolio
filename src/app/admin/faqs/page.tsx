import Link from "next/link";
import { getFaqItems, deleteFaq } from "@/actions/faq";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminFaqsPage() {
    const faqs = await getFaqItems();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Manage FAQs</h1>
                <Link href="/admin/faqs/new" className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition">
                    + Add FAQ
                </Link>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-900 text-gray-400">
                        <tr>
                            <th className="p-4">Order</th>
                            <th className="p-4">Question</th>
                            <th className="p-4">Answer Snippet</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 text-gray-300">
                        {faqs.map((f) => (
                            <tr key={f.id} className="hover:bg-gray-900/50 transition">
                                <td className="p-4 font-bold text-gray-500">{f.order}</td>
                                <td className="p-4 font-medium text-white max-w-xs truncate">{f.question}</td>
                                <td className="p-4 max-w-xs truncate">{f.answer}</td>
                                <td className="p-4 text-right">
                                    <form action={deleteFaq.bind(null, f.id)} className="inline-block">
                                        <DeleteButton />
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
