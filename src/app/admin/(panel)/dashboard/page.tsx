import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import {
  FileText, Video, Music, BookOpen, Heart,
  Calendar, HelpCircle, DollarSign, Clock,
  TrendingUp
} from "lucide-react"
import { DashboardCharts } from "./_components/dashboard-charts"
import { RecentActivityFeed } from "./_components/recent-activity"

export const metadata = { title: "Dashboard" }

async function getDashboardStats() {
  const [
    totalArticles,
    publishedArticles,
    totalVideos,
    totalAudios,
    totalEbooks,
    totalDoa,
    upcomingEvents,
    pendingQA,
    totalQA,
    campaignCount,
    recentLogs,
    articlesByCategory,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: "published" } }),
    prisma.video.count({ where: { status: "published" } }),
    prisma.audio.count({ where: { status: "published" } }),
    prisma.ebook.count({ where: { status: "published" } }),
    prisma.doaDzikir.count({ where: { status: "published" } }),
    prisma.event.count({ where: { status: "upcoming" } }),
    prisma.qA.count({ where: { status: "pending" } }),
    prisma.qA.count({ where: { status: "published" } }),
    prisma.donationCampaign.count({ where: { status: "active" } }),
    prisma.auditLog.findMany({
      take: 8,
      orderBy: { timestamp: "desc" },
      include: { actor: { select: { name: true } } },
    }),
    prisma.article.groupBy({
      by: ["category"],
      where: { status: "published" },
      _count: { id: true },
    }),
  ])

  return {
    totalArticles,
    publishedArticles,
    totalVideos,
    totalAudios,
    totalEbooks,
    totalDoa,
    upcomingEvents,
    pendingQA,
    totalQA,
    campaignCount,
    recentLogs,
    articlesByCategory,
  }
}

const statCards = (stats: Awaited<ReturnType<typeof getDashboardStats>>) => [
  {
    label: "Artikel",
    value: stats.publishedArticles,
    sub: `${stats.totalArticles} total`,
    icon: FileText,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950",
    href: "/admin/artikel",
  },
  {
    label: "Video Kajian",
    value: stats.totalVideos,
    sub: "dipublikasikan",
    icon: Video,
    color: "text-red-600 bg-red-50 dark:bg-red-950",
    href: "/admin/video-kajian",
  },
  {
    label: "Audio Kajian",
    value: stats.totalAudios,
    sub: "dipublikasikan",
    icon: Music,
    color: "text-purple-600 bg-purple-50 dark:bg-purple-950",
    href: "/admin/audio-kajian",
  },
  {
    label: "E-Book",
    value: stats.totalEbooks,
    sub: "dipublikasikan",
    icon: BookOpen,
    color: "text-green-600 bg-green-50 dark:bg-green-950",
    href: "/admin/ebook",
  },
  {
    label: "Do'a & Dzikir",
    value: stats.totalDoa,
    sub: "dipublikasikan",
    icon: Heart,
    color: "text-pink-600 bg-pink-50 dark:bg-pink-950",
    href: "/admin/doa-dzikir",
  },
  {
    label: "Event Mendatang",
    value: stats.upcomingEvents,
    sub: "jadwal kajian",
    icon: Calendar,
    color: "text-orange-600 bg-orange-50 dark:bg-orange-950",
    href: "/admin/jadwal-kajian",
  },
  {
    label: "Q&A Pending",
    value: stats.pendingQA,
    sub: `${stats.totalQA} dipublikasikan`,
    icon: HelpCircle,
    color: stats.pendingQA > 0 ? "text-yellow-600 bg-yellow-50 dark:bg-yellow-950" : "text-gray-600 bg-gray-50 dark:bg-gray-900",
    href: "/admin/tanya-jawab",
  },
  {
    label: "Kampanye Aktif",
    value: stats.campaignCount,
    sub: "donasi",
    icon: DollarSign,
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950",
    href: "/admin/donasi",
  },
]

export default async function DashboardPage() {
  const session = await auth()
  const stats = await getDashboardStats()
  const cards = statCards(stats)

  const categoryChartData = stats.articlesByCategory.map((c) => ({
    name: c.category,
    value: c._count.id,
  }))

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Selamat Pagi" : hour < 17 ? "Selamat Siang" : "Selamat Malam"

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {greeting}, {session?.user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Selamat datang di panel admin Markaz Ilmu.
          </p>
        </div>
        {stats.pendingQA > 0 && (
          <a
            href="/admin/tanya-jawab"
            className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-2 text-sm font-medium hover:bg-yellow-100 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            {stats.pendingQA} Q&A menunggu moderasi
          </a>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <a
              key={card.label}
              href={card.href}
              className="bg-background border rounded-xl p-4 hover:shadow-sm transition-shadow flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
              </div>
            </a>
          )
        })}
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="h-72 bg-muted rounded-xl animate-pulse" />}>
            <DashboardCharts categoryData={categoryChartData} />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div className="h-72 bg-muted rounded-xl animate-pulse" />}>
            <RecentActivityFeed logs={stats.recentLogs} />
          </Suspense>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-background border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="font-semibold">Aksi Cepat</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "+ Tambah Artikel", href: "/admin/artikel/baru" },
            { label: "+ Tambah Video", href: "/admin/video-kajian/baru" },
            { label: "+ Tambah Audio", href: "/admin/audio-kajian/baru" },
            { label: "+ Upload E-Book", href: "/admin/ebook/baru" },
            { label: "+ Tambah Do'a", href: "/admin/doa-dzikir/baru" },
            { label: "+ Buat Event", href: "/admin/jadwal-kajian/baru" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary/5 hover:bg-primary/10 text-primary text-sm font-medium transition-colors border border-primary/20"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
