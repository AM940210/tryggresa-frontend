import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { MapPin } from "lucide-react";

interface AddressInputProps {
    label: string;
    onSelect: (data: { address: string; lat: number; lng: number }) => void;
}

export default function AddressInput({ label, onSelect }: AddressInputProps) {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete();

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        // Hämta geocoding (Lat/Lng)
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);

        onSelect({ address, lat, lng });
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-800 mb-1">
                {label}
            </label>

            <div className="relative">
                <MapPin className="absolute left-2 top-3 text-gray-500" size={20} />

                <input 
                value={value}
                disabled={!ready}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ange adress..."
                className="w-full border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
            </div>

            {status === "OK" && (
                <ul className="absolute bg-white border border-gray-200 shadow-md rounded-lg mt-1 z-50 w-full max-h-48 overflow-auto">
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

