import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Plus, ArrowRight, BarChart3, Shield } from 'lucide-react';

const portfolioHistory = [
  { month: 'Jan', value: 820000 }, { month: 'Feb', value: 855000 }, { month: 'Mar', value: 838000 },
  { month: 'Apr', value: 910000 }, { month: 'May', value: 965000 }, { month: 'Jun', value: 1042500 },
];

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 120, price: 189.50, change: +2.34, changePct: +1.25, value: 22740, allocation: 21.8, color: '#3B82F6' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 85, price: 415.20, change: -3.10, changePct: -0.74, value: 35292, allocation: 33.8, color: '#8B5CF6' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 40, price: 178.60, change: +1.80, changePct: +1.02, value: 7144, allocation: 6.8, color: '#10B981' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 60, price: 128.40, change: +5.20, changePct: +4.22, value: 7704, allocation: 7.4, color: '#F59E0B' },
  { symbol: 'AMZN', name: 'Amazon.com', shares: 55, price: 198.70, change: -1.50, changePct: -0.75, value: 10928, allocation: 10.5, color: '#EF4444' },
  { symbol: 'VOO', name: 'Vanguard S&P 500', shares: 35, price: 517.30, change: +4.10, changePct: +0.80, value: 18105, allocation: 17.4, color: '#06B6D4' },
  { symbol: '401K', name: 'Vanguard 401(k)', shares: null, price: null, change: +680, changePct: +2.10, value: 842000, allocation: 2.3, color: '#64748B' },
];

const tabs = ['Overview', 'Holdings', 'Performance', 'Dividends'];

export default function Investments() {
  const [tab, setTab] = useState('Overview');

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Investments</h1>
          <p className="text-slate-500 mt-0.5">Your portfolio performance and holdings</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm shadow-blue-500/20">
          <Plus size={16} /> Invest Now
        </button>
      </div>

      {/* Portfolio hero */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/20 to-transparent" />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Total Portfolio Value</p>
            <h2 className="text-5xl font-bold tracking-tight mb-2">$1,042,500</h2>
            <div className="flex items-center gap-2 mb-6">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold text-sm">
                <TrendingUp size={14} /> +$222,500 (27.1%)
              </span>
              <span className="text-slate-500 text-xs">All time</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-slate-400 text-xs mb-1">Today's Gain</p>
                <p className="text-emerald-400 font-bold text-lg">+$8,240</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-slate-400 text-xs mb-1">Annual Return</p>
                <p className="text-emerald-400 font-bold text-lg">+18.4%</p>
              </div>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioHistory}>
                <defs>
                  <linearGradient id="investGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: 'rgba(15,23,42,0.9)', color: '#fff' }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Value']} />
                <Area type="monotone" dataKey="value" stroke="#818CF8" strokeWidth={2.5} fill="url(#investGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{t}</button>
        ))}
      </div>

      {/* Holdings table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">Holdings</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {holdings.slice(0, 6).map((h, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: h.color }}>
                {h.symbol.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900">{h.symbol}</p>
                <p className="text-xs text-slate-400 truncate">{h.name}</p>
              </div>
              {h.shares && <p className="text-sm text-slate-500 hidden lg:block">{h.shares} shares</p>}
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">${h.value.toLocaleString()}</p>
                <p className={`text-xs font-semibold flex items-center gap-0.5 justify-end ${h.changePct >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {h.changePct >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {h.changePct >= 0 ? '+' : ''}{h.changePct}%
                </p>
              </div>
              <div className="w-24 hidden lg:block">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">{h.allocation}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${Math.min(h.allocation * 3, 100)}%`, backgroundColor: h.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-slate-100">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View all holdings <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
