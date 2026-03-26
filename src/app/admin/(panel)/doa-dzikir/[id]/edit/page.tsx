import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { DoaForm } from "../../_components/doa-form"
export const metadata = { title: "Edit Do'a" }
export default async function EditDoaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const doa = await prisma.doaDzikir.findUnique({ where: { id } })
  if (!doa) notFound()
  return <div><h1 className="text-2xl font-bold mb-6">Edit Do&apos;a & Dzikir</h1><DoaForm doa={doa} /></div>
}
