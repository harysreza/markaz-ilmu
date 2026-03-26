import { title } from "process";
import MasjidilHaram from "@/assets/Masjidil haram.jpg";

export const KATEGORI_BELAJAR = [
  { title: "Akidah", href: "/kajian/akidah", description: "Mempelajari dasar-dasar keyakinan Islam." },
  { title: "Manhaj", href: "/kajian/manhaj", description: "Memahami jalan pemahaman para sahabat." },
  { title: "Fikih", href: "/kajian/fikih", description: "Tata cara ibadah dan hukum Islam sehari-hari." },
  { title: "Akhlak & Nasihat", href: "/kajian/akhlak", description: "Penyucian jiwa dan adab Islami." },
];

export const PROGRAM_KAMI = [
  { title: "Dauroh", href: "/program/dauroh" },
  { title: "Jadwal Kajian", href: "/jadwal-kajian" },
  { title: "Jadwal Sholat", href: "/jadwal-sholat" },
  { title: "Informasi Donasi", href: "/program/donasi" },
];

export const KONTEN_TERBARU = [
  {
    id: 1,
    title: "Pentingnya Menuntut Ilmu Agama",
    slug: "pentingnya-menuntut-ilmu-agama",
    category: "Akidah",
    type: "video",
    summary: "Penjelasan mendalam mengenai kewajiban setiap muslim untuk mempelajari agamanya.",
    content: `
      <p>Menuntut ilmu agama adalah kewajiban bagi setiap Muslim, baik laki-laki maupun perempuan. Sebagaimana sabda Rasulullah shallallahu 'alaihi wa sallam, "Menuntut ilmu itu wajib atas setiap muslim." (HR. Ibnu Majah).</p>
      <p>Ilmu agama adalah cahaya yang akan membimbing kita dalam menjalani kehidupan di dunia ini agar sesuai dengan syariat Allah Ta'ala. Tanpa ilmu, seseorang akan mudah terjerumus ke dalam kesesatan dan kebid'ahan.</p>
      <h3>Keutamaan Menuntut Ilmu</h3>
      <ul>
        <li>Dimudahkan jalan menuju surga</li>
        <li>Para malaikat meletakkan sayapnya karena rida</li>
        <li>Makhluk di langit dan bumi memohonkan ampun</li>
        <li>Warisan para Nabi</li>
      </ul>
      <p>Oleh karena itu, marilah kita senantiasa meluangkan waktu untuk menghadiri majelis ilmu, membaca buku-buku agama yang terpercaya, dan bertanya kepada para ulama tentang masalah agama yang belum kita ketahui.</p>
    `,
    thumbnail: MasjidilHaram.src,
    date: "2024-03-20",
    author: "Ustadz Fulan",
    isTrending: true,
  },
  {
    id: 2,
    title: "Adab Terhadap Orang Tua",
    slug: "adab-terhadap-orang-tua",
    category: "Akhlak",
    type: "text",
    summary: "Kumpulan dalil dan penjelasan mengenai bakti kepada orang tua dalam Islam.",
    content: `
      <p>Bakti kepada orang tua (birrul walidain) adalah salah satu amal yang paling utama dalam Islam. Allah Ta'ala menyejajarkan perintah beribadah kepada-Nya dengan perintah berbuat baik kepada orang tua.</p>
      <blockquote>"Dan Rabbmu telah memerintahkan supaya kamu jangan menyembah selain Dia dan hendaklah kamu berbuat baik pada ibu bapakmu dengan sebaik-baiknya." (QS. Al-Isra: 23)</blockquote>
      <p>Beberapa adab terhadap orang tua antara lain:</p>
      <ol>
        <li>Berkata-kata dengan lemah lembut dan tidak menyakiti hati mereka.</li>
        <li>Menaati perintah mereka selama tidak bermaksiat kepada Allah.</li>
        <li>Mendoakan kebaikan bagi mereka, baik saat mereka masih hidup maupun setelah wafat.</li>
        <li>Membantu kebutuhan hidup mereka dengan penuh ketulusan.</li>
      </ol>
      <p>Ingatlah bahwa rida Allah terletak pada rida orang tua, dan murka Allah terletak pada murka orang tua. Mari kita hiasi diri kita dengan akhlak yang mulia terhadap kedua orang tua kita.</p>
    `,
    thumbnail: MasjidilHaram.src,
    date: "2024-03-19",
    author: "Ustadz Budi",
    isTrending: false,
  },
  {
    id: 3,
    title: "Dzikir Pagi Petang Sesuai Sunnah",
    category: "Do'a & Dzikir",
    type: "audio",
    summary: "Rekaman audio panduan dzikir pagi dan petang dengan pelafalan yang benar.",
    thumbnail: MasjidilHaram.src,
    date: "2024-03-18",
    author: "Ustadz Ali",
    isTrending: true,
  },
  {
    id: 4,
    title: "Fiqih Shalat Berjamaah",
    category: "Fikih",
    type: "video",
    summary: "Panduan lengkap tata cara dan keutamaan shalat berjamaah di Masjid.",
    thumbnail: MasjidilHaram.src,
    date: "2024-03-17",
    author: "Ustadz Abdullah",
    isTrending: false,
  },
  {
    id: 5,
    title: "Menjaga Lisan di Era Media Sosial",
    slug: "menjaga-lisan-di-era-media-sosial",
    category: "Akhlak",
    type: "text",
    summary: "Bagaimana seorang muslim bersikap bijak dalam berkomentar dan berbagi pesan di dunia maya.",
    content: `
      <p>Di era digital saat ini, lisan kita tidak hanya berupa ucapan yang keluar dari mulut, tetapi juga berupa tulisan yang kita posting atau komentari di media sosial. Islam mengajarkan kita untuk senantiasa menjaga lisan karena setiap kata akan dimintai pertanggungjawaban.</p>
      <p>Rasulullah shallallahu 'alaihi wa sallam bersabda, "Barangsiapa yang beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam." (HR. Bukhari & Muslim).</p>
      <h3>Tips Bijak Bermedia Sosial:</h3>
      <ul>
        <li>Tabayyun (cek ricek) sebelum membagikan informasi.</li>
        <li>Hindari ghibah, fitnah, dan namimah (adu domba) secara online.</li>
        <li>Gunakan kata-kata yang santun dan tidak menyinggung perasaan orang lain.</li>
        <li>Jadikan media sosial sebagai sarana dakwah dan menebar kebaikan.</li>
      </ul>
      <p>Semoga Allah senantiasa membimbing kita untuk menggunakan lisan dan tangan kita hanya untuk perkara yang mendatangkan rida-Nya.</p>
    `,
    thumbnail: MasjidilHaram.src,
    date: "2024-03-16",
    author: "Ustadz Dr. Syafiq Riza Basalamah",
    isTrending: true,
  },
  {
    id: 6,
    title: "Keluarga Tangguh di Atas Sunnah",
    slug: "keluarga-tangguh-di-atas-sunnah",
    category: "Manhaj",
    type: "text",
    summary: "Pondasi utama dalam mendidik anak dan mengelola rumah tangga islami.",
    content: `
      <p>Membangun keluarga yang tangguh di atas sunnah memerlukan perjuangan dan ilmu yang cukup. Keluarga adalah madrasah pertama bagi setiap insan, sehingga peran orang tua sangat vital dalam menanamkan nilai-nilai tauhid dan sunnah sejak dini.</p>
      <p>Beberapa pilar keluarga tangguh antara lain:</p>
      <ol>
        <li>Menjadikan Al-Qur'an dan Sunnah sebagai landasan utama dalam setiap keputusan.</li>
        <li>Adanya komunikasi yang baik antara suami, istri, dan anak-anak.</li>
        <li>Saling menasihati dalam kebenaran dan kesabaran.</li>
        <li>Menjadikan rumah sebagai tempat yang nyaman untuk beribadah.</li>
      </ol>
      <p>Semoga setiap keluarga muslim diberkahi dengan ketenangan (sakinah) dan penuh dengan kasih sayang (mawaddah warahmah) di bawah naungan syariat-Nya.</p>
    `,
    thumbnail: MasjidilHaram.src,
    date: "2024-03-15",
    author: "Ustadz Abu Haidar As-Sundawy",
    isTrending: false,
  },
  {
    id: 7,
    title: "Mulia dengan Manhaj Salaf",
    category: "Manhaj",
    type: "text",
    summary: "Penjelasan prinsip-prinsip dasar menyandarkan pemahaman pada para sahabat Nabi.",
    thumbnail: MasjidilHaram.src,
    date: "2024-03-14",
    author: "Ustadz Yazid bin Abdul Qadir Jawas",
    isTrending: true,
  },
  {
    id: 8,
    title: "Mendidik Anak Sesuai Tuntunan Sunnah",
    category: "Akhlak",
    type: "text",
    summary: "Langkah praktis menanamkan tauhid dan akhlak mulia sejak dini.",
    thumbnail: MasjidilHaram.src,
    date: "2024-03-13",
    author: "Ustadz Dr. Firanda Andirja",
    isTrending: true,
  },
];

export const EBOOKS = [
  {
    id: 1,
    title: "Syarah Ushul Tsalatsah",
    author: "Syaikh Abdul Aziz bin Baz",
    thumbnail: MasjidilHaram.src,
    fileUrl: "#",
    category: "Akidah"
  },
  {
    id: 2,
    title: "Kitab Tauhid",
    author: "Syaikh Muhammad bin Abdul Wahhab",
    thumbnail: MasjidilHaram.src,
    fileUrl: "#",
    category: "Akidah"
  },
  {
    id: 3,
    title: "Riyadhus Shalihin",
    author: "Imam Abu Zakaria Yahya bin Syaraf An-Nawawi",
    thumbnail: MasjidilHaram.src,
    fileUrl: "#",
    category: "Akhlak"
  },
  {
    id: 4,
    title: "Fiqih Shalat Berdasarkan Dalil",
    author: "Ustadz Dr. Firanda Andirja, M.A.",
    thumbnail: MasjidilHaram.src,
    fileUrl: "#",
    category: "Fikih"
  },
  {
    id: 5,
    title: "Bulughul Maram",
    author: "Al-Hafizh Ibnu Hajar Al-Asqalani",
    thumbnail: MasjidilHaram.src,
    fileUrl: "#",
    category: "Hadits"
  },
  {
    id: 6,
    title: "Arba'in Nawawi",
    author: "Imam An-Nawawi",
    thumbnail: MasjidilHaram.src,
    fileUrl: "#",
    category: "Hadits"
  },
];

export const EVENT_KAJIAN = [
  {
    id: 1,
    title: "Fiqih Sholat Berjama'ah (Seri-47)",
    speaker: "Al-Ustadz Abu Umar Andri Maadsa",
    date: "Rabu, 28 Januari 2026",
    time: "18.30 WIB - Selesai",
    location: "Masjid Al-Barokah, Bojongsoang",
    isOnline: true,
    posterUrl: "/src/assets/poster-1.jpeg",
    description: "Kajian spesial membahas Hukum, Kaidah & Tata Cara Sholat Berjama'ah.",
  },
  {
    id: 2,
    title: "Tafsir Al-Qur'an: Surah Al-Fatihah",
    speaker: "Ustadz Dr. Firanda Andirja, M.A.",
    date: "Sabtu, 31 Januari 2026",
    time: "09:00 - 11:00 WIB",
    location: "Masjid Al-Ikhlas, Jakarta",
    isOnline: true,
    posterUrl: "/src/assets/poster-1.jpeg",
    description: "Mendalami makna surat pembuka dalam Al-Qur'an.",
  },
  {
    id: 3,
    title: "Adab Menuntut Ilmu",
    speaker: "Ustadz Abdullah Zaen, M.A.",
    date: "Ahad, 1 Februari 2026",
    time: "Ba'da Maghrib - Selesai",
    location: "Masjid Agung Al-Azhar",
    isOnline: false,
    posterUrl: "/src/assets/poster-1.jpeg",
    description: "Pentingnya adab sebelum ilmu bagi penuntut ilmu syar'i.",
  },
  {
    id: 4,
    title: "Keluarga Sakinah Sesuai Sunnah",
    speaker: "Ustadz Dr. Syafiq Riza Basalamah, M.A.",
    date: "Senin, 2 Februari 2026",
    time: "20:00 WIB - Selesai",
    location: "Online via Zoom & Youtube",
    isOnline: true,
    posterUrl: "/src/assets/poster-1.jpeg",
    description: "Panduan membangun rumah tangga yang harmonis di atas sunnah.",
  },
  {
    id: 5,
    title: "Syarah Kitab Tauhid",
    speaker: "Ustadz Abu Haidar As-Sundawy",
    date: "Selasa, 3 Februari 2026",
    time: "16:00 - 17:30 WIB",
    location: "Masjid Raya Bandung",
    isOnline: true,
    posterUrl: "/src/assets/poster-1.jpeg",
    description: "Membahas landasan utama agama islam yaitu Tauhidullah.",
  },
];

export const LIST_DOA_DZIKIR = [
  {
    id: 1,
    title: "Do'a Bangun Tidur",
    category: "Harian",
    arabic: "اَلْحَمْدُ لِلَّهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ",
    latin: "Alhamdu lillahil-ladhii ahyaanaa ba'da maa amaatanaa wa ilaihin-nushoor.",
    translation: "Segala puji bagi Allah yang menghidupkan kami kembali setelah mematikan kami dan kepada-Nya kami akan dibangkitkan.",
    source: "HR. Bukhari & Muslim",
  },
  {
    id: 2,
    title: "Dzikir Pagi: Ayat Kursi",
    category: "Pagi",
    arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    latin: "Allāhu lā ilāha illā huwal-ḥayyul-qayyūm, lā ta'khużuhu sinatuw wa lā nawm, lahū mā fis-samāwāti wa mā fil-arḍ, man żallażī yashfa'u 'indahū illā bi'iżnih, ya'lamu mā baina aidīhim wa mā khalfahum, wa lā yuḥīṭūna bishai'im min 'ilmihī illā bimā shā', wasi'a kursiyyuhus-samāwāti wal-arḍ, wa lā ya'ūduhū ḥifẓuhumā, wa huwal-'aliyyul-'aẓīm.",
    translation: "Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia Yang Hidup kekal lagi terus-menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafa'at di sisi Allah tanpa izin-Nya? Allah mengetahui apa-apa yang di hadapan mereka dan di belakang mereka, dan mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Allah tidak merasa berat memelihara keduanya, dan Allah Maha Tinggi lagi Maha Besar.",
    source: "HR. Nasai",
  },
  {
    id: 3,
    title: "Do'a Sebelum Makan",
    category: "Harian",
    arabic: "بِسْمِ اللَّهِ",
    latin: "Bismillah.",
    translation: "Dengan menyebut nama Allah.",
    source: "HR. Abu Dawud & Tirmidzi",
  },
  {
    id: 4,
    title: "Do'a Setelah Makan",
    category: "Harian",
    arabic: "اَلْحَمْدُ لِلَّهِ الَّذِيْ أَطْعَمَنِيْ هَذَا وَرَزَقَنِيْهِ مِنْ غَيْرِ حَوْلٍ مِنِّيْ وَلَا قُوَّةٍ",
    latin: "Alhamdu lillahil-ladhii at'amanii hadhaa wa razaqaniihi min ghairi hawlin minnii wa laa quwwah.",
    translation: "Segala puji bagi Allah yang telah memberiku makanan ini dan merezekikannya kepadaku tanpa daya dan kekuatan dariku.",
    source: "HR. Abu Dawud, Tirmidzi & Ibnu Majah",
  },
  {
    id: 5,
    title: "Do'a Masuk Masjid",
    category: "Harian",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    latin: "Allahummaf-tah lii abwaaba rahmatik.",
    translation: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.",
    source: "HR. Muslim",
  },
  {
    id: 6,
    title: "Do'a Keluar Masjid",
    category: "Harian",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Allahumma inni as-aluka min fadhlik.",
    translation: "Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu.",
    source: "HR. Muslim",
  },
  {
    id: 7,
    title: "Do'a Masuk Kamar Mandi",
    category: "Harian",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    latin: "Allahumma inni a'udzubika minal khubutsi wal khaba-its.",
    translation: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari setan laki-laki dan setan perempuan.",
    source: "HR. Bukhari & Muslim",
  },
  {
    id: 8,
    title: "Do'a Keluar Kamar Mandi",
    category: "Harian",
    arabic: "غُفْرَانَكَ",
    latin: "Ghufranaka.",
    translation: "Aku memohon ampunan-Mu.",
    source: "HR. Abu Dawud & Tirmidzi",
  },
  {
    id: 9,
    title: "Do'a Sebelum Tidur",
    category: "Harian",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوْتُ وَأَحْيَا",
    latin: "Bismika Allahumma amuutu wa ahyaa.",
    translation: "Dengan nama-Mu, ya Allah, aku mati dan aku hidup.",
    source: "HR. Bukhari & Muslim",
  },
  {
    id: 10,
    title: "Sayyidul Istighfar",
    category: "Pagi",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    latin: "Allahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa ana 'abduka wa ana 'alaa 'ahdika wa wa'dika mastatha'tu. A'uudzu bika min syarri maa shana'tu, abuu-u laka bini'matika 'alayya wa abuu-u bidzanbii faghfir lii fa-innahu laa yaghfirudz-dzunuuba illaa anta.",
    translation: "Ya Allah, Engkau adalah Rabbku, tidak ada Ilah yang berhak disembah kecuali Engkau, Engkaulah yang menciptakanku. Aku adalah hamba-Mu. Aku akan setia pada perjanjianku dengan-Mu semampuku. Aku berlindung kepada-Mu dari keburukan yang kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, oleh karena itu ampunilah aku. Sesungguhnya tiada yang dapat mengampuni dosa kecuali Engkau.",
    source: "HR. Bukhari",
  },
  {
    id: 11,
    title: "Do'a Mohon Ilmu yang Bermanfaat",
    category: "Pagi",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
    latin: "Allahumma inni as-aluka 'ilman naafi'an...",
    translation: "Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik dan amal yang diterima.",
    source: "HR. Ibnu Majah",
  },
  {
    id: 12,
    title: "Do'a Kebaikan Dunia Akhirat",
    category: "Harian",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbana aatina fid-dunya hasanah...",
    translation: "Ya Rabb kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka.",
    source: "QS. Al-Baqarah: 201",
  },
  {
    id: 13,
    title: "Do'a Memakai Pakaian",
    category: "Harian",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    latin: "Alhamdu lillahil-ladhii kasaanii hadhaa...",
    translation: "Segala puji bagi Allah yang telah memakaikan pakaian ini kepadaku dan memberi rezeki kepadaku tanpa daya dan kekuatan dariku.",
    source: "HR. Abu Dawud & Ibnu Majah",
  },
  {
    id: 14,
    title: "Do'a Melepas Pakaian",
    category: "Harian",
    arabic: "بِسْمِ اللَّهِ",
    latin: "Bismillah.",
    translation: "Dengan menyebut nama Allah.",
    source: "HR. Tirmidzi",
  },
  {
    id: 15,
    title: "Do'a Keluar Rumah",
    category: "Harian",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    latin: "Bismillahi tawakkaltu 'alallaah...",
    translation: "Dengan nama Allah, aku bertawakal kepada Allah, tidak ada daya dan kekuatan kecuali dengan pertolongan Allah.",
    source: "HR. Abu Dawud & Tirmidzi",
  },
  {
    id: 16,
    title: "Do'a Masuk Rumah",
    category: "Harian",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    latin: "Bismillahi walajnaa...",
    translation: "Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan kepada Allah Rabb kami, kami bertawakal.",
    source: "HR. Abu Dawud",
  },
  {
    id: 17,
    title: "Dzikir Setelah Shalat: Istighfar",
    category: "Harian",
    arabic: "أَسْتَغْفِرُ اللَّهَ (٣x) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    latin: "Astaghfirullah (3x), Allahumma Antas Salaamu...",
    translation: "Aku memohon ampunan Allah (3x). Ya Allah, Engkau Mahasejahtera dan dari-Mulah kesejahteraan, Mahasuci Engkau wahai Rabb Pemilik Keagungan dan Kemuliaan.",
    source: "HR. Muslim",
  },
  {
    id: 18,
    title: "Do'a Berbuka Puasa",
    category: "Harian",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    latin: "Dzahabadh-dhoma-u wabtal-latil 'uruuqu...",
    translation: "Telah hilang rasa haus dan urat-urat telah basah, serta pahala telah ditetapkan, insya Allah.",
    source: "HR. Abu Dawud",
  },
  {
    id: 19,
    title: "Do'a Penutup Majelis",
    category: "Harian",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
    latin: "Subhaanaka Allahumma wa bihamdika...",
    translation: "Mahasuci Engkau ya Allah, aku memuji-Mu. Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah kecuali Engkau, aku minta ampun dan bertaubat kepada-Mu.",
    source: "HR. Abu Dawud & Tirmidzi",
  },
  {
    id: 20,
    title: "Do'a Ketika Turun Hujan",
    category: "Harian",
    arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
    latin: "Allahumma shayyiban naafi'an.",
    translation: "Ya Allah, turunkanlah hujan yang bermanfaat.",
    source: "HR. Bukhari",
  },
];

export const VIDEOS_KAJIAN = [
  {
    id: 1,
    title: "Bekal Berqurban dan Dzulhijjah dari Kitab Sunan At-Tirmidziy",
    speaker: "Ustadz Dzulqarnain M. Sunusi",
    duration: "6:18:18",
    category: "Fikih",
    views: "5.4K",
    youtubeId: "dDSbk8G92bk",
    date: "4 Jun 2024",
    thumbnail: "https://img.youtube.com/vi/dDSbk8G92bk/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "Istikamah di atas Akidah Salaf - Akidah Abdullah bin Mubarak",
    speaker: "Ustadz Dzulqarnain M. Sunusi",
    duration: "6:46:20",
    category: "Akidah",
    views: "846",
    youtubeId: "lU0HHPkwVDI",
    date: "20 Jan 2024",
    thumbnail: "https://img.youtube.com/vi/lU0HHPkwVDI/maxresdefault.jpg",
  }
];

export const QA_DATA = [
  {
    id: 1,
    question: "Bagaimana hukumnya sholat sambil menggendong anak kecil?",
    answer: "Dibolehkan menggendong anak saat shalat sebagaimana perbuatan Rasulullah shallallahu 'alaihi wa sallam yang pernah menggendong cucunya, Umamah binti Zainab, saat shalat. Jika beliau berdiri maka beliau menggendongnya, dan jika beliau sujud maka beliau meletakkannya. (HR. Bukhari & Muslim). Dengan catatan, pastikan pakaian dan tubuh anak bersih dari najis.",
    category: "Fikih",
    askedBy: "Hamba Allah",
    answeredBy: "Lajnah Ilmiah Markaz Ilmu",
    date: "25 Jan 2024",
    views: "342",
  },
  {
    id: 2,
    question: "Apakah musik itu haram dalam pandangan empat madzhab?",
    answer: "Ya, mayoritas ulama dari empat madzhab (Hanafi, Maliki, Syafi'i, dan Hambali) bersepakat akan haramnya alat musik. Dalil utama yang sering digunakan adalah firman Allah dalam QS. Luqman ayat 6 tentang 'lahwal hadits' yang ditafsirkan oleh para sahabat seperti Ibnu Abbas dan Ibnu Mas'ud sebagai nyanyian dan alat musik.",
    category: "Akidah",
    askedBy: "Abdullah",
    answeredBy: "Lajnah Ilmiah Markaz Ilmu",
    date: "22 Jan 2024",
    views: "1.2K",
  },
  {
    id: 3,
    question: "Bagaimana cara bertobat dari dosa riba yang sudah terlanjur?",
    answer: "Langkah pertama adalah berhenti total dari transaksi riba tersebut, menyesali perbuatan, dan bertekad kuat untuk tidak mengulanginya. Jika ada kelebihan harta dari bunga riba, maka harta tersebut harus dikeluarkan dan disalurkan untuk kepentingan umum (fasilitas publik) tanpa mengharap pahala sedekah, melainkan sebagai bentuk pembersihan harta.",
    category: "Muamalah",
    askedBy: "Fulanah",
    answeredBy: "Lajnah Ilmiah Markaz Ilmu",
    date: "20 Jan 2024",
    views: "520",
  }
];

export const AUDIOS_SPOTIFY = [
  {
    id: 1,
    title: "Kajian Rutin Markaz Ilmu",
    speaker: "Ustadz Dzulqarnain M. Sunusi",
    category: "Akidah",
    spotifyId: "37i9dQZF1DXcBWIGoYBM3M", // Just a placeholder playlist ID
    type: "playlist",
    date: "Jan 2026",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Kajian Fikih Shalat",
    speaker: "Ustadz Dr. Firanda Andirja",
    category: "Fikih",
    spotifyId: "24IbtL1yC492BFrlqL9G5x", // Placeholder show/episode ID
    type: "show",
    date: "Des 2025",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Tafsir Al-Qur'an Pekanan",
    speaker: "Ustadz Abdullah Zaen",
    category: "Tafsir",
    spotifyId: "6I83xN6W5RCOx3tX0X5z2N", // Placeholder
    type: "episode",
    date: "Nov 2025",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60"
  }
];
