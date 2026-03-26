import type { Metadata } from "next"
import { getPublishedVideos } from "@/lib/queries"
import { VideoKajianClientPage } from "./_components/VideoKajianClientPage"

export const metadata: Metadata = {
  title: "Video Portal",
  description:
    "Mendalami ilmu syar'i melalui rekaman audio visual dari para asatidz.",
}

export default async function VideoKajianPage() {
  const videos = await getPublishedVideos()
  return <VideoKajianClientPage videos={videos} />
}
