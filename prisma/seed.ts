import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create Super Admin
  const hash = await bcrypt.hash("admin123", 12)
  const existing = await prisma.adminUser.findUnique({ where: { email: "admin@markaz-ilmu.com" } })
  if (!existing) {
    await prisma.adminUser.create({
      data: {
        name: "Super Admin",
        email: "admin@markaz-ilmu.com",
        passwordHash: hash,
        role: "super_admin",
        isActive: true,
      },
    })
    console.log("✅ Created super admin: admin@markaz-ilmu.com / admin123")
  }

  // Seed default bank account
  const bankCount = await prisma.bankAccount.count()
  if (bankCount === 0) {
    await prisma.bankAccount.create({
      data: {
        bankName: "Bank Syariah Indonesia (BSI)",
        accountNumber: "1171004514",
        accountName: "CHAERUL ABDILLAH QQ MARKAZ ILMU",
        whatsappNumber: "+6281234567890",
        isActive: true,
      },
    })
    console.log("✅ Created default bank account")
  }

  // Seed default donation campaign
  const campaignCount = await prisma.donationCampaign.count()
  if (campaignCount === 0) {
    await prisma.donationCampaign.create({
      data: {
        title: "Infaq & Sedekah Markaz Ilmu",
        description: "Dukung keberlangsungan dakwah dan pendidikan Islam melalui Markaz Ilmu.",
        status: "active",
      },
    })
    console.log("✅ Created default donation campaign")
  }

  // Seed default site settings
  const settings = [
    { key: "site_title", value: "Markaz Ilmu" },
    { key: "site_tagline", value: "Belajar Islam Sesuai Sunnah" },
    { key: "default_prayer_city", value: "Jakarta" },
    { key: "ramadan_widget_enabled", value: "false" },
    { key: "newsletter_enabled", value: "true" },
    { key: "whatsapp_number", value: "+6281234567890" },
    { key: "youtube_channel", value: "https://youtube.com/@markazilmu" },
    { key: "instagram", value: "https://instagram.com/markazilmu" },
  ]
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    })
  }
  console.log("✅ Seeded default site settings")

  // Seed sample articles
  const articleCount = await prisma.article.count()
  if (articleCount === 0) {
    await prisma.article.createMany({
      data: [
        {
          title: "Pentingnya Menuntut Ilmu Agama",
          slug: "pentingnya-menuntut-ilmu-agama",
          category: "Akidah",
          summary: "Penjelasan mendalam mengenai kewajiban setiap muslim untuk mempelajari agamanya.",
          content: "<p>Menuntut ilmu agama adalah kewajiban bagi setiap Muslim.</p>",
          thumbnail: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
          author: "Ustadz Fulan",
          isTrending: true,
          status: "published",
          publishedAt: new Date(),
        },
        {
          title: "Adab Terhadap Orang Tua",
          slug: "adab-terhadap-orang-tua",
          category: "Akhlak",
          summary: "Kumpulan dalil dan penjelasan mengenai bakti kepada orang tua dalam Islam.",
          content: "<p>Bakti kepada orang tua adalah salah satu amal yang paling utama.</p>",
          thumbnail: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
          author: "Ustadz Budi",
          isTrending: false,
          status: "published",
          publishedAt: new Date(),
        },
      ],
    })
    console.log("✅ Seeded sample articles")
  }

  // Seed sample doa
  const doaCount = await prisma.doaDzikir.count()
  if (doaCount === 0) {
    await prisma.doaDzikir.createMany({
      data: [
        {
          title: "Doa Bangun Tidur",
          category: "Harian",
          arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
          latin: "Alhamdulillahilladzi ahyaanaa ba'da maa amaatanaa wa ilaihin nusyuur",
          translation: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya lah kami dikembalikan.",
          source: "HR. Bukhari No. 6312",
          order: 1,
          status: "published",
        },
        {
          title: "Doa Sebelum Tidur",
          category: "Harian",
          arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
          latin: "Bismikallahumma amuutu wa ahyaa",
          translation: "Dengan nama-Mu ya Allah, aku mati dan aku hidup.",
          source: "HR. Bukhari No. 6312",
          order: 2,
          status: "published",
        },
      ],
    })
    console.log("✅ Seeded sample doa/dzikir")
  }

  // Seed sample Q&A
  const qaCount = await prisma.qA.count()
  if (qaCount === 0) {
    await prisma.qA.createMany({
      data: [
        {
          question: "Apakah hukum sholat bagi yang baru masuk Islam?",
          answer: "Sholat wajib segera ditunaikan setelah seseorang mengucapkan syahadat...",
          category: "Fikih",
          askedBy: "Ahmad",
          answeredBy: "Lajnah Ilmiah Markaz Ilmu",
          status: "published",
          publishedAt: new Date(),
        },
        {
          question: "Bagaimana cara mendidik anak secara Islami?",
          answer: "Pendidikan anak dalam Islam dimulai dari pembiasaan ibadah sejak dini...",
          category: "Akhlak",
          askedBy: "Ummu Abdullah",
          answeredBy: "Lajnah Ilmiah Markaz Ilmu",
          status: "published",
          publishedAt: new Date(),
        },
      ],
    })
    console.log("✅ Seeded sample Q&A")
  }

  console.log("\n🎉 Database seeded successfully!")
  console.log("Login: admin@markaz-ilmu.com / admin123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
