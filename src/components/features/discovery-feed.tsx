"use client"

import { useState } from "react"
import { Play, FileText, Headphones, Share2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// Data now comes from the database — this component is currently unused

export function DiscoveryFeed() {
  const [activeType, setActiveType] = useState<string>("all")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredItems: any[] = []

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
            <Play className="h-3 w-3 fill-current" /> Konten Terbaru
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Eksplorasi <span className="text-primary">Ilmu</span></h2>
          <p className="text-lg text-muted-foreground font-medium max-w-xl">Temukan materi kajian terbaru dalam berbagai format media untuk bekal harian Anda.</p>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveType} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-4 w-full md:w-[450px] h-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-1 border border-white/20 dark:border-white/5 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-bold transition-all">Semua</TabsTrigger>
            <TabsTrigger value="text" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-bold transition-all"><FileText className="h-4 w-4" /> <span className="hidden sm:inline">Teks</span></TabsTrigger>
            <TabsTrigger value="video" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-bold transition-all"><Play className="h-4 w-4" /> <span className="hidden sm:inline">Video</span></TabsTrigger>
            <TabsTrigger value="audio" className="gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-bold transition-all"><Headphones className="h-4 w-4" /> <span className="hidden sm:inline">Audio</span></TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <Card key={item.id} className="group overflow-hidden flex flex-col border-white/20 dark:border-white/5 transition-all duration-500 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl hover:shadow-primary/10 rounded-xl">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary/90 text-white border-none backdrop-blur-md px-3 py-1 font-black text-[10px] tracking-widest uppercase shadow-lg">
                  {item.category}
                </Badge>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-slate-950/40 backdrop-blur-[2px]">
                <Button size="icon" className="rounded-full h-14 w-14 shadow-2xl bg-primary text-white scale-90 group-hover:scale-100 transition-transform">
                  {item.type === 'video' ? <Play className="fill-current h-6 w-6" /> : item.type === 'audio' ? <Headphones className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                </Button>
              </div>
            </div>
            
            <CardHeader className="flex-grow space-y-3 p-6">
              <div className="flex items-center gap-2 text-[10px] text-primary/60 font-black uppercase tracking-[0.2em]">
                {item.type === 'video' ? 'Video' : item.type === 'audio' ? 'Audio' : 'Artikel'}
                <span className="h-1 w-1 bg-primary/40 rounded-full" />
                {item.date}
              </div>
              <CardTitle className="leading-tight text-xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 tracking-tight">
                {item.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 text-sm leading-relaxed font-medium opacity-80">
                {item.summary}
              </CardDescription>
            </CardHeader>
            
            <CardFooter className="p-5 pt-0 flex items-center justify-between">
              <span className="text-xs font-semibold">{item.author}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/20">
                <Share2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button variant="outline" size="lg" className="rounded-xl px-10 font-black tracking-widest uppercase text-xs h-14 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20">Lihat Semua Konten</Button>
      </div>
    </section>
  )
}
