import { format } from "date-fns";
import {
    ResponsiveContainer,
    Tooltip,
    XAxis,
    LineChart,
    CartesianGrid,
    Line,
} from "recharts"
import { CustomTooltip } from "./custom-tooltip";
import { useMedia } from "react-use";


type Props = {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[];
}
export const LineVariant = ({ data }: Props) => {
    const isMobile = useMedia("(max-width: 800px)", false);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}

                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    dot={isMobile ? false : true}
                    type="monotone"
                    dataKey="income"
                    stroke="#3D82F6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
                <Line
                    dot={isMobile ? false : true}
                    type="natural"
                    dataKey="expenses"
                    stroke="#F43F5E"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}