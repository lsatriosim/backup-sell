'use client';

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, ChevronLeft, Loader2, MapIcon, SearchIcon } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { format } from "date-fns";
import { DateTimePicker } from "@/components/ui/datetimepicker";
import { buildUtcDate } from "@/lib/utils";

interface Location {
    id: string;
    name: string;
    addressDescription: string;
}

export default function AddPostPage() {
    const router = useRouter();

    // =============== STATES ===============
    const [loading, setLoading] = useState(false);
    const [locationListLoading, setLocationListLoading] = useState(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [locationFilter, setLocationFilter] = useState("");
    const [openLocation, setOpenLocation] = useState(false);
    const [openStartTime, setStartTime] = useState(false);
    const [openEndTime, setEndTime] = useState(false);

    const [form, setForm] = useState({
        locationId: "",
        minPrice: 0,
        itemCount: 1,
        startDate: new Date(),   // date part
        startTime: "09:00",      // time as string
        endDate: new Date(),     // date part
        endTime: "--:--",        // time as string
        sportType: "Padel",
    });

    const sportFilterOption = ["Padel", "Badminton", "Tennis"];

    // =============== FETCH LOCATIONS ===============
    const fetchLocations = useCallback(async () => {
        setLocationListLoading(true);
        try {
            const response = await apiClient.get(`/api/location/list`);
            setLocations(response.data);
        } catch (err) {
            console.error("Failed to fetch locations", err);
        } finally {
            setLocationListLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    // =============== HANDLERS ===============
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (form.locationId == "") {
                alert("Missing court location");
                return;
            }

            if (form.startTime.includes("-")) {
                alert("Missing start time");
                return;
            }

            if (form.endTime.includes("-")) {
                alert("Missing end time");
                return;
            }

            // Construct datetime
            const startDateTime = buildUtcDate(form.startDate, form.startTime);
            const endDateTime = buildUtcDate(form.endDate, form.endTime);

            if (endDateTime <= startDateTime) {
            alert("End time must be greater than start time");
            setLoading(false);
            return;
            }

            const payload = {
            locationId: form.locationId,
            minPrice: Number(form.minPrice),
            itemCount: Number(form.itemCount),
            startDateTime,
            endDateTime,
            sportType: form.sportType,
            };

            await apiClient.post("/api/post/create", payload);
            router.back();
        } catch (err) {
            alert("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <header className="bg-surface-primary text-white px-4 py-3 flex items-center gap-3">
                <div className="flex flex-row gap-4" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                    <h1 className="text-lg font-semibold">
                        Create Sport Court Post
                    </h1>
                </div>
            </header>

            <div className="min-h-screen bg-neutral-100 p-6">

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Sport Type */}
                    <div>
                        <p className="text-base text-neutral-900 mb-1 font-semibold">
                            Sport Type
                        </p>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full flex justify-between rounded-md px-3 py-2"
                                >
                                    <span>{form.sportType}</span>
                                    <SearchIcon className="h-4 w-4 text-gray-500" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-40 p-2">
                                {sportFilterOption.map((sport) => (
                                    <div
                                        key={sport}
                                        className="cursor-pointer p-2 rounded hover:bg-neutral-100"
                                        onClick={() => setForm((prev) => ({ ...prev, sportType: sport }))}
                                    >
                                        {sport}
                                    </div>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Location Selector */}
                    <div>
                        <p className="text-base text-neutral-900 mb-1 font-semibold">
                            Court Location
                        </p>
                        <Popover open={openLocation} onOpenChange={setOpenLocation}>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full flex justify-between rounded-md px-3 py-2"
                                >
                                    <span>
                                        {form.locationId
                                            ? locations.find((loc) => loc.id === form.locationId)?.name
                                            : "Select Location"}
                                    </span>
                                    {locationListLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <MapIcon className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 max-h-60 overflow-y-auto p-2">
                                <input
                                    type="text"
                                    placeholder="Search location..."
                                    value={locationFilter}
                                    onChange={(e) => {
                                        setLocationFilter(e.target.value)
                                        const locationId = locations.find((loc) => loc.name === locationFilter)?.id
                                        setForm((prev) => ({ ...prev, locationId: locationId ?? "" }))
                                    }}
                                    className="w-full mb-2 rounded-md border px-2 py-1 text-sm"
                                />
                                {locations
                                    .filter((loc) =>
                                        loc.name.toLowerCase().includes(locationFilter.toLowerCase()) || loc.addressDescription.toLowerCase().includes(locationFilter.toLowerCase())
                                    )
                                    .map((loc) => (
                                        <div
                                            key={loc.id}
                                            className="cursor-pointer p-2 hover:bg-neutral-100 rounded"
                                            onClick={() => {
                                                setForm((prev) => ({ ...prev, locationId: loc.id }));
                                                setOpenLocation(false);
                                            }}
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-base">{loc.name}</span>
                                                <span className="pl-2 text-xs line-clamp-1">{loc.addressDescription}</span>
                                            </div>
                                        </div>
                                    ))}
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex flex-row justify-between gap-4">
                        {/* Item Count */}
                        <div>
                            <p className="text-base text-neutral-900 mb-1 font-semibold">
                                Court Count
                            </p>
                            <input
                                type="number"
                                name="itemCount"
                                min={1}
                                max={10}
                                value={form.itemCount}
                                onChange={handleChange}
                                className="w-full rounded-md border px-3 py-2 text-neutral-600"
                                required
                            />
                        </div>

                        {/* Min Price */}
                        <div>
                            <p className="text-base text-neutral-900 mb-1 font-semibold">
                                Minimum Price (per court)
                            </p>
                            <input
                                type="text"
                                name="minPrice"
                                placeholder="Minimum Price"
                                value={
                                    form.minPrice
                                        ? new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            minimumFractionDigits: 0,
                                        }).format(form.minPrice)
                                        : ""
                                }
                                onChange={(e) => {
                                    // remove all non-digit chars
                                    const rawValue = e.target.value.replace(/\D/g, "");
                                    setForm((prev) => ({
                                        ...prev,
                                        minPrice: rawValue ? parseInt(rawValue, 10) : 0,
                                    }));
                                }}
                                className="w-full rounded-md border px-3 py-2 text-neutral-600"
                                required
                            />
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div>
                        <p className="text-base text-neutral-900 mb-1 font-semibold">
                            Start Time
                        </p>
                        <DateTimePicker
                            label="Start"
                            open={openStartTime}
                            onOpenChange={setStartTime}
                            date={form.startDate}
                            onDateChange={(date) => {
                                if (form.endDate < form.startDate) {
                                    setForm((prev) => ({ ...prev, startDate: date ?? new Date(), endDate: date ?? new Date() }))
                                } else {
                                    setForm((prev) => ({ ...prev, startDate: date ?? new Date() }))
                                }
                            }
                            }
                            time={form.startTime}
                            onTimeChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setForm((prev) => ({ ...prev, startTime: e.target.value }))
                            }
                        />
                    </div>

                    <div>
                        <p className="text-base text-neutral-900 mb-1 font-semibold">
                            End Time
                        </p>

                        <DateTimePicker
                            label="End"
                            open={openEndTime}
                            onOpenChange={setEndTime}
                            date={form.endDate}
                            onDateChange={(date) =>
                                setForm((prev) => ({ ...prev, endDate: date ?? new Date() }))
                            }
                            time={form.endTime}
                            onTimeChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setForm((prev) => ({ ...prev, endTime: e.target.value }))
                            }
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-surface-primary text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                        {loading ? "Saving..." : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}
