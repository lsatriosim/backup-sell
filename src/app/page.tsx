"use client";

import Image from "next/image";
import { RefreshCcw, HandCoins, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "./context/UserContext";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();
  const userContext = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-surface-tertiary overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Image
          src="/ic_circle_crop_background_top.png"
          alt=""
          width={250}
          height={250}
          className="absolute -top-20 -right-20 opacity-30 pointer-events-none select-none"
        />
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 px-4 py-3 text-neutral-950"
      >
        <Image
          src="/ic_backup_sell_logo.png"
          alt="Backup Sell Logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="text-lg font-semibold">Backup Sell</span>
      </motion.header>

      {/* Hero Section */}
      <section className="px-6 pt-9 text-left relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold mb-4"
        >
          Turn Missed Plans into Opportunity
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-neutral-600 max-w-xl mb-6 text-base"
        >
          Plans change, and that’s okay. Backup Sell gives you a safe place to
          resell your unused bookings like sport courts, concert tickets, cinema
          tickets, and more. Simple, flexible, and stress-free.
        </motion.p>

        <motion.div
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <Button
            onClick={() => {
              router.push("/marketplace");
            }}
            className="bg-surface-primary text-white px-6 py-3 rounded-md"
          >
            Try for Free
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Image
            src="/ilu_women_relieved.png"
            alt="Relaxed Woman Illustration"
            width={750}
            height={750}
            className="z-1"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -bottom-20 -left-20"
        >
          <Image
            src="/ic_circle_crop_background_bottom.png"
            alt=""
            width={200}
            height={200}
            className="opacity-30 pointer-events-none select-none z-0"
          />
        </motion.div>
      </section>

      {/* Value Proposition Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-surface-primary text-white rounded-t-3xl px-6 py-10 space-y-8"
      >
        {[
          {
            icon: <RefreshCcw className="h-16 w-16 flex-shrink-0" />,
            title: "Turn Missed Plans into Opportunity",
            text: "Plans change? Don’t let your tickets or reservations go unused — easily resell them to someone who needs them.",
          },
          {
            icon: <HandCoins className="h-16 w-16 flex-shrink-0" />,
            title: "Effortless Reselling",
            text: "Listing takes just a few clicks, making it simple and fast to turn your missed plans into new opportunities.",
          },
          {
            icon: <Users className="h-16 w-16 flex-shrink-0" />,
            title: "Win-Win for Everyone",
            text: "You save money, and someone else gets the chance to enjoy the experience — everybody benefits.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="flex gap-4 items-start"
          >
            <div className="flex flex-row items-center gap-4">
              {item.icon}
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-neutral-200 text-sm mt-1">{item.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-8 text-center"
      >
        <h3 className="font-semibold text-lg mb-2">Contact Info</h3>
        <p className="text-neutral-600 mb-4">Stay connected with Backup Sell</p>
        <div className="space-y-2 text-sm text-neutral-700">
          <p>📧 BackupSell9@gmail.com</p>
          <a
            href="https://wa.me/6285117670921"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            📱 +62 851-1767-0921
          </a>
        </div>
      </motion.footer>
    </div>
  );
}
