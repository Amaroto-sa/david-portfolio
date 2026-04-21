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
    const rating = parseInt(formData.get("rating") as string, 10) || 5;

    await prisma.testimonial.create({
        data: { text, name, company, rating }
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
    const text = formData.get("text") as string;
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const rating = parseInt(formData.get("rating") as string, 10) || 5;

    await prisma.testimonial.update({
        where: { id },
        data: { text, name, company, rating }
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
}
