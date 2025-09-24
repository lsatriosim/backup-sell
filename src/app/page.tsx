"use client";

import Image from "next/image";
import { RefreshCcw, HandCoins, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "./context/UserContext";

export default function LandingPage() {
  const router = useRouter();
  const userContext = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-surface-tertiary">
      <Image
        src="/ic_circle_crop_background_top.png"
        alt=""
        width={250}
        height={250}
        className="absolute -top-20 -right-20 opacity-30 pointer-events-none select-none"
      />
      {/* Header */}
      <header className="flex items-center gap-2 px-4 py-3 text-neutral-950">
        <Image
          src="/ic_backup_sell_logo.png"
          alt="Backup Sell Logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="text-lg font-semibold">Backup Sell</span>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-9 text-left relative overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">
          Turn Missed Plans into Opportunity
        </h1>
        <p className="text-neutral-600 max-w-xl mb-6 text-base">
          Plans change, and that’s okay. Backup Sell gives you a safe place to
          resell your unused bookings like sport courts, concert tickets, cinema
          tickets, and more. Simple, flexible, and stress-free.
        </p>
        <Button onClick={() => {
          if(userContext.userId == null) {
            router.push("/login");
          } else {
            router.push("/marketplace");
          }
        }} className="bg-surface-primary text-white px-6 py-3 rounded-md">
          Try for Free
        </Button>
        <div className="mt-10 flex justify-center">
          <Image
            src="/ilu_women_relieved.png"
            alt="Relaxed Woman Illustration"
            width={750}
            height={750}
            className="z-1"
            priority
          />
        </div>
        <Image
          src="/ic_circle_crop_background_bottom.png"
          alt=""
          width={200}
          height={200}
          className="absolute -bottom-20 -left-20 opacity-30 pointer-events-none select-none z-0"
        />
      </section>

      {/* Value Proposition Section */}
      <section className="bg-surface-primary text-white rounded-t-3xl px-6 py-10 space-y-8">
        {/* 1 */}
        <div className="flex gap-4 items-start">
          <div className="flex flex-row items-center gap-4">
            <RefreshCcw className="h-16 w-16 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">
                Turn Missed Plans into Opportunity
              </h3>
              <p className="text-neutral-200 text-sm mt-1">
                Plans change? Don’t let your tickets or reservations go unused —
                easily resell them to someone who needs them.
              </p>
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="flex gap-4 items-start">
          <div className="flex flex-row items-center gap-4">
            <HandCoins className="h-16 w-16 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg">Effortless Reselling</h3>
            <p className="text-neutral-200 text-sm mt-1">
              Listing takes just a few clicks, making it simple and fast to turn
              your missed plans into new opportunities.
            </p>
          </div>
          </div>
        </div>
        {/* 3 */}
        <div className="flex gap-4 items-start">
          <div className="flex flex-row items-center gap-4">
            <Users className="h-16 w-16 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg">Win-Win for Everyone</h3>
            <p className="text-neutral-200 text-sm mt-1">
              You save money, and someone else gets the chance to enjoy the
              experience — everybody benefits.
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center">
        <h3 className="font-semibold text-lg mb-2">Contact Info</h3>
        <p className="text-neutral-600 mb-4">
          Stay connected with Backup Sell
        </p>
        <div className="space-y-2 text-sm text-neutral-700">
          <p>📧 BackupSell9@gmail.com</p>
          <p>📱 +62 853-4583-8849</p>
        </div>
      </footer>
    </div>
  );
}
