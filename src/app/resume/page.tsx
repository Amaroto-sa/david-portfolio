import { getResumeData } from "@/actions/resume";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume | David Caleb",
    description: "Full-Stack Software Engineer & UI/UX Specialist",
};

export default async function ResumePage() {
    const resume = await getResumeData();

    const experiences = resume.experiences as any[];
    const education = resume.education as any[];
    const skills = resume.skills as any[];

    return (
        <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 py-20 px-8 transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end">
                    <div>
                        <Link href="/" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                            Back to Portfolio
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-black dark:text-white tracking-tight">{resume.fullName}</h1>
                        <p className="text-xl md:text-2xl text-green-600 dark:text-green-500 mt-2 font-medium">{resume.role}</p>
                    </div>
                    <button className="mt-6 md:mt-0 px-6 py-3 border-2 border-black dark:border-white rounded-full font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">
                        Download PDF
                    </button>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-12 space-y-16">
                    {/* Summary */}
                    <section>
                        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-6 font-sans">Professional Summary</h2>
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            {resume.summary}
                        </p>
                    </section>

                    {/* Experience */}
                    <section>
                        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-6 font-sans">Experience</h2>
                        <div className="space-y-10">
                            {experiences.map((exp, idx) => (
                                <div key={idx} className="relative pl-6 border-l border-gray-200 dark:border-gray-800">
                                    <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[6.5px] top-1.5"></div>
                                    <h3 className="text-xl font-bold text-black dark:text-white">{exp.role}</h3>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium mb-3 flex flex-col sm:flex-row sm:space-x-2">
                                        <span className="text-green-600 dark:text-green-500">{exp.company}</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span>{exp.duration}</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

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
