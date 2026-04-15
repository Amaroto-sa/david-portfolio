"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
    let settings = await prisma.siteSettings.findFirst();

    // If no settings exist yet, create default
    if (!settings) {
        settings = await prisma.siteSettings.create({
            data: {
                name: "David",
                headline: "Welcome to My\nDesign Portfolio",
                subtext: "Work with me today",
                profileImage: "/images/profile.jpg"
            }
        });
    }

    return settings;
}

export async function updateSiteSettings(formData: FormData, profileImage: string) {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const headline = formData.get("headline") as string;
    const subtext = formData.get("subtext") as string;

    await prisma.siteSettings.update({
        where: { id },
        data: {
            name,
            headline,
            subtext,
            profileImage
        }
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
}
