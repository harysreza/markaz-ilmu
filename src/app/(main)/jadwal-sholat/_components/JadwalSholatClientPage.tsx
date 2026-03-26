"use client"

import { useState, useEffect } from "react"
import {
  Clock,
  Navigation,
  Info,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  CloudSun,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHero } from "@/components/shared/page-hero"
import SholatImg from "@/assets/Sholat.jpg"
import { motion } from "framer-motion"

interface PrayerTimings {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
  Imsak: string
}

interface LocationData {
  city: string
  country: string
  latitude: number
  longitude: number
}

export function JadwalSholatClientPage() {
  const [timings, setTimings] = useState<PrayerTimings | null>(null)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState(new Date())
  const [searchCity, setSearchCity] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null)

  // Logic to find next prayer
  useEffect(() => {
    if (!timings) return

    const now = new Date()
    const currentTimeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

    const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
    const found = prayerOrder.find((p) => (timings as unknown as Record<string, string>)[p] > currentTimeStr)

    if (found) {
      setNextPrayer({
        name: found === "Fajr" ? "Subuh" : found,
        time: (timings as unknown as Record<string, string>)[found],
      })
    } else {
      setNextPrayer({ name: "Subuh (Besok)", time: timings.Fajr })
    }
  }, [timings])

  const fetchPrayerTimes = async (lat: number, lng: number, cityName?: string) => {
    try {
      setLoading(true)
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${lat}&longitude=${lng}&method=11`,
      )
      const data = await response.json()

      if (data.code === 200) {
        setTimings(data.data.timings)
        let cityNameResult = cityName
        if (!cityNameResult) {
          try {
            const geoResponse = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id`,
            )
            const geoData = await geoResponse.json()
            cityNameResult = geoData.city || geoData.locality || geoData.principalSubdivision
          } catch (e) {
            cityNameResult = data.data.meta.timezone.split("/")[1]?.replace("_", " ")
          }
        }

        setLocation({
          city: cityNameResult || "Lokasi Anda",
          country: "Indonesia",
          latitude: lat,
          longitude: lng,
        })
        setError(null)
      } else {
        setError("Gagal mengambil jadwal sholat.")
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi.")
    } finally {
      setLoading(false)
    }
  }

  const fetchPrayerTimesByCity = async (city: string) => {
    try {
      setLoading(true)
      setIsSearching(true)
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${Math.floor(Date.now() / 1000)}?city=${city}&country=Indonesia&method=11`,
      )
      const data = await response.json()

      if (data.code === 200) {
        setTimings(data.data.timings)
        setLocation({
          city: city,
          country: "Indonesia",
          latitude: parseFloat(data.data.meta.latitude),
          longitude: parseFloat(data.data.meta.longitude),
        })
        setError(null)
        setSearchCity("")
      } else {
        setError(`Jadwal untuk kota "${city}" tidak ditemukan.`)
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi.")
    } finally {
      setLoading(false)
      setIsSearching(false)
    }
  }

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude)
        },
        (err) => {
          console.error(err)
          // Fallback to Jakarta
          fetchPrayerTimes(-6.2088, 106.8456)
          setError("Izin lokasi ditolak. Menampilkan jadwal untuk Jakarta.")
        },
      )
    } else {
      // Fallback to Jakarta
      fetchPrayerTimes(-6.2088, 106.8456)
      setError("Geolokasi tidak didukung oleh browser Anda. Menampilkan jadwal untuk Jakarta.")
    }
  }

  useEffect(() => {
    handleGetLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prayerItems = timings
    ? [
        {
          name: "Imsak",
          time: timings.Imsak,
          icon: <Clock className="h-5 w-5" />,
          color: "text-slate-500",
        },
        {
          name: "Subuh",
          time: timings.Fajr,
          icon: <Sunrise className="h-5 w-5" />,
          color: "text-blue-500",
        },
        {
          name: "Terbit",
          time: timings.Sunrise,
          icon: <Sun className="h-5 w-5" />,
          color: "text-orange-400",
        },
        {
          name: "Dzuhur",
          time: timings.Dhuhr,
          icon: <Sun className="h-5 w-5" />,
          color: "text-amber-500",
        },
        {
          name: "Ashar",
          time: timings.Asr,
          icon: <CloudSun className="h-5 w-5" />,
          color: "text-emerald-500",
        },
        {
          name: "Maghrib",
          time: timings.Maghrib,
          icon: <Sunset className="h-5 w-5" />,
          color: "text-rose-500",
        },
        {
          name: "Isya",
          time: timings.Isha,
          icon: <Moon className="h-5 w-5" />,
          color: "text-indigo-500",
        },
      ]
    : []

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <PageHero
        title="Jadwal Sholat"
        description="Waktu ibadah berdasarkan lokasi Anda saat ini atau pilih lokasi manual."
        backgroundImage={SholatImg}
      />

      <div className="relative z-10 w-full container mx-auto px-4 -mt-24 pb-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto space-y-24"
        >
          {/* Main Header / Status Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] capitalize">
                  {loading && !isSearching ? "Mencari..." : location?.city || "Jakarta"}
                </h1>
                <p className="text-xl md:text-3xl text-muted-foreground font-medium">
                  {date.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="h-16 px-10 rounded-2xl bg-slate-100 dark:bg-white/5 text-primary hover:bg-primary hover:text-white transition-all font-black uppercase tracking-widest gap-3 border border-primary/20 hover:border-primary shadow-sm"
                  onClick={handleGetLocation}
                  disabled={loading}
                >
                  <Navigation className="h-5 w-5 fill-current" />
                  Gunakan GPS
                </Button>

                <div className="relative group w-full sm:w-80">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      searchCity && fetchPrayerTimesByCity(searchCity)
                    }}
                  >
                    <Input
                      placeholder="Pilih Kota..."
                      className="h-16 pl-5 bg-white/70 dark:bg-slate-900/70 border-none rounded-2xl text-lg backdrop-blur-xl focus:ring-primary/20 transition-all outline-none"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </div>

            {/* Next Prayer Highlight */}
            <div className="relative group flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[1.4/1] flex items-center justify-center">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />

                {/* Ornamen Puncak Kubah (Crescent & Poles) */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className="relative flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-1">
                    <Moon className="h-6 w-6 text-primary fill-primary rotate-[-15deg] mb-0.5 drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                    <div className="flex flex-col items-center -space-y-0.5">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/20" />
                      <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-lg shadow-primary/20" />
                      <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/20" />
                    </div>
                    <div className="w-0.5 h-8 bg-gradient-to-t from-primary/50 to-primary" />
                  </div>
                </div>

                {/* Main Dome Card using SVG for exact shape and border */}
                <div className="absolute inset-0 drop-shadow-2xl">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M50,0 C38,12 0,25 0,50 L0,96 Q0,100 4,100 L96,100 Q100,100 100,96 L100,50 C100,25 62,12 50,0 Z"
                      fill="currentColor"
                      className="text-white/80 dark:text-slate-900/70 backdrop-blur-3xl"
                    />
                    <path
                      d="M50,0 C38,12 0,25 0,50 L0,96 Q0,100 4,100 L96,100 Q100,100 100,96 L100,50 C100,25 62,12 50,0 Z"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-slate-200 dark:text-white/10"
                    />

                    {/* Interior Decorative Arches */}
                    <path
                      d="M50,15 C42,25 12,35 12,55 L12,100 M50,25 C46,32 22,40 22,55 L22,100"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-primary/50 opacity-20"
                    />
                    <path
                      d="M50,15 C58,25 88,35 88,55 L88,100 M50,25 C54,32 78,40 78,55 L78,100"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-primary/50 opacity-20"
                    />
                  </svg>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full px-10 text-center space-y-4 pt-20">
                  <div className="space-y-0 text-center">
                    <p className="text-[10px] md:text-sm font-black text-primary uppercase tracking-[0.5em] mb-2 md:mb-4">
                      Sholat Berikutnya
                    </p>
                    <h3 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                      {nextPrayer?.time || "--:--"}
                    </h3>
                    <p className="text-lg md:text-xl text-muted-foreground font-medium capitalize mt-1 md:mt-2">
                      {nextPrayer?.name || "Memuat..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prayer Schedule - Separator Based Layout */}
          <div className="flex flex-wrap lg:flex-nowrap items-stretch justify-center gap-y-12 py-20 border-y border-slate-200 dark:border-white/5 mx-auto max-w-7xl">
            {loading && !timings ? (
              Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[120px] h-32 animate-pulse bg-slate-100 dark:bg-white/5 mx-4 rounded-2xl"
                />
              ))
            ) : (
              prayerItems.map((item, index) => {
                const isNext =
                  nextPrayer?.name === item.name ||
                  (nextPrayer?.name === "Subuh" && item.name === "Subuh")
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex-1 min-w-[140px] md:min-w-[160px] group"
                  >
                    {/* Vertical Separator for Desktop */}
                    {index < prayerItems.length - 1 && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-32 w-px bg-slate-200 dark:bg-white/5 hidden lg:block" />
                    )}

                    <div
                      className={`relative flex flex-col items-center gap-6 p-6 transition-all duration-500
                        ${isNext ? "scale-110 z-10" : "opacity-80 hover:opacity-100 hover:scale-105"}`}
                    >
                      <div
                        className={`p-4 rounded-2xl bg-slate-50 dark:bg-white/5 ${item.color} transition-all duration-500 shadow-sm group-hover:shadow-md ${isNext ? "shadow-primary/20 ring-2 ring-primary/20" : ""}`}
                      >
                        {item.icon}
                      </div>

                      <div className="text-center space-y-2">
                        <p
                          className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors
                          ${isNext ? "text-primary" : "text-slate-600 dark:text-slate-400 group-hover:text-primary"}`}
                        >
                          {item.name}
                        </p>
                        <p
                          className={`text-3xl md:text-4xl font-black tracking-tighter transition-all
                          ${isNext ? "text-slate-900 dark:text-white" : "text-slate-900 dark:text-white"}`}
                        >
                          {item.time}
                        </p>
                      </div>

                      {isNext && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white/5 text-[8px] font-black uppercase tracking-[0.2em] shadow-lg text-primary">
                          Sekarang
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>

          {/* Additional Info Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4">
            <div className="flex items-center gap-4 text-slate-400">
              <Info className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Metode Kemenag RI</p>
            </div>
            <div className="flex items-center gap-8 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <span>Indonesia</span>
              <span>•</span>
              <span>UTC +07:00</span>
              <span>•</span>
              <span className="text-primary/60">Aktif</span>
            </div>
          </div>
        </motion.div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl bg-red-500 text-white font-bold shadow-2xl flex items-center gap-4"
        >
          <Info className="h-5 w-5" />
          {error}
          <button onClick={() => setError(null)} className="ml-4 opacity-50 hover:opacity-100">
            ✕
          </button>
        </motion.div>
      )}
    </div>
  )
}
