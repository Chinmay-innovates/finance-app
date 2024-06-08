import { accounts, categories, transactions } from "@/db/schema";
import { convertAmountToMilliUnits } from "@/lib/utils";
import { neon } from "@neondatabase/serverless";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = process.env.SEED_USER_ID!;
const SEED_CATEGORIES = [
  { id: "category_1", name: "Food", userId: SEED_USER_ID, plaidId: null },
  { id: "category_2", name: "Rent", userId: SEED_USER_ID, plaidId: null },
  { id: "category_3", name: "Utilities", userId: SEED_USER_ID, plaidId: null },
  { id: "category_4", name: "Clothing", userId: SEED_USER_ID, plaidId: null },
  { id: "category_5", name: "Health", userId: SEED_USER_ID, plaidId: null },
  {
    id: "category_6",
    name: "Entertainment",
    userId: SEED_USER_ID,
    plaidId: null,
  },
  {
    id: "category_7",
    name: "Miscellaneous",
    userId: SEED_USER_ID,
    plaidId: null,
  },
];
const SEED_ACCOUNTS = [
  { id: "account_1", name: "Checking", userId: SEED_USER_ID, plaidId: null },
  { id: "account_2", name: "Savings", userId: SEED_USER_ID, plaidId: null },
  { id: "account_3", name: "Attics", userId: SEED_USER_ID, plaidId: null },
];
const SHORT_NOTES = [
  { id: "note_1", content: "Note 1" },
  { id: "note_2", content: "Note 2" },
  { id: "note_3", content: "Note 3" },
  { id: "note_4", content: "Note 4" },
  { id: "note_5", content: "Note 5" },
  { id: "note_6", content: "Note 6" },
  { id: "note_7", content: "Note 7" },
];
const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];
const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 30);

const generateRandomAmount = (category: typeof categories.$inferSelect) => {
  switch (category.name) {
    case "Rent":
      return Math.random() * 400 + 90;
    case "utilities":
      return Math.random() * 200 + 50;
    case "Food":
      return Math.random() * 30 + 10;
    case "Training":
      return Math.random() * 20 + 40;
    case "Health":
      return Math.random() * 70 + 14;
    case "Entertainment":
      return Math.random() * 200 + 12;
    case "Clothing":
      return Math.random() * 80 + 27;
    case "Miscellaneous":
      return Math.random() * 100 + 20;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;

  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6;
    const amount = generateRandomAmount(category);
    const formatedAmount = convertAmountToMilliUnits(
      isExpense ? -amount : amount
    );

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      amount: formatedAmount,
      date: day,
      payee: `Merchant_${i}`,
      notes: SHORT_NOTES[i].content,
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach((day) => generateTransactionsForDay(day));
};
generateTransactions();

const main = async () => {
  try {
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();

    await db.insert(categories).values(SEED_CATEGORIES).execute();
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (error) {
    console.log("Error during seeding:", error);
    process.exit(1);
  }
};
main();
