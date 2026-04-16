import { getInquiries } from "@/actions/contact";
import InquiryCard from "@/components/InquiryCard";

export default async function InquiriesPage() {
    const inquiries = await getInquiries();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Client Inquiries</h1>
            {inquiries.length === 0 ? (
                <p className="text-gray-500">No inquiries yet.</p>
            ) : (
                <div className="grid gap-6">
                    {inquiries.map((inq) => (
                        <InquiryCard key={inq.id} inquiry={inq} />
                    ))}
                </div>
            )}
        </div>
    );
}
