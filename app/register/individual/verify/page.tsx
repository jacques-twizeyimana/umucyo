import type { Metadata } from "next";
import { RegLayout } from "@/components/register/shell";
import { VerifyStep } from "@/components/register/verify";

export const metadata: Metadata = { title: "Register — verify email & phone" };

export default function IndividualVerifyPage() {
  return (
    <RegLayout
      type="individual"
      step={3}
      title="Verify your email and phone"
      lead="We sent a 6-digit code to each. Codes expire after 10 minutes."
    >
      <VerifyStep email="eric.mugisha@gmail.com" phone="+250 722 000 318" back="/register/individual" />
    </RegLayout>
  );
}
