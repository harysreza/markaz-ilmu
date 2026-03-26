import type { Metadata } from "next"
import { getPublishedAudios } from "@/lib/queries"
import { AudioKajianClientPage } from "./_components/AudioKajianClientPage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Audio Portal",
  description: "Dengarkan kajian ilmu syar'i kapanpun dan di manapun melalui Spotify.",
}

export default async function AudioKajianPage() {
  const audios = await getPublishedAudios()
  return <AudioKajianClientPage audios={audios} />
}
