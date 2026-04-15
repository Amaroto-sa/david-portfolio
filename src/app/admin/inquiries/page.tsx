import { getInquiries } from "@/actions/contact";

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
                        <div key={inq.id} className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-white text-lg">{inq.name}</h3>
                                    <a href={`mailto:${inq.email}`} className="text-green-500 text-sm hover:underline">{inq.email}</a>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {new Date(inq.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-300 bg-black p-4 rounded whitespace-pre-wrap">{inq.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
