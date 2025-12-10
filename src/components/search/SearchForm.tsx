import { useState } from "react";
import { Search, Clock, Users, Accessibility } from "lucide-react";
import AddressInput from "./AddressInput";

export default function SearchForm() {
    const [tripType, setTripType] = useState<"oneway" | "return">("oneway");
    return (
        <div className="max-w-5xl mx-auto mt-4 mb-4 p-6 bg-gray-200 shadow-md">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Sök din resa
            </h2>

            {/* Tur & reture / Enkel resa */}
            <div className="flex items-center gap-4 mb-4">
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

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Datum */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                        Datum
                    </label>
                    <input 
                        type="date"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Tid */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                        Tid
                    </label>
                    <div className="relative">
                        <Clock className="absolute left-2 top-3.5 text-gray-800" size={18} />
                        <input 
                            type="time"
                            className="w-full border border-gray-300 rounded-lg p-2 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Extra fält visas bara om Tur & retur är valt */}
                {tripType === "return" && (
                    <>
                        {/* retur-datum */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">
                                Returdatum
                            </label>
                            <input 
                                type="date"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Retur-tid */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">
                                Tid
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-2 top-3.5 text-gray-800" size={18} />
                                <input 
                                    type="time"
                                    className="w-full border border-gray-300 rounded-lg p-2 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Antal personer */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                        Antal personer
                    </label>
                    <div className="relative">
                        <Users className="absolute left-2 top-3.5 text-gray-800" size={18} />
                        <select 
                            className="w-full border border-gray-300 rounded-lg p-2 pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="1">1 person</option>
                            <option value="2">2 personer</option>
                            <option value="3">3 personer</option>
                            <option value="4">4 personer</option>
                        </select>
                    </div>
                </div>

                

                {/* Rullstol */}
                <div className="flex items-center gap-3 mt-6">
                    <input 
                        type="checkbox"
                        id="wheelchair"
                        className="w-5 h-5 cursor-pointer accent-blue-600"
                    />

                    <label 
                        htmlFor="wheelchair"
                        className="flex items-center gap-2 text-gray-800 leading-none"
                    >
                        <Accessibility size={22} className="text-gray-600" />
                        <span>Rullstol behövs</span>
                    </label>
                </div>

                {/* Från */}
                <div>
                    {/* Från */}
                    <AddressInput 
                        label="Från"
                        onSelect={(data) => console.log("Från:", data)}
                    />
                </div>

                {/* Till */}
                <div>
                    {/* Till */}
                    <AddressInput 
                        label="Till"
                        onSelect={(data) => console.log("Till:", data)}
                    />
                </div>
                
            </form>

            {/* Sök-knapp */}
            <div className="mt-6 flex justify-center">
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer text-2xl">
                    <Search size={32} className="mr-2"/>
                    SÖK DIN RESA HÄR!
                </button>
            </div>
        </div>
    )
}