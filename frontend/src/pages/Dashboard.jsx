import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171"];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/dashboard/stats")
      .then(res => setStats(res.data));

    axios.get("http://localhost:3000/books")
      .then(res => {
        const grouped = {};
        res.data.forEach(b => {
          grouped[b.category] = (grouped[b.category] || 0) + 1;
        });

        setChartData(
          Object.entries(grouped).map(([name, value]) => ({
            name,
            value
          }))
        );
      });
  }, []);

  /* =========================
     LOADING STATE
  ========================= */
  if (!stats) {
    return (
      <div className="page-dashboard flex items-center justify-center">
        <p className="text-white/70 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="page-dashboard">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* =========================
           PAGE HEADER
        ========================= */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">
            📊 Dashboard Overview
          </h1>
          <p className="text-white/60 mt-2">
            Library statistics & insights
          </p>
        </div>

        {/* =========================
           STAT CARDS
        ========================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          <StatCard title="Total Books" value={stats.totalBooks} icon="📚" />
          <StatCard title="Total Copies" value={stats.totalCopies} icon="📦" />
          <StatCard title="Categories" value={stats.totalCategories} icon="🗂️" />
        </div>

        {/* =========================
           CHART + INSIGHTS
        ========================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* CHART */}
          <div className="card">
            <h3 className="card-title mb-6">Books by Category</h3>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={120}
                    paddingAngle={4}
                  >
                    {chartData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* INSIGHTS */}
          <div className="card">
            <h3 className="card-title mb-6">Quick Insights</h3>

            <ul className="space-y-5 text-white/80 text-sm">
              <li className="flex items-center gap-3">
                📌 <span>Total categories: <b>{stats.totalCategories}</b></span>
              </li>

              <li className="flex items-center gap-3">
                📦 <span>
                  Avg copies per book:{" "}
                  <b>
                    {(stats.totalCopies / stats.totalBooks).toFixed(1)}
                  </b>
                </span>
              </li>

              <li className="flex items-center gap-3 text-orange-400">
                ⚠️ <span>Monitor low stock books regularly</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}

/* =========================
   STAT CARD COMPONENT
========================= */
function StatCard({ title, value, icon }) {
  return (
    <div className="card text-center">
      <p className="text-white/60 text-sm">{title}</p>
      <p className="text-4xl font-bold text-white mt-3 flex justify-center items-center gap-2">
        <span>{icon}</span> {value}
      </p>
    </div>
  );
}
