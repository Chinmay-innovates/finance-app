import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { insertAccountSchema } from "@/db/schema";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";



const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValue?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}
export const AccountForm = ({
    id,
    onDelete,
    onSubmit,
    defaultValue,
    disabled,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValue,
    })
    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    }
    const handleDelete = () => {
        onDelete?.();
    }
    return (
        <Form {...form}>
            <form
                className="space-y-4 pt-4"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="e.g. Cash, Bank, Credit Card"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-full" disabled={disabled}>
                    {id ? "Save Changes" : "Create account"}
                </Button>
                {!!id && (
                    <Button
                        type="button"
                        disabled={disabled}
                        onClick={handleDelete}
                        className="w-full"
                        size="icon"
                        variant="outline"
                    >
                        <Trash className="size-4 mr-2" />
                        Delete account
                    </Button>
                )}
                <FormMessage />
            </form>
        </Form>
    )
}