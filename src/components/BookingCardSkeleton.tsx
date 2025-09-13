"use client";

export default function BookingCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm mb-4">
      {/* Title */}
      <div className="h-5 w-32 bg-gray-200 rounded mb-3"></div>
      {/* Location */}
      <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
      {/* Date & Time */}
      <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-28 bg-gray-200 rounded"></div>
    </div>
  );
}