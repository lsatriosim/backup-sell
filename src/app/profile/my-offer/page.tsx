'use client';
import PostCard from "@/components/PostCard";
import { PostItemResponse } from "../../model/PostModel";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, MessageCircle } from "lucide-react";
import apiClient from "@/lib/apiClient";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import { useRouter } from "next/navigation";

export default function MyOfferPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [posts, setPosts] = useState<PostItemResponse[]>([]);

    const fetchPostList = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/api/post/list/my-offer`);
            setPosts(response.data);
        } catch {
            alert(`Failed to fetch my post list`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPostList();
    }, [fetchPostList]);

    return (
        <div className="min-h-screen bg-neutral-100 relative">
            {/* Header with Search and DatePicker */}
            <header className="bg-surface-primary text-white px-4 py-3 flex items-center">
                <ChevronLeft
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => router.back()}
                />

                <h1 className="text-lg font-semibold mx-4 flex-1 text-center truncate">
                    My Offer
                </h1>
            </header>

            {/* Posts */}
            <div className="p-4 space-y-4">
                {loading ? (
                    <>
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                    </>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard
                            onClick={() => router.push(`/marketplace/sport-court/${post.id}`)}
                            key={post.id}
                            post={post}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                        <MessageCircle className="h-10 w-10 mb-2 opacity-60" />
                        <p className="text-sm font-medium">You made no offers yet</p>
                        <p className="text-xs">Made your first offer to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
