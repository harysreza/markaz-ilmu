import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { VideoForm } from "../../_components/video-form"
export const metadata = { title: "Edit Video" }
export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const video = await prisma.video.findUnique({ where: { id } })
  if (!video) notFound()
  return <div><h1 className="text-2xl font-bold mb-6">Edit Video Kajian</h1><VideoForm video={video} /></div>
}
