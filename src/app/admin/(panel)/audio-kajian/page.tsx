import { prisma } from "@/lib/prisma"
import { AudioKajianClient } from "./_components/audio-client"
export const metadata = { title: "Audio Kajian" }
export default async function AudioKajianPage() {
  const audios = await prisma.audio.findMany({ orderBy: { updatedAt: "desc" } })
  return <AudioKajianClient initialData={audios} />
}
