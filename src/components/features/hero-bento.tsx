import { Play, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// Data now comes from the database — this component is currently unused

export function HeroBento() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nextEvent: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const latestArticle: any = null

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[650px]">
        {/* Main Featured Content (Video/Stream) */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl bg-slate-900 border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"
            alt="Kajian Utama"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-red-600/90 backdrop-blur-md text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-2 tracking-widest uppercase">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> LIVE
              </span>
              <span className="bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                AKIDAH
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
                Mengenal Rabb Kita: <br /> <span className="text-primary/90">Ushul Tsalatsah</span>
              </h1>
              <p className="text-lg text-white/70 max-w-md leading-relaxed font-medium">
                Kajian rutin mingguan bersama Ustadz Fulan membahas landasan utama seorang muslim.
              </p>
            </div>
            <Button size="lg" className="rounded-xl gap-3 bg-primary hover:bg-primary/90 text-white font-black px-8 h-14 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              <Play className="h-5 w-5 fill-current" /> TONTON SEKARANG
            </Button>
          </div>
        </div>

        {/* Side Card 1: Schedule */}
        <div className="md:col-span-1 md:row-span-1 border border-white/10 rounded-xl p-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md flex flex-col justify-between shadow-xl transition-all hover:border-primary/20">
          <div className="space-y-6">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{nextEvent.date}</p>
              <h3 className="font-black text-xl leading-tight text-slate-900 dark:text-white">{nextEvent.title}</h3>
              <p className="text-sm text-muted-foreground font-medium line-clamp-2 italic opacity-80">{nextEvent.speaker}</p>
            </div>
          </div>
          <Link href="/jadwal-kajian" className="text-xs font-black text-primary flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest pt-4">
            Lihat Poster <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Side Card 2: Latest Article */}
        <div className="md:col-span-1 md:row-span-1 border border-white/10 rounded-xl p-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md flex flex-col justify-between shadow-xl transition-all hover:border-primary/20 group cursor-pointer overflow-hidden">
          <div className="space-y-6">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform duration-500">
              <FileText className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Artikel Terbaru</p>
              <h3 className="font-black text-xl leading-tight text-slate-900 dark:text-white line-clamp-3 group-hover:text-primary transition-colors">{latestArticle.title}</h3>
            </div>
          </div>
          <span className="text-xs font-black text-primary flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest pt-4">
            Baca Artikel <span className="text-lg">→</span>
          </span>
        </div>

        {/* Large Side Card: Programs/Donation */}
        <div className="md:col-span-2 md:row-span-1 border border-white/10 rounded-xl p-8 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent dark:from-primary/20 dark:via-slate-900/40 dark:to-slate-900/20 backdrop-blur-md flex items-center justify-between overflow-hidden relative shadow-2xl">
          <div className="space-y-5 relative z-10 w-full md:w-3/5">
            <div className="space-y-2">
              <h3 className="font-black text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight">Informasi <span className="text-primary">Donasi</span> Dakwah</h3>
              <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
                Bantu operasional dakwah Markaz Ilmu untuk terus menebarkan manfaat 3S: Sunnah, Soft Skill, dan Sahabat.
              </p>
            </div>
            <Button size="lg" className="rounded-xl border-none bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black px-6 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-xl transition-all">
              SALURKAN DONASI
            </Button>
          </div>
          <div className="absolute right-[-5%] top-[-10%] bottom-[-10%] w-2/5 opacity-10 dark:opacity-20 flex items-center justify-center pointer-events-none">
             <div className="h-64 w-64 rounded-full border-[1.5rem] border-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
