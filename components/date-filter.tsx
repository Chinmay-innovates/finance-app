'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select"
import qs from "query-string"
import {
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation";
import { useGetsummary } from "@/features/summary/api/use-get-summary";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./ui/popover";

import { subDays, format } from "date-fns";
import { formatDateRange } from "@/lib/utils";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { Calendar } from "./ui/calendar";


export const DateFilter = () => {
    const router = useRouter();
    const pathname = usePathname();

    const params = useSearchParams();
    const accountId = params.get("accountId");
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const paramState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo,
    }

    const [date, setDate] = useState<DateRange | undefined>(paramState);
    const pushToUrl = (dateRange: DateRange | undefined) => {
        const query = {
            from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
            to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
            accountId
        };
        const url = qs.stringifyUrl({
            url: pathname,
            query
        }, { skipNull: true, skipEmptyString: true })

        router.push(url);
    }
    const onReset = () => {
        setDate(undefined)
        pushToUrl(undefined)
    }

    return (
        <Popover >
            <PopoverTrigger asChild>
                <Button
                    disabled={false}
                    size="sm"
                    variant="outline"
                    className="lg:w-auto w-full h-9 p-3 rounded-md font-normal
    bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 
    focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
                >
                    <span className="">{formatDateRange(paramState)}</span>
                    <ChevronDown className="ml-2 size-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="lg:w-auto w-full p-0">
                <Calendar
                    disabled={false}
                    mode="range"
                    selected={date}
                    defaultMonth={date?.from}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
                <div className="p-4 w-full flex items-center gap-x-2">
                    <PopoverClose asChild>
                        <Button
                            onClick={onReset}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                            variant="outline"
                        >

                            Reset
                        </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                        <Button
                            onClick={() => pushToUrl(date)}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                        >
                            Apply
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    )

}