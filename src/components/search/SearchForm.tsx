import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressInput from "./AddressInput";
import toast from "react-hot-toast";

export default function SearchForm() {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState<"oneway" | "return">("oneway");

  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");

  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromAddress || !toAddress || !date) {
      toast.error("Fyll i alla obligatoriska fält");
      return;
    }

    if (tripType === "return" && !returnDate) {
      toast.error("Välj returdatum");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fromAddress,
        toAddress,
        date,
        returnDate: tripType === "return" ? returnDate : undefined,
        tripType,
      };

      const res = await fetch("http://localhost:4000/trips/available-times", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            date,
            fromAddress,
            toAddress,
            tripType 
        }),
      });

      if (!res.ok) {
        throw new Error("Kunde inte hämta tider");
      }

      const data = await res.json();

      navigate("/select-time", {
        state: {
          payload,
          times: data.times,
        },
      });
    } catch (err) {
      toast.error("Något gick fel");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-5"
      >
        {/* Enkel / Tur & retur */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setTripType("oneway")}
            className={`flex-1 py-2 rounded-lg font-medium ${
              tripType === "oneway"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Enkel resa
          </button>

          <button
            type="button"
            onClick={() => setTripType("return")}
            className={`flex-1 py-2 rounded-lg font-medium ${
              tripType === "return"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Tur & retur
          </button>
        </div>

        {/* Från */}
        <AddressInput
          label="Från"
          onSelect={({ address }) => setFromAddress(address)}
        />

        {/* Till */}
        <AddressInput
          label="Till"
          onSelect={({ address }) => setToAddress(address)}
        />

        {/* Datum */}
        <div>
          <label className="block text-sm font-medium">Datum</label>
          <input
            type="date"
            className="w-full mt-1 p-2 border rounded-lg hover:bg-gray-200  cursor-pointer"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Returdatum */}
        {tripType === "return" && (
          <div>
            <label className="block text-sm font-medium">Returdatum</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded-lg"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Söker tider..." : "Sök tider"}
        </button>
      </form>
    </div>    
  );
}
