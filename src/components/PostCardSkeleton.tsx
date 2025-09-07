"use client";

export default function PostCardSkeleton() {
  return (
    <div className="rounded-xl shadow-sm border border-gray-200 overflow-hidden bg-white">
      <div className="p-4 space-y-2 animate-pulse">
        {/* Title and sport */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>

        {/* Address */}
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-48 bg-gray-200 rounded" />

        {/* Date & Time */}
        <div className="flex items-center gap-2 mt-2">
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <span className="text-gray-300">•</span>
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-4">
          {/* Seller avatar */}
          <div className="h-10 w-10 rounded-full bg-gray-200" />

          {/* Price + Offer info */}
          <div className="flex flex-col items-end space-y-1">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-5 w-36 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
