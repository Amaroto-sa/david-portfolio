"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getResumeData() {
    let resume = await prisma.resumeData.findFirst();

    if (!resume) {
        resume = await prisma.resumeData.create({
            data: {
                fullName: "David Caleb",
                role: "Full-Stack Software Engineer & UI/UX Specialist",
                summary: "Innovative Full-Stack Engineer with a proven track record at FixHub Technology. Specializing in highly scalable React/Next.js architectures, complex backend integrations, and seamless user experiences. Passionate about driving business growth through modern tech.",
                experiences: [
                    {
                        role: "Lead Software Engineer",
                        company: "FixHub Technology",
                        duration: "2023 - Present",
                        description: "Architecting and deploying enterprise-grade platforms. Leading front-end and back-end integration, scaling infrastructure, and optimizing critical user paths to maximize lead conversion."
                    },
                    {
                        role: "Full-Stack Developer",
                        company: "Freelance / Independent",
                        duration: "2021 - 2023",
                        description: "Built custom applications and landing pages for SMEs. Engineered robust CMS solutions, managed server deployments, and spearheaded technical SEO initiatives."
                    }
                ],
                education: [
                    {
                        degree: "B.Sc. Computer Science (Or Equivalent Tech Certification)",
                        school: "Tech University",
                        year: "2021"
                    }
                ],
                skills: [
                    {
                        category: "Frontend Development",
                        skillsArray: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js", "Redux", "HTML5/CSS3"]
                    },
                    {
                        category: "Backend Development",
                        skillsArray: ["Node.js", "Express", "NestJS", "Python", "Django", "PHP", "Laravel", "GraphQL", "REST APIs"]
                    },
                    {
                        category: "Database & Cloud",
                        skillsArray: ["MongoDB", "PostgreSQL", "MySQL", "Prisma ORM", "AWS", "Vercel", "Docker", "Firebase", "Redis"]
                    },
                    {
                        category: "UI/UX & Design",
                        skillsArray: ["Figma", "Adobe XD", "Prototyping", "Wireframing", "User Research", "Responsive Design"]
                    },
                    {
                        category: "Mobile & DevOps",
                        skillsArray: ["React Native", "Flutter", "Git/GitHub", "CI/CD Pipelines", "Jest Testing"]
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
