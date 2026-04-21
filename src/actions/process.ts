"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProcessSteps() {
    let steps = await prisma.processStep.findMany({
        orderBy: { order: 'asc' }
    });

    if (!steps || steps.length === 0) {
        await prisma.processStep.createMany({
            data: [
                { title: "Discovery & Strategy", description: "Deep dive into your business goals, target audience, and competitive landscape.", order: 1 },
                { title: "UI/UX Design", description: "Creating pixel-perfect wireframes and high-fidelity mockups for your approval.", order: 2 },
                { title: "Development & Engineering", description: "Writing clean, scalable code using the latest frameworks like Next.js and Tailwind.", order: 3 },
                { title: "Launch & Support", description: "Full deployment to production servers, complete testing, and ongoing maintenance.", order: 4 }
            ]
        });
        steps = await prisma.processStep.findMany({ orderBy: { order: 'asc' } });
    }
    return steps;
}

export async function createProcessStep(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await prisma.processStep.create({ data: { title, description, order } });
    revalidatePath("/");
    revalidatePath("/admin/process");
}

export async function deleteProcessStep(id: string) {
    await prisma.processStep.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/process");
}
