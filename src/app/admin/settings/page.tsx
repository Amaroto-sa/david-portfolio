import SettingsForm from "@/components/SettingsForm";
import { getSiteSettings } from "@/actions/settings";

export default async function SettingsPage() {
    const settings = await getSiteSettings();

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Site Profile Settings</h1>
                <p className="text-gray-400 mt-2">Update your homepage hero section here.</p>
            </div>

            <SettingsForm settings={settings} />
        </div>
    );
}
