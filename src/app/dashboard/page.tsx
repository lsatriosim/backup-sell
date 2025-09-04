'use client';

import { FileText, Tag, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const menus = [
  { name: "My Post", href: "/dashboard/posts", icon: FileText },
  { name: "My Offer", href: "/dashboard/offers", icon: Tag },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-surface-primary text-white h-28 flex items-end px-6 pb-4 rounded-b-2xl shadow-md w-full justify-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>

      {/* Menu List */}
      <main className="px-4 py-6 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menus.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-4 ${
                  idx !== menus.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">{item.name}</span>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-gray-600"></ChevronRightIcon>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
