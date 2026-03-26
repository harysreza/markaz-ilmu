"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

const COLORS = ["#4ade80","#60a5fa","#f59e0b","#f87171","#a78bfa","#34d399","#fb923c"]

interface Props {
  categoryData: { name: string; value: number }[]
  statusData: { name: string; value: number }[]
  summary: { label: string; value: number }[]
}

const statusLabels: Record<string, string> = { published: "Dipublikasikan", draft: "Draft", archived: "Diarsip" }

export function LaporanCharts({ categoryData, statusData, summary }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Laporan & Analitik</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Ringkasan data platform Markaz Ilmu</p>
      </div>

      {/* Summary grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {summary.map((item, i) => (
          <div key={item.label} className="bg-background border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: COLORS[i % COLORS.length] }}>{item.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category bar chart */}
        <div className="bg-background border rounded-xl p-5">
          <h2 className="font-semibold mb-4">Artikel per Kategori</h2>
          {categoryData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">Belum ada data</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => [`${v} artikel`]} contentStyle={{ borderRadius: "8px", fontSize: "13px" }} />
                <Bar dataKey="value" fill="#4ade80" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Status pie chart */}
        <div className="bg-background border rounded-xl p-5">
          <h2 className="font-semibold mb-4">Status Artikel</h2>
          {statusData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">Belum ada data</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusData.map(s => ({ ...s, name: statusLabels[s.name] ?? s.name }))} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v, name) => [`${v} artikel`, name]} contentStyle={{ borderRadius: "8px", fontSize: "13px" }} />
                <Legend iconSize={10} formatter={(v) => <span style={{ fontSize: "13px" }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}
