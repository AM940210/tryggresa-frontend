import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";


function shortAddress(full?: string) {
    if (!full) return "";

    if (full.includes(",")) {
        return full.split(",")[0].trim();
    }

    const words = full.split(" ");
    const cleaned = words.filter(w => !/^\d+$/.test(w));

    return cleaned.slice(0, 3).join(" ");
}

export default function SelectTimePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const payload = location.state?.payload;
    const outboundTimes: string[] = location.state?.times;

    if (!payload || !outboundTimes) {
        return (
            <div className="p-6 text-red-600 text-center">
                <h2 className="text-xl font-bold">Ingen tidsdata mottagen</h2>
                <p>Gå tillbaka och sök resan igen.</p>
            </div>
        );
    }

    const isReturn = Boolean(payload.returnDate && payload.returnTime);

    const [selectedOutbound, setSelectedOutbound] = useState<string | null>(null);
    const [selectedReturn, setSelectedReturn] = useState<string | null>(null);

    // Fejkade returtider (backend kan ersätta senare)
    const returnTimes = ["13:00", "13:30", "14:00", "14:30", "15:00"];

    const confirmBooking = async () => {
        if (!selectedOutbound) return;

        if (isReturn && !selectedReturn) {
            toast.error("Välj tid för returresan");
            return;
        }

        const loadingToast = toast.loading("Skickar bokningen...");

        const booking = {
            ...payload,
            time: selectedOutbound,
            ...(isReturn && { returnTime: selectedReturn }),
        };

        try {
            const res = await fetch("http://localhost:4000/trips", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(booking),
            });

            if (!res.ok) {
                throw new Error("Backend error");
            }

            const data = await res.json();

            toast.dismiss(loadingToast);
            toast.success("Bokning skickad!");

            navigate("/confirmation", {
                state: { trip: data }
            });

        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Kunde inte slutföra bokningen");
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 mb-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Välj tid för din resa</h1>

            {/* ================= UTRESA ================= */}
            <h2 className="text-xl font-semibold mb-3">⏱ Utresa</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outboundTimes.map((t) => (
                    <button
                        key={t}
                        onClick={() => setSelectedOutbound(t)}
                        className={`
                            w-full text-left px-6 py-4 rounded-lg border transition
                            ${selectedOutbound === t
                                ? "bg-blue-700 text-white border-blue-900"
                                : "bg-blue-600 text-white hover:bg-blue-700"}
                        `}
                    >
                        <p className="text-xl font-bold">Kl {t}</p>
                        <p className="opacity-90">
                            {shortAddress(payload.fromAddress)} →{" "}
                            {shortAddress(payload.toAddress)}
                        </p>
                    </button>
                ))}
            </div>

            {/* ================= RETURRESA ================= */}
            {isReturn && (
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-3">↩️ Returresa</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {returnTimes.map((t) => (
                            <button
                                key={t}
                                onClick={() => setSelectedReturn(t)}
                                className={`
                                    w-full text-left px-6 py-4 rounded-lg border transition
                                    ${selectedReturn === t
                                        ? "bg-green-700 text-white border-green-900"
                                        : "bg-green-600 text-white hover:bg-green-700"}
                                `}
                            >
                                <p className="text-xl font-bold">Kl {t}</p>
                                <p className="opacity-90">
                                    {shortAddress(payload.toAddress)} →{" "}
                                    {shortAddress(payload.fromAddress)}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ================= PRIS ================= */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-lg font-semibold">
                    Pris: {isReturn ? "250 kr (tur & retur)" : "125 kr"}
                </p>
                <p className="text-sm text-gray-600">
                    Inga extra kostnader för medföljare eller rullstol
                </p>
            </div>

            {/* ================= BEKRÄFTA ================= */}
            <button
                disabled={!selectedOutbound || (isReturn && !selectedReturn)}
                onClick={confirmBooking}
                className={`
                    w-full mt-8 py-4 rounded-lg text-xl font-bold transition
                    ${(!selectedOutbound || (isReturn && !selectedReturn))
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"}
                `}
            >
                BEKRÄFTA BOKNING
            </button>
        </div>
    );
}
