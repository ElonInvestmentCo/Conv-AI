import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Zap, MessageSquare, Image, Mic, Bot, FileText, ArrowRight, TrendingUp } from 'lucide-react';

const dailyUsage = [
  { day: 'Mon', chat: 142, images: 12, voice: 8 },
  { day: 'Tue', chat: 198, images: 24, voice: 15 },
  { day: 'Wed', chat: 167, images: 8, voice: 6 },
  { day: 'Thu', chat: 231, images: 31, voice: 22 },
  { day: 'Fri', chat: 289, images: 18, voice: 14 },
  { day: 'Sat', chat: 94, images: 45, voice: 5 },
  { day: 'Sun', chat: 72, images: 38, voice: 3 },
];

const monthlyTrend = [
  { month: 'Feb', credits: 42000 },
  { month: 'Mar', credits: 58000 },
  { month: 'Apr', credits: 51000 },
  { month: 'May', credits: 73000 },
  { month: 'Jun', credits: 89000 },
  { month: 'Jul', credits: 64000 },
];

const features = [
  { name: 'AI Chat (GPT-4o)', icon: MessageSquare, color: '#2563EB', bg: '#EFF6FF', used: 1840, limit: null, pct: 0, cost: '0.9 credits/msg' },
  { name: 'Image Generation', icon: Image, color: '#DB2777', bg: '#FDF2F8', used: 176, limit: 500, pct: 35.2, cost: '10 credits/img' },
  { name: 'Voice Mode', icon: Mic, color: '#7C3AED', bg: '#F5F3FF', used: 73, limit: 200, pct: 36.5, cost: '5 credits/min' },
  { name: 'AI Agents', icon: Bot, color: '#059669', bg: '#F0FDF4', used: 48, limit: 100, pct: 48, cost: '25 credits/run' },
  { name: 'Document Analysis', icon: FileText, color: '#D97706', bg: '#FFFBEB', used: 31, limit: 100, pct: 31, cost: '15 credits/doc' },
  { name: 'Video Generation', icon: Zap, color: '#0891B2', bg: '#ECFEFF', used: 6, limit: 20, pct: 30, cost: '50 credits/10s' },
];

const periods = ['7D', '1M', '3M', '6M'];

export default function Usage() {
  const [period, setPeriod] = useState('7D');

  const totalUsed = 64200;
  const totalLimit = 100000;
  const pctUsed = (totalUsed / totalLimit) * 100;

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">AI Usage</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">Monitor your credit consumption across all AI features</p>
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

        {/* Credits hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[20px] p-6 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)', boxShadow: '0 4px 24px rgba(15,23,42,0.2)' }}
        >
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top right, rgba(99,102,241,0.2) 0%, transparent 60%)' }} />
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[#64748B] text-[13px] mb-1">Credits Used This Month</p>
                <p className="text-[36px] font-bold text-white tracking-[-0.02em]">{totalUsed.toLocaleString()}</p>
                <p className="text-[#475569] text-[13px] mt-1">of {totalLimit.toLocaleString()} credits · Pro Plan</p>
              </div>
              <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#6366F1" strokeWidth="7"
                    strokeDasharray={`${(pctUsed / 100) * 213.6} 213.6`} strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 1s ease' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-[14px]">{pctUsed.toFixed(0)}%</span>
                </div>
              </div>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pctUsed}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[12px] text-[#475569]">{(totalLimit - totalUsed).toLocaleString()} credits remaining</span>
              <button className="text-[12.5px] font-semibold text-[#818CF8] hover:text-[#A5B4FC] flex items-center gap-1">
                Buy credits <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Daily usage chart */}
        <div className="rounded-[20px] p-6" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
          <h3 className="text-[15px] font-bold text-[#0F172A] mb-5">Daily Activity</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyUsage} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="chat" stackId="a" fill="#2563EB" radius={[0, 0, 0, 0]} name="Chat" />
                <Bar dataKey="images" stackId="a" fill="#DB2777" name="Images" />
                <Bar dataKey="voice" stackId="a" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Voice" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3 justify-center">
            {[{ color: '#2563EB', label: 'Chat' }, { color: '#DB2777', label: 'Images' }, { color: '#7C3AED', label: 'Voice' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                <span className="text-[12px] text-[#64748B]">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature breakdown */}
        <div>
          <h3 className="text-[15px] font-bold text-[#0F172A] mb-3">Usage by Feature</h3>
          <div className="space-y-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-[16px]"
                  style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
                >
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: f.bg }}>
                    <Icon size={16} style={{ color: f.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[13.5px] font-semibold text-[#0F172A]">{f.name}</p>
                      <div className="text-right">
                        <span className="text-[13px] font-bold text-[#0F172A]">{f.used.toLocaleString()}</span>
                        {f.limit && <span className="text-[12px] text-[#94A3B8]"> / {f.limit}</span>}
                      </div>
                    </div>
                    {f.limit ? (
                      <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${f.pct}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ background: f.pct > 80 ? '#EF4444' : f.color }}
                        />
                      </div>
                    ) : (
                      <p className="text-[12px] text-[#94A3B8]">Unlimited · {f.cost}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
