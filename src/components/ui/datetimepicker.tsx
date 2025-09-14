"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


interface DateTimePickerProps {
    label?: string
    open: boolean
    onOpenChange: (open: boolean) => void
    date: Date | undefined
    onDateChange: (date: Date | undefined) => void
    time: string
    onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    disableDate?: boolean
}

export function DateTimePicker({
    label = "Date & Time",
    open,
    onOpenChange,
    date,
    onDateChange,
    time,
    onTimeChange,
    disableDate = false,
}: DateTimePickerProps) {

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={onOpenChange}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="w-32 justify-between font-normal"
                        >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                onDateChange(date)
                                onOpenChange(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Input
                    type="time"
                    id="time-picker"
                    step="60" // 60 seconds = 1 minute increments
                    value={time}
                    onChange={onTimeChange}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    )
}
