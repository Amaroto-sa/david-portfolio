"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAboutSettings() {
    let settings = await prisma.aboutSettings.findFirst();

    if (!settings) {
        settings = await prisma.aboutSettings.create({
            data: {
                bio: "I am a passionate software engineer and UI/UX designer obsessed with building scalable web applications. My background bridges the gap between pixel-perfect design and complex technical architecture.",
                mission: "To help small businesses and startups scale aggressively through high-converting, deeply optimized digital products."
            }
        });
    }

    return settings;
}

export async function updateAboutSettings(formData: FormData) {
    const id = formData.get("id") as string;
    const bio = formData.get("bio") as string;
    const mission = formData.get("mission") as string;

    if (id && id !== "") {
        await prisma.aboutSettings.update({
            where: { id },
            data: { bio, mission }
        });
    } else {
        await prisma.aboutSettings.create({
            data: { bio, mission }
        });
    }

    revalidatePath("/");
    revalidatePath("/admin/settings");
}
