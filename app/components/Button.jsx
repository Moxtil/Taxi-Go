"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { Selectors } from "../context/Selected";
import Swal from "sweetalert2";

export default function Button() {
  const {
    selectedMethod,
    selectedCar,
    finalPrice,
    whereFromCoords,
    whereToCoords,
  } = useContext(Selectors);
  const handleClick = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: "Taxi Cost" },
              unit_amount: finalPrice * 100, // $20.00
            },
            quantity: 1,
          },
        ],
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <>
      <button
        onClick={() => {
          if (
            selectedMethod === 0 ||
            selectedCar === 0 ||
            !whereFromCoords ||
            !whereToCoords
          ) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Car or Payment method Or Input field missing!",
              showConfirmButton: true,
            });
          } else {
            handleClick();
          }
        }}
        className="cursor-pointer bg-yellow-400 text-[#222] text-center font-semibold px-7 py-2 w-full my-4 rounded-md"
      >
        Book Now
      </button>
    </>
  );
}
