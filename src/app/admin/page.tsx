import { getProjects, deleteProject } from "@/actions/projects";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminDashboard() {
    const projects = await getProjects();

    async function handleDelete(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await deleteProject(id);
    }

    return (
        <div>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-black border border-gray-800 rounded-lg p-5">
                    <p className="text-gray-500 text-sm">Total Projects</p>
                    <p className="text-3xl font-bold text-white mt-1">{projects.length}</p>
                </div>
                <div className="bg-black border border-gray-800 rounded-lg p-5">
                    <p className="text-gray-500 text-sm">Total Images</p>
                    <p className="text-3xl font-bold text-white mt-1">
                        {projects.reduce((acc, p) => acc + p.galleryUrls.length, 0)}
                    </p>
                </div>
                <div className="bg-black border border-gray-800 rounded-lg p-5">
                    <p className="text-gray-500 text-sm">Latest Project</p>
                    <p className="text-lg font-semibold text-white mt-1 truncate">
                        {projects.length > 0 ? projects[0].title : "None yet"}
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Projects</h1>
                <Link href="/admin/new" className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition">
                    + Add New Project
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
                                    <th className="py-3 px-4">Images</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project.id} className="border-b border-gray-800 hover:bg-gray-900 transition">
                                        <td className="py-3 px-4 font-medium">{project.title}</td>
                                        <td className="py-3 px-4 text-gray-400">{project.client || "N/A"}</td>
                                        <td className="py-3 px-4 text-gray-400">{project.galleryUrls.length}</td>
                                        <td className="py-3 px-4 text-gray-400">{new Date(project.createdAt).toLocaleDateString()}</td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex justify-end items-center space-x-3">
                                                <Link
                                                    href={`/projects/${project.slug}`}
                                                    target="_blank"
                                                    className="text-green-400 hover:text-green-300 text-sm"
                                                >
                                                    View
                                                </Link>
                                                <Link href={`/admin/edit/${project.id}`} className="text-blue-400 hover:text-blue-300 text-sm">
                                                    Edit
                                                </Link>
                                                <form action={handleDelete}>
                                                    <input type="hidden" name="id" value={project.id} />
                                                    <DeleteButton />
                                                </form>
                                            </div>
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
