import ProjectForm from "@/components/ProjectForm";
import Link from "next/link";

export default function NewProjectPage() {
    return (
        <div>
            <div className="flex items-center space-x-4 mb-6">
                <Link href="/admin" className="text-gray-400 hover:text-white">&larr; Back</Link>
                <h1 className="text-3xl font-bold">Add New Project</h1>
            </div>
            <ProjectForm />
        </div>
    );
}
