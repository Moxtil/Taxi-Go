"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import img1 from "../assets/Group.png";
import img2 from "../assets/ApplePay.png";
import img3 from "../assets/GooglePay.png";
import img4 from "../assets/Visa.png";
import img5 from "../assets/PayPal.png";
import Image from "next/image";
import toast from "react-hot-toast";
import { Selectors } from "../context/Selected";

const pays = [
  {
    id: 1,
    img: img1,
    price: 6,
  },
  {
    id: 2,
    img: img2,
    price: 5,
  },
  {
    id: 3,
    img: img3,
    price: 13,
  },
  {
    id: 4,
    img: img4,
  },
  {
    id: 5,
    img: img5,
  },
];
export default function PaymentMethods() {
  const { selectedMethod, setSelectedMethod } = useContext(Selectors);
  useEffect(() => {
    if (selectedMethod !== 0) {
      toast.success("Payment Method Selected");
    }
  }, [selectedMethod]);
  return (
    <main>
      <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {pays.map((p) => (
          <div
            key={p.id}
            className={`col-span-1 flex flex-col items-center m-2 border-[3px] ${
              p.id === selectedMethod
                ? "border-yellow-400 shadow-sm shadow-[#999]"
                : "border-gray-300"
            } p-2 overflow-hidden cursor-pointer`}
            onClick={() => setSelectedMethod(p.id)}
          >
            <Image src={p.img} alt="Payment" width={75} height={75} />
          </div>
        ))}
      </div>
    </main>
  );
}
