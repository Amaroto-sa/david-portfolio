import Hero from "../components/Hero";
import MasonryGallery from "../components/MasonryGallery";
import ServicesSection from "../components/ServicesSection";
import WhyChooseMe from "../components/WhyChooseMe";
import CtaSection from "../components/CtaSection";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import SkillsMarquee from "../components/SkillsMarquee";
import Testimonials from "../components/Testimonials";
import { getProjects } from "@/actions/projects";
import { getSiteSettings } from "@/actions/settings";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
    const projects = await getProjects();
    const settings = await getSiteSettings();

    return (
        <main className="relative bg-white dark:bg-black transition-colors duration-500">
            <Hero settings={settings} />
            <SkillsMarquee />
            <ServicesSection />

            <div className="py-12 bg-gray-50 dark:bg-black transition-colors duration-500">
                <div className="text-center mb-12">
                    <p className="text-gray-500 dark:text-gray-400 font-sans tracking-widest uppercase text-sm mb-2">🎨 My Work</p>
                    <h2 className="text-3xl md:text-5xl font-serif text-black dark:text-white">Recent Projects</h2>
                </div>
                <MasonryGallery initialProjects={projects} />
            </div>

            <Testimonials />
            <WhyChooseMe />
            <CtaSection whatsappNumber={settings.whatsappNumber} />

            <FloatingWhatsApp phoneNumber={settings.whatsappNumber} />
        </main>
    );
}
