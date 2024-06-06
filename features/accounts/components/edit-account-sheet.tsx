import { z } from "zod";
import { Loader2 } from "lucide-react";

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

import { insertAccountSchema } from "@/db/schema";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { useConfirm } from "@/hooks/use-confirm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader
} from "@/components/ui/sheet"
export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are u sure?",
    "You are about to delete this account."
  )

  const accountQuery = useGetAccount(id)
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);


  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending;


  const formSchema = insertAccountSchema.pick({
    name: true
  });

  const isLoading = accountQuery.isLoading;
  type FormValues = z.input<typeof formSchema>;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      }
      )
    }
  }



  const defaultValues = accountQuery.data ? {
    name: accountQuery.data.name,
  } : { name: "" }
  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetHeader>
              Edit Account
            </SheetHeader>
            <SheetDescription>
              Edit an existing account.
            </SheetDescription>
          </SheetHeader>
          {isLoading ?
            (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <AccountForm
                id={id}
                onSubmit={onSubmit}
                disabled={isPending}
                defaultValue={defaultValues}
                onDelete={onDelete}
              />
            )
          }
        </SheetContent>
      </Sheet>
    </>
  )
}