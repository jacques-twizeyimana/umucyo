import type { Metadata } from "next";
import { TermsHint } from "@/components/register/parts";
import { RegLayout } from "@/components/register/shell";
import { AccountTypeChooser } from "./account-type";

export const metadata: Metadata = { title: "Create your supplier account" };

export default function RegisterStartPage() {
  return (
    <RegLayout
      type="business"
      step={1}
      title="Create your supplier account"
      lead="Registration is how you bid on public tenders in Rwanda. Choose how you will bid."
    >
      <AccountTypeChooser />
      <TermsHint />
    </RegLayout>
  );
}
