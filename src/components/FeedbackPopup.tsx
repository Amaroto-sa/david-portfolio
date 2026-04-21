"use client";

import { useState, useTransition } from "react";
import { submitFeedback } from "@/actions/testimonials";

export default function FeedbackPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [rating, setRating] = useState(5.0);
    const [isPending, startTransition] = useTransition();

    if (isSubmitted) {
        return (
            <div className="fixed bottom-6 left-6 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="font-medium">Thanks for your feedback!</div>
                <button onClick={() => setIsSubmitted(false)} className="ml-4 opacity-70 hover:opacity-100">×</button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition-transform px-6 py-3 rounded-full shadow-lg font-bold flex items-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                    <span>Rate Service</span>
                </button>
            ) : (
                <div className="bg-white dark:bg-black w-80 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col p-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg dark:text-white">Leave Feedback</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            ✕
                        </button>
                    </div>

                    <form action={(formData) => {
                        startTransition(() => {
                            submitFeedback(formData).then(() => {
                                setIsOpen(false);
                                setIsSubmitted(true);
                            });
                        });
                    }} className="space-y-4">

                        <div>
                            <label className="text-sm text-gray-500 dark:text-gray-400">Your Rating</label>
                            <div className="flex items-center space-x-1 mt-1">
                                <input
                                    type="number"
                                    name="rating"
                                    min="1" max="5" step="0.5"
                                    value={rating}
                                    onChange={(e) => setRating(parseFloat(e.target.value))}
                                    className="w-16 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded p-1 text-center font-bold dark:text-white"
                                />
                                <span className="text-sm text-gray-400">/ 5.0</span>
                            </div>
                            <input type="range" min="1" max="5" step="0.5" value={rating} onChange={(e) => setRating(parseFloat(e.target.value))} className="w-full mt-2" />
                        </div>

                        <div>
                            <input
                                name="name"
                                placeholder="Your Name (Optional)"
                                className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded p-2 text-sm dark:text-white"
                            />
                        </div>

                        <div>
                            <textarea
                                name="text"
                                required
                                rows={3}
                                placeholder="Tell us about your experience..."
                                className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded p-2 text-sm dark:text-white"
                            ></textarea>
                        </div>

                        <button disabled={isPending} type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-2 rounded mt-2 hover:scale-[1.02] transition">
                            {isPending ? "Sending..." : "Submit Feedback"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
