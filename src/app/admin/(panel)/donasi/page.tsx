import { prisma } from "@/lib/prisma"
import { DonasiClient } from "./_components/donasi-client"
export const metadata = { title: "Donasi" }
export default async function DonasiPage() {
  const [campaigns, bankAccounts] = await Promise.all([
    prisma.donationCampaign.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.bankAccount.findMany({ orderBy: { createdAt: "asc" } }),
  ])
  return <DonasiClient campaigns={campaigns} bankAccounts={bankAccounts} />
}
