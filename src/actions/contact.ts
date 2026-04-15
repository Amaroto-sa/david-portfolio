"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const spamKeywords = [
    "traffic", "seo", "rank higher", "marketing agency", "page #1",
    "first page of google", "generate leads", "boost sales", "investment",
    "crypto", "bitcoin", "digital marketing", "link building", "guest post"
];

export async function submitInquiry(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { error: "All fields are required." };
    }

    const lowerMessage = message.toLowerCase();

    // Strict Anti-Spam Check
    const isSpam = spamKeywords.some(keyword => lowerMessage.includes(keyword));
    const hasLinks = message.includes("http://") || message.includes("https://") || message.includes("www.");

    if (isSpam || hasLinks) {
        // Reject spam implicitly
        return { error: "Spam detected. Marketing and solicitation are not allowed." };
    }

    await prisma.inquiry.create({
        data: { name, email, message }
    });

    revalidatePath("/admin/inquiries");
    return { success: true };
}

export async function getInquiries() {
    return await prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" }
    });
}
