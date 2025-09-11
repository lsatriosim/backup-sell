'use client';

import { PostItemResponse } from "@/app/model/PostModel";
import BookingCard from "@/components/BookingCard";
import apiClient from "@/lib/apiClient";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function SportDetailPostPage() {
    const router = useRouter();
    const params = useParams();
    const postId = params["post-id"] as string;
    const [post, setPost] = useState<PostItemResponse | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const fetchPostDetail = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/api/post/${postId}`);
            console.log(response.data);
            const post: PostItemResponse = response.data;
            setPost(post);
        } catch (err) {
            setApiError(`Failed to fetch post detail`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPostDetail();
    }, [fetchPostDetail]);

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50">
            {/* Header */}
            <header className="bg-surface-primary text-white px-4 py-3 flex items-center gap-3">
                <div className="flex flex-row gap-4" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                    <h1 className="text-lg font-semibold">{post?.sportType ?? "Sport Court"}</h1>
                </div>
            </header>

            <div className="bg-surface-primary w-full h-60 rounded-b-xl"></div>

            {/* Main content */}
            <main className="flex-1 p-4 -mt-60 relative z-10">
                {post && (
                    <BookingCard
                        post={post}
                        onClick={(id) => console.log("Clicked post:", id)}
                    />
                )}
            </main>
        </div>
    );
}
