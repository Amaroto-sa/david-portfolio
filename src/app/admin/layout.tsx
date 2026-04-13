import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        // Note: since this is a basic setup, you might not have a signin page ready, 
        // but NextAuth provides a default one at /api/auth/signin
        redirect("/api/auth/signin");
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-black border-r border-gray-800 p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>
                <nav className="flex-1 space-y-4">
                    <a href="/admin" className="block text-gray-400 hover:text-white">Projects</a>
                    <a href="/admin/settings" className="block text-gray-400 hover:text-white">Settings</a>
                </nav>
                <a href="/api/auth/signout" className="text-red-500 hover:text-red-400">Logout</a>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
