import Link from "next/link";
import { getProcessSteps, deleteProcessStep } from "@/actions/process";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminProcessPage() {
    const steps = await getProcessSteps();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Manage Workflows / Processes</h1>
                <Link href="/admin/process/new" className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition">
                    + Add Step
                </Link>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-900 text-gray-400">
                        <tr>
                            <th className="p-4">Order</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Description Snippet</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 text-gray-300">
                        {steps.map((s) => (
                            <tr key={s.id} className="hover:bg-gray-900/50 transition">
                                <td className="p-4 font-bold text-gray-500">{s.order}</td>
                                <td className="p-4 font-medium text-white max-w-xs truncate">{s.title}</td>
                                <td className="p-4 max-w-xs truncate">{s.description}</td>
                                <td className="p-4 text-right">
                                    <form action={deleteProcessStep.bind(null, s.id)} className="inline-block">
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
