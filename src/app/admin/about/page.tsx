import { getAboutSettings } from "@/actions/about";
import AboutSettingsForm from "@/components/AboutSettingsForm";

export default async function AdminAboutPage() {
    const data = await getAboutSettings();

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Manage About Me Modal</h1>
            <AboutSettingsForm initialData={data} />
        </div>
    );
}
