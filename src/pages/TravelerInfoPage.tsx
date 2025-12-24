import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

type TripPayload = {
    fromAddress: string;
    toAddress: string;
    date: string;
    returnDate?: string;
    people: number;
};

export default function TravelerInfoPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const trip: TripPayload | undefined = location.state?.trip;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [wheelchair, setWheelchair] = useState<boolean>(false);

    // skydd om sidan öppnas direkt
    if (!trip) {
        return (
            <div className="max-w-xl mx-auto mt-20 text-center text-red-600">
                <h2 className="text-xl font-bold">Ingen reseinformation hittades</h2>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 text-blue-600 underline"
                >
                    Tillbaka till startsidan
                </button>
            </div> 
        );
        
    }

    const handleContinue = () => {
        if (!firstName.trim() || !lastName.trim()) {
            toast.error("Fyll i för och efternamn");
            return;
        }

        navigate("/select-time", {
            state: {
                payload: {
                    ...trip,
                    firstName,
                    lastName,
                    wheelchair,
                },
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Resenärsinformation
                </h1>

                <div className="space-y-4">
                    <div>
                        <label className="w-full mt-1 p-2 border rounded-lg">Förnamn</label>
                        <input 
                            type="text" 
                            className="w-full mt-1 p-2 border rounded-lg"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="w-full mt-1 p-2 border rounded-lg">Efternamn</label>
                        <input 
                            type="text" 
                            className="w-full mt-1 p-2 border rounded-lg"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <input 
                            id="wheelchair"
                            type="checkbox"
                            checked={wheelchair}
                            onChange={(e) => setWheelchair(e.target.checked)}
                        />
                        <label htmlFor="wheelchair" className="text-sm">
                            Jag behöver rullstolsplats
                        </label>
                    </div>

                    <button
                        onClick={handleContinue}
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
                    >
                        Fortsätt
                    </button>
                </div>
            </div>
        </div>
    )
}