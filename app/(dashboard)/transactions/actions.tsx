'use client'

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";


import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";

import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
    id: string;
}
export const Actions = ({ id }: Props) => {
    const { onOpen } = useOpenTransaction();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are u sure?",
        "You are about to delete this transaction."
    )

    const deleteMutation = useDeleteTransaction(id);

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