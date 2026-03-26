import { prisma } from "@/lib/prisma"
import { LaporanCharts } from "./_components/laporan-charts"
export const metadata = { title: "Laporan" }
export default async function LaporanPage() {
  const [articlesByCategory, articlesByStatus, contentCounts] = await Promise.all([
    prisma.article.groupBy({ by: ["category"], _count: { id: true } }),
    prisma.article.groupBy({ by: ["status"], _count: { id: true } }),
    Promise.all([
      prisma.article.count(), prisma.video.count(), prisma.audio.count(),
      prisma.ebook.count(), prisma.doaDzikir.count(), prisma.event.count(), prisma.qA.count(),
    ]),
  ])
  const [art, vid, aud, ebook, doa, evt, qa] = contentCounts
  const summary = [
    { label: "Artikel", value: art }, { label: "Video", value: vid },
    { label: "Audio", value: aud }, { label: "E-Book", value: ebook },
    { label: "Do'a & Dzikir", value: doa }, { label: "Event", value: evt },
    { label: "Tanya Jawab", value: qa },
  ]
  return (
    <LaporanCharts
      categoryData={articlesByCategory.map(c => ({ name: c.category, value: c._count.id }))}
      statusData={articlesByStatus.map(s => ({ name: s.status, value: s._count.id }))}
      summary={summary}
    />
  )
}
