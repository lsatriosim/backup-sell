"use client";

import { usePathname } from "next/navigation";
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function BottomNavWrapper() {
  const pathname = usePathname();
  const hiddenRoutes = ["/login", "/register", "/"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return <BottomNavigationBar />;
}
