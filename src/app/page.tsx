import Hero from "../components/Hero";
import MasonryGallery from "../components/MasonryGallery";
import ServicesSection from "../components/ServicesSection";
import WhyChooseMe from "../components/WhyChooseMe";
import CtaSection from "../components/CtaSection";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import SkillsMarquee from "../components/SkillsMarquee";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import PricingSection from "../components/PricingSection";
import FeedbackPopup from "../components/FeedbackPopup";
import ProcessTimeline from "../components/ProcessTimeline";
import FaqAccordion from "../components/FaqAccordion";
import { getProjects } from "@/actions/projects";
import { getSiteSettings } from "@/actions/settings";
import { getTestimonials } from "@/actions/testimonials";
import { getPricingPlans } from "@/actions/pricing";
import { getAboutSettings } from "@/actions/about";
import { getProcessSteps } from "@/actions/process";
import { getFaqItems } from "@/actions/faq";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
    let projects = await getProjects();
    const settings = await getSiteSettings();
    let testimonials = await getTestimonials();
    const pricingPlans = await getPricingPlans();
    const aboutSettings = await getAboutSettings();
    const processSteps = await getProcessSteps();
    const faqItems = await getFaqItems();

    if (!testimonials || testimonials.length === 0) {
        testimonials = [
            {
                id: "t1",
                name: "Client",
                company: "Verified Review",
                text: "Clean design and fast delivery. Highly recommend.",
                rating: 5,
                imageUrl: null,
                isVisible: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: "t2",
                name: "Client",
                company: "Verified Review",
                text: "Very professional and easy to work with.",
                rating: 5,
                imageUrl: null,
                isVisible: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: "t3",
                name: "Client",
                company: "Verified Review",
                text: "Great communication and quality work.",
                rating: 5,
                imageUrl: null,
                isVisible: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
    }

    if (!projects || projects.length === 0) {
        projects = [
            {
                id: "mock1",
                title: "Barber Booking Website (Demo)",
                slug: "barber-booking",
                description: "A clean, modern scheduling platform for hair studios. Allows clients to easily book appointments online.",
                client: "Demo",
                categories: ["Website Design"],
                thumbnailUrl: "https://images.unsplash.com/photo-1585747860715-ddc2a95c477a?q=80&w=1000&auto=format&fit=crop",
                galleryUrls: [],
                isPublished: true,
                isFeatured: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: "mock2",
                title: "Property Display Website",
                slug: "property-display",
                description: "Real estate listings platform. Showcases properties with advanced search filters, mobile-first design, and contact forms.",
                client: "Demo",
                categories: ["Website Design"],
                thumbnailUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
                galleryUrls: [],
                isPublished: true,
                isFeatured: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: "mock3",
                title: "Restaurant Landing Page (Concept)",
                slug: "restaurant-concept",
                description: "Mouth-watering, highly-converting single page for a local cafe. Features a digital menu and reservation CTA.",
                client: "Concept",
                categories: ["Landing Pages"],
                thumbnailUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
                galleryUrls: [],
                isPublished: true,
                isFeatured: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
    }

    return (
        <main className="relative bg-white dark:bg-black transition-colors duration-500">
            <Hero settings={settings} aboutSettings={aboutSettings} />
            <SkillsMarquee />
            <ServicesSection />

            <div className="py-12 bg-gray-50 dark:bg-black transition-colors duration-500">
                <div className="text-center mb-12">
                    <p className="text-gray-500 dark:text-gray-400 font-sans tracking-widest uppercase text-sm mb-2">🎨 My Work</p>
                    <h2 className="text-3xl md:text-5xl font-serif text-black dark:text-white">Recent Projects</h2>
                </div>
                <MasonryGallery initialProjects={projects} />
            </div>

            <Testimonials data={testimonials} />
            <WhyChooseMe />
            <ProcessTimeline steps={processSteps} />
            <PricingSection plans={pricingPlans} />
            <FaqAccordion faqs={faqItems} />
            <ContactForm />

            <footer className="text-center py-8 bg-black border-t border-gray-900 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} David Caleb.</p>
                <span className="hidden md:inline">•</span>
                <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
                <span className="hidden md:inline">•</span>
                <p>
                    Powered by <a href="https://fixhubtech.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition font-bold">FixHub Technology</a>
                </p>
            </footer>
            {settings.showWhatsApp !== false && (
                <FloatingWhatsApp phoneNumber={settings.whatsappNumber} />
            )}
            {settings.showRateService !== false && <FeedbackPopup />}
        </main>
    );
}
