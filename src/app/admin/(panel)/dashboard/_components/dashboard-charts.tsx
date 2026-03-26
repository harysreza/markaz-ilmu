"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

const COLORS = ["#4ade80", "#60a5fa", "#f59e0b", "#f87171", "#a78bfa", "#34d399"]

interface DashboardChartsProps {
  categoryData: { name: string; value: number }[]
}

export function DashboardCharts({ categoryData }: DashboardChartsProps) {
  return (
    <div className="bg-background border rounded-xl p-5 h-full">
      <h2 className="font-semibold mb-4">Distribusi Artikel per Kategori</h2>
      {categoryData.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-muted-foreground text-sm">
          Belum ada data artikel yang dipublikasikan
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} artikel`, name]}
              contentStyle={{ borderRadius: "8px", fontSize: "13px" }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              formatter={(value) => <span style={{ fontSize: "13px" }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
