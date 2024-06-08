import {
    AreaChart,
    BarChart3,
    FileSearch,
    LineChart,
    Loader2
} from "lucide-react";
import {
    Card, CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { BarVariant } from "@/components/bar-variant";
import { AreaVariant } from "@/components/area-variant";
import { LineVariant } from "@/components/line-variant";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Skeleton } from "./ui/skeleton";

type Props = {
    data?: {
        date: string;
        income: number;
        expenses: number;
    }[]
}
export const Chart = ({
    data = []
}: Props) => {
    const [chartType, setShartType] = useState("area");
    const onTypeChange = (type: string) => {
        // TODO add a paywall
        setShartType(type);
    }
    return (
        <Card className="border-none drop-shadow-none w-auto">
            <CardHeader className="flex lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <CardTitle className="text-2xl line-clamp-1">
                    Transactions
                </CardTitle>
                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart Type" />
                        <SelectContent>
                            <SelectItem value="area">
                                <div className="flex items-center">
                                    <AreaChart className="size-4 shrink-0 mr-2" />
                                    <p className="line-clamp-1">Area Chart</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="line">
                                <div className="flex items-center">
                                    <LineChart className="size-4 shrink-0 mr-2" />
                                    <p className="line-clamp-1">Line Chart</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="bar">
                                <div className="flex items-center">
                                    <BarChart3 className="size-4 shrink-0 mr-2" />
                                    <p className="line-clamp-1">Bar Chart</p>
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
                        {chartType === "bar" && <BarVariant data={data} />}
                        {chartType === "area" && <AreaVariant data={data} />}
                        {chartType === "line" && <LineVariant data={data} />}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export const ChartLoadingSkeleton = () => {
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