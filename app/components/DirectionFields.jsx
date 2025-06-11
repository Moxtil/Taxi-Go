"use client";
import React, { useState } from "react";

export default function DirectionFields() {
  const [whereFrom, setWhereFrom] = useState("");
  const [whereTo, setWhereTo] = useState("");
  return (
    <main>
      <div className="flex flex-col gap-2">
        <label htmlFor="whereFrom" className="font-semibold text-gray-400">
          Where From ?
        </label>
        <input
          type="text"
          name="whereFrom"
          id="whereFrom"
          value={whereFrom}
          onChange={(e) => setWhereFrom(e.target.value)}
          className="border-[#72727245] border-2 outline-0 focus:border-yellow-400"
        />
      </div>
      <div className="flex flex-col gap-2 my-4">
        <label htmlFor="whereTo" className="font-semibold text-gray-400">
          Where To ?
        </label>
        <input
          type="text"
          name="whereTo"
          id="whereTo"
          value={whereTo}
          onChange={(e) => setWhereTo(e.target.value)}
          className="border-[#72727245] border-2 outline-0 focus:border-yellow-400"
        />
      </div>
    </main>
  );
}
