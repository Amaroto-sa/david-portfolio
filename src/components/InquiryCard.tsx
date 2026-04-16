"use client";

import { useTransition } from "react";
import { deleteInquiry, markInquiryRead } from "@/actions/contact";

interface InquiryProps {
    inquiry: {
        id: string;
        name: string;
        email: string;
        message: string;
        isRead: boolean;
        createdAt: Date;
    };
}

export default function InquiryCard({ inquiry }: InquiryProps) {
    const [isPending, startTransition] = useTransition();

    function handleMarkRead() {
        startTransition(async () => {
            await markInquiryRead(inquiry.id);
        });
    }

    function handleDelete() {
        if (confirm("Are you sure you want to delete this message?")) {
            startTransition(async () => {
                await deleteInquiry(inquiry.id);
            });
        }
    }

    return (
        <div className={`border p-6 rounded-lg transition ${inquiry.isRead ? "bg-gray-900 border-gray-800 opacity-60" : "bg-black border-green-500 shadow-lg shadow-green-900/20"}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-white text-lg flex items-center space-x-2">
                        <span>{inquiry.name}</span>
                        {!inquiry.isRead && <span className="bg-green-500 text-black text-xs px-2 py-0.5 rounded-full font-bold">NEW</span>}
                    </h3>
                    <a href={`mailto:${inquiry.email}`} className="text-green-500 text-sm hover:underline">{inquiry.email}</a>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <span className="text-xs text-gray-500">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2 text-xs font-bold">
                        {!inquiry.isRead && (
                            <button
                                onClick={handleMarkRead}
                                disabled={isPending}
                                className="bg-gray-800 text-white hover:bg-gray-700 px-3 py-1 rounded transition disabled:opacity-50"
                            >
                                Mark Read
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            disabled={isPending}
                            className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-3 py-1 rounded transition disabled:opacity-50"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <p className="text-gray-300 bg-gray-900/50 p-4 rounded whitespace-pre-wrap">{inquiry.message}</p>
        </div>
    );
}
