'use client';

import { BicepsFlexed, Clapperboard, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const menus = [
  { name: "Sport Court", href: "/marketplace/sport-court", icon: BicepsFlexed, disabled: false },
  { name: "Concert / Cinema Ticket (COMING SOON)", href: "/concert-and-cinema-ticket", icon: Clapperboard, disabled: true },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-surface-primary text-white h-28 flex items-end px-6 pb-4 rounded-b-2xl shadow-md w-full justify-center">
        <h1 className="text-2xl font-semibold">MarketPlace</h1>
      </header>

      {/* Menu List */}
      <main className="px-4 py-6 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menus.map((item, idx) => {
            const Icon = item.icon;
            const commonClasses = `flex items-center justify-between px-4 py-4 ${
              idx !== menus.length - 1 ? "border-b border-gray-100" : ""
            }`;

            if (item.disabled) {
              return (
                <div
                  key={item.name}
                  className={`${commonClasses} opacity-50 cursor-not-allowed`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-500 font-medium">{item.name}</span>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </div>
              );
            }

            return (
              <Link key={item.name} href={item.href} className={commonClasses}>
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">{item.name}</span>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
