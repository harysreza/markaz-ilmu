import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Calendar, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MotionDiv } from "@/components/ui/motion"
import { NewsletterCard } from "@/components/shared/newsletter-card"
import { PopularArticles } from "@/components/features/popular-articles"
import { ScrollProgressBar } from "./_components/ScrollProgressBar"
import { ArticleActionBar } from "./_components/ArticleActionBar"
import { getArticleById, getTrendingArticles } from "@/lib/queries"

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const article = await getArticleById(id)

  if (!article) return { title: "Artikel tidak ditemukan" }

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [{ url: article.thumbnail }],
    },
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case "Akidah":
      return "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20 text-white"
    case "Manhaj":
      return "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20 text-white"
    case "Fikih":
      return "bg-amber-600 hover:bg-amber-500 shadow-amber-600/20 text-white"
    case "Akhlak":
    case "Akhlak & Nasihat":
      return "bg-rose-600 hover:bg-rose-500 shadow-rose-600/20 text-white"
    case "Do'a & Dzikir":
      return "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20 text-white"
    default:
      return "bg-primary hover:bg-primary shadow-primary/20 text-white"
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params
  const [article, trendingArticles] = await Promise.all([
    getArticleById(id),
    getTrendingArticles(id),
  ])

  if (!article) notFound()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817]">
      <ScrollProgressBar />

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#020817] via-slate-900/40 to-slate-900/20" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-12 md:pb-24">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl space-y-6"
            >
              <div className="flex flex-wrap gap-3">
                <Badge
                  className={`${getCategoryColor(article.category)} border-none px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg`}
                >
                  {article.category}
                </Badge>
                {article.isTrending && (
                  <Badge className="bg-orange-500 hover:bg-orange-500 text-white border-none px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-orange-500/20">
                    Trending
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-slate-900/40 border border-white/20 flex items-center justify-center overflow-hidden">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-sm md:text-base">{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  <span className="font-bold text-sm md:text-base">
                    {new Date(article.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  <span className="font-bold text-sm md:text-base uppercase tracking-wider">
                    5 Min Read
                  </span>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-12 md:-mt-20 relative z-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Article Body */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-16"
          >
            <ArticleActionBar />

            <article
              className="prose prose-lg md:prose-xl dark:prose-invert prose-slate max-w-none
              prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
              dark:prose-headings:text-white prose-p:leading-relaxed prose-p:text-slate-600
              dark:prose-p:text-slate-300 prose-img:rounded-3xl prose-blockquote:border-l-4
              prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-8
              prose-blockquote:rounded-r-3xl prose-blockquote:font-medium prose-blockquote:italic
              prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-strong:text-slate-900
              dark:prose-strong:text-white"
              dangerouslySetInnerHTML={{
                __html:
                  article.content ||
                  `<p>${article.summary}</p><p>Maaf, konten lengkap untuk artikel ini belum tersedia. Silakan hubungi pengelola untuk informasi lebih lanjut.</p>`,
              }}
            />

            {/* Article Footer */}
            <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-[.2em]">
                      Penulis
                    </p>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white">
                      {article.author}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-slate-500">Bantu sebarkan manfaat:</p>
                  <Button className="bg-[#1877F2] hover:bg-[#1877F2]/90 h-10 w-10 p-0 rounded-full">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </Button>
                  <Button className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 h-10 w-10 p-0 rounded-full">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </Button>
                  <Button className="bg-[#25D366] hover:bg-[#25D366]/90 h-10 w-10 p-0 rounded-full">
                    <span className="sr-only">WhatsApp</span>
                    <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.672 1.433 5.66 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </MotionDiv>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-16">
            <PopularArticles articles={trendingArticles} currentArticleId={id} />
            <NewsletterCard />
          </div>
        </div>
      </div>
    </div>
  )
}
