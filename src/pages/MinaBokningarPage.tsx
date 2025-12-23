import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

type Trip = {
  id: string;
  date: string;
  time: string;
  fromAddress: string;
  toAddress: string;
  people: number;
  wheelchair: boolean;
  price: number;
};

export default function MinaBokningarPage() {
  const { token } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch("http://localhost:4000/trips/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Kunde inte hämta bokningar");
        }

        const data = await res.json();
        setTrips(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, [token]);

  const cancelTrip = async (id: string) => {
    if (!confirm("Vill du verkligen avboka resan?")) return;

    try {
      const res = await fetch(`http://localhost:4000/trips/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      toast.success("Resan är avbokad");

      // ta bort resan direkt i UI
      setTrips((prev) => prev.filter((t) => t.id !== id));
    } catch {
      toast.error("Kunde inte avboka resan");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Laddar bokningar...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mina bokningar</h1>

      {trips.length === 0 ? (
        <p>Du har inga bokningar ännu.</p>
      ) : (
        <ul className="space-y-4">
          {trips.map((trip) => (
            <li
              key={trip.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p><strong>Datum:</strong> {trip.date}</p>
              <p><strong>Tid:</strong> {trip.time}</p>
              <p><strong>Från:</strong> {trip.fromAddress}</p>
              <p><strong>Till:</strong> {trip.toAddress}</p>
              <p><strong>Personer:</strong> {trip.people}</p>
              <p>
                <strong>Rullstol:</strong>{" "}
                {trip.wheelchair ? "Ja" : "Nej"}
              </p>
              <p><strong>Pris:</strong> {trip.price} kr</p>

              <button
                onClick={() => cancelTrip(trip.id)}
                className="mt-2 font-bold bg-red-500 text-white py-2 px-4 rounded-lg hover:underline"
              >
                Avboka
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
