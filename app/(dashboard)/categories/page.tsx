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

import { useNewCategory } from "@/features/categories/hooks/use-new-category"
import { useGetCategories } from "@/features/categories/api/use-get-categories"
import { useBulkDeleteCategory } from "@/features/categories/api/use-bulk-delete-categories"
import { Skeleton } from "@/components/ui/skeleton"

const CategoriesPage = () => {
    const { onOpen } = useNewCategory();
    const deleteCategories = useBulkDeleteCategory();
    const categoryQuery = useGetCategories();
    const categoies = categoryQuery.data || [];
    const isDisabled =
        categoryQuery.isLoading ||
        categoryQuery.isFetching;

    if (categoryQuery.isLoading) {
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
                        Categories Page
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
                            deleteCategories.mutate({ ids });
                        }}
                        columns={columns}
                        data={categoies}
                        filterKey="name"
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesPage