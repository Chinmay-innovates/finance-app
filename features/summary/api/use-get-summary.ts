import { client } from "@/lib/hono";
import { convertAmountFromMilliUnuts } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";

export const useGetsummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    // TODO check if params are needed in the key
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch summary.");

      const { data } = await response.json();
      return {
        ...data,
        incomeAmount: convertAmountFromMilliUnuts(data.incomeAmount),
        expenseAmount: convertAmountFromMilliUnuts(data.expensesAmount),
        remainingAmount: convertAmountFromMilliUnuts(data.remaingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMilliUnuts(category.value),
        })),
        days: data.days.map((day) => ({
         ...day,
          income: convertAmountFromMilliUnuts(day.income),
          expenses: convertAmountFromMilliUnuts(day.expenses),
        })),
      };
    },
  });
  return query;
};
