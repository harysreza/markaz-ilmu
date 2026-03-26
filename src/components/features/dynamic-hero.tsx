"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Calendar, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import QuranImg from "@/assets/Al Qur'an.jpg"
import TowerImg from "@/assets/Tower.jpg"
import MasjidilHaramImg from "@/assets/Masjidil haram.jpg"

const SLIDE_DURATION = 5000

export function DynamicHero() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [direction, setDirection] = React.useState(0)
  const [progress, setProgress] = React.useState(0)

  const slides = [
    {
      type: 'live',
      title: "Kitab\nUSHUL TSALATSAH",
      subtitle: "Kajian Rutin Mingguan • LIVE NOW",
      description: "Mari bergabung dalam kajian live interaktif membahas landasan utama iman dan tauhid bersama Ustadz Abu Umar Andri Maadsa.",
      image: QuranImg,
      link: "/kajian/live",
      cta: "TONTON LIVE SEKARANG",
      badge: "LIVE STREAM",
      badgeColor: "bg-red-600"
    },
    {
      type: 'event',
      title: "Fiqih Sholat\nBERJAMA'AH",
      subtitle: "Jadwal Kajian Terdekat",
      description: "Kajian spesial membahas Hukum, Kaidah & Tata Cara Sholat Berjama'ah sesuai tuntunan Sunnah Nabi.",
      image: MasjidilHaramImg,
      link: "/jadwal-kajian",
      cta: "LIHAT JADWAL LENGKAP",
      badge: "KAJIAN RUTIN",
      badgeColor: "bg-emerald-600"
    },
    {
      type: 'article',
      title: "Menuntut\nILMU AGAMA",
      subtitle: "Artikel Pilihan Pekan Ini",
      description: "Mengapa menuntut ilmu syar'i adalah kewajiban yang tidak boleh ditinggalkan oleh setiap muslim? Baca selengkapnya.",
      image: TowerImg,
      link: `/artikel/1`,
      cta: "BACA ARTIKEL",
      badge: "WAWASAN ILMU",
      badgeColor: "bg-indigo-600"
    }
  ]

  const nextSlide = React.useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }, [slides.length])

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + (100 / (SLIDE_DURATION / 100))
      })
    }, 100)
    return () => clearInterval(timer)
  }, [nextSlide])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    })
  }

  return (
    <section className="relative h-[700px] md:h-[750px] w-full overflow-hidden bg-slate-950">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.8 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              priority={currentSlide === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-3xl space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <Badge className={`${slides[currentSlide].badgeColor} text-white px-4 py-1.5 rounded-full font-black tracking-widest border-none shadow-lg`}>
                  {slides[currentSlide].badge}
                </Badge>
                <span className="text-white/60 font-medium tracking-wider text-sm uppercase">
                  {slides[currentSlide].subtitle}
                </span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tight"
                >
                  {slides[currentSlide].title.split('\n').map((line, i) => (
                    <span 
                      key={i} 
                      className={`block ${i === 0 && slides[currentSlide].type === 'event' ? 'font-script text-emerald-400 capitalize text-4xl md:text-6xl mb-2' : 'font-display italic uppercase'}`}
                    >
                      {line}
                    </span>
                  ))}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-medium"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-4 pt-4"
              >
                <Button 
                  size="lg" 
                  className="h-10 px-10 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 font-bold text-base shadow-2xl shadow-emerald-600/20 dark:shadow-emerald-500/10 transition-all hover:scale-105 active:scale-95 group border-none"
                >
                  {slides[currentSlide].type === 'live' ? <Play className="mr-3 h-5 w-5 fill-current" /> : null}
                  {slides[currentSlide].type === 'event' ? <Calendar className="mr-3 h-5 w-5" /> : null}
                  {slides[currentSlide].type === 'article' ? <FileText className="mr-3 h-5 w-5" /> : null}
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-4 md:right-12 flex items-center gap-6 z-20">
        <div className="flex gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1)
                setCurrentSlide(index)
                setProgress(0)
              }}
              className="group relative flex items-center justify-center p-2"
            >
              <div className={`h-1 transition-all duration-300 rounded-full ${
                index === currentSlide ? "w-12 bg-primary" : "w-4 bg-white/20 group-hover:bg-white/40"
              }`} />
              {index === currentSlide && (
                <div 
                  className="absolute left-2 h-1 bg-white/40 rounded-full transition-all duration-100 ease-linear pointer-events-none" 
                  style={{ width: `${(progress / 100) * 48}px` }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white transition-all active:scale-90"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white transition-all active:scale-90"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Slide Counter Overlay for Premium Feel */}
      <div className="absolute top-1/2 -right-12 -translate-y-1/2 rotate-90 hidden lg:block">
        <div className="flex items-center gap-4 text-white/20 font-black tracking-[1em] text-8xl pointer-events-none">
          <span>0{currentSlide + 1}</span>
          <div className="h-1 w-32 bg-white/10" />
          <span>03</span>
        </div>
      </div>
    </section>
  )
}
