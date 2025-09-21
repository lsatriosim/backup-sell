"use client";

import { OfferItemResponse } from "@/app/model/OfferModel";
import { PostItemResponse } from "@/app/model/PostModel";
import BookingCard from "@/components/BookingCard";
import OfferList from "@/components/OfferList";
import BookingCardSkeleton from "@/components/BookingCardSkeleton";
import OfferCardSkeleton from "@/components/OfferCardSkeleton";
import apiClient from "@/lib/apiClient";
import { ChevronLeft, Plus, HandCoins, PencilIcon, Share2, Trash2, MoreVertical, RefreshCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomDialog } from "@/components/CustomDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { LoginRequiredDialog } from "@/components/LoginRequiredDialog";
import { useUser } from "@/app/context/UserContext";
import BuyerInfoDialog from "@/components/BuyerInfoDialog";
import { id } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";

export default function SportDetailPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params["post-id"] as string;
  const { userId } = useUser();
  const [post, setPost] = useState<PostItemResponse | undefined>(undefined);
  const [offers, setOffers] = useState<OfferItemResponse[]>([]);
  const [postLoading, setPostLoading] = useState(false);
  const [offerLoading, setOfferLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openBuyerInfoDialog, setOpenBuyerInfoDialog] = useState(false);

  const hasUserOffer = offers.some((offer) => offer.buyer.userId === userId);
  const userOffer = offers.find((offer) => offer.buyer.userId === userId);

  //Infobox message
  const shouldShowMessage =
    !offerLoading && !postLoading && (hasUserOffer || (post?.seller.id === userId && offers.length > 0));

  let messageText: string | null = null;

  if (hasUserOffer) {
    messageText =
      "You’ve already placed an offer! 🎉 Sit tight while the seller gets in touch. If you’d like, you can tweak your offer anytime using the floating button.";
  } else if (post?.seller.id === userId && offers.length > 0) {
    messageText =
      "Pick the offer you like best and reach out with a quick message using the button.";
  }

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

  const handleDelete = async () => {
    setLoading(true);
    try {
      await apiClient.post(`/api/post/delete`, {
        id: postId,
        sellerId: post?.seller.id
      });
      router.back();
    } catch (err: any) {
      alert("Failed to delete post")
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async () => {
    setLoading(true);
    try {
      await apiClient.post(`/api/post/update-status`, {
        id: postId,
        sellerId: post?.seller.id,
        status: post?.status == "OPEN" ? "CLOSED" : "OPEN"
      });
      fetchPostDetail();
    } catch (err: any) {
      alert("Failed to update post status")
    } finally {
      setLoading(false);
    }
  }

  const handleShare = async () => {
    if (!post) return;

    const formattedDate = format(new Date(post.startDateTime), "dd-MM-yyyy HH:mm", { locale: id });
    const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(post.minPrice ?? 0);

    const message = `*Want to Sell* 
${post.location?.name ?? "Unknown Location"}
${post.location?.region?.name ?? ""}, ${post.location?.region?.city?.name ?? ""}
${formattedDate}
Min Price: ${formattedPrice}

Checkout in this url:
"${process.env.NEXT_PUBLIC_BASE_URL}/marketplace/sport-court/${postId}"`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Want to Sell",
          text: message,
        });
      } catch (err) {
        console.error("Share cancelled", err);
      }
    } else {
      await navigator.clipboard.writeText(message);
      alert("Share message copied to clipboard ✅");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (form.price < (post?.minPrice ?? 0)) {
        alert("Price can't be below the minimum price");
        return;
      }
      if (hasUserOffer) {
        if (userOffer !== undefined) {
          await apiClient.post(`/api/offer/update`, {
            id: userOffer.id,
            price: form.price,
            itemCount: form.itemCount,
            userId: userOffer.buyer.userId
          })
        };
      } else {
        await apiClient.post(`/api/offer/create`, {
          postId,
          price: form.price,
          itemCount: form.itemCount,
        });
      }
      setOpenModal(false);
      setOpenBuyerInfoDialog(false); // close disclaimer too
      fetchOfferDetail();
    } catch (err: any) {
      if (err.response?.status === 401) {
        setOpenLoginDialog(true);
        return;
      }
      if (hasUserOffer) {
        alert("Failed to update offer. Please try again.")
      } else {
        alert("Failed to create offer. Please try again.")
      }
    } finally {
      setLoading(false);
    }
  };

  const fillFormWithOfferData = () => {
    if (userOffer) {
      setForm({
        price: userOffer.price ?? 0,
        itemCount: userOffer.itemCount ?? 1,
      });
    }
  };


  useEffect(() => {
    fetchPostDetail();
    fetchOfferDetail();
  }, [fetchPostDetail, fetchOfferDetail]);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-surface-primary text-white px-4 py-3 flex items-center">
        <ChevronLeft
          className="h-6 w-6 cursor-pointer"
          onClick={() => router.back()}
        />

        <h1 className="text-lg font-semibold mx-4 flex-1 text-center truncate">
          {post?.sportType ?? "Sport Court"}
        </h1>

        <Share2
          className="h-6 w-6 cursor-pointer"
          onClick={handleShare}
        />

        {userId === post?.seller.id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical className="h-6 w-6 cursor-pointer ml-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleUpdateStatus()}
              >
                <RefreshCcw className="h-4 w-4 ml-2" />
                {post.status == "OPEN" ? "Closed Post" : "Open Post"}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  router.push(`/marketplace/sport-court/${postId}/edit`)
                }
              >
                <PencilIcon className="h-4 w-4 ml-2" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-500 focus:text-red-600"
                onClick={() => setOpenDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
            />
          )
        )}

        {shouldShowMessage && messageText && (
          <div className="p-2 border-2 border-surface-primary bg-blue-300 mt-3 rounded-lg">
            <p className="text-sm">{messageText}</p>
          </div>
        )}

        {/* OfferList / Skeleton */}
        {offerLoading ? (
          <div className="space-y-2 mt-4">
            {[...Array(3)].map((_, idx) => (
              <OfferCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          post && (
            <OfferList
              offers={offers}
              userFullName={post.seller?.name ?? "Unknown User"}
              postId={post.id}
              sellerId={post.seller.id}
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
      {(post?.seller.id != userId && post?.status == "OPEN") &&
        <button
          onClick={() => {
            if (hasUserOffer) {
              console.log("user has offer");
              fillFormWithOfferData()
            }
            setOpenModal(true)
          }}
          className="fixed bottom-24 right-6 bg-surface-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition z-10"
        >
          {hasUserOffer ? (
            <HandCoins className="h-6 w-6 text-neutral-50" /> // Different icon if user already made an offer
          ) : (
            <Plus className="h-6 w-6 text-neutral-50" /> // Default icon
          )}
        </button>}

      <CustomDialog
        open={openModal}
        onOpenChange={setOpenModal}
        title={hasUserOffer ? "Change Offer" : "Create Offer"}
        footer={
          <Button
            onClick={() => {
              setOpenBuyerInfoDialog(true)
            }}
            disabled={loading}
            type="button"
            className="w-full bg-surface-primary text-white"
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin className="text-lg" />
            ) : hasUserOffer ? (
              "Update"
            ) : (
              "Submit"
            )}
          </Button>
        }
      >
        <form id="offer-form" onSubmit={() => { }} className="flex flex-col gap-4">
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

      <LoginRequiredDialog open={openLoginDialog} onOpenChange={setOpenLoginDialog} />
      <DeleteConfirmationDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog} onDeleteConfirm={handleDelete} />
      <BuyerInfoDialog open={openBuyerInfoDialog} setOpen={setOpenBuyerInfoDialog} ctaButtonDidTap={() => {
        setOpenBuyerInfoDialog(false);
        handleSubmit()
      }} />
    </div>
  );
}
function async() {
  throw new Error("Function not implemented.");
}

