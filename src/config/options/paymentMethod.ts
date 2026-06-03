import { FieldOption } from "@/types/module";

export const paymentMethods: FieldOption[] = [
  { label: "Card", value: "card" },
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "UPI", value: "upi" },
  { label: "PayPal", value: "paypal" },
];
