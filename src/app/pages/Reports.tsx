import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { FileText, Download, TrendingUp, TrendingDown, Calendar, ArrowRight } from 'lucide-react';

const annualData = [
  { month: 'Jan', income: 14500, expenses: 8200 },
  { month: 'Feb', income: 15200, expenses: 7900 },
  { month: 'Mar', income: 14800, expenses: 8500 },
  { month: 'Apr', income: 16100, expenses: 8100 },
  { month: 'May', income: 15900, expenses: 7600 },
  { month: 'Jun', income: 18400, expenses: 9200 },
  { month: 'Jul', income: 17200, expenses: 8800 },
];

const netWorth = [
  { month: 'Jan', value: 980000 }, { month: 'Feb', value: 1020000 },
  { month: 'Mar', value: 995000 }, { month: 'Apr', value: 1080000 },
  { month: 'May', value: 1150000 }, { month: 'Jun', value: 1245600 }, { month: 'Jul', value: 1261000 },
];

const reports = [
  { name: 'Q2 2026 Financial Summary', date: 'Jul 1, 2026', type: 'Quarterly', size: '2.4 MB' },
  { name: 'Annual Tax Report 2025', date: 'Jan 31, 2026', type: 'Tax', size: '1.8 MB' },
  { name: 'Investment Performance H1', date: 'Jun 30, 2026', type: 'Investment', size: '3.1 MB' },
  { name: 'Monthly Statement – June', date: 'Jun 30, 2026', type: 'Monthly', size: '0.9 MB' },
  { name: 'Net Worth Report Q2', date: 'Jun 30, 2026', type: 'Quarterly', size: '1.2 MB' },
];

const typeColors: Record<string, string> = {
  Quarterly: 'bg-blue-50 text-blue-700',
  Tax: 'bg-amber-50 text-amber-700',
  Investment: 'bg-emerald-50 text-emerald-700',
  Monthly: 'bg-purple-50 text-purple-700',
};

export default function Reports() {
  const [view, setView] = useState<'overview' | 'reports'>('overview');

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Reports</h1>
          <p className="text-slate-500 mt-0.5">Comprehensive summaries of your financial health</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('overview')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view === 'overview' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}
          >Overview</button>
          <button
            onClick={() => setView('reports')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view === 'reports' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}
          >My Reports</button>
        </div>
      </div>

      {view === 'overview' ? (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'YTD Income', value: '$112,100', change: '+8.4%', up: true },
              { label: 'YTD Expenses', value: '$58,300', change: '+11.2%', up: false },
              { label: 'YTD Savings', value: '$53,800', change: '+5.9%', up: true },
              { label: 'Net Worth Growth', value: '+$281,000', change: '+28.7%', up: true },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium mb-2">{s.label}</p>
                <p className="text-xl font-bold text-slate-900">{s.value}</p>
                <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {s.change} YTD
                </p>
              </div>
            ))}
          </div>

          {/* Income vs Expenses chart */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-slate-900">Income vs Expenses — 2026</h3>
                <p className="text-sm text-slate-500">Year-to-date monthly breakdown</p>
              </div>
              <div className="flex gap-3 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-blue-500 inline-block" /> Income</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-red-400 inline-block" /> Expenses</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={annualData} margin={{ left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} tickFormatter={v => `$${v / 1000}k`} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                  <Bar dataKey="income" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={32} />
                  <Bar dataKey="expenses" fill="#F87171" radius={[4, 4, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Net Worth Chart */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-slate-900">Net Worth Trajectory</h3>
                <p className="text-sm text-slate-500">Jan – Jul 2026</p>
              </div>
              <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                <TrendingUp size={14} /> +28.7% YTD
              </span>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={netWorth} margin={{ left: -10 }}>
                  <defs>
                    <linearGradient id="nwGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} tickFormatter={v => `$${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Net Worth']} />
                  <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2.5} fill="url(#nwGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Generated Reports</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {reports.map((r, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                    <Calendar size={11} /> {r.date} · {r.size}
                  </p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeColors[r.type]}`}>{r.type}</span>
                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
