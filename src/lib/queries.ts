import { prisma } from "./prisma"

// ─── Error handling wrapper for build-time queries ─────────────────────────────
/**
 * Wraps database queries to handle cases where database is not yet available
 * (e.g., during Vercel build process). Returns fallback value on error.
 */
async function safeQuery<T>(
  queryFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await queryFn()
  } catch (error) {
    // During build, database might not exist yet - return empty data
    if (process.env.NODE_ENV === 'production' && !process.env.SKIP_DB_CHECK) {
      console.warn('Database query failed, returning fallback:', error)
    }
    return fallback
  }
}

// ─── Public types (shaped to match what frontend components expect) ───────────

export interface PublicArticle {
  id: string
  title: string
  slug: string
  category: string
  summary: string
  thumbnail: string
  author: string
  isTrending: boolean
  date: string       // ISO string derived from publishedAt ?? createdAt
  content: string
}

export interface PublicVideo {
  id: string
  title: string
  speaker: string
  duration: string
  category: string
  youtubeId: string
  thumbnail: string  // derived: https://img.youtube.com/vi/{youtubeId}/maxresdefault.jpg
  views: string
  date: string
}

export interface PublicAudio {
  id: string
  title: string
  speaker: string
  category: string
  image: string
  type: string
  spotifyId: string
  date: string
}

export interface PublicEbook {
  id: string
  title: string
  author: string
  thumbnail: string
  fileUrl: string
  fileSize: string
  category: string
  isReadOnline: boolean
  isDownloadable: boolean
}

export interface PublicDoa {
  id: string
  title: string
  category: string
  arabic: string
  latin: string
  translation: string
  source: string
}

export interface PublicEvent {
  id: string
  title: string
  speaker: string
  date: string
  time: string
  location: string
  isOnline: boolean
  isFree: boolean
  registrationUrl: string | null
  posterUrl: string
  description: string
}

export interface PublicQA {
  id: string
  question: string
  answer: string    // guaranteed non-null for published items
  category: string
  askedBy: string
  answeredBy: string
  date: string
}

export interface PublicBankAccount {
  id: string
  bankName: string
  accountNumber: string
  accountName: string
  whatsappNumber: string
}

// ─── Query functions ──────────────────────────────────────────────────────────

export async function getPublishedArticles(): Promise<PublicArticle[]> {
  return safeQuery(async () => {
    const rows = await prisma.article.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        summary: true,
        thumbnail: true,
        author: true,
        isTrending: true,
        publishedAt: true,
        createdAt: true,
        content: true,
      },
    })
    return rows.map((a) => ({
      ...a,
      date: (a.publishedAt ?? a.createdAt).toISOString(),
    }))
  }, [])
}

export async function getArticleById(id: string): Promise<PublicArticle | null> {
  return safeQuery(async () => {
    const a = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        summary: true,
        thumbnail: true,
        author: true,
        isTrending: true,
        publishedAt: true,
        createdAt: true,
        content: true,
        status: true,
      },
    })
    if (!a || a.status !== "published") return null
    return {
      id: a.id,
      title: a.title,
      slug: a.slug,
      category: a.category,
      summary: a.summary,
      thumbnail: a.thumbnail,
      author: a.author,
      isTrending: a.isTrending,
      date: (a.publishedAt ?? a.createdAt).toISOString(),
      content: a.content,
    }
  }, null)
}

export async function getTrendingArticles(excludeId?: string): Promise<PublicArticle[]> {
  return safeQuery(async () => {
    const rows = await prisma.article.findMany({
      where: {
        status: "published",
        isTrending: true,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      orderBy: { publishedAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        summary: true,
        thumbnail: true,
        author: true,
        isTrending: true,
        publishedAt: true,
        createdAt: true,
        content: true,
      },
    })
    return rows.map((a) => ({
      ...a,
      date: (a.publishedAt ?? a.createdAt).toISOString(),
    }))
  }, [])
}

export async function getPublishedVideos(): Promise<PublicVideo[]> {
  return safeQuery(async () => {
    const rows = await prisma.video.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        speaker: true,
        duration: true,
        category: true,
        youtubeId: true,
        views: true,
        publishedAt: true,
        createdAt: true,
      },
    })
    return rows.map((v) => ({
      ...v,
      thumbnail: `https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`,
      date: (v.publishedAt ?? v.createdAt).toISOString(),
    }))
  }, [])
}

export async function getPublishedAudios(): Promise<PublicAudio[]> {
  return safeQuery(async () => {
    const rows = await prisma.audio.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        speaker: true,
        category: true,
        image: true,
        type: true,
        spotifyId: true,
        publishedAt: true,
        createdAt: true,
      },
    })
    return rows.map((a) => ({
      ...a,
      date: (a.publishedAt ?? a.createdAt).toISOString(),
    }))
  }, [])
}

export async function getPublishedEbooks(): Promise<PublicEbook[]> {
  return safeQuery(async () => {
    return prisma.ebook.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        author: true,
        thumbnail: true,
        fileUrl: true,
        fileSize: true,
        category: true,
        isReadOnline: true,
        isDownloadable: true,
      },
    })
  }, [])
}

export async function getPublishedDoas(): Promise<PublicDoa[]> {
  return safeQuery(async () => {
    return prisma.doaDzikir.findMany({
      where: { status: "published" },
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        category: true,
        arabic: true,
        latin: true,
        translation: true,
        source: true,
      },
    })
  }, [])
}

export async function getPublishedEvents(): Promise<PublicEvent[]> {
  return safeQuery(async () => {
    return prisma.event.findMany({
      where: { status: { in: ["upcoming", "ongoing"] } },
      orderBy: { date: "asc" },
      select: {
        id: true,
        title: true,
        speaker: true,
        date: true,
        time: true,
        location: true,
        isOnline: true,
        isFree: true,
        registrationUrl: true,
        posterUrl: true,
        description: true,
      },
    })
  }, [])
}

export async function getPublishedQA(): Promise<PublicQA[]> {
  return safeQuery(async () => {
    const rows = await prisma.qA.findMany({
      where: { status: "published", answer: { not: null } },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
        askedBy: true,
        answeredBy: true,
        publishedAt: true,
        createdAt: true,
      },
    })
    return rows.map((q) => ({
      ...q,
      answer: q.answer ?? "",
      date: (q.publishedAt ?? q.createdAt).toISOString(),
    }))
  }, [])
}

export async function getActiveBankAccounts(): Promise<PublicBankAccount[]> {
  return safeQuery(async () => {
    return prisma.bankAccount.findMany({
      where: { isActive: true },
      select: {
        id: true,
        bankName: true,
        accountNumber: true,
        accountName: true,
        whatsappNumber: true,
      },
    })
  }, [])
}

export async function getRecentArticles(take = 4): Promise<PublicArticle[]> {
  return safeQuery(async () => {
    const rows = await prisma.article.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      take,
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        summary: true,
        thumbnail: true,
        author: true,
        isTrending: true,
        publishedAt: true,
        createdAt: true,
        content: true,
      },
    })
    return rows.map((a) => ({
      ...a,
      date: (a.publishedAt ?? a.createdAt).toISOString(),
    }))
  }, [])
}
