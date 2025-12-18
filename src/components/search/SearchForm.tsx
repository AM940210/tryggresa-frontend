import { useState } from "react";
import { Search, Clock, Accessibility } from "lucide-react";
import AddressInput from "./AddressInput";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SearchForm() {
    const navigate = useNavigate();


    const [tripType, setTripType] = useState<"oneway" | "return">("oneway");
    const [tripCategory, setTripCategory] = useState("")


    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [returnTime, setReturnTime] = useState("");
    const [people, setPeople] = useState(1);
    const [wheelchair, setWheelchair] = useState(false);
    const [fromAddress, setFromAddress] = useState("");
    const [toAddress, setToAddress] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ==================== Validering sök form =====================       
        if (!date) {
            return toast.error("Välj datum", { icon: "📅", duration: 3000 });
        }

        if (!time) {
            return toast.error("välj tid", { icon: "⏰", duration: 3000 });
        }

        if (!fromAddress) {
            return toast.error("Välj från-adress", { icon: "📍", duration: 3000 });
        }

        if (!toAddress) {
            return toast.error("Välj till-adress", { icon: "📍", duration: 3000 });
        }

        if (!tripCategory) {
            return toast.error("Välj typ av resa", { icon: "🧾", duration: 3000 });
        }

        if (tripType === "return") {
            if (!returnDate) {
                return toast.error("Välje returdatum", { icon: "📅", duration: 3000 });
            }

            if (!returnTime) {
                return toast.error("Välj returid", { icon: "⏰", duration: 3000 });
            }
        }

        if (isSubmitting) return;
        setIsSubmitting(true);

        const payload = {
            date,
            time,
            ...(tripType === "return" && {
                returnDate,
                returnTime,
            }),
            fromAddress,
            toAddress,
            people,
            wheelchair,
            tripCategory,
        };


        const loadingToast = toast.loading(
            "Söker resa...\nVänligen vänta ett ögonblick"
        );


        try {
            const res = await fetch(
                "http://localhost:4000/trips/available-times", 
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
            });

            if (!res.ok) {
                toast.dismiss(loadingToast);
                return toast("Kunde inte hämta tider", {
                    icon: "❌",
                    duration: 4000,
                });
            }

            const data = await res.json();

            
            toast.dismiss(loadingToast);

            toast.success("Resa hittad!\nVälj en tid nedan", {
                icon: "✅",
                duration: 3500 
            });

            // liten delay så användaren hinner läsa
            setTimeout(() => {
                navigate("/select-time", {
                    state: {
                        payload,
                        times: data.times
                    }
                });
            }, 800);

        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Tekniskt fel - försök igen");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-4 mb-4 p-6 bg-gray-200 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Sök din resa
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Enkel / tur & retur */}
                <div className="flex items-center gap-4 mb-4 col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio"
                            name="tripType"
                            value="oneway"
                            checked={tripType === "oneway"}
                            onChange={() => setTripType("oneway")}
                            className="w-4 h-4"
                        />
                        Enkel resa
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio"
                            name="tripType"
                            value="return"
                            checked={tripType === "return"}
                            onChange={() => setTripType("return")}
                            className="w-4 h-4"
                        />
                        Tur & retur
                    </label>
                </div>

                {/* Datum */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                        Datum
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                {/* Tid */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                        Tid
                    </label>
                    <div className="relative">
                        <Clock className="absolute left-2 top-3 text-gray-800" size={18} />
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 pl-10"
                        />
                    </div>
                </div>

                {/* Extra retur-fält */}
                {tripType === "return" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">
                                Retur datum
                            </label>
                            <input
                                type="date"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">
                                Retur tid
                            </label>
                            <input
                                type="time"
                                value={returnTime}
                                onChange={(e) => setReturnTime(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                        </div>
                    </>
                )}

                {/* Antal personer */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                        Antal personer
                    </label>
                    <select
                        value={people}
                        onChange={(e) => setPeople(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    >
                        <option value="1">1 person</option>
                        <option value="2">2 personer</option>
                        <option value="3">3 personer</option>
                        <option value="4">4 personer</option>
                    </select>
                </div>

                {/* Rullstol */}
                <div className="flex items-center gap-3 mt-6">
                    <input 
                        type="checkbox"
                        checked={wheelchair}
                        onChange={(e) => setWheelchair(e.target.checked)}
                        className="w-5 h-5 cursor-pointer"
                    />

                    <label className="flex items-center gap-2 text-gray-800">
                        <Accessibility size={22} />
                        <span>Rullstol behövs</span>
                    </label>
                </div>

                {/* Från */}
                <AddressInput 
                    label="Från"
                    onSelect={(data) => setFromAddress(data.address)}
                />

                {/* Till */}
                <AddressInput 
                    label="Till"
                    onSelect={(data) => setToAddress(data.address)}
                />

                {/** Typ av resa */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                        Typ av resa
                    </label>

                    <select 
                        value={tripCategory}
                        onChange={(e) => setTripCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Välj typ av resan...</option>
                        <option value="Sjukresa">Sjukresa</option>
                        <option value="Färdtjänst">Färdtjänst</option>
                    </select>
                </div>

                {/* Sök-knapp */}
                <div className="col-span-2 mt-6">
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-lg text-xl flex items-center justify-center gap-2
                                ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
                        `}
                    >
                        <Search size={28} />
                        SÖK DIN RESA HÄR!
                    </button>
                </div>
            </form>
        </div>
    );
}
