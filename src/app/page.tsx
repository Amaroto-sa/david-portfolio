import Hero from "../components/Hero";
import MasonryGallery from "../components/MasonryGallery";
import { getProjects } from "@/actions/projects";
import { getSiteSettings } from "@/actions/settings";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
    const projects = await getProjects();
    const settings = await getSiteSettings();

    return (
        <main>
            <Hero settings={settings} />
            <MasonryGallery initialProjects={projects} />
        </main>
    );
}
