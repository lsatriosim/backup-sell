'use client';
import PostCard from "@/components/PostCard";
import { PostItemResponse } from "../model/PostModel";
import { useCallback, useEffect, useState } from "react";
import { CalendarDaysIcon, CalendarIcon, Clock, MapIcon, SearchIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { OnSelectHandler } from "react-day-picker";
import apiClient from "@/lib/apiClient";

export default function MarketplacePage() {
    const [search, setSearch] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const updateSelectedDate: OnSelectHandler<Date> = useCallback(
        (selected, _triggerDate, _modifiers, _e) => {
            if (!selected) return;
            setDate(selected);
            setOpen(false);
        },
        []
    );

    const [posts, setPosts] = useState<PostItemResponse[]>([]);

    const filteredPosts = posts.filter((post) =>
        post.location.name.toLowerCase().includes(search.toLowerCase())
    );

    // ======= FILTER STATES =======
    const regionFilterOption = [
        "Jakarta",
        "Jakarta Barat",
        "Jakarta Timur",
        "Jakarta Selatan",
    ];
    const sportFilterOption = ["Padel", "Badminton", "Tennis"];
    const timeFilterOption = ["All Day", "Morning", "Afternoon", "Evening"];

    const [regionFilter, setRegionFilter] = useState<string>(regionFilterOption[0]);
    const [sportFilter, setSportFilter] = useState<string>(sportFilterOption[0]);
    const [timeFilter, setTimeFilter] = useState<string>(timeFilterOption[0]);

    const fetchPostList = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/api/post/list`);
            console.log(response.data);
            const postList: PostItemResponse[] = response.data;
            setPosts(postList);
        } catch (err) {
            setApiError(`Failed to fetch post list`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (posts.length == 0) {
            fetchPostList();
        }
    }, [fetchPostList, posts]);

    return (
        <div className="min-h-screen bg-neutral-100">
            {/* Header with Search and DatePicker */}
            <div className="bg-surface-primary p-4 flex gap-3 items-center">
                <input
                    type="email"
                    name="Search"
                    placeholder="Search Place Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-neutral-600 disabled:opacity-50 bg-neutral-50 border-neutral-500"
                />

                {/* DatePicker trigger */}
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <CalendarDaysIcon className="h-6 w-6 text-neutral-50" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            required
                            onSelect={updateSelectedDate} // custom handler
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="pt-4.5 pb-6 pl-4 pr-4">
                {date && (
                    <h2 className="text-2xl font-bold">
                        {format(date, "EEEE, d MMM yyyy")}
                    </h2>
                )}
            </div>

            {/* FILTER ROW */}
            <div className="flex gap-3 px-4 overflow-x-auto">
                {/* Region Filter */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="rounded-full flex items-center gap-2 min-w-[120px] justify-center overflow-hidden"
                        >
                            <MapIcon className="h-4 w-4 shrink-0" />
                            <span className="truncate whitespace-nowrap w-22">{regionFilter}</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                        {regionFilterOption.map((region) => (
                            <div
                                key={region}
                                className="cursor-pointer p-2 rounded hover:bg-neutral-100"
                                onClick={() => setRegionFilter(region)}
                            >
                                {region}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>

                {/* Sport Filter */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="rounded-full flex items-center gap-2 min-w-[100px] justify-center overflow-hidden"
                        >
                            <SearchIcon className="h-4 w-4 shrink-0" />
                            <span className="truncate whitespace-nowrap">{sportFilter}</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                        {sportFilterOption.map((sport) => (
                            <div
                                key={sport}
                                className="cursor-pointer p-2 rounded hover:bg-neutral-100"
                                onClick={() => setSportFilter(sport)}
                            >
                                {sport}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>

                {/* Time Filter */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="rounded-full flex items-center gap-2 min-w-[120px] justify-center overflow-hidden"
                        >
                            <Clock className="h-4 w-4 shrink-0" />
                            <span className="truncate whitespace-nowrap">{timeFilter}</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                        {timeFilterOption.map((time) => (
                            <div
                                key={time}
                                className="cursor-pointer p-2 rounded hover:bg-neutral-100"
                                onClick={() => setTimeFilter(time)}
                            >
                                {time}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
            </div>

            {/* Posts */}
            <div className="p-4 space-y-4">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => <PostCard key={post.id} post={post} boosted />)
                ) : (
                    <p className="text-center text-gray-500 mt-6">No posts found</p>
                )}
            </div>
        </div>
    );
}
