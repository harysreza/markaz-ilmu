import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist, Geist_Mono, Noto_Naskh_Arabic, Montserrat, Lobster, Anton } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FontSizeProvider } from "@/components/font-size-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
})

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
})

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
})

const notoArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | Markaz Ilmu",
    default: "Markaz Ilmu | Belajar Islam Sesuai Sunnah",
  },
  description:
    "Media dakwah sunnah untuk menebarkan ilmu syar'i berdasarkan Al-Qur'an dan As-Sunnah sesuai pemahaman para sahabat Nabi.",
  metadataBase: new URL("https://markaz-ilmu.com"),
  openGraph: {
    type: "website",
    siteName: "Markaz Ilmu",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${lobster.variable} ${anton.variable} ${notoArabic.variable} antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FontSizeProvider>{children}</FontSizeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
