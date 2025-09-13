"use client";

export default function OfferCardSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm animate-pulse">
      <div className="grid grid-cols-4 flex-1 items-center gap-3">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-12 bg-gray-200 rounded mx-auto"></div>
        <div className="h-4 w-20 bg-gray-200 rounded mx-auto"></div>
        <div className="h-4 w-24 bg-gray-200 rounded ml-auto"></div>
      </div>
      <div className="h-5 w-5 bg-gray-200 rounded-full ml-2"></div>
    </div>
  );
}