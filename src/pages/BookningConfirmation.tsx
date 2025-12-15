import { useLocation } from "react-router-dom";

export default function BookningConfirmation() {
    const location = useLocation();
    const trip = location.state?.trip;

    if (!trip) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-red 100 rounded-lg">
                <h2 className="text-xl font-bold text-red-700">Ingen bokning hittades</h2>
                <p className="text-red-600">Gå tillbaka och fyll i formuläret igen.</p>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-3xl font-bold text-green-700 mb-4"> Bokning mottagen! </h1>

            <p className="text-gray-800 mb-4">Din resa är sparad. Här är detaljerna:</p>

            <div className="space-y-2 text-lg">
                <p><strong>Datum:</strong> {trip.date} </p>
                <p><strong>Tid:</strong> {trip.time} </p>
                <p><strong>Från:</strong> {trip.fromAddress} </p>
                <p><strong>Till:</strong> {trip.toAddress} </p>
                <p><strong>Antal personer:</strong> {trip.people} </p>
                <p><strong>Rullstol:</strong> {trip.wheelchair ? "Ja" : "Nej"}
                                            {trip.message && (
                                                <span className="text-blue-700 ml-2">
                                                    ({trip.message})
                                                </span>
                                            )} </p>
                <p><strong>Bokning-ID:</strong> {trip.id} </p>
            </div>
        </div>
    );
}