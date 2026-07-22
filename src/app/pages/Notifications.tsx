import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell, CheckCheck, Bot, Zap, MessageSquare,
  AlertTriangle, CheckCircle2, Image, Sparkles, Trash2,
} from 'lucide-react';

const STORAGE_KEY = 'convai_notifications';

type Notification = {
  id: number;
  type: 'agent' | 'automation' | 'chat' | 'system' | 'image' | 'error';
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const initialNotifs: Notification[] = [
  { id: 1, type: 'agent',      title: 'Research Agent completed',   body: 'Your "AI Market Analysis" agent finished. 12-page report ready to view.',    time: '2 min ago',  read: false },
  { id: 2, type: 'automation', title: 'Email Triage ran successfully', body: '14 emails processed and categorized. 3 draft replies queued for review.',   time: '9 min ago',  read: false },
  { id: 3, type: 'image',      title: '6 images generated',          body: 'Your product photography session is complete. Tap to view and download.',    time: '42 min ago', read: false },
  { id: 4, type: 'chat',       title: 'Conversation saved',          body: '"Build a multi-agent pipeline" has been added to your history.',             time: '1 hr ago',   read: true  },
  { id: 5, type: 'system',     title: 'New model available: o1-mini', body: 'A faster version of o1 is now available in your model selector.',           time: '3 hrs ago',  read: true  },
  { id: 6, type: 'error',      title: 'Automation failed',           body: '"Research Brief" failed to run. Check your web search integration.',         time: '5 hrs ago',  read: false },
  { id: 7, type: 'agent',      title: 'Code Review Agent: PR #142',  body: 'Reviewed 8 files. Found 2 potential issues and 3 improvement suggestions.',  time: 'Yesterday',  read: true  },
  { id: 8, type: 'system',     title: 'Your monthly usage report',   body: 'You used 64,200 credits in July. Detailed breakdown available.',             time: '2 days ago', read: true  },
];

const typeConfig = {
  agent:      { icon: Bot,           color: '#6366F1', bg: 'rgba(99,102,241,0.1)'  },
  automation: { icon: Zap,           color: '#F59E0B', bg: 'rgba(245,158,11,0.1)'  },
  chat:       { icon: MessageSquare, color: '#06B6D4', bg: 'rgba(6,182,212,0.1)'   },
  system:     { icon: Sparkles,      color: '#10B981', bg: 'rgba(16,185,129,0.1)'  },
  image:      { icon: Image,         color: '#94A3B8', bg: 'rgba(148,163,184,0.1)' },
  error:      { icon: AlertTriangle, color: '#EF4444', bg: 'rgba(239,68,68,0.1)'   },
};

function loadNotifs(): Notification[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Notification[];
  } catch {}
  return initialNotifs;
}

function saveNotifs(notifs: Notification[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notifs)); } catch {}
}

export default function Notifications() {
  const [notifs, setNotifs] = useState<Notification[]>(loadNotifs);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const update = (next: Notification[]) => { setNotifs(next); saveNotifs(next); };
  const markAllRead = () => update(notifs.map(n => ({ ...n, read: true })));
  const markRead    = (id: number) => update(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  const dismiss     = (id: number) => update(notifs.filter(n => n.id !== id));

  const filtered    = notifs.filter(n => filter === 'all' || !n.read);
  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#0A0C10' }}>
      <div className="max-w-3xl mx-auto p-6 space-y-4">

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-semibold text-[#F8FAFC] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Notifications</h1>
              {unreadCount > 0 && (
                <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: '#6366F1' }}>{unreadCount}</span>
              )}
            </div>
            <p className="text-[13px] text-[#475569] mt-0.5">Stay updated on your AI activity</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-[#6366F1] transition-all hover:bg-[#6366F1]/10" style={{ background: 'rgba(99,102,241,0.08)' }}>
              <CheckCheck size={13} /> Mark all read
            </button>
          )}
        </div>

        <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: '#111318', border: '1px solid #1E222A' }}>
          {(['all', 'unread'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all capitalize"
              style={{ background: filter === f ? '#6366F1' : 'transparent', color: filter === f ? '#fff' : '#475569' }}
            >{f === 'unread' ? `Unread (${unreadCount})` : 'All'}</button>
          ))}
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {filtered.map(notif => {
              const tc = typeConfig[notif.type];
              const Icon = tc.icon;
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  onClick={() => markRead(notif.id)}
                  className="group flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all hover:border-[#2E3440]"
                  style={{
                    background: notif.read ? '#111318' : '#111318',
                    border: `1px solid ${notif.read ? '#1E222A' : '#6366F1'}`,
                    boxShadow: notif.read ? 'none' : '0 2px 8px rgba(99,102,241,0.1)',
                  }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 relative" style={{ background: tc.bg }}>
                    <Icon size={15} style={{ color: tc.color }} />
                    {!notif.read && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#6366F1] rounded-full border-2 border-[#0A0C10]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] ${notif.read ? 'font-medium text-[#94A3B8]' : 'font-semibold text-[#F8FAFC]'}`}>{notif.title}</p>
                    <p className="text-[12px] text-[#475569] leading-relaxed mt-0.5">{notif.body}</p>
                    <p className="text-[11px] text-[#2E3440] mt-1.5">{notif.time}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {!notif.read && (
                      <button onClick={e => { e.stopPropagation(); markRead(notif.id); }} className="p-1.5 rounded-lg text-[#2E3440] hover:text-[#6366F1] hover:bg-[#6366F1]/10 transition-all">
                        <CheckCircle2 size={13} />
                      </button>
                    )}
                    <button onClick={e => { e.stopPropagation(); dismiss(notif.id); }} className="p-1.5 rounded-lg text-[#2E3440] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Bell size={32} className="text-[#1E222A] mx-auto mb-3" />
              <p className="text-[14px] font-semibold text-[#475569]">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </p>
              <p className="text-[13px] text-[#2E3440] mt-1">You're all caught up</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
