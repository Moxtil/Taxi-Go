"use client";
import Image from "next/image";
import React, { useEffect, useContext } from "react";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import toast, { Toaster } from "react-hot-toast";
import { Selectors } from "../context/Selected";
export const cars = [
  {
    id: 1,
    name: "Minivan",
    img: img1,
    price: 1.2,
  },
  {
    id: 2,
    name: "Economy",
    img: img2,
    price: 1,
  },
  {
    id: 3,
    name: "Luxury",
    img: img3,
    price: 2,
  },
  {
    id: 4,
    name: "Economy",
    img: img4,
    price: 1,
  },
  {
    id: 5,
    name: "Comfort",
    img: img5,
    price: 1.4,
  },
  {
    id: 6,
    name: "Electric",
    img: img6,
    price: 1.1,
  },
];

export default function SelectCars() {
  const { selectedCar, setSelectedCar } = useContext(Selectors);
  useEffect(() => {
    if (selectedCar != null) {
      toast.success("Car Selected!");
    }
  }, [selectedCar]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 relative">
      {cars.map((car) => (
        <div
          key={car.id}
          className={`col-span-1 flex flex-col items-center justify-between m-2 border-[3px] ${
            car === selectedCar
              ? "border-yellow-400 shadow-sm shadow-[#999]"
              : "border-gray-300"
          } p-2 overflow-hidden cursor-pointer`}
          onClick={() => setSelectedCar(car)}
        >
          <Image
            src={car.img}
            alt={car.name}
            width={75}
            height={60}
            className="object-cover"
          />
          <p className="text-gray-400 font-semibold text-[14px]">{car.name}</p>
          <h3 className="text-gray-400 font-semibold text-[14px]">
            ${car.price}
          </h3>
        </div>
      ))}
    </div>
  );
}
