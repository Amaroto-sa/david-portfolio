"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPricingPlans() {
    let plans = await prisma.pricingPlan.findMany({
        orderBy: { order: 'asc' }
    });

    if (!plans || plans.length === 0) {
        await prisma.pricingPlan.createMany({
            data: [
                { name: "Basic", price: "$100", order: 1 },
                { name: "Pro", price: "$150", order: 2 },
                { name: "Premium", price: "$300", order: 3 },
                { name: "Ultra", price: "$600", order: 4 }
            ]
        });

        plans = await prisma.pricingPlan.findMany({
            orderBy: { order: 'asc' }
        });
    }

    return plans;
}

export async function createPricingPlan(formData: FormData) {
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await prisma.pricingPlan.create({
        data: { name, price, order }
    });

    revalidatePath("/");
    revalidatePath("/admin/pricing");
}

export async function updatePricingPlan(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await prisma.pricingPlan.update({
        where: { id },
        data: { name, price, order }
    });

    revalidatePath("/");
    revalidatePath("/admin/pricing");
}

export async function deletePricingPlan(id: string) {
    await prisma.pricingPlan.delete({
        where: { id }
    });

    revalidatePath("/");
    revalidatePath("/admin/pricing");
}
