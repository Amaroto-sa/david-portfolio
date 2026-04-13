import ProjectForm from "@/components/ProjectForm";
import Link from "next/link";
import { getProjectById } from "@/actions/projects";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
    const project = await getProjectById(params.id);

    if (!project) {
        notFound();
    }

    return (
        <div>
            <div className="flex items-center space-x-4 mb-6">
                <Link href="/admin" className="text-gray-400 hover:text-white">&larr; Back</Link>
                <h1 className="text-3xl font-bold">Edit Project</h1>
            </div>
            <ProjectForm
                mode="edit"
                projectId={project.id}
                initialData={{
                    title: project.title,
                    slug: project.slug,
                    description: project.description,
                    client: project.client || "",
                    categories: project.categories,
                    thumbnailUrl: project.thumbnailUrl,
                    galleryUrls: project.galleryUrls,
                }}
            />
        </div>
    );
}
