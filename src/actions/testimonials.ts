"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getTestimonials() {
    return prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getTestimonialById(id: string) {
    return prisma.testimonial.findUnique({
        where: { id }
    });
}

export async function createTestimonial(formData: FormData) {
    const text = formData.get("text") as string;
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const rating = parseFloat(formData.get("rating") as string) || 5;
    const imageUrl = formData.get("imageUrl") as string || null;

    await prisma.testimonial.create({
        data: { text, name, company, rating, imageUrl, isVisible: true }
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
    const text = formData.get("text") as string;
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const rating = parseFloat(formData.get("rating") as string) || 5;
    const imageUrl = formData.get("imageUrl") as string || null;

    await prisma.testimonial.update({
        where: { id },
        data: { text, name, company, rating, imageUrl }
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    redirect("/admin/testimonials");
}

export async function submitFeedback(formData: FormData) {
    const text = formData.get("text") as string;
    const name = formData.get("name") as string || "Anonymous visitor";
    const rating = parseFloat(formData.get("rating") as string) || 5;

    await prisma.testimonial.create({
        data: { text, name, company: "Visitor Feedback", rating, isVisible: false }
    });
}

export async function deleteTestimonial(id: string) {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
}
