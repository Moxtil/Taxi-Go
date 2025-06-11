"use client";
import React from "react";
import { UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="p-3 flex items-center justify-between gap-10">
      <div className="cursor-pointer">
        <div className="flex items-center gap-1">
          <h1 className="tracking-wider p-1 rounded-md bg-orange-400 text-black font-semibold text-2xl">
            TAXI
          </h1>
          <h1 className="text-orange-400 font-semibold text-2xl">GO</h1>
        </div>
      </div>
      <div className="flex justify-end">
        <UserButton
          afterSignOutUrl="/sign-up"
          appearance={{
            elements: {
              userButtonPopoverCard: "shadow-lg border border-gray-200",
              userButtonAvatarBox: "ring-2 ring-blue-500 w-[50px] h-[50px]",
            },
          }}
        />
      </div>
    </nav>
  );
}
