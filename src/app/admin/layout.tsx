import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-black border-r border-gray-800 p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-2">Admin Dashboard</h2>
                <p className="text-xs text-gray-500 mb-8">Welcome, {session.user?.name}</p>
                <nav className="flex-1 space-y-3">
                    <a href="/admin" className="block text-gray-400 hover:text-white transition">
                        📂 Projects
                    </a>
                    <a href="/admin/new" className="block text-gray-400 hover:text-white transition">
                        ➕ Add New
                    </a>
                    <hr className="border-gray-800 my-3" />
                    <a href="/" target="_blank" className="block text-gray-400 hover:text-white transition">
                        🌐 View Live Site
                    </a>
                </nav>
                <a href="/api/auth/signout" className="text-red-500 hover:text-red-400 text-sm mt-4">
                    🚪 Logout
                </a>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
