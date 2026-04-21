"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
    let settings = await prisma.siteSettings.findFirst();

    // If no settings exist yet, create default
    if (!settings) {
        settings = await prisma.siteSettings.create({
            data: {
                name: "David Caleb",
                headline: "Welcome to My\nDesign Portfolio",
                subtext: "Work with me today",
                profileImage: "/images/profile.jpg",
                whatsappNumber: "+2349045729555",
                contactEmail: "hello@davidcaleb.com"
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
    const whatsappNumber = formData.get("whatsappNumber") as string;
    const contactEmail = formData.get("contactEmail") as string;

    await prisma.siteSettings.update({
        where: { id },
        data: {
            name,
            headline,
            subtext,
            whatsappNumber,
            contactEmail,
            profileImage
        }
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
}
