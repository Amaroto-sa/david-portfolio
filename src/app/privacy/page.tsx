export const metadata = {
    title: 'Privacy Policy | David Caleb Portfolio',
    description: 'Privacy Policy and Terms of Use for David Caleb design portfolio.',
};

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-32 px-8 lg:px-24">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
                    Privacy Policy
                </h1>

                <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <section>
                        <p className="text-lg">
                            This site is for showcasing personal development projects.
                        </p>
                    </section>

                    <section>
                        <p className="text-lg">
                            No personal data is intentionally collected.
                        </p>
                    </section>

                    <section>
                        <p className="text-lg">
                            Any contact info sent is only used for communication related to work or collaboration.
                        </p>
                    </section>

                    <section>
                        <p className="text-lg">
                            Basic analytics may be used to improve site performance.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
