import type { Metadata } from "next";
import { RegLayout } from "@/components/register/shell";
import { VerifyStep } from "@/components/register/verify";

export const metadata: Metadata = { title: "Register — verify email & phone" };

export default function BusinessVerifyPage() {
  return (
    <RegLayout
      type="business"
      step={5}
      title="Verify your email and phone"
      lead="We sent a 6-digit code to each. Codes expire after 10 minutes."
    >
      <VerifyStep email="tenders@ikazelabs.rw" phone="+250 788 000 412" back="/register/business/contact" />
    </RegLayout>
  );
}
