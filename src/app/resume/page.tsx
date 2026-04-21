import { getResumeData } from "@/actions/resume";
import { getProjects } from "@/actions/project";
import Link from "next/link";
import { Metadata } from "next";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
    title: "Resume | David Caleb",
    description: "Full-Stack Software Engineer & UI/UX Specialist",
};

export default async function ResumePage() {
    const resume = await getResumeData();
    const projects = await getProjects();

    const experiences = resume.experiences as any[];
    const education = resume.education as any[];
    const skills = resume.skills as any[];

    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pb-24 print:bg-white print:text-black print:p-0 print:m-0">
            {/* Header Navigation (Hidden on Print) */}
            <nav className="p-6 md:p-12 mb-8 print:hidden">
                <Link href="/" className="text-gray-500 hover:text-black dark:hover:text-white transition font-medium">
                    &larr; Back to Portfolio
                </Link>
            </nav>

            <div className="max-w-4xl mx-auto px-6 md:px-12 print:px-0 print:max-w-full">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 print:mb-8 print:flex-row print:justify-between">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-black dark:text-white tracking-tight print:text-black">{resume.fullName}</h1>
                        <p className="text-xl md:text-2xl text-green-600 dark:text-green-500 mt-2 font-medium print:text-green-700">{resume.role}</p>
                    </div>
                    <div className="print:hidden mt-6 md:mt-0">
                        <PrintButton />
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-12 space-y-16 print:border-gray-300 print:pt-8 print:space-y-10">
                    {/* Summary */}
                    <section>
                        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-6 font-sans">Professional Summary</h2>
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            {resume.summary}
                        </p>
                    </section>

                    {/* Professional Experience */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-gray-400 print:text-gray-500 print:mb-4">Experience</h2>
                        <div className="space-y-10 print:space-y-6">
                            {(resume.experiences as any[]).map((exp: any, i: number) => (
                                <div key={i} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-800 print:border-gray-300">
                                    <div className="absolute w-3 h-3 bg-black dark:bg-white rounded-full -left-[7px] top-2 print:bg-black"></div>
                                    <h3 className="text-xl font-bold text-black dark:text-white print:text-black">{exp.role}</h3>
                                    <div className="flex flex-col md:flex-row md:items-center text-gray-500 mt-1 mb-3 print:flex-row">
                                        <span className="font-semibold text-green-600 dark:text-green-500 print:text-green-700">{exp.company}</span>
                                        <span className="hidden md:inline mx-2 print:inline">&bull;</span>
                                        <span>{exp.duration}</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed print:text-gray-800">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Key Technical Projects */}
                    {projects.length > 0 && (
                        <section className="print:break-inside-avoid">
                            <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-gray-400 print:text-gray-500 print:mb-4">Key Projects</h2>
                            <div className="space-y-6">
                                {projects.slice(0, 3).map((project) => ( // Show top 3 for resume
                                    <div key={project.id} className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg print:border-gray-300 print:p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-lg font-bold text-black dark:text-white print:text-black">{project.title}</h3>
                                            {project.link && (
                                                <a href={project.link} target="_blank" className="text-sm text-blue-500 hover:underline print:hidden">View Project</a>
                                            )}
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm print:text-gray-800">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 print:gap-1">
                                            {project.tags.map((tag: string) => (
                                                <span key={tag} className="px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded print:bg-gray-100 print:text-gray-800">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    <section>
                        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-6 font-sans">Education</h2>
                        <div className="space-y-8">
                            {education.map((edu, idx) => (
                                <div key={idx}>
                                    <h3 className="text-xl font-bold text-black dark:text-white">{edu.degree}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">{edu.school} • {edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills Matrix */}
                    <section>
                        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-6 font-sans">Core Competencies</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {skills.map((skillGroup, idx) => (
                                <div key={idx}>
                                    <h3 className="font-bold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">{skillGroup.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.skillsArray.map((skill: string, sIdx: number) => (
                                            <span key={sIdx} className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 text-sm rounded-full font-medium border border-gray-200 dark:border-gray-800">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
