"use client";

export default function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="mt-6 md:mt-0 px-6 py-3 border-2 border-black dark:border-white rounded-full font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
        >
            Download PDF
        </button>
    );
}
