"use client";
import React, { createContext, useState } from "react";

export const Selectors = createContext();

export default function Selected({ children }) {
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [whereFrom, setWhereFrom] = useState("");
  const [whereFromCoords, setWhereFromCoords] = useState(null);

  const [whereTo, setWhereTo] = useState("");
  const [whereToCoords, setWhereToCoords] = useState(null);

  const [routeInfo, setRouteInfo] = useState(null);

  const finalPrice = parseInt(routeInfo?.distance * selectedCar?.price);
  return (
    <Selectors.Provider
      value={{
        selectedCar,
        setSelectedCar,
        selectedMethod,
        setSelectedMethod,
        whereFrom,
        setWhereFrom,
        whereTo,
        setWhereTo,
        whereFromCoords,
        setWhereFromCoords,
        whereToCoords,
        setWhereToCoords,
        routeInfo,
        setRouteInfo,
        finalPrice,
      }}
    >
      {children}
    </Selectors.Provider>
  );
}
