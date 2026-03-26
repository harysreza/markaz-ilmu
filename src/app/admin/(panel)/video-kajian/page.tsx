import { prisma } from "@/lib/prisma"
import { VideoKajianClient } from "./_components/video-client"

export const metadata = { title: "Video Kajian" }

export default async function VideoKajianPage() {
  const videos = await prisma.video.findMany({ orderBy: { updatedAt: "desc" } })
  return <VideoKajianClient initialData={videos} />
}
