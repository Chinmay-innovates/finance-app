'use client'

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
    id: string;
}
export const Actions = ({ id }: Props) => {
    const { onOpen, onClose } = useOpenCategory();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are u sure?",
        "You are about to delete this category."
    )

    const deleteMutation = useDeleteCategory(id);

    const handleDelete = async () => {
        const ok = await confirm();
        if (ok) deleteMutation.mutate()
    }

    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => onOpen(id)}
                        disabled={deleteMutation.isPending}
                    >
                        <Edit className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem

                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                    >
                        <Trash className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}