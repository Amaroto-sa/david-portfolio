import Link from "next/link";
import { getTestimonials } from "@/actions/testimonials";
import DeleteButton from "@/components/DeleteButton";
import { deleteTestimonial } from "@/actions/testimonials";

export default async function TestimonialsAdminPage() {
    const testimonials = await getTestimonials();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Manage Testimonials</h1>
                <Link href="/admin/testimonials/new" className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition">
                    + Add Testimonial
                </Link>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-900 text-gray-400">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Review Text</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 text-gray-300">
                        {testimonials.map((t) => (
                            <tr key={t.id} className="hover:bg-gray-900/50 transition">
                                <td className="p-4 font-medium text-white">{t.name}</td>
                                <td className="p-4 truncate max-w-xs">{t.text}</td>
                                <td className="p-4 text-yellow-500">{"★".repeat(t.rating)}</td>
                                <td className="p-4 text-right space-x-3">
                                    <Link href={`/admin/testimonials/edit/${t.id}`} className="text-blue-400 hover:underline">
                                        Edit
                                    </Link>
                                    <form action={deleteTestimonial.bind(null, t.id)} className="inline-block">
                                        <DeleteButton />
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {testimonials.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">No testimonials found. Add some!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
