'use client';

import dynamic from 'next/dynamic';
import { DynamicHero } from '@/components/features/dynamic-hero';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import TowerImg from '@/assets/Tower.jpg';
import { KeutamaanSection } from '@/components/shared/keutamaan-section';
import type {
  PublicArticle,
  PublicVideo,
  PublicAudio,
  PublicEbook,
} from '@/lib/queries';

const ArticleSections = dynamic(
  () =>
    import('@/components/features/article-sections').then(
      (mod) => mod.ArticleSections
    ),
  {
    loading: () => (
      <div className="h-96 w-full animate-pulse bg-slate-100 dark:bg-slate-900 rounded-[3rem]" />
    ),
  }
);

const EBookDoaSection = dynamic(
  () =>
    import('@/components/features/ebook-doa-section').then(
      (mod) => mod.EBookDoaSection
    ),
  {
    loading: () => (
      <div className="h-96 w-full animate-pulse bg-slate-100 dark:bg-slate-900 rounded-[3rem]" />
    ),
  }
);

const DonationSection = dynamic(
  () =>
    import('@/components/features/donation-section').then(
      (mod) => mod.DonationSection
    ),
  {
    loading: () => (
      <div className="h-96 w-full animate-pulse bg-slate-100 dark:bg-slate-900 rounded-[3rem]" />
    ),
  }
);

const PrayerScheduleSection = dynamic(
  () =>
    import('@/components/features/prayer-schedule-section').then(
      (mod) => mod.PrayerScheduleSection
    ),
  {
    loading: () => (
      <div className="h-96 w-full animate-pulse bg-slate-100 dark:bg-slate-900 rounded-[3rem]" />
    ),
  }
);

// const RamadanFloatingWidget = dynamic(
//   () => import("@/components/shared/ramadan-floating-widget").then((mod) => mod.RamadanFloatingWidget),
//   { ssr: false }
// )

const VideoPortalSection = dynamic(
  () =>
    import('@/components/features/video-portal-section').then(
      (mod) => mod.VideoPortalSection
    ),
  {
    loading: () => (
      <div className="h-screen w-full animate-pulse bg-slate-100 dark:bg-slate-900 rounded-[3rem]" />
    ),
  }
);

const SpotifyPortalSection = dynamic(
  () =>
    import('@/components/features/spotify-portal-section').then(
      (mod) => mod.SpotifyPortalSection
    ),
  {
    loading: () => (
      <div className="h-96 w-full animate-pulse bg-slate-100 dark:bg-slate-900 rounded-[3rem]" />
    ),
  }
);

type Props = {
  articles: PublicArticle[];
  trending: PublicArticle[];
  videos: PublicVideo[];
  audios: PublicAudio[];
  ebooks: PublicEbook[];
};

export function HomeClientPage({
  articles,
  trending,
  videos,
  audios,
  ebooks,
}: Props) {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="relative">
        {/* Unified Background System */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <motion.div
              style={{ y }}
              className="absolute inset-0 h-[120%] -top-[10%]"
            >
              <Image
                src={TowerImg}
                alt="Background Pattern"
                fill
                priority
                className="object-cover opacity-[0.08] dark:opacity-[0.12] grayscale"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent dark:from-primary/10" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          </div>
        </div>

        <div className="relative z-10">
          <DynamicHero />
          {/* <RamadanFloatingWidget /> */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ArticleSections articles={articles} trending={trending} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <VideoPortalSection videos={videos} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <SpotifyPortalSection audios={audios} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <PrayerScheduleSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <EBookDoaSection ebooks={ebooks} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <DonationSection />
          </motion.div>
        </div>
      </div>

      {/* Featured Quote Section */}
      <KeutamaanSection
        quote="Barangsiapa yang menempuh suatu jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan menuju surga."
        source="HR. Muslim no. 2699"
        subtitle="Sahih Muslim"
      />
    </div>
  );
}
