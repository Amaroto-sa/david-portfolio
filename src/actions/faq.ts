"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getFaqItems() {
    let faqs = await prisma.faqItem.findMany({
        orderBy: { order: 'asc' }
    });

    if (!faqs || faqs.length === 0) {
        await prisma.faqItem.createMany({
            data: [
                { question: "How long does it take to build a website?", answer: "A standard site takes 2-4 weeks. Complex web apps can take 1-3 months depending on the scope.", order: 1 },
                { question: "Do you offer revisions?", answer: "Yes, all plans include structured revision rounds to ensure the final product matches your vision perfectly.", order: 2 },
                { question: "Do I own the code after it's finished?", answer: "Absolutely. Once the final invoice is cleared, you own 100% of the IP, code, and design assets.", order: 3 }
            ]
        });
        faqs = await prisma.faqItem.findMany({ orderBy: { order: 'asc' } });
    }
    return faqs;
}

export async function createFaq(formData: FormData) {
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await prisma.faqItem.create({ data: { question, answer, order } });
    revalidatePath("/");
    revalidatePath("/admin/faqs");
}

export async function deleteFaq(id: string) {
    await prisma.faqItem.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/faqs");
}
