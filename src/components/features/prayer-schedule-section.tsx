"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Sunrise, Sun, Sunset, Moon, CloudSun, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export function PrayerScheduleSection() {
  const [timings, setTimings] = useState<PrayerTimings | null>(null)
  const [location, setLocation] = useState<string>("Jakarta")
  const [loading, setLoading] = useState(true)

  const fetchPrayerTimes = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${lat}&longitude=${lng}&method=11`
      )
      const data = await response.json()
      
      // Reverse geocoding to get real city name
      try {
        const geoResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id`)
        const geoData = await geoResponse.json()
        setLocation(geoData.city || geoData.locality || geoData.principalSubdivision || "Jakarta")
      } catch (geoErr) {
        setLocation(data.data.meta.timezone.split('/')[1]?.replace('_', ' ') || "Jakarta")
      }

      if (data.code === 200) {
        setTimings(data.data.timings)
      }
    } catch (err) {
      console.error("Failed to fetch prayer times", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchPrayerTimes(position.coords.latitude, position.coords.longitude),
        () => fetchPrayerTimes(-6.2088, 106.8456)
      )
    } else {
      fetchPrayerTimes(-6.2088, 106.8456)
    }
  }, [])

  const prayerItems = timings ? [
    { name: "Subuh", time: timings.Fajr, icon: <Sunrise className="h-4 w-4" />, color: "text-blue-500" },
    { name: "Dzuhur", time: timings.Dhuhr, icon: <Sun className="h-4 w-4" />, color: "text-amber-500" },
    { name: "Ashar", time: timings.Asr, icon: <CloudSun className="h-4 w-4" />, color: "text-emerald-500" },
    { name: "Maghrib", time: timings.Maghrib, icon: <Sunset className="h-4 w-4" />, color: "text-rose-500" },
    { name: "Isya", time: timings.Isha, icon: <Moon className="h-4 w-4" />, color: "text-indigo-500" },
  ] : []

  return (
    <section className="container mx-auto px-4 py-8 lg:py-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-slate-50 dark:bg-white/5 rounded-2xl p-8 md:p-12 border border-slate-100 dark:border-white/5">
        
        {/* Left: Info */}
        <div className="space-y-4 text-center lg:text-left shrink-0">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <MapPin className="h-3 w-3" />
            {location}
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
            Jadwal <span className="text-primary">Sholat</span>
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            Waktu ibadah hari ini
          </p>
        </div>

        {/* Center: Times */}
        <div className="flex-1 w-full overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
          <div className="flex items-center justify-center lg:justify-end gap-8 md:gap-12 min-w-max px-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-16 h-12 animate-pulse bg-slate-200 dark:bg-white/10 rounded-xl" />
              ))
            ) : (
              prayerItems.map((item, index) => (
                <div key={item.name} className="flex flex-col items-center gap-2 group">
                  <span className="text-[16px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                  <span className="text-xl md:text-[36px] font-black text-slate-900 dark:text-white tracking-tighter">
                    {item.time}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Action */}
        <Link href="/jadwal-sholat" className="shrink-0">
          <Button variant="ghost" className="h-12 w-12 rounded-full border border-slate-200 dark:border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all p-0">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
