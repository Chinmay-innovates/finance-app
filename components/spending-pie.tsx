import { useState } from "react";
import {
    FileSearch,
    Loader2,
    PieChart,
    Radar,
    Target
} from "lucide-react";
import {
    Card, CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { PieVariant } from "./pie-variant";
import { RadarVariant } from "./radar-variant";
import { RadialVariant } from "./radial-variant";
import { Skeleton } from "./ui/skeleton";

type Props = {
    data?: {
        name: string;
        value: number;
    }[]
}
export const SpendingPie = ({
    data = []
}: Props) => {
    const [chartType, setShartType] = useState("pie");
    const onTypeChange = (type: string) => {
        // TODO add a paywall
        setShartType(type);
    }
    return (
        <Card className="border-none drop-shadow-none">
            <CardHeader className="flex lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <CardTitle className="text-2xl line-clamp-1">
                    Categories
                </CardTitle>
                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart Type" />
                        <SelectContent>
                            <SelectItem value="pie">
                                <div className="flex items-center">
                                    <PieChart className="size-4 shrink-0 mr-2" />
                                    <p className="line-clamp-1">Pie Chart</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="radar">
                                <div className="flex items-center">
                                    <Radar className="size-4 shrink-0 mr-2" />
                                    <p className="line-clamp-1">Radar Chart</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="radial">
                                <div className="flex items-center">
                                    <Target className="size-4 shrink-0 mr-2" />
                                    <p className="line-clamp-1">Radial Chart</p>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </SelectTrigger>
                </Select>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col gap-y-4 items-center justify-center h-[350px]
                   w-full">
                        <FileSearch className="size-6 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">
                            No data found for this period
                        </p>
                    </div>
                ) : (
                    <>

                        {chartType === "pie" && <PieVariant data={data} />}
                        {chartType === "radar" && <RadarVariant data={data} />}
                        {chartType === "radial" && <RadialVariant data={data} />}

                    </>
                )}
            </CardContent>
        </Card>
    )
}

export const SpendingPieSkeleton = () => {
    return (
        <div className="border-none drop-shadow-none">
            <CardHeader className="flex  space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 lg:w-[120px] w-full" />
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full items-center justify-center flex">
                    <Loader2 className="size-6 to-slate-300 animate-spin" />
                </div>
            </CardContent>
        </div>
    )
}