import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { PdfReader } from "./_components/PdfReader"

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ebook = await prisma.ebook.findUnique({
    where: { id, status: "published" },
    select: { title: true, author: true },
  })

  if (!ebook) return { title: "E-Book Not Found" }

  return {
    title: `Baca: ${ebook.title} - ${ebook.author}`,
    description: `Baca e-book ${ebook.title} karya ${ebook.author} secara online`,
  }
}

export default async function ReadEbookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const ebook = await prisma.ebook.findUnique({
    where: { id, status: "published" },
    select: {
      id: true,
      title: true,
      author: true,
      fileUrl: true,
      isReadOnline: true,
    },
  })

  if (!ebook || !ebook.isReadOnline) {
    notFound()
  }

  return <PdfReader ebook={ebook} />
}
