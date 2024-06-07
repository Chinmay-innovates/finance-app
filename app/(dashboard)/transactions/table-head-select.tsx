import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
    columnIndex: number;
    selectedColums: Record<string, string | null>;
    onChange: (
        columnIndex: number,
        value: string | null
    ) => void;
}
const options = [
    "amount",
    "payee",
    "date",
]
export const TableHeadSelect = ({
    columnIndex,
    onChange,
    selectedColums,
}: Props) => {
    const currentSelection = selectedColums[`column_${columnIndex}`];
    return (
        <Select
            value={currentSelection || ""}
            onValueChange={(value) => onChange(columnIndex, value)}
        >
            <SelectTrigger
                className={cn(
                    "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
                    currentSelection && "text-blue-500"
                )}
            >
                <SelectValue placeholder="Skip" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="skip">Skip</SelectItem>
                {options.map((option, idx) => {
                    const disabled = Object.values(selectedColums).includes(option)
                        && selectedColums[`column_${columnIndex}`] !== option
                    return (
                        <SelectItem
                            key={idx}
                            value={option}
                            className={cn(
                                "capitalize",
                                currentSelection === option && "text-blue-500"
                            )}
                            disabled={disabled}
                        >
                            {option}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>

    );
};