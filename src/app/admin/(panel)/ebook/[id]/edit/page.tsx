import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { EbookForm } from "../../_components/ebook-form"
export const metadata = { title: "Edit E-Book" }
export default async function EditEbookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ebook = await prisma.ebook.findUnique({ where: { id } })
  if (!ebook) notFound()
  return <div><h1 className="text-2xl font-bold mb-6">Edit E-Book</h1><EbookForm ebook={ebook} /></div>
}
