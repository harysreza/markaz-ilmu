import type { Metadata } from "next"
import { getActiveBankAccounts } from "@/lib/queries"
import { DonationClientPage } from "./_components/DonationClientPage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Infaq & Donasi",
  description:
    "Salurkan amal jariyah Anda untuk mendukung dakwah dan operasional Markaz Ilmu.",
}

export default async function DonationPage() {
  const bankAccounts = await getActiveBankAccounts()
  return <DonationClientPage bankAccounts={bankAccounts} />
}
