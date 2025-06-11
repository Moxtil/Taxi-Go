"use client";
import SelectCars from "./components/SelectCars";
import PaymentMethods from "./components/PaymentMethods";
import Button from "./components/Button";
import GeoapifyAutocomplete from "./components/AddressAutocompleteInput";
import dynamic from "next/dynamic";

import { useContext } from "react";
import { Selectors } from "./context/Selected";
import { Toaster } from "react-hot-toast";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

export default function Home() {
  const { whereToCoords, whereFromCoords } = useContext(Selectors);
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 p-3 gap-1">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="col-span-1 p-2">
        <h1 className="font-bold text-lg my-3">Booking</h1>
        <div className="border-2 border-[#72727245] p-4 ">
          <GeoapifyAutocomplete />
          <h1 className="font-semibold my-3">
            Select Car{" "}
            <span className="font-[400] text-gray-400">
              {"(" + "Prices per mile" + ")"}
            </span>
          </h1>
          <SelectCars />
          <h1 className="font-semibold my-3">Payment Methods</h1>
          <PaymentMethods />
          <Button />
        </div>
      </div>
      <div className="col-span-2 p-2">
        <Map
          fromCoords={whereFromCoords}
          toCoords={whereToCoords}
          apiKey={"a50fa73ebc0f45a3ba55a2b3adce273a"}
        />
      </div>
    </main>
  );
}
