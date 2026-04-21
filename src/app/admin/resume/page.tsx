import { getResumeData } from "@/actions/resume";
import ResumeSettingsForm from "@/components/ResumeSettingsForm";

export default async function AdminResumePage() {
    const data = await getResumeData();

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Edit Resume Document</h1>
            <p className="text-gray-400 mb-8 border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-900/10">
                Warning: The Experiences, Education, and Skills arrays require valid JSON syntax {"("}array of objects{")"}. Make sure all keys and values are wrapped in double quotes.
            </p>
            <ResumeSettingsForm initialData={data} />
        </div>
    );
}
