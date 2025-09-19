'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Hero Section */}
      <section className="relative px-6 py-10 text-center bg-gradient-to-b from-blue-500 to-indigo-600 text-white rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl font-bold mb-2">Welcome to Backup Sell</h1>
          <p className="text-sm opacity-90 max-w-sm mx-auto">
            Your trusted place to sell unused bookings, tickets, and more.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6"
        >
          <Image
            src="/padel_racket.jpg"
            alt="Backup illustration"
            width={400}
            height={250}
            className="mx-auto rounded-xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Why use Backup Sell?
        </h2>
        <div className="space-y-4">
          {[
            "Sell unused sport court bookings",
            "Resell concert or cinema tickets",
            "Make extra cash from your backup plans",
          ].map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 bg-white shadow-sm rounded-2xl px-4 py-3"
            >
              <CheckCircle className="text-green-500 w-5 h-5 shrink-0" />
              <p className="text-sm text-gray-700">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mt-auto px-6 py-6 text-center">
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Get in touch
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            Backupsell9@gmail.com
          </p>
          <p className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-blue-500" />
            +6285345838849
          </p>
        </div>
      </section>
    </div>
  );
}
