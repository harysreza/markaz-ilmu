'use client';

import { useState } from 'react';
import {
  Play,
  Clock,
  User,
  Calendar,
  Search,
  Share2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHero } from '@/components/shared/page-hero';
import { motion, AnimatePresence } from 'framer-motion';
import HeroImage from '@/assets/Sholat.jpg';
import type { PublicVideo } from '@/lib/queries';

type VideoItem = PublicVideo;

type Props = {
  videos: VideoItem[];
};

const CATEGORIES = ['Semua', 'Akidah', 'Fikih', 'Akhlak', 'Tafsir', 'Muamalah'];

export function VideoKajianClientPage({ videos }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'Semua' || video.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Group videos by category for a more structured "Series" look
  const featuredVideo = videos[0];

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-white">
      <PageHero
        title="Video Portal"
        description="Mendalami ilmu syar'i melalui rekaman audio visual dari para asatidz."
        backgroundImage={HeroImage}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative max-w-2xl mx-auto group"
        >
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-all" />
          <Input
            placeholder="Cari video kajian..."
            className="pl-16 h-14 bg-white/95 dark:bg-slate-900/95 text-foreground rounded-xl border-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] focus-visible:ring-8 focus-visible:ring-primary/20 text-xl font-medium transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </PageHero>

      <div className="container mx-auto px-4 -mt-32 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Category Filter Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap gap-x-6 gap-y-3 justify-center border-b border-primary/10 pb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative py-2 text-sm font-black uppercase tracking-widest transition-all
                    ${activeCategory === cat ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="cat-underline"
                      className="absolute -bottom-4.5 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Video - Immersive Layout */}
          {!searchQuery && activeCategory === 'Semua' && featuredVideo && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedVideo(featuredVideo)}
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-primary/10 transition-transform duration-700 group-hover:scale-105">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredVideo.thumbnail}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                      <Play className="h-10 w-10 fill-current ml-1" />
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                      Kajian Terpopuler
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
                      {featuredVideo.title}
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium italic border-l-4 border-primary/20 pl-6 leading-relaxed">
                      &quot;Ilmu adalah hiasan bagi pemiliknya di dunia dan
                      akhirat.&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-8 text-sm font-bold text-slate-400">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <span className="text-slate-600 dark:text-slate-300">
                        {featuredVideo.speaker}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{featuredVideo.duration}</span>
                    </div>
                  </div>
                  <Button className="h-16 px-10 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-xs gap-3 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                    Tonton Sekarang <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* List Style for Other Videos */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative py-10 flex flex-col md:flex-row items-center gap-10 border-b border-slate-100 dark:border-white/5 last:border-none hover:bg-slate-50/50 dark:hover:bg-white/5 px-8 rounded-[2rem] transition-all"
                >
                  <div
                    className="relative w-full md:w-64 aspect-video rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
                    onClick={() => setSelectedVideo(video)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnail}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                        {video.category}
                      </span>
                      <span className="text-slate-200 dark:text-slate-800">
                        •
                      </span>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Calendar className="h-3.5 w-3.5" /> {video.date}
                      </div>
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer leading-tight"
                      onClick={() => setSelectedVideo(video)}
                    >
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary/50" />
                        {video.speaker}
                      </div>
                      <span>•</span>
                      <span>{video.views} Dilihat</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full border border-slate-200 dark:border-white/10 text-slate-400 hover:text-primary hover:bg-primary/5"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-32 space-y-3">
              <h3 className="text-2xl md:text-4xl font-black text-slate-200 dark:text-white">
                Materi tidak ditemukan
              </h3>
              <Button
                variant="link"
                className="text-muted-foreground font-bold"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Semua');
                }}
              >
                Kembali ke Katalog Lengkap
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Immersive Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10 bg-slate-950/98 backdrop-blur-3xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full h-full max-w-7xl flex flex-col md:rounded-[3rem] overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-grow bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
                  onClick={() => setSelectedVideo(null)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </div>

              <div className="p-10 md:p-16 bg-slate-950 border-t border-white/5 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                  <div className="space-y-4 max-w-3xl">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                        {selectedVideo.category}
                      </span>
                      <span className="text-white/10">•</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {selectedVideo.date}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                      {selectedVideo.title}
                    </h2>
                    <div className="flex items-center gap-4 text-slate-400">
                      <User className="h-5 w-5 text-primary" />
                      <span className="text-lg font-bold">
                        {selectedVideo.speaker}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <Button className="flex-1 md:flex-none h-16 px-10 rounded-2xl bg-white text-slate-950 font-black uppercase tracking-widest text-xs gap-3">
                      <Share2 className="h-4 w-4" /> Share
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
