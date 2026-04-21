import TestimonialForm from "@/components/TestimonialForm";
import { getTestimonialById } from "@/actions/testimonials";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
    const testimonial = await getTestimonialById(params.id);

    if (!testimonial) {
        redirect("/admin/testimonials");
    }

    const { id, ...initialData } = testimonial;

    return (
        <div>
            <div className="mb-8">
                <Link href="/admin/testimonials" className="text-gray-400 hover:text-white transition">
                    ← Back to Testimonials
                </Link>
                <h1 className="text-3xl font-bold text-white mt-4">Edit Testimonial</h1>
            </div>

            <TestimonialForm mode="edit" testimonialId={id} initialData={initialData} />
        </div>
    );
}
