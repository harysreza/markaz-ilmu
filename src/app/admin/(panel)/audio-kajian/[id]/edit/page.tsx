import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { AudioForm } from "../../_components/audio-form"
export const metadata = { title: "Edit Audio" }
export default async function EditAudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const audio = await prisma.audio.findUnique({ where: { id } })
  if (!audio) notFound()
  return <div><h1 className="text-2xl font-bold mb-6">Edit Audio Kajian</h1><AudioForm audio={audio} /></div>
}
