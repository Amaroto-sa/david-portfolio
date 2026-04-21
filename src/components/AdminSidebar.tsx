"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar({ userName }: { userName: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const ChatBubbleLeftIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
    );

    const pathname = usePathname();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Mobile Header with Hamburger */}
            <div className="md:hidden bg-black text-white p-4 flex justify-between items-center border-b border-gray-800 sticky top-0 z-50">
                <h2 className="text-xl font-bold">Admin Dashboard</h2>
                <button onClick={toggleSidebar} className="p-2 bg-gray-900 rounded focus:outline-none">
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeSidebar}></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-black border-r border-gray-800 p-6 flex flex-col min-h-screen transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
                <h2 className="text-xl font-bold mb-2 hidden md:block text-white">Admin Dashboard</h2>
                <p className="text-xs text-gray-500 mb-8 hidden md:block">Welcome, {userName}</p>
                <nav className="flex-1 space-y-3">
                    <Link href="/admin" onClick={closeSidebar} className={`flex items-center space-x-3 transition ${pathname === "/admin" ? "text-green-500 font-bold" : "text-gray-400 hover:text-white"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <span>Projects</span>
                    </Link>
                    <Link href="/admin/new" onClick={closeSidebar} className={`flex items-center space-x-3 transition ${pathname === "/admin/new" ? "text-green-500 font-bold" : "text-gray-400 hover:text-white"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add New</span>
                    </Link>
                    <Link href="/admin/testimonials" onClick={closeSidebar} className={`flex items-center space-x-3 transition ${pathname === "/admin/testimonials" ? "text-green-500 font-bold" : "text-gray-400 hover:text-white"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>Testimonials</span>
                    </Link>
                    <Link href="/admin/inquiries" onClick={closeSidebar} className={`flex items-center space-x-3 transition ${pathname === "/admin/inquiries" ? "text-green-500 font-bold" : "text-gray-400 hover:text-white"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <span>Inquiries</span>
                    </Link>
                    <Link href="/admin/settings" onClick={closeSidebar} className={`flex items-center space-x-3 transition ${pathname === "/admin/settings" ? "text-green-500 font-bold" : "text-gray-400 hover:text-white"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Profile Settings</span>
                    </Link>
                    <hr className="border-gray-800 my-4" />
                    <a href="/" target="_blank" className="flex items-center space-x-3 text-gray-400 hover:text-white transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <span>View Live Site</span>
                    </a>
                </nav>
                <a href="/api/auth/signout" className="flex items-center space-x-3 text-red-500 hover:text-red-400 text-sm mt-8 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                </a>
            </aside>
        </>
    );
}
