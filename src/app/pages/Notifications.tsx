import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, TrendingUp, AlertTriangle, CheckCircle2, Sparkles, CreditCard, ArrowRight, X } from 'lucide-react';

const notifications = [
  {
    id: 1, unread: true, type: 'alert',
    icon: <AlertTriangle size={16} className="text-amber-500" />, bg: '#FFFBEB', border: '#FDE68A',
    title: 'Subscription charge increased',
    body: 'CloudServices Inc. increased from $29 to $42/mo (+45%). Want Snow AI to investigate?',
    time: '2 min ago', action: 'Investigate',
  },
  {
    id: 2, unread: true, type: 'ai',
    icon: <Sparkles size={16} className="text-blue-500" />, bg: '#EFF6FF', border: '#BFDBFE',
    title: 'AI Insight: Tax optimization opportunity',
    body: 'You can save ~$5,500 in taxes by maxing out your 401(k) before December. See full analysis.',
    time: '1 hr ago', action: 'View insight',
  },
  {
    id: 3, unread: true, type: 'deposit',
    icon: <CheckCircle2 size={16} className="text-emerald-500" />, bg: '#F0FDF4', border: '#BBF7D0',
    title: 'Salary deposit received',
    body: '$8,200.00 deposited to BoA Checking from Employer Inc.',
    time: '8 hrs ago', action: null,
  },
  {
    id: 4, unread: false, type: 'investment',
    icon: <TrendingUp size={16} className="text-purple-500" />, bg: '#F5F3FF', border: '#DDD6FE',
    title: 'Portfolio milestone reached',
    body: 'Your investment portfolio crossed $1M for the first time. 🎉 Total: $1,042,500.',
    time: 'Yesterday', action: 'View portfolio',
  },
  {
    id: 5, unread: false, type: 'card',
    icon: <CreditCard size={16} className="text-rose-500" />, bg: '#FFF1F2', border: '#FECDD3',
    title: 'Large transaction detected',
    body: 'Delta Airlines charged $640.00 on Chase Sapphire ••4821.',
    time: 'Jul 19', action: null,
  },
  {
    id: 6, unread: false, type: 'ai',
    icon: <Sparkles size={16} className="text-blue-500" />, bg: '#EFF6FF', border: '#BFDBFE',
    title: 'Weekly financial summary ready',
    body: 'Your Snow AI weekly digest is ready. Net savings this week: $2,140.',
    time: 'Jul 18', action: 'Read summary',
  },
  {
    id: 7, unread: false, type: 'alert',
    icon: <AlertTriangle size={16} className="text-amber-500" />, bg: '#FFFBEB', border: '#FDE68A',
    title: 'Travel budget exceeded',
    body: 'You\'ve spent $960 on travel this month, exceeding your $500 budget by 92%.',
    time: 'Jul 17', action: 'Adjust budget',
  },
];

export default function Notifications() {
  const [items, setItems] = useState(notifications);
  const unreadCount = items.filter(n => n.unread).length;

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));
  const dismiss = (id: number) => setItems(prev => prev.filter(n => n.id !== id));

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Notifications</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors">
              Mark all read
            </button>
          )}
        </div>

        {/* List */}
        <div className="space-y-2">
          {items.map(n => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative group"
            >
              <div
                className="flex items-start gap-4 p-4 rounded-[16px] transition-all"
                style={{
                  background: n.unread ? n.bg : '#fff',
                  border: `1px solid ${n.unread ? n.border : 'rgba(226,232,240,0.8)'}`,
                  boxShadow: n.unread ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                }}
              >
                {n.unread && <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-blue-500 -translate-x-3" />}
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0`} style={{ background: n.bg, border: `1px solid ${n.border}` }}>
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-[14px] font-semibold leading-tight ${n.unread ? 'text-[#0F172A]' : 'text-[#475569]'}`}>{n.title}</p>
                    <span className="text-[11px] text-[#94A3B8] whitespace-nowrap flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">{n.body}</p>
                  {n.action && (
                    <button className="mt-2 text-[12.5px] font-semibold text-[#2563EB] flex items-center gap-1 hover:gap-1.5 transition-all">
                      {n.action} <ArrowRight size={12} />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => dismiss(n.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC] transition-all flex-shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
