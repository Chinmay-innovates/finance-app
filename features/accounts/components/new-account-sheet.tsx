import { z } from "zod";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { AccountForm } from "@/features/accounts/components/account-form";
import { useCreateAccount } from "../api/use-create-account";

import { insertAccountSchema } from "@/db/schema";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  
} from "@/components/ui/sheet"
export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  const mutation = useCreateAccount();

  const formSchema = insertAccountSchema.pick({
    name: true
  });

  type FormValues = z.input<typeof formSchema>;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });

  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetHeader>
            New Account
          </SheetHeader>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValue={{
            name: "",
          }}
        />
      </SheetContent>
    </Sheet>
  )
}