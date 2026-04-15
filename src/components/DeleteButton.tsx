"use client";

export default function DeleteButton() {
    return (
        <button
            type="submit"
            onClick={(e) => {
                if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
                    e.preventDefault();
                }
            }}
            className="text-red-500 hover:text-red-400 text-sm"
        >
            Delete
        </button>
    );
}
