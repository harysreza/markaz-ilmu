'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  User,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/shared/page-hero';
import MasjidilHaram from '@/assets/Masjidil haram.jpg';
import type { PublicArticle } from '@/lib/queries';

type Props = {
  articles: PublicArticle[];
  categories: string[];
};

export function ArtikelClientPage({ articles, categories }: Props) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('Semua');

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Semua' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] flex flex-col">
      <div className="relative">
        <PageHero
          title="Perpustakaan Artikel"
          description="Kumpulan artikel pilihan untuk memperdalam pemahaman agama, akhlak, dan manhaj sesuai tuntunan Al-Qur'an dan Sunnah."
          backgroundImage={MasjidilHaram}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-2xl mx-auto group"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-all" />
            <Input
              placeholder="Cari artikel..."
              className="pl-16 h-14 bg-white/95 dark:bg-slate-900/95 text-foreground rounded-xl border-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] focus-visible:ring-8 focus-visible:ring-primary/20 text-xl font-medium transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </PageHero>

        {/* Articles Grid */}
        <section className="relative z-10 container mx-auto px-4 -mt-32 py-16">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col bg-white dark:bg-slate-900/40 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                >
                  <Link
                    href={`/artikel/${article.id}`}
                    className="block relative aspect-[16/10] overflow-hidden"
                  >
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-white/95 dark:bg-slate-900/95 text-primary border-none shadow-xl font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest">
                        {article.category}
                      </Badge>
                    </div>
                  </Link>

                  <div className="p-8 space-y-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-primary" />
                        {new Date(article.date).toLocaleDateString('id-ID', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="h-1 w-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-primary" /> 5 MIN READ
                      </span>
                    </div>

                    <Link
                      href={`/artikel/${article.id}`}
                      className="block group-hover:text-primary transition-colors"
                    >
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="text-muted-foreground line-clamp-3 leading-relaxed font-medium text-sm flex-grow">
                      {article.summary}
                    </p>

                    <div className="pt-6 mt-auto border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 capitalize">
                          {article.author}
                        </span>
                      </div>
                      <Link href={`/artikel/${article.id}`}>
                        <Button
                          variant="ghost"
                          className="h-10 w-10 p-0 rounded-full hover:bg-primary hover:text-white transition-all"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 space-y-6">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                <BookOpen className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                  Tidak ada artikel ditemukan
                </h2>
                <p className="text-muted-foreground text-lg">
                  Coba gunakan kata kunci lain atau pilih kategori yang berbeda.
                </p>
              </div>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                }}
                variant="outline"
                className="rounded-xl border-2 font-bold px-8 h-12"
              >
                Reset Pencarian
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
