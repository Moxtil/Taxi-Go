"use client";
import React, { useContext, useState } from "react";
import { Selectors } from "../context/Selected";

const GeoapifyAutocomplete = () => {
  const {
    whereFrom,
    setWhereFrom,
    whereTo,
    setWhereTo,
    setWhereFromCoords,
    setWhereToCoords,
  } = useContext(Selectors);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null); // 'from' or 'to'

  const GEOAPIFY_API_KEY = "a50fa73ebc0f45a3ba55a2b3adce273a";

  // Fetch suggestions helper
  const fetchSuggestions = async (inputValue, setter) => {
    if (!inputValue) {
      setter([]);
      return;
    }

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      inputValue
    )}&filter=countrycode:us&limit=5&apiKey=${GEOAPIFY_API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.features) {
        setter(data.features);
      } else {
        setter([]);
      }
    } catch (error) {
      console.error("Geoapify fetch error:", error);
      setter([]);
    }
  };

  // Handle input changes
  const handleFromChange = (e) => {
    setWhereFrom(e.target.value);
    fetchSuggestions(e.target.value, setFromSuggestions);
    setActiveInput("from");
  };

  const handleToChange = (e) => {
    setWhereTo(e.target.value);
    fetchSuggestions(e.target.value, setToSuggestions);
    setActiveInput("to");
  };

  // Select suggestion handler
  const selectSuggestion = (place, inputType) => {
    const address = place.properties.formatted || "";
    const coords = { lat: place.properties.lat, lon: place.properties.lon };

    if (inputType === "from") {
      setWhereFrom(address);
      setWhereFromCoords(coords);
      setFromSuggestions([]);
      console.log(coords);
    } else {
      setWhereTo(address);
      setWhereToCoords(coords);
      setToSuggestions([]);
    }
  };

  return (
    <div className="max-w-full mt-1 font-sans">
      <div className="mb-6 relative">
        <label
          className="block mb-1 font-semibold text-gray-700"
          htmlFor="whereFrom"
        >
          From:
        </label>
        <input
          id="whereFrom"
          type="text"
          value={whereFrom}
          onChange={handleFromChange}
          placeholder="Where from?"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="off"
        />
        {activeInput === "from" && fromSuggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-48 overflow-y-auto shadow-lg">
            {fromSuggestions.map((place) => (
              <li
                key={place.properties.place_id}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => selectSuggestion(place, "from")}
              >
                {place.properties.formatted}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6 relative">
        <label
          className="block mb-1 font-semibold text-gray-700"
          htmlFor="whereTo"
        >
          To:
        </label>
        <input
          id="whereTo"
          type="text"
          value={whereTo}
          onChange={handleToChange}
          placeholder="Where to?"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="off"
        />
        {activeInput === "to" && toSuggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-48 overflow-y-auto shadow-lg">
            {toSuggestions.map((place, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => selectSuggestion(place, "to")}
              >
                {place.properties.formatted}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GeoapifyAutocomplete;
