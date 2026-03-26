import type { Metadata } from "next"
import { HomeClientPage } from "./_components/HomeClientPage"
import {
  getRecentArticles,
  getTrendingArticles,
  getPublishedVideos,
  getPublishedAudios,
  getPublishedEbooks,
} from "@/lib/queries"

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Pusat kajian ilmu syar'i — artikel, video, audio, jadwal kajian, dan jadwal sholat dalam satu platform.",
}

export default async function Home() {
  const [articles, trending, videos, audios, ebooks] = await Promise.all([
    getRecentArticles(4),
    getTrendingArticles(),
    getPublishedVideos(),
    getPublishedAudios(),
    getPublishedEbooks(),
  ])

  return (
    <HomeClientPage
      articles={articles}
      trending={trending}
      videos={videos}
      audios={audios}
      ebooks={ebooks}
    />
  )
}
