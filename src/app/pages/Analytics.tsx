import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Calendar } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', income: 14500, expenses: 8200, savings: 6300 },
  { month: 'Feb', income: 15200, expenses: 7900, savings: 7300 },
  { month: 'Mar', income: 14800, expenses: 8500, savings: 6300 },
  { month: 'Apr', income: 16100, expenses: 8100, savings: 8000 },
  { month: 'May', income: 15900, expenses: 7600, savings: 8300 },
  { month: 'Jun', income: 18400, expenses: 9200, savings: 9200 },
];

const categoryData = [
  { name: 'Housing', value: 2800, color: '#3B82F6' },
  { name: 'Food', value: 920, color: '#F59E0B' },
  { name: 'Transport', value: 285, color: '#10B981' },
  { name: 'Shopping', value: 748, color: '#8B5CF6' },
  { name: 'Travel', value: 960, color: '#06B6D4' },
  { name: 'Health', value: 180, color: '#EF4444' },
  { name: 'Other', value: 307, color: '#94A3B8' },
];

const weeklyTrend = [
  { day: 'Mon', amount: 340 }, { day: 'Tue', amount: 180 }, { day: 'Wed', amount: 520 },
  { day: 'Thu', amount: 290 }, { day: 'Fri', amount: 670 }, { day: 'Sat', amount: 420 }, { day: 'Sun', amount: 150 },
];

const periods = ['7D', '1M', '3M', '6M', '1Y'];

export default function Analytics() {
  const [period, setPeriod] = useState('6M');

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Spending Analytics</h1>
          <p className="text-slate-500 mt-0.5">Deep insights into your financial patterns</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {periods.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${period === p ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Monthly Spend', value: '$8,583', change: '+12%', up: false },
          { label: 'Avg Monthly Income', value: '$15,817', change: '+8%', up: true },
          { label: 'Savings Rate', value: '45.8%', change: '+3.2pp', up: true },
          { label: 'Largest Category', value: 'Housing', change: '$2,800/mo', up: null },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-500 font-medium mb-2">{k.label}</p>
            <p className="text-xl font-bold text-slate-900">{k.value}</p>
            <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${k.up === true ? 'text-emerald-600' : k.up === false ? 'text-red-500' : 'text-slate-400'}`}>
              {k.up === true ? <TrendingUp size={11} /> : k.up === false ? <TrendingDown size={11} /> : null}
              {k.change}
            </p>
          </div>
        ))}
      </div>

      {/* Income vs Expenses */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-slate-900">Income vs Expenses</h3>
            <p className="text-sm text-slate-500 mt-0.5">6-month comparison</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Income</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> Expenses</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> Savings</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
              <Bar dataKey="income" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="expenses" fill="#F87171" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="savings" fill="#34D399" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category breakdown */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5">Spending by Category</h3>
          <div className="flex items-center gap-6">
            <div className="h-40 w-40 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={38} outerRadius={62} paddingAngle={3} dataKey="value">
                    {categoryData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {categoryData.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-xs text-slate-600 flex-1">{c.name}</span>
                  <span className="text-xs font-bold text-slate-900">${c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly trend */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5">Daily Spending This Week</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrend} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="weekGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} tickFormatter={v => `$${v}`} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} formatter={(v: number) => [`$${v}`, 'Spent']} />
                <Area type="monotone" dataKey="amount" stroke="#8B5CF6" strokeWidth={2} fill="url(#weekGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-purple-50 rounded-xl p-3">
              <p className="text-xs text-purple-600 font-medium">Highest day</p>
              <p className="text-base font-bold text-purple-900 mt-0.5">Friday · $670</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3">
              <p className="text-xs text-emerald-600 font-medium">Lowest day</p>
              <p className="text-base font-bold text-emerald-900 mt-0.5">Sunday · $150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
