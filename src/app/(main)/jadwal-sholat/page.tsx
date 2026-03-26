import type { Metadata } from "next"
import { JadwalSholatClientPage } from "./_components/JadwalSholatClientPage"

export const metadata: Metadata = {
  title: "Jadwal Sholat",
  description:
    "Waktu ibadah berdasarkan lokasi Anda saat ini atau pilih lokasi manual.",
}

export default function JadwalSholatPage() {
  return <JadwalSholatClientPage />
}
