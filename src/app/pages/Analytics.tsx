import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, LineChart, Line
} from 'recharts';
import { TrendingUp, TrendingDown, MessageSquare, Bot, Image, Zap, Clock } from 'lucide-react';

const dailyChats = [
  { date: 'Jul 16', chats: 142, tokens: 48200 },
  { date: 'Jul 17', chats: 198, tokens: 67800 },
  { date: 'Jul 18', chats: 167, tokens: 54300 },
  { date: 'Jul 19', chats: 231, tokens: 82100 },
  { date: 'Jul 20', chats: 289, tokens: 98400 },
  { date: 'Jul 21', chats: 94, tokens: 31200 },
  { date: 'Jul 22', chats: 156, tokens: 52800 },
];

const modelUsage = [
  { model: 'GPT-4o', requests: 1840, color: '#10A37F' },
  { model: 'Claude 3.5', requests: 620, color: '#D97706' },
  { model: 'GPT-4o mini', requests: 412, color: '#059669' },
  { model: 'o1-preview', requests: 88, color: '#7C3AED' },
  { model: 'DALL·E 3', requests: 176, color: '#DB2777' },
];

const responseTime = [
  { time: '6AM', ms: 820 }, { time: '9AM', ms: 1240 }, { time: '12PM', ms: 1680 },
  { time: '3PM', ms: 1420 }, { time: '6PM', ms: 1180 }, { time: '9PM', ms: 940 },
];

const periods = ['7D', '1M', '3M', '6M'];

export default function Analytics() {
  const [period, setPeriod] = useState('7D');

  const totalChats = dailyChats.reduce((s, d) => s + d.chats, 0);
  const totalTokens = dailyChats.reduce((s, d) => s + d.tokens, 0);

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Analytics</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">Understand how you use Conv AI</p>
          </div>
          <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: '#F1F5F9' }}>
            {periods.map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className="px-3 py-1.5 rounded-[9px] text-[12.5px] font-semibold transition-all"
                style={{ background: period === p ? '#fff' : 'transparent', color: period === p ? '#0F172A' : '#94A3B8', boxShadow: period === p ? '0 1px 4px rgba(0,0,0,0.06)' : 'none' }}
              >{p}</button>
            ))}
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Conversations', value: totalChats.toLocaleString(), change: '+18%', up: true, icon: MessageSquare, color: '#2563EB', bg: '#EFF6FF' },
            { label: 'Tokens Used', value: (totalTokens / 1000).toFixed(0) + 'K', change: '+24%', up: true, icon: Zap, color: '#7C3AED', bg: '#F5F3FF' },
            { label: 'Avg Response Time', value: '1.2s', change: '-8%', up: true, icon: Clock, color: '#059669', bg: '#F0FDF4' },
            { label: 'Agent Runs', value: '48', change: '+31%', up: true, icon: Bot, color: '#D97706', bg: '#FFFBEB' },
          ].map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-5 rounded-[18px]"
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: kpi.bg }}>
                    <Icon size={16} style={{ color: kpi.color }} />
                  </div>
                  <span className={`text-[12px] font-bold flex items-center gap-0.5 ${kpi.up ? 'text-emerald-600' : 'text-red-500'}`}>
                    {kpi.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {kpi.change}
                  </span>
                </div>
                <p className="text-[22px] font-bold text-[#0F172A] tracking-[-0.01em]">{kpi.value}</p>
                <p className="text-[12px] text-[#94A3B8] mt-1">{kpi.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Chat activity */}
        <div className="rounded-[20px] p-6" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-[#0F172A]">Conversation Activity</h3>
              <p className="text-[13px] text-[#64748B] mt-0.5">Daily chat volume over the past week</p>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyChats} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="chatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(v: number) => [v, 'Conversations']} />
                <Area type="monotone" dataKey="chats" stroke="#2563EB" strokeWidth={2.5} fill="url(#chatGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Model usage */}
          <div className="rounded-[20px] p-6" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <h3 className="text-[15px] font-bold text-[#0F172A] mb-5">Requests by Model</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelUsage} layout="vertical" margin={{ left: 0, right: 10 }}>
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <YAxis type="category" dataKey="model" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#475569' }} width={80} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} formatter={(v: number) => [v, 'Requests']} />
                  <Bar dataKey="requests" radius={[0, 6, 6, 0]} fill="#2563EB">
                    {modelUsage.map((entry, i) => (
                      <rect key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-3">
              {modelUsage.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: m.color }} />
                  <span className="text-[12px] text-[#64748B] flex-1">{m.model}</span>
                  <span className="text-[12px] font-bold text-[#0F172A]">{m.requests}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Response time */}
          <div className="rounded-[20px] p-6" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <h3 className="text-[15px] font-bold text-[#0F172A] mb-5">Response Time (ms)</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTime} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} formatter={(v: number) => [`${v}ms`, 'Avg Response']} />
                  <Line type="monotone" dataKey="ms" stroke="#7C3AED" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-[12px]" style={{ background: '#F0FDF4' }}>
                <p className="text-[11px] text-emerald-600 font-medium">Fastest</p>
                <p className="text-[15px] font-bold text-emerald-900">820ms</p>
                <p className="text-[11px] text-emerald-600">at 6 AM</p>
              </div>
              <div className="p-3 rounded-[12px]" style={{ background: '#FEF2F2' }}>
                <p className="text-[11px] text-red-500 font-medium">Peak load</p>
                <p className="text-[15px] font-bold text-red-900">1,680ms</p>
                <p className="text-[11px] text-red-500">at 12 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
