import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-black text-white md:flex-row flex-col">
            <AdminSidebar userName={session.user?.name || "Admin"} />

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto w-full md:w-auto">
                {children}
            </main>
        </div>
    );
}
