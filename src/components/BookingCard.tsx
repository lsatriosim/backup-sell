import { MapIcon, Clock } from "lucide-react";
import { PostItemResponse } from "@/app/model/PostModel";

interface BookingCardProps {
  post: PostItemResponse;
  onClick: (id: string) => void;
}

export default function BookingCard({ post }: BookingCardProps) {
  const { id, location, startDateTime, endDateTime, minPrice, itemCount, seller, status } = post;

  // Format date & time
  const date = new Date(startDateTime).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const timeRange = `${new Date(startDateTime).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${new Date(endDateTime).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <div
      className="relative bg-white rounded-2xl shadow p-4 space-y-4 cursor-pointer hover:shadow-md transition"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{location.name}</h2>
        <span
          className={`px-3 py-1 text-xs rounded-md font-medium ${
            status === "OPEN"
              ? "bg-blue-400 text-neutral-100 border-surface-primary border border-2"
              : "bg-red-400 text-neutral-100 border-red-800"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Location */}
      <div>
        <div className="flex items-center gap-2 font-semibold">
          <MapIcon className="h-5 w-5" /> Location
        </div>
        <p className="text-sm mt-1">{location.region.city.name}</p>
        <p className="text-sm">{location.addressDescription}</p>
        <a
          href={location.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // prevent card click
          className="text-blue-600 underline text-sm"
        >
          {location.url}
        </a>
      </div>

      {/* Date & Time */}
      <div>
        <div className="flex items-center gap-2 font-semibold">
          <Clock className="h-5 w-5" /> Date & Time
        </div>
        <p className="text-sm mt-1">
          {date} • {timeRange}
        </p>
      </div>

      {/* Details & Price */}
      <div>
        <div className="flex items-center gap-2 font-semibold">
          <Clock className="h-5 w-5" /> Details & Price
        </div>
        <p className="text-sm mt-1">{itemCount} Courts</p>
        <p className="text-sm">
          Rp {minPrice.toLocaleString("id-ID")}/pcs
        </p>
      </div>

      {/* Avatar */}
      <div className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-surface-primary text-white font-bold">
        {seller?.name?.charAt(0).toUpperCase() ?? "?"}
      </div>
    </div>
  );
}