import { useState } from "react";
import { format, parse } from "date-fns";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { convertAmountToMilliUnits } from "@/lib/utils";
import { ImportTable } from "./import-table";
import { Button } from "@/components/ui/button";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = [
    "amount",
    "payee",
    "date",
]
interface SelectedColumsState {
    [key: string]: string | null;
}

type Props = {
    data: [][];
    onCancel: () => void;
    onSubmit: (data: any) => void;
}

export const ImportCard = ({
    data,
    onCancel,
    onSubmit
}: Props) => {
    const [selectedColums, setSelectedColums] = useState<SelectedColumsState>({})
    const headers = data[0];
    const body = data.slice(1);

    const ontableHeadSelectChange = (
        columnIndex: number,
        value: string | null
    ) => {
        setSelectedColums((prev) => {
            const newSelectedColums = { ...prev };
            for (const key in newSelectedColums) {
                if (newSelectedColums[key] == value) {
                    newSelectedColums[key] = null;
                }
            }

            if (value === "skip") value = null;

            newSelectedColums[`column_${columnIndex}`] = value;
            return newSelectedColums;
        })
    }
    const progress = Object.values(selectedColums).filter(Boolean).length;

    const handleContinue = () => {

        const getColumnIndex = (column: string) => {
            return column.split("_")[1];
        };

        // converting [][][] => [{}, {}, {}]
        const mappedData = {
            headers: headers.map((_header, idx) => {
                const columnIndex = getColumnIndex(`column_${idx}`);
                return selectedColums[`column_${columnIndex}`] || null;
            }),
            body: body.map((row) => {
                const transformedRow = row.map((cell, idx) => {
                    const columnIndex = getColumnIndex(`column_${idx}`);
                    return selectedColums[`column_${columnIndex}`] ? cell : null;
                });

                return transformedRow.every((item) => item === null)
                    ? []
                    : transformedRow;

            }).filter((row) => row.length > 0),
        };

        const arrayOfData = mappedData.body.map((row) => {
            return row.reduce((acc: any, cell, idx) => {

                const header = mappedData.headers[idx];

                if (header !== null) acc[header] = cell;
                return acc;
            }, {})
        });

        const formattedData = arrayOfData.map((item) => ({
            ...item,
            amount: convertAmountToMilliUnits(parseFloat(item.amount)),
            date: format(parse(item.date, dateFormat, new Date()), outputFormat)
        }));
        onSubmit(formattedData)
    };
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Import Transaction
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                        <Button
                            className="w-full lg:w-auto"
                            onClick={onCancel}
                            size="sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-full lg:w-auto"
                            size="sm"
                            disabled={progress < requiredOptions.length}
                            onClick={handleContinue}
                        >
                            Continue ({progress} / {requiredOptions.length})
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers={headers}
                        body={body}
                        selectedColums={selectedColums}
                        ontableHeadSelectChange={ontableHeadSelectChange}
                    />
                </CardContent>
            </Card>
        </div>

    );
};