import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { MapPin } from "lucide-react";

interface AddressInputProps {
  label: string;
  onSelect: (data: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
}

export default function AddressInput({
  label,
  onSelect,
}: AddressInputProps) {

  // 🔐 VIKTIGT: vänta på Google Maps
  const isGoogleLoaded =
    typeof window !== "undefined" &&
    !!window.google?.maps?.places;

  if (!isGoogleLoaded) {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
        <input
          disabled
          placeholder="Laddar adressökning…"
          className="w-full border rounded-lg p-2 pl-9 bg-gray-100"
        />
      </div>
    );
  }

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    onSelect({ address, lat, lng });
  };

  return (
    <div className="w-full relative">
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>

      <div className="relative">
        <MapPin
          className="absolute left-3 top-3 text-gray-500"
          size={18}
        />

        <input
          value={value}
          disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ange adress..."
          className="w-full border rounded-lg p-2 pl-9"
        />
      </div>

      {status === "OK" && (
        <ul className="absolute z-50 bg-white border w-full rounded-lg mt-1 shadow">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
