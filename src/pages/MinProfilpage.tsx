export default function MinProfilPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Min profil
                </h1>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium text-green-600">
                            Inloggad (skyddad sida)
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Användare</p>
                        <p className="font-medium text-green-600">
                            Inloggad användare
                        </p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Information</p>
                        <p className="font-medium text-green-600">
                            Här kommer din personliga information att visas.
                        </p>
                    </div>
                </div>

                <button
                    disabled
                    className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-bold opacity-60 cursor-not-allowed"
                >
                    Redigera profil (kommer snart)
                </button>
            </div>
        </div>
    );
}