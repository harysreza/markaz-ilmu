"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import DefaultHeroImg from "@/assets/Tower.jpg"

interface PageHeroProps {
  title: string
  description: string
  backgroundImage?: string | StaticImageData
  children?: React.ReactNode
  showBackButton?: boolean
  backButtonHref?: string
  backButtonLabel?: string
}

export function PageHero({
  title,
  description,
  backgroundImage = DefaultHeroImg,
  children,
  showBackButton = true,
  backButtonHref = "/",
  backButtonLabel = "Kembali ke Beranda"
}: PageHeroProps) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

  return (
    <>
      {/* Full Section Parallax Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div 
            style={{ y }} 
            className="absolute inset-x-0 top-0 h-[110%] will-change-transform"
          >
            <Image
              src={backgroundImage} 
              alt="Page Background"
              fill
              priority
              className="object-cover opacity-30 dark:opacity-40 grayscale"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-slate-900/60 to-slate-900/90 dark:from-primary/10 dark:via-slate-950/80 dark:to-slate-950" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative py-32 md:py-48 px-4 text-white z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto max-w-4xl text-center space-y-10 relative z-10"
        >
          {showBackButton && (
            <Link href={backButtonHref} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 hover:text-primary transition-colors mb-4 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> {backButtonLabel}
            </Link>
          )}
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-display italic uppercase text-white drop-shadow-2xl leading-none">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
              {description}
            </p>
          </div>
          
          {children}
        </motion.div>
      </section>
    </>
  )
}
