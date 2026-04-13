import { getProjects, deleteProject } from "@/actions/projects";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function AdminDashboard() {
    const projects = await getProjects();

    async function handleDelete(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await deleteProject(id);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Projects</h1>
                <Link href="/admin/new" className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition">
                    Add New Project
                </Link>
            </div>

            <div className="bg-black p-6 rounded-lg border border-gray-800">
                {projects.length === 0 ? (
                    <p className="text-gray-400">No projects found. Create one above.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="py-3 px-4">Title</th>
                                    <th className="py-3 px-4">Client</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project.id} className="border-b border-gray-800 hover:bg-gray-900 transition">
                                        <td className="py-3 px-4">{project.title}</td>
                                        <td className="py-3 px-4">{project.client || "N/A"}</td>
                                        <td className="py-3 px-4 text-gray-400">{new Date(project.createdAt).toLocaleDateString()}</td>
                                        <td className="py-3 px-4 text-right flex justify-end space-x-3">
                                            <Link href={`/admin/edit/${project.id}`} className="text-blue-400 hover:text-blue-300">
                                                Edit
                                            </Link>
                                            <form action={handleDelete}>
                                                <input type="hidden" name="id" value={project.id} />
                                                <button type="submit" className="text-red-500 hover:text-red-400">Delete</button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
