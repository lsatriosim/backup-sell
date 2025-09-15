"use client";

import { OfferItemResponse } from "@/app/model/OfferModel";
import { PostItemResponse } from "@/app/model/PostModel";
import BookingCard from "@/components/BookingCard";
import OfferList from "@/components/OfferList";
import BookingCardSkeleton from "@/components/BookingCardSkeleton";
import OfferCardSkeleton from "@/components/OfferCardSkeleton";
import apiClient from "@/lib/apiClient";
import { ChevronLeft, Plus, Sheet } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { CustomDialog } from "@/components/CustomDialog";

export default function SportDetailPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params["post-id"] as string;
  const [post, setPost] = useState<PostItemResponse | undefined>(undefined);
  const [offers, setOffers] = useState<OfferItemResponse[]>([]);
  const [postLoading, setPostLoading] = useState(false);
  const [offerLoading, setOfferLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // modal state
  const [openModal, setOpenModal] = useState(false);

  // form state
  const [form, setForm] = useState({
    price: 0,
    itemCount: 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchPostDetail = useCallback(async () => {
    setPostLoading(true);
    try {
      const response = await apiClient.get(`/api/post/${postId}`);
      const data: PostItemResponse = response.data;
      setPost(data);
      setForm((prev) => ({
        ...prev,
        price: data.minPrice ?? 0, // fallback to 0 if undefined
      }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.price < (post?.minPrice ?? 0)) {
        alert("Price can't below than minimum price");
        return;
      }
      await apiClient.post(`/api/offer/create`, {
        postId,
        price: form.price,
        itemCount: form.itemCount,
      });
      setOpenModal(false);
      fetchOfferDetail(); // refresh offers
    } catch (err) {
      setApiError(`Failed to create offer`);
    } finally {
      setLoading(false);
    }
  };

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
              userFullName={post.seller?.name ?? "Unknown User"}
              postId={post.id}
              locationName={post.location?.name ?? "Unknown Location"}
              date={new Date(post.startDateTime).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              startTime={new Date(post.startDateTime).toLocaleTimeString(
                "id-ID",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
              endTime={new Date(post.endDateTime).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          )
        )}
      </main>

      {/* Floating Create Offer Button */}
      <button
        onClick={() => {
          setOpenModal(true)
        }}
        className="fixed bottom-24 right-6 bg-surface-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition z-10"
      >
        <Plus className="h-6 w-6" />
      </button>

      <CustomDialog
        open={openModal}
        onOpenChange={setOpenModal}
        title="Create Offer"
        footer={
          <Button
            type="submit"
            disabled={loading}
            form="offer-form"
            className="w-full bg-surface-primary text-white"
          >
            {loading ? "Submitting..." : "Submit Offer"}
          </Button>
        }
      >
        <form id="offer-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Court Count */}
          <div>
            <label className="block text-sm font-medium mb-1">Court Count </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    itemCount: Math.max(1, prev.itemCount - 1),
                  }))
                }
                className="px-3 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={post?.itemCount === 1 || form.itemCount <= 1}
              >
                -
              </button>

              <input
                type="text"
                name="itemCount"
                value={form.itemCount}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // remove non-numeric
                  setForm((prev) => ({
                    ...prev,
                    itemCount: value === "" ? 1 : Math.min(+value, post?.itemCount ?? 10),
                  }));
                }}
                className="w-16 text-center rounded-md border px-3 py-2 text-neutral-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
                disabled={post?.itemCount === 1}
              />

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    itemCount: Math.min((post?.itemCount ?? 10), prev.itemCount + 1),
                  }))
                }
                className="px-3 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={post?.itemCount === form.itemCount}
              >
                +
              </button>

              <p className="mt-1 text-xs text-gray-500">
                Max: {post?.itemCount ?? 1}
              </p>
            </div>
          </div>

          {/* Price Input with Rupiah */}
          <div>
            <label className="block text-sm font-medium mb-1">Price per Court (Min: Rp {new Intl.NumberFormat("id-ID").format(post?.minPrice ?? 0)})</label>
            <input
              type="text"
              name="price"
              value={
                form.price
                  ? `Rp ${new Intl.NumberFormat("id-ID").format(form.price)}`
                  : "Rp 0"
              }
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, ""); // keep digits only
                setForm((prev) => ({
                  ...prev,
                  price: numericValue === "" ? 0 : parseInt(numericValue, 10),
                }));
              }}
              className="w-full rounded-md border px-3 py-2 text-neutral-600"
              required
            />
          </div>

          {/* Total Price */}
          <div className="text-right text-base font-semibold text-neutral-700">
            Total: Rp{" "}
            {new Intl.NumberFormat("id-ID").format(form.price * form.itemCount)}
          </div>
        </form>

      </CustomDialog>
    </div>
  );
}
