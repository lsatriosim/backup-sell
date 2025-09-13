'use client';

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, ChevronLeft, Loader2, MapIcon, SearchIcon } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { format } from "date-fns";

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

    const [form, setForm] = useState({
        locationId: "",
        minPrice: 0,
        itemCount: 1,
        date: new Date(),
        startHour: "",
        startMinute: "",
        endHour: "",
        endMinute: "",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Construct datetime
            const baseDate = format(form.date, "yyyy-MM-dd");
            const startDateTime = new Date(`${baseDate}T${form.startHour}:${form.startMinute}:00`);
            const endDateTime = new Date(`${baseDate}T${form.endHour}:${form.endMinute}:00`);

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

            await apiClient.post("/api/post/add", payload);

            router.push("/marketplace");
        } catch (err) {
            console.error(err);
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
                    {/* Location Selector */}
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
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full mb-2 rounded-md border px-2 py-1 text-sm"
                            /> 
                            {locations
                                .filter((loc) =>
                                    loc.name.toLowerCase().includes(locationFilter.toLowerCase())
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

                    {/* Min Price */}
                    <div>
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Minimum Price"
                            value={form.minPrice}
                            onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-neutral-600"
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Minimum price per 1 item count
                        </p>
                    </div>

                    {/* Item Count */}
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

                    {/* Date Picker */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full flex justify-between rounded-md px-3 py-2"
                            >
                                <span>{format(form.date, "EEEE, d MMM yyyy")}</span>
                                <CalendarDaysIcon className="h-4 w-4 text-gray-500" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={form.date}
                                required
                                startMonth={new Date()}
                                disabled={{ before: new Date() }}
                                onSelect={(selected) =>
                                    setForm((prev) => ({ ...prev, date: selected ?? new Date() }))
                                }
                            />
                        </PopoverContent>
                    </Popover>

                    {/* Start & End Time */}
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="startHour"
                            placeholder="Start Hour (0-23)"
                            min={0}
                            max={23}
                            value={form.startHour}
                            onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-neutral-600"
                            required
                        />
                        <input
                            type="number"
                            name="startMinute"
                            placeholder="Start Min (0-59)"
                            min={0}
                            max={59}
                            value={form.startMinute}
                            onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-neutral-600"
                            required
                        />
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="endHour"
                            placeholder="End Hour (0-23)"
                            min={0}
                            max={23}
                            value={form.endHour}
                            onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-neutral-600"
                            required
                        />
                        <input
                            type="number"
                            name="endMinute"
                            placeholder="End Min (0-59)"
                            min={0}
                            max={59}
                            value={form.endMinute}
                            onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-neutral-600"
                            required
                        />
                    </div>

                    {/* Sport Type */}
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
