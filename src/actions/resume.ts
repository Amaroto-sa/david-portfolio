"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getResumeData() {
    let resume = await prisma.resumeData.findFirst();

    if (!resume) {
        resume = await prisma.resumeData.create({
            data: {
                fullName: "David Caleb",
                role: "Website Developer & Graphic Designer",
                summary: "Results-driven Website Developer and Graphic Designer with 2+ years of hands-on experience delivering digital solutions for real clients through FixHub Technology. I build clean, responsive websites and create compelling visual content that helps businesses attract customers and grow online. Self-managed, deadline-driven, and fully equipped for remote collaboration across time zones.",
                experiences: [
                    {
                        role: "Founder & Lead Developer",
                        company: "FixHub Technology",
                        duration: "2023 - Present",
                        description: "Founded and independently operate a digital services agency delivering website development and graphic design to clients. Designed and developed 5+ client websites from scratch including service pages, landing pages, and appointment booking systems. Created visual branding identities for 10+ small businesses."
                    },
                    {
                        role: "Web Design & Creative Intern",
                        company: "TechVision Creative",
                        duration: "2022 - 2023",
                        description: "Supported senior designers in creating website layouts using Figma and WordPress. Assisted in designing social media marketing assets and branding materials. Learned to translate UI/UX designs into functional code using HTML and CSS."
                    }
                ],
                education: [
                    {
                        degree: "West African Senior School Certificate (WASSCE)",
                        school: "Anambra State, Nigeria",
                        year: "Completed 2024"
                    },
                    {
                        degree: "Responsive Web Design Certificate",
                        school: "freeCodeCamp",
                        year: "Self-Directed"
                    }
                ],
                skills: [
                    {
                        category: "Development",
                        skillsArray: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "React (Basic)", "WordPress", "Webflow"]
                    },
                    {
                        category: "Design",
                        skillsArray: ["Figma", "Adobe XD", "Graphic Design", "Logo Design", "Branding", "Social Media Visuals", "Canva"]
                    },
                    {
                        category: "Tools & Collaboration",
                        skillsArray: ["Git", "GitHub", "Vercel", "Google Workspace", "Trello", "Notion", "Slack", "Zoom"]
                    },
                    {
                        category: "Soft Skills",
                        skillsArray: ["Client Communication", "Remote Collaboration", "Time Management", "Self-Motivated", "Detail-Oriented"]
                    }
                ]
            }
        });
    }

    return resume;
}

export async function updateResumeData(formData: FormData) {
    const id = formData.get("id") as string;
    const fullName = formData.get("fullName") as string;
    const role = formData.get("role") as string;
    const summary = formData.get("summary") as string;

    // In a fully built admin, these would be parsed dynamically from dynamic inputs.
    // For safety, we keep the JSON structure intact or update via a massive payload.
    const rawExperiences = formData.get("experiences") as string;
    const rawEducation = formData.get("education") as string;
    const rawSkills = formData.get("skills") as string;

    const experiences = rawExperiences ? JSON.parse(rawExperiences) : [];
    const education = rawEducation ? JSON.parse(rawEducation) : [];
    const skills = rawSkills ? JSON.parse(rawSkills) : [];

    if (id && id !== "") {
        await prisma.resumeData.update({
            where: { id },
            data: { fullName, role, summary, experiences, education, skills }
        });
    }

    revalidatePath("/");
    revalidatePath("/resume");
    revalidatePath("/admin/settings");
}
