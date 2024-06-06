'use client'
import { Loader2, Plus } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"

import { Skeleton } from "@/components/ui/skeleton"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transaction"

const TransactionsPage = () => {
    const { onOpen } = useNewTransaction();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];
    const isDisabled =
    transactionsQuery.isLoading ||
    transactionsQuery.isFetching;

    if (transactionsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader >
                        <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300  animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>

        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transaction History
                    </CardTitle>
                    <Button
                        onClick={onOpen}
                        size="sm">
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteTransactions.mutate({ ids });
                        }}
                        columns={columns}
                        data={transactions}
                        filterKey="name"
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionsPage