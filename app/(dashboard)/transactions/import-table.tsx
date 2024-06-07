import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableHeadSelect } from "./table-head-select";


type Props = {
    headers: string[];
    body: string[][];
    selectedColums: Record<string, string | null>;
    ontableHeadSelectChange: (columnIndex: number, value: string | null) => void
}

export const ImportTable = ({
    body,
    headers,
    ontableHeadSelectChange,
    selectedColums
}: Props) => {

    return (
        <div className="rounded-md border overflow-hidden">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        {headers.map((_item, idx) => (
                            <TableHead key={idx}>
                                <TableHeadSelect
                                    columnIndex={idx}
                                    selectedColums={selectedColums}
                                    onChange={ontableHeadSelectChange}
                                />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {body.map((row: string[], idx) => (
                        <TableRow key={idx}>
                            {row.map((cell, idx) => (
                                <TableCell key={idx}>
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

    );
};