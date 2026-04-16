"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData, galleryUrls: string[], thumbnailUrl: string | null) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const client = formData.get("client") as string;
    const categoriesRaw = formData.get("categories") as string;
    const isPublished = formData.get("isPublished") === "on";
    const isFeatured = formData.get("isFeatured") === "on";

    const categories = categoriesRaw ? categoriesRaw.split(",").map(c => c.trim()) : ["UI/UX Design"];

    await prisma.project.create({
        data: {
            title,
            slug,
            description,
            client,
            categories,
            thumbnailUrl,
            galleryUrls,
            isPublished,
            isFeatured,
        },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    redirect("/admin");
}

export async function updateProject(id: string, formData: FormData, galleryUrls: string[], thumbnailUrl: string | null) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const client = formData.get("client") as string;
    const categoriesRaw = formData.get("categories") as string;
    const isPublished = formData.get("isPublished") === "on";
    const isFeatured = formData.get("isFeatured") === "on";

    const categories = categoriesRaw ? categoriesRaw.split(",").map(c => c.trim()) : ["UI/UX Design"];

    await prisma.project.update({
        where: { id },
        data: {
            title,
            slug,
            description,
            client,
            categories,
            thumbnailUrl,
            galleryUrls,
            isPublished,
            isFeatured,
        },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    redirect("/admin");
}

export async function getProjects({ includeDrafts = true }: { includeDrafts?: boolean } = {}) {
    return await prisma.project.findMany({
        where: includeDrafts ? {} : { isPublished: true },
        orderBy: [
            { isFeatured: "desc" },
            { createdAt: "desc" }
        ],
    });
}

export async function getProjectById(id: string) {
    return await prisma.project.findUnique({
        where: { id },
    });
}

export async function getProjectBySlug(slug: string) {
    return await prisma.project.findUnique({
        where: { slug },
    });
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/");
}
