import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

/** ===== Hjälpfunktion ===== */
function shortAddress(full?: string) {
  if (!full) return "";

  if (full.includes(",")) {
    return full.split(",")[0].trim();
  }

  const words = full.split(" ");
  const cleaned = words.filter((w) => !/^\d+$/.test(w));
  return cleaned.slice(0, 3).join(" ");
}

export default function TravelerInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  /**
   * tripData MÅSTE innehålla:
   * fromAddress, toAddress, date, time
   * (returnDate, returnTime om tur & retur)
   */
  const tripData = location.state;

  if (!tripData) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-red-100 rounded-lg text-center">
        <h2 className="text-xl font-bold text-red-700">
          Ingen reseinformation hittades
        </h2>
        <p className="text-red-600 mt-2">
          Gå tillbaka och välj resa igen.
        </p>
      </div>
    );
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [people, setPeople] = useState(1);
  const [wheelchair, setWheelchair] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBooking = async () => {
    if (!firstName || !lastName) {
      toast.error("Fyll i för- och efternamn");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Skickar bokningen...");

    /**
     * 🚨 VIKTIGT:
     * Backend kräver:
     * date, time, fromAddress, toAddress,
     * people, wheelchair, tripCategory
     */
    const bookingPayload = {
      fromAddress: tripData.fromAddress,
      toAddress: tripData.toAddress,
      date: tripData.date,
      time: tripData.time,

      returnDate: tripData.returnDate,
      returnTime: tripData.returnTime,

      tripCategory: tripData.tripCategory ?? "oneway",

      firstName,
      lastName,
      people,
      wheelchair,
    };

    console.log("BOOKING PAYLOAD:", bookingPayload);

    try {
      const res = await fetch("http://localhost:4000/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("BACKEND ERROR:", err);
        throw new Error("Backend error");
      }

      const data = await res.json();

      toast.dismiss(loadingToast);
      toast.success("Bokning skapad!");

      // ✅ NAVIGERING FUNKAR NU
      navigate("/confirmation", {
        state: { trip: data },
      });
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Kunde inte skapa bokningen");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Resenär Information</h1>

      {/* ===== RESEÖVERSIKT ===== */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <p>
          <strong>Från:</strong> {shortAddress(tripData.fromAddress)}
        </p>
        <p>
          <strong>Till:</strong> {shortAddress(tripData.toAddress)}
        </p>
        <p>
          <strong>Datum:</strong> {tripData.date}
        </p>
        <p>
          <strong>Tid:</strong> {tripData.time}
        </p>

        {tripData.returnDate && (
          <>
            <hr className="my-2" />
            <p>
              <strong>Returdatum:</strong> {tripData.returnDate}
            </p>
            <p>
              <strong>Returtid:</strong> {tripData.returnTime}
            </p>
          </>
        )}
      </div>

      {/* ===== FORM ===== */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Förnamn</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Förnamn"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Efternamn</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Efternamn"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Antal personer
          </label>
          <input
            type="number"
            min={1}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={wheelchair}
            onChange={(e) => setWheelchair(e.target.checked)}
            className="w-5 h-5"
          />
          <label className="font-medium">
            Rullstol behövs
          </label>
        </div>
      </div>

      {/* ===== SKICKA ===== */}
      <button
        onClick={submitBooking}
        disabled={isSubmitting}
        className="mt-8 w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Skickar..." : "BEKRÄFTA BOKNING"}
      </button>
    </div>
  );
}
