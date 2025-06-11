"use client";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RoutingContext({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!isLoaded) return; // wait until Clerk is ready

    const isAuthPage = path.includes("/sign-in") || path.includes("/sign-up");

    if (!user && !isAuthPage) {
      router.push("/sign-up");
    } else if (user && isAuthPage) {
      router.push("/");
    }
  }, [isLoaded, user, path, router]);

  return <>{children}</>;
}
