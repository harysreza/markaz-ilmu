import { prisma } from "@/lib/prisma"
import { PengaturanClient } from "./_components/pengaturan-client"
export const metadata = { title: "Pengaturan" }
export default async function PengaturanPage() {
  const rows = await prisma.siteSetting.findMany()
  const settings = Object.fromEntries(rows.map(r => [r.key, r.value]))
  return <PengaturanClient initialSettings={settings} />
}
