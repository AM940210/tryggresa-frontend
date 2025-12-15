import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function shortAddress(full: string) {
    if (!full) return "";
    return full.split(",").slice(0, 2).join(",");
}

export default function SelectTimePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const times: string[] = location.state?.times;
    const payload = location.state?.payload;

    if (!times || !payload) {
        return (
            <div className="p-6 text-red-600 text-center">
                <h2 className="text-xl font-bold">Ingen tidsdata mottagen</h2>
            </div>
        );
    }

    const chooseTime = async (t: string) => {
        const booking = { ...payload, time: t };

        const loadingToast = toast.loading("Skickar bokningen...");

        try {
            const res = await fetch("http://localhost:4000/trips", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(booking),
            });

            const data = await res.json();

            toast.dismiss(loadingToast);
            toast.success("Bokning skickad!");

            navigate("/confirmation", {
                state: { trip: data }
            });

        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Kunde inte slutföra bokningen");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Välj en tid</h1>

            <p className="font-semibold text-gray-700 mb-4">Här är tillgängliga tider för din resa:</p>

            <div className="grid grid-cols-1 gap-4 mt-4">
                {times.map((t) => (
                    <button
                        key={t}
                        onClick={() => chooseTime(t)}
                        className="w-full text-left px-6 py-4 rounded-lg border bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        <p className="text-xl font-bold">Kl {t}</p>
                        <p className="opacity-90 mt-1">
                            {shortAddress(payload.fromAddress)} → {shortAddress(payload.toAddress)}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}
