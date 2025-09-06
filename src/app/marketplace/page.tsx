'use client';
import PostCard from "@/components/PostCard";
import { PostItemResponse } from "../model/PostModel";
import { useState } from "react";
import { CalendarDaysIcon } from "lucide-react";
import DatePicker from "react-datepicker";

export default function MarketplacePage() {
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDatePopUp, setShowDatePopUp] = useState(false);

    const [posts] = useState<PostItemResponse[]>([
        {
            id: "1",
            userId: "u1",
            locationId: "l1",
            minPrice: 740000,
            itemCount: 2,
            startDateTime: new Date("2025-09-03T13:00:00"),
            endDateTime: new Date("2025-09-03T15:00:00"),
            status: "active",
            location: {
                id: "l1",
                name: "Wins Arena Pulogadung",
                url: "",
                addressDescription: "Jln. Daan Mogot No 16, RT 11, Kec Kalideres",
                region: {
                    id: "r1",
                    name: "Jakarta Barat",
                    city: { id: "c1", name: "Jakarta Barat" },
                },
            },
            seller: {
                id: "u1",
                name: "Leo",
                email: "leo@mail.com",
                phone: "0812345678"
            },
            offerCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "2",
            userId: "u1",
            locationId: "l1",
            minPrice: 740000,
            itemCount: 1,
            startDateTime: new Date("2025-09-03T13:00:00"),
            endDateTime: new Date("2025-09-03T15:00:00"),
            status: "active",
            location: {
                id: "l1",
                name: "Max Padel",
                url: "",
                addressDescription: "Jln. Daan Mogot No 16, RT 11, Kec Kalideres",
                region: {
                    id: "r1",
                    name: "Jakarta Barat",
                    city: { id: "c1", name: "Jakarta Barat" },
                },
            },
            seller: {
                id: "u1",
                name: "Leo",
                email: "leo@mail.com",
                phone: "0812345678"
            },
            offerCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    // Filter posts based on search (FE only)
    const filteredPosts = posts.filter((post) =>
        post.location.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-neutral-100">
            {/* Header with Search and DatePicker */}
            <div className="bg-blue-600 p-4 flex gap-3 items-center">
                <input
                    type="email"
                    name="Search"
                    placeholder="Search Place Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-neutral-600 disabled:opacity-50 bg-neutral-50 border-neutral-500"
                />

                {/* DatePicker trigger */}
                <button onClick={ () => {
                    setShowDatePopUp(true);
                }}>
                    <CalendarDaysIcon className="h-6 w-6 text-neutral-50" />
                </button>
            </div>

            {/* Posts */}
            <div className="p-4 space-y-4">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                    <p className="text-center text-gray-500 mt-6">No posts found</p>
                )}
            </div>
        </div>
    );
}
