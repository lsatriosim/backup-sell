"use client";

import { PostItemResponse } from "@/app/model/PostModel";
import { CalendarDays, Clock, ThumbsUp } from "lucide-react";
import { format } from "date-fns";

interface PostCardProps {
    post: PostItemResponse;
    onClick: (id: string) => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
    const startDate = new Date(post.startDateTime);
    const endDate = new Date(post.endDateTime);

    const formattedDate = format(startDate, "EEEE, d MMM yyyy");
    const formattedTime = `${format(startDate, "HH:mm")} - ${format(endDate, "HH:mm")}`;

    return (
        <div onClick={() => onClick(post.id)} className="rounded-xl shadow-sm border border-gray-200 overflow-hidden bg-white">
            {post.isBoosted && (
                <div className="bg-surface-primary text-white px-3 py-1 flex items-center gap-1 text-sm font-medium">
                    <ThumbsUp className="h-4 w-4" />
                    Boosted
                </div>
            )}

            <div className="p-4">
                {/* Title and sport */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">
                        {post.location.name}
                    </h2>
                    <span className="text-surface-primary font-semibold text-sm">{post.sportType}</span>
                </div>

                {/* Address */}
                <p className="text-sm text-gray-600">{post.location.region.name}</p>
                <p className="text-xs text-gray-500">{post.location.addressDescription}</p>

                {/* Date & Time */}
                <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    <span>{formattedDate}</span>
                    <span className="text-gray-400">•</span>
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{formattedTime}</span>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end mt-2">
                    {/* Seller avatar */}
                    <div className="h-10 w-10 rounded-full bg-surface-primary text-white flex items-center justify-center font-bold">
                        {post.seller.name.charAt(0)}
                    </div>

                    {/* Price + Offer info */}
                    <div className="flex flex-col items-end">
                        {/* Offer info (only if offerCount > 0) */}
                        {post.offerCount > 0 && (
                            <div className="flex flex-col items-end">
                                <p className="text-sm text-gray-600">
                                    {post.offerCount} {post.offerCount > 1 ? "offers" : "offer"}
                                </p>
                                {/* <p className="text-sm text-gray-600">
                                    Current Bid Rp {post.maxOfferPrice.toLocaleString()}
                                </p> */}
                            </div>
                        )}
                        {/* Min price */}
                        <p className="text-gray-900 font-semibold text-lg">
                            {post.itemCount > 1
                                ? `${post.itemCount} Courts - Rp ${post.minPrice.toLocaleString()}/pcs`
                                : `Rp ${post.minPrice.toLocaleString()}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
