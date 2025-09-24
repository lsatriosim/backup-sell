"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, ShoppingBag, User } from "lucide-react";

const navItems = [
  { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { name: "Me", href: "/profile", icon: User },
];

export default function BottomNavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md rounded-t-2xl py-2 z-20">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex flex-col items-center text-sm font-rubik ${
                  isActive ? "text-surface-primary" : "text-gray-500"
                }`}
              >
                <Icon
                  className={`h-6 w-6 mb-1 ${
                    isActive ? "stroke-surface-primary" : "stroke-gray-500"
                  }`}
                />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}