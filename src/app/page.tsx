import Hero from "../components/Hero";
import MasonryGallery from "../components/MasonryGallery";
import { getProjects } from "@/actions/projects";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
    const projects = await getProjects();

    return (
        <main>
            <Hero />
            <MasonryGallery initialProjects={projects} />
        </main>
    );
}
