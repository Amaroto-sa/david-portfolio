"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
    let settings = await prisma.siteSettings.findFirst();

    if (!settings) {
        settings = await prisma.siteSettings.create({
            data: {
                name: "David Caleb",
                headline: "We build websites that bring real customers",
                subtext: "I’m David Caleb, a Website Developer and Graphic Designer helping businesses attract customers and grow online.",
                profileImage: "/images/profile.jpg",
                whatsappNumber: "+2349045729555",
                showWhatsApp: true,
                showRateService: true,
                contactEmail: "david.caleb.vl@gmail.com",
                githubUrl: "https://github.com/davidcaleb",
                linkedinUrl: "https://linkedin.com/in/davidcaleb"
            }
        });
    }

    return settings;
}

export async function updateSiteSettings(formData: FormData, profileImage: string) {
    const name = formData.get("name") as string;
    const headline = formData.get("headline") as string;
    const subtext = formData.get("subtext") as string;
    const whatsappNumber = formData.get("whatsappNumber") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const showWhatsApp = formData.get("showWhatsApp") === "on";
    const showRateService = formData.get("showRateService") === "on";

    const existing = await prisma.siteSettings.findFirst();

    if (existing) {
        await prisma.siteSettings.update({
            where: { id: existing.id },
            data: { name, headline, subtext, profileImage, whatsappNumber, contactEmail, githubUrl, linkedinUrl, showWhatsApp, showRateService }
        });
    } else {
        await prisma.siteSettings.create({
            data: { name, headline, subtext, profileImage, whatsappNumber, contactEmail, githubUrl, linkedinUrl, showWhatsApp, showRateService }
        });
    }

    revalidatePath("/");
    revalidatePath("/admin/settings");
}
