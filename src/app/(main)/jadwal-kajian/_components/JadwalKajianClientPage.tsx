'use client';

import { useState } from 'react';
import {
  MapPin,
  User,
  Video,
  Clock,
  Share2,
  ExternalLink,
  X,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import PosterImage from '@/assets/poster-1.jpeg';
import HeroImage from '@/assets/Kitab.jpg';
import { KeutamaanSection } from '@/components/shared/keutamaan-section';
import { PageHero } from '@/components/shared/page-hero';
import type { PublicEvent } from '@/lib/queries';

type Event = PublicEvent;

type Props = {
  events: Event[];
};

export function JadwalKajianClientPage({ events }: Props) {
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="relative">
          <PageHero
            title="Jadwal Kajian"
            description="Daftar agenda kajian rutin dan spesial yang diselenggarakan oleh Markaz Ilmu. Tetapkan pengingat agar tidak terlewatkan."
            backgroundImage={HeroImage}
          />

          {/* Content Section */}
          <div className="relative z-10 py-16 px-4">
            <div className="max-w-6xl mx-auto space-y-16">
              {/* List of Events */}
              {events.length > 0 ? (
                <div className="grid grid-cols-1 gap-12">
                  <AnimatePresence>
                    {events.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch group">
                          {/* Left: Interactive Poster Card */}
                          <div
                            className="lg:col-span-5 relative cursor-zoom-in"
                            onClick={() =>
                              setSelectedPoster(
                                (PosterImage as unknown as { src: string })
                                  .src ?? String(PosterImage)
                              )
                            }
                          >
                            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/5 ring-1 ring-black/5 bg-slate-900">
                              <Image
                                src={PosterImage}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                sizes="(max-width: 1024px) 100vw, 42vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                              {/* Floating Badge - High Contrast */}
                              <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                                <Badge className="bg-slate-900 dark:bg-slate-900/90 text-white border border-white/20 px-4 py-2 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-2xl md:backdrop-blur-md w-fit ring-1 ring-white/10">
                                  {event.isOnline ? (
                                    <span className="flex items-center gap-2">
                                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                      Online &amp; Offline
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-2">
                                      <span className="w-2 h-2 bg-amber-500 rounded-full" />
                                      Offline (Masjid)
                                    </span>
                                  )}
                                </Badge>
                              </div>
                            </div>

                            {/* Event Date Bubble */}
                            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col items-center justify-center border-4 border-background z-20 group-hover:scale-110 transition-transform duration-500">
                              <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">
                                Januari
                              </span>
                              <span className="text-4xl font-black text-slate-900 dark:text-white leading-none">
                                28
                              </span>
                              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mt-1">
                                2026
                              </span>
                            </div>
                          </div>

                          {/* Right: Info Content */}
                          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 py-4 px-2">
                            <div className="space-y-6">
                              <div className="space-y-3">
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
                                  {event.title}
                                </h2>
                                <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary/20 pl-4">
                                  {event.description}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 md:bg-white/40 md:dark:bg-slate-900/40 md:backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-white/5">
                                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <User className="h-5 w-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[8px] font-black text-primary/60 uppercase tracking-widest mb-0.5">
                                      Pemateri
                                    </p>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                      {event.speaker}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 md:bg-white/40 md:dark:bg-slate-900/40 md:backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-white/5">
                                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <MapPin className="h-5 w-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[8px] font-black text-primary/60 uppercase tracking-widest mb-0.5">
                                      Lokasi
                                    </p>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                      {event.location}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 md:bg-white/40 md:dark:bg-slate-900/40 md:backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-white/5">
                                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Clock className="h-5 w-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[8px] font-black text-primary/60 uppercase tracking-widest mb-0.5">
                                      Waktu
                                    </p>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                      {event.time}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 md:bg-white/40 md:dark:bg-slate-900/40 md:backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-white/5">
                                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Video className="h-5 w-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[8px] font-black text-primary/60 uppercase tracking-widest mb-0.5">
                                      Streaming
                                    </p>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                      Zoom &amp; YouTube
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                              {event.registrationUrl ? (
                                <a
                                  href={event.registrationUrl ?? '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button className="rounded-2xl h-14 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-xl shadow-emerald-500/20 border-none">
                                    <ExternalLink className="mr-2 h-4 w-4" />{' '}
                                    Daftar Kajian
                                  </Button>
                                </a>
                              ) : (
                                <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-6 py-4 rounded-2xl border border-emerald-500/20 shadow-inner">
                                  <div className="h-2 w-2 bg-emerald-500 rounded-full" />
                                  <span className="font-black uppercase tracking-widest text-[10px]">
                                    Gratis &amp; Terbuka Untuk Umum
                                  </span>
                                </div>
                              )}
                              <Button
                                variant="outline"
                                className="rounded-2xl h-14 w-14 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all"
                              >
                                <Share2 className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        {index !== events.length - 1 && (
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent mt-20" />
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-8"
                >
                  <div className="relative inline-flex h-32 w-32 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-700 mx-auto">
                    <Calendar className="h-16 w-16" />
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl animate-pulse" />
                  </div>
                  <div className="space-y-3 max-w-md mx-auto">
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      Belum Ada Jadwal
                    </h3>
                    <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                      Saat ini belum ada jadwal kajian terdekat. Silakan pantau
                      terus halaman ini atau ikuti media sosial kami untuk
                      informasi jadwal kajian terbaru.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button
                      variant="outline"
                      className="rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] px-8 h-14 hover:bg-primary/5"
                    >
                      Kembali ke Beranda
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Pagination/Load More Placeholder */}
              {events.length > 0 && (
                <div className="text-center pt-16">
                  <Button
                    variant="ghost"
                    className="text-primary font-black uppercase tracking-[0.4em] text-[10px] hover:bg-primary/5 px-12 py-8 rounded-3xl border-2 border-dashed border-primary/20"
                  >
                    Lihat Jadwal Sebelumnya
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <KeutamaanSection
          quote="Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya."
          source="HR. Bukhari"
          subtitle="Sahih al-Bukhari"
        />
      </div>

      {/* Poster Preview Modal */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
            onClick={() => setSelectedPoster(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20 rounded-full h-10 w-10 ring-1 ring-white/20"
                onClick={() => setSelectedPoster(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPoster}
                  alt="Poster Preview"
                  className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                />
              </div>
              <div className="mt-4 flex justify-between items-center text-white/60">
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                  Poster Preview • Markaz Ilmu
                </p>
                <Button
                  variant="link"
                  className="text-primary text-[10px] font-black uppercase tracking-[0.2em] p-0"
                  onClick={() =>
                    selectedPoster
                      ? window.open(selectedPoster, '_blank')
                      : undefined
                  }
                >
                  Buka di Tab Baru →
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
