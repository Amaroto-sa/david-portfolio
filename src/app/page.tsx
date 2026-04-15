import Hero from "../components/Hero";
import MasonryGallery from "../components/MasonryGallery";
import ServicesSection from "../components/ServicesSection";
import WhyChooseMe from "../components/WhyChooseMe";
import CtaSection from "../components/CtaSection";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { getProjects } from "@/actions/projects";
import { getSiteSettings } from "@/actions/settings";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
    const projects = await getProjects();
    const settings = await getSiteSettings();

    return (
        <main className="relative">
            <Hero settings={settings} />
            <ServicesSection />

            <div className="py-12 bg-black">
                <div className="text-center mb-12">
                    <p className="text-gray-400 font-sans tracking-widest uppercase text-sm mb-2">🎨 My Work</p>
                    <h2 className="text-3xl md:text-5xl font-serif text-white">Recent Projects</h2>
                </div>
                <MasonryGallery initialProjects={projects} />
            </div>

            <WhyChooseMe />
            <CtaSection whatsappNumber={settings.whatsappNumber} />

            <FloatingWhatsApp phoneNumber={settings.whatsappNumber} />
        </main>
    );
}
