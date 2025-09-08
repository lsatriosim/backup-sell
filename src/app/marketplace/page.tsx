'use client';
import PostCard from "@/components/PostCard";
import { PostItemResponse } from "../model/PostModel";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { CalendarDaysIcon, CalendarIcon, Clock, MapIcon, SearchIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { OnSelectHandler } from "react-day-picker";
import apiClient from "@/lib/apiClient";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import { CityRegionFilterOptionResponse } from "../model/LocationModel";

export default function MarketplacePage() {
    const [search, setSearch] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openTimeFilterDropdown, setTimeFilterDropdown] = useState(false);
    const [openSportFilterDropdown, setSportFilterDropdown] = useState(false);
    const [openRegionFilterDropdown, setRegionFilterDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterLoading, setFilterLoading] = useState(false);
    type LocationFilter = { id: string; name: string; type: "city" | "region" } | null;
    const [locationFilter, setLocationFilter] = useState<LocationFilter>(null);
    const [locationOptions, setLocationOptions] = useState<CityRegionFilterOptionResponse[]>([]);
    const [apiError, setApiError] = useState("");

    const updateSelectedDate: OnSelectHandler<Date> = useCallback(
        (selected, _triggerDate, _modifiers, _e) => {
            if (!selected) return;
            setDate(selected);
            setOpenDatePicker(false);
        },
        []
    );

    const updateTimeFilter = useCallback(
        (selected: string) => {
            if (!selected) return;
            setTimeFilter(selected);
            setTimeFilterDropdown(false);
        },
        []
    );

    const updateSportFilter = useCallback(
        (selected: string) => {
            if (!selected) return;
            setSportFilter(selected);
            setSportFilterDropdown(false);
        },
        []
    );

    const updateRegionFilter = useCallback(
        (selected: LocationFilter) => {
            setLocationFilter(selected);
            setRegionFilterDropdown(false);
        },
        []
    );

    // ======= FILTER STATES =======
    const sportFilterOption = ["Padel", "Badminton", "Tennis"];
    const timeFilterOption = ["All Day", "Morning", "Afternoon", "Evening"];

    const [sportFilter, setSportFilter] = useState<string>(sportFilterOption[0]);
    const [timeFilter, setTimeFilter] = useState<string>(timeFilterOption[0]);

    const [posts, setPosts] = useState<PostItemResponse[]>([]);

    const filteredPosts = posts.filter((post) => {
        const start = new Date(post.startDateTime);
        const hour = start.getHours();

        let matchesLocation = true;
        if (locationFilter) {
            if (locationFilter.type === "city") {
                matchesLocation = post.location.region.city.id === locationFilter.id;
            } else if (locationFilter.type === "region") {
                matchesLocation = post.location.region.id === locationFilter.id;
            }
        }

        // ✅ Region & sport filter
        const matchesRegion = post.location.name
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesSport =
            sportFilter === sportFilterOption[0] || post.sportType === sportFilter;

        // ✅ Time filter
        let matchesTime = true;
        if (timeFilter === "Morning") {
            matchesTime = hour >= 6 && hour < 12;
        } else if (timeFilter === "Afternoon") {
            matchesTime = hour >= 12 && hour < 18;
        } else if (timeFilter === "Evening") {
            matchesTime = hour >= 18 || hour < 6;
        }

        return matchesRegion && matchesSport && matchesTime && matchesLocation;
    }
    );

    const fetchLocationByRegions = useCallback(async () => {
        setFilterLoading(true);
        try {
            const response = await apiClient.get(`/api/location/get-cities-by-regions`);
            const data: CityRegionFilterOptionResponse[] = response.data;
            setLocationOptions(data);
        } catch (err) {
            setApiError(`Failed to fetch location filter option`);
        } finally {
            setFilterLoading(false);
        }
    }, []);

    const fetchPostList = useCallback(async () => {
        setLoading(true);
        try {
            if (!date) {
                return;
            }
            const formattedDate = format(date, "dd-MM-yyyy");
            const response = await apiClient.get(`/api/post/list/${formattedDate}`);
            console.log(response.data);
            const postList: PostItemResponse[] = response.data;
            setPosts(postList);
        } catch (err) {
            setApiError(`Failed to fetch post list`);
        } finally {
            setLoading(false);
        }
    }, [date]);

    useEffect(() => {
        fetchPostList();
    }, [fetchPostList]);

    useEffect(() => {
        fetchLocationByRegions();
    }, [fetchLocationByRegions]);

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
                <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                    <PopoverTrigger asChild>
                        <CalendarDaysIcon className="h-6 w-6 text-neutral-50" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            required
                            startMonth={new Date()}
                            disabled={{ before: new Date() }}
                            onSelect={updateSelectedDate} // custom handler
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="pt-4.5 pb-3 pl-4 pr-4">
                {date && (
                    <h2 className="text-2xl font-bold">
                        {format(date, "EEEE, d MMM yyyy")}
                    </h2>
                )}
            </div>

            {/* FILTER ROW */}
            <div className="flex gap-3 px-4 overflow-x-auto">
                {/* Region Filter */}
                <Popover open={openRegionFilterDropdown} onOpenChange={setRegionFilterDropdown}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="rounded-full flex items-center gap-2 min-w-[140px] justify-center overflow-hidden"
                        >
                            <MapIcon className="h-4 w-4 shrink-0" />
                            <span className="truncate whitespace-nowrap">
                                {locationFilter ? locationFilter.name : "All Locations"}
                            </span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-2 max-h-60 overflow-y-auto">
                        {/* City + regions */}
                        <div>
                            <div
                                    className="cursor-pointer font-semibold p-2 hover:bg-neutral-100 rounded"
                                    onClick={() => updateRegionFilter(null)}
                                >
                                    All Locations
                                </div>

                            {locationOptions.map((city) => (
                            <div key={city.id}>
                                <div
                                    className="cursor-pointer font-semibold p-2 hover:bg-neutral-100 rounded"
                                    onClick={() => updateRegionFilter({ id: city.id, name: city.name, type: "city" })}
                                >
                                    {city.name} (All)
                                </div>
                                {city.regions.map((region) => (
                                    <div
                                        key={region.id}
                                        className="cursor-pointer ml-4 p-2 hover:bg-neutral-100 rounded"
                                        onClick={() =>
                                            updateRegionFilter({ id: region.id, name: region.name, type: "region" })
                                        }
                                    >
                                        {region.name}
                                    </div>
                                ))}
                            </div>
                        ))}
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Sport Filter */}
                <Popover open={openSportFilterDropdown} onOpenChange={setSportFilterDropdown}>
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
                                onClick={() => updateSportFilter(sport)}
                            >
                                {sport}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>

                {/* Time Filter */}
                <Popover open={openTimeFilterDropdown} onOpenChange={setTimeFilterDropdown}>
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
                                onClick={() => updateTimeFilter(time)}
                            >
                                {time}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
            </div>

            {/* Posts */}
            <div className="p-4 space-y-4">
                {loading ? (
                    <>
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                    </>
                ) : filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                    <p className="text-center text-gray-500 mt-6">No posts found</p>
                )}
            </div>
        </div>
    );
}
