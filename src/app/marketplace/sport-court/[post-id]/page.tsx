"use client";

import { OfferItemResponse } from "@/app/model/OfferModel";
import { PostItemResponse } from "@/app/model/PostModel";
import BookingCard from "@/components/BookingCard";
import OfferList from "@/components/OfferList";
import BookingCardSkeleton from "@/components/BookingCardSkeleton";
import OfferCardSkeleton from "@/components/OfferCardSkeleton";
import apiClient from "@/lib/apiClient";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function SportDetailPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params["post-id"] as string;
  const [post, setPost] = useState<PostItemResponse | undefined>(undefined);
  const [offers, setOffers] = useState<OfferItemResponse[]>([]);
  const [postLoading, setPostLoading] = useState(false);
  const [offerLoading, setOfferLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const fetchPostDetail = useCallback(async () => {
    setPostLoading(true);
    try {
      const response = await apiClient.get(`/api/post/${postId}`);
      const data: PostItemResponse = response.data;
      setPost(data);
    } catch (err) {
      setApiError(`Failed to fetch post detail`);
    } finally {
      setPostLoading(false);
    }
  }, [postId]);

  const fetchOfferDetail = useCallback(async () => {
    setOfferLoading(true);
    try {
      const response = await apiClient.get(`/api/offer/${postId}`);
      const data: OfferItemResponse[] = response.data;
      setOffers(data);
    } catch (err) {
      setApiError(`Failed to fetch offer list`);
    } finally {
      setOfferLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPostDetail();
    fetchOfferDetail();
  }, [fetchPostDetail, fetchOfferDetail]);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-surface-primary text-white px-4 py-3 flex items-center gap-3">
        <div className="flex flex-row gap-4" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
          <h1 className="text-lg font-semibold">
            {post?.sportType ?? "Sport Court"}
          </h1>
        </div>
      </header>

      <div className="bg-surface-primary w-full h-60 rounded-b-xl"></div>

      {/* Main content */}
      <main className="flex-1 p-4 -mt-60 relative z-10">
        {/* BookingCard / Skeleton */}
        {postLoading ? (
          <BookingCardSkeleton />
        ) : (
          post && (
            <BookingCard
              post={post}
              onClick={(id) => console.log("Clicked post:", id)}
            />
          )
        )}

        {/* OfferList / Skeleton */}
        {offerLoading ? (
          <div className="space-y-2 mt-4">
            {[...Array(3)].map((_, idx) => (
              <OfferCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          post &&
          offers.length > 0 && (
            <OfferList
              offers={offers}
              userFullName={post.seller?.name ?? "Unknown User"} // seller name
              postId={post.id}
              locationName={post.location?.name ?? "Unknown Location"}
              date={new Date(post.startDateTime).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              startTime={new Date(post.startDateTime).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              endTime={new Date(post.endDateTime).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          )
        )}
      </main>

    </div>
  );
}
