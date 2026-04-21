import TestimonialForm from "@/components/TestimonialForm";
import Link from "next/link";

export default function NewTestimonialPage() {
    return (
        <div>
            <div className="mb-8">
                <Link href="/admin/testimonials" className="text-gray-400 hover:text-white transition">
                    ← Back to Testimonials
                </Link>
                <h1 className="text-3xl font-bold text-white mt-4">Add New Testimonial</h1>
            </div>

            <TestimonialForm />
        </div>
    );
}
