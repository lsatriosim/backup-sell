"use client";

import { OfferItemResponse } from "@/app/model/OfferModel";
import { MessageCircle } from "lucide-react";

interface OfferListProps {
  offers: OfferItemResponse[];
  userFullName: string; // 👈 pass logged-in user name
  postId: string;
  locationName: string;
  date: string;
  startTime: string;
  endTime: string;
  onChat?: (offerId: string) => void;
}

export default function OfferList({
  offers,
  userFullName,
  postId,
  locationName,
  date,
  startTime,
  endTime,
}: OfferListProps) {
    const openWhatsApp = (
    buyerName: string,
    courtCount: number,
    pricePerCourt: number,
    totalPrice: number
  ) => {
        const phoneNumber = "6285345838849"; // 👈 target number
        const message = `Hi ${buyerName}, I am ${userFullName} from Backup Sell. Here are the post details:

    Post ID: ${postId}
    Location: ${locationName}
    Date: ${date}
    Time: ${startTime} - ${endTime}

    I would like to follow up regarding your offer of ${courtCount} court(s) at Rp ${pricePerCourt.toLocaleString(
        "id-ID"
        )}/pcs, with a total of Rp ${totalPrice.toLocaleString("id-ID")}.`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Offers</h2>
      <div className="space-y-2">
        {offers.map((offer) => {
          const pricePerCourt = Number(offer.price);
          const totalPrice = pricePerCourt * offer.itemCount;

          return (
            <div
              key={offer.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              {/* Left section */}
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">{offer.buyer.name}</span>
                <span className="text-sm text-gray-600">
                  {offer.itemCount} Court - Rp{" "}
                  {pricePerCourt.toLocaleString("id-ID")}/pcs
                </span>
              </div>

              {/* Right section */}
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
                <button
                  onClick={() => openWhatsApp(
                      offer.buyer.name,
                      offer.itemCount,
                      pricePerCourt,
                      totalPrice
                    )}
                  className="p-1 text-gray-600 hover:text-blue-500"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
