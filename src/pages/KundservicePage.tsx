export default function KundservicePage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10 flex flex-col">

                {/** Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Kundservice
                </h1>

                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                    Vi finns här för att hjälpa dig. Har du frågor om din resa, bokning eller behöver hjälp att komma igång är du alltid välkommen att kontakta oss.
                </p>

                {/** Innehåll */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">

                    {/** Kontakt */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-semibold text-lg mb-3">Kontakt</h3>
                        <p className="text-gray-700">
                            <strong>Telefon:</strong><br />
                            010-123 45 67
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Vid akuta ärenden utanför öppettider, vänligen kontakta din transportör.
                        </p>
                    </div>

                    {/** Hjälp */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-semibold text-lg mb-3">Vanlig hjälp</h3>
                        <ul className="text-gray-700 space-y-2 list-disc list-inside cursor-pointer hover:text-gray-900">
                            <li>Boka eller avboka resa</li>
                            <li>Frågor om tider</li>
                            <li>Sjukresa & färdtjänst</li>
                            <li>Problem med bokning</li>
                        </ul>
                    </div>
                </div>

                {/** knap längst ner */}
                <button
                    disabled
                    className="mt-10 w-full bg-blue-600 tex-white py-4 rounded-lg text-lg font-bold opacity-60 cursor-not-allowed"
                >
                    Kontakta kundservice (formulär kommer snart)
                </button>
            </div>
        </div>
    )
}