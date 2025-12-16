import { useLocation } from "react-router-dom";

function shortAddress(full: string) {
    if (!full) return "";

    if (full.includes(",")) {
        return full.split(",")[0].trim();
    }

    const words = full.split(" ");
    const cleaned = words.filter(w => !/^\d+$/.test(w));
    return cleaned.slice(0, 3).join(" ");
}

export default function BookningConfirmation() {
    const location = useLocation();
    const data = location.state?.trip;

    if (!data) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-red 100 rounded-lg">
                <h2 className="text-xl font-bold text-red-700">Ingen bokning hittades</h2>
                <p className="text-red-600">Gå tillbaka och fyll i formuläret igen.</p>
            </div>
        );
    }

    const { tripOut, tripReturn, message } = data;

    return (
        <div className="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-3xl font-bold text-green-700 mb-4"> Bokning mottagen! </h1>
            <p className="text-gray-800 mb-4">Din resa är sparad. Här är detaljerna:</p>

            {/** UTRESA */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h2 className="text-xl font-bold mb-2">Utresa</h2>

                <p><strong>Datum:</strong> {tripOut.date} </p>
                <p><strong>Tid:</strong> {tripOut.time} </p>
                <p><strong>Från:</strong> {shortAddress(tripOut.fromAddress)} </p>
                <p><strong>Till:</strong> {shortAddress(tripOut.toAddress)} </p>
                <p><strong>Antal personer:</strong> {tripOut.people} </p>
                <p><strong>Rullstol:</strong> {tripOut.wheelchair ? "Ja" : "Nej"}</p>
                <p><strong>Typ av resa:</strong> {tripOut.tripCategory} </p>
                <p><strong>Bokning-ID:</strong> {tripOut.id} </p>
                <p><strong>Pris:</strong> {tripOut.price} kr</p>
            </div>


            {/** RETURRESA */}
            {tripReturn && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                    <h2 className="text-xl font-bold mb-2">Returresa</h2>

                    <p><strong>Datum:</strong> {tripReturn.date} </p>
                    <p><strong>Tid:</strong> {tripReturn.time} </p>
                    <p><strong>Från:</strong> {shortAddress(tripReturn.fromAddress)} </p>
                    <p><strong>Till:</strong> {shortAddress(tripReturn.toAddress)} </p>
                    <p><strong>Antal personer:</strong> {tripReturn.people} </p>
                    <p><strong>Rullstol:</strong> {tripReturn.wheelchair ? "Ja" : "Nej"}</p>
                    <p><strong>Typ av resa:</strong> {tripReturn.tripCategory} </p>
                    <p><strong>Bokning-ID:</strong> {tripReturn.id} </p>
                    <p><strong>Pris:</strong> {tripOut.price} kr</p>
                </div>
            )}

            {/** Backend meddelande */}
            <div className="mt-4 p-4 bg-blue-100 rounded text-blue-900 font-semibold">
                {message}
            </div>
        </div>
    );
}