"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

export default function LoadWrapper({ children }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="text-black font-semibold text-4xl text-center my-[50px]">
        <div className="flex items-center justify-center gap- mt-10">
          <h1 className="tracking-wider p-1 rounded-md bg-orange-400 text-black font-semibold text-4xl">
            TAXI
          </h1>
          <h1 className="text-orange-400 font-semibold text-4xl">GO</h1>
        </div>{" "}
        {/* <br /> */}
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.0,
        ease: [0.33, 1, 0.68, 1], // smooth, custom bezier
      }}
    >
      {children}
    </motion.div>
  );
}
