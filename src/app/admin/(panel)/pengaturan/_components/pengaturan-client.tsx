"use client"

import { useState } from "react"
import { Save, Globe, Share2, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function PengaturanClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState("umum")

  function set(key: string, value: string) {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    await fetch("/api/admin/pengaturan", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs = [
    { key: "umum", label: "Umum", icon: Globe },
    { key: "sosial", label: "Media Sosial", icon: Share2 },
    { key: "fitur", label: "Fitur", icon: Bell },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pengaturan Situs</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Konfigurasi global platform Markaz Ilmu</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-1" />
          {saved ? "Tersimpan!" : saving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>

      <div className="flex gap-1 bg-muted/50 rounded-lg p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === tab.key ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-background border rounded-xl p-6">
        {activeTab === "umum" && (
          <div className="flex flex-col gap-5 max-w-lg">
            <h2 className="font-semibold">Informasi Situs</h2>
            <div className="flex flex-col gap-1.5">
              <Label>Nama Situs</Label>
              <Input value={settings.site_title ?? ""} onChange={e => set("site_title", e.target.value)} placeholder="Markaz Ilmu" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Tagline</Label>
              <Input value={settings.site_tagline ?? ""} onChange={e => set("site_tagline", e.target.value)} placeholder="Belajar Islam Sesuai Sunnah" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Nomor WhatsApp</Label>
              <Input value={settings.whatsapp_number ?? ""} onChange={e => set("whatsapp_number", e.target.value)} placeholder="+6281234567890" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Kota Default Jadwal Sholat</Label>
              <Input value={settings.default_prayer_city ?? ""} onChange={e => set("default_prayer_city", e.target.value)} placeholder="Jakarta" />
              <p className="text-xs text-muted-foreground">Digunakan sebagai fallback ketika lokasi pengguna tidak tersedia</p>
            </div>
          </div>
        )}

        {activeTab === "sosial" && (
          <div className="flex flex-col gap-5 max-w-lg">
            <h2 className="font-semibold">Link Media Sosial</h2>
            {[
              { key: "youtube_channel", label: "YouTube Channel", placeholder: "https://youtube.com/@markazilmu" },
              { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/markazilmu" },
              { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/markazilmu" },
              { key: "telegram", label: "Telegram", placeholder: "https://t.me/markazilmu" },
              { key: "spotify_show", label: "Spotify Show", placeholder: "https://open.spotify.com/show/..." },
            ].map(field => (
              <div key={field.key} className="flex flex-col gap-1.5">
                <Label>{field.label}</Label>
                <Input value={settings[field.key] ?? ""} onChange={e => set(field.key, e.target.value)} placeholder={field.placeholder} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "fitur" && (
          <div className="flex flex-col gap-5 max-w-lg">
            <h2 className="font-semibold">Konfigurasi Fitur</h2>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-sm">Widget Ramadan</p>
                <p className="text-xs text-muted-foreground">Tampilkan floating widget hitung mundur Ramadan</p>
              </div>
              <Switch
                checked={settings.ramadan_widget_enabled === "true"}
                onCheckedChange={v => set("ramadan_widget_enabled", v ? "true" : "false")}
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-sm">Newsletter</p>
                <p className="text-xs text-muted-foreground">Tampilkan form newsletter di halaman artikel</p>
              </div>
              <Switch
                checked={settings.newsletter_enabled === "true"}
                onCheckedChange={v => set("newsletter_enabled", v ? "true" : "false")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
