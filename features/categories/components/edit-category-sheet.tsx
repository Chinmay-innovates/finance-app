import { z } from "zod";


import { CategoryForm } from "./category-form";


import { insertCategorySchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader
} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react";

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are u sure?",
    "You are about to delete this category."
  )

  const categoryQuery = useGetCategory(id)
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);


  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending;


  const formSchema = insertCategorySchema.pick({
    name: true
  });

  const isLoading = categoryQuery.isLoading;
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



  const defaultValues = categoryQuery.data ? {
    name: categoryQuery.data.name,
  } : { name: "" }
  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetHeader>
              Edit Category
            </SheetHeader>
            <SheetDescription>
              Edit an existing category.
            </SheetDescription>
          </SheetHeader>
          {isLoading ?
            (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <CategoryForm
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