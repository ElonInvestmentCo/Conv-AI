import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RiBellLine,
  RiCheckDoubleLine,
  RiRobot2Line,
  RiFlashlightLine,
  RiMessage3Line,
  RiErrorWarningLine,
  RiCheckboxCircleLine,
  RiImageLine,
  RiFileTextLine,
  RiSparklingLine,
  RiDeleteBinLine,
  RiSettings4Line,
} from '@remixicon/react';

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
  { id: 1, type: 'agent', title: 'Research Agent completed', body: 'Your "AI Market Analysis" agent finished. 12-page report ready to view.', time: '2 min ago', read: false },
  { id: 2, type: 'automation', title: 'Email Triage ran successfully', body: '14 emails processed and categorized. 3 draft replies queued for review.', time: '9 min ago', read: false },
  { id: 3, type: 'image', title: '6 images generated', body: 'Your product photography session is complete. Tap to view and download.', time: '42 min ago', read: false },
  { id: 4, type: 'chat', title: 'Conversation saved', body: '"Build a multi-agent pipeline" has been added to your history.', time: '1 hr ago', read: true },
  { id: 5, type: 'system', title: 'New model available: o1-mini', body: 'A faster version of o1 is now available in your model selector.', time: '3 hrs ago', read: true },
  { id: 6, type: 'error', title: 'Automation failed', body: '"Research Brief" failed to run. Check your web search integration.', time: '5 hrs ago', read: false },
  { id: 7, type: 'agent', title: 'Code Review Agent: PR #142', body: 'Reviewed 8 files. Found 2 potential issues and 3 improvement suggestions.', time: 'Yesterday', read: true },
  { id: 8, type: 'system', title: 'Your monthly usage report', body: 'You used 64,200 credits in July. Detailed breakdown available.', time: '2 days ago', read: true },
];

const typeConfig = {
  agent:      { icon: RiRobot2Line,       color: '#7C3AED', bg: '#F5F3FF' },
  automation: { icon: RiFlashlightLine,   color: '#D97706', bg: '#FFFBEB' },
  chat:       { icon: RiMessage3Line,     color: '#2563EB', bg: '#EFF6FF' },
  system:     { icon: RiSparklingLine,    color: '#0891B2', bg: '#ECFEFF' },
  image:      { icon: RiImageLine,        color: '#DB2777', bg: '#FDF2F8' },
  error:      { icon: RiErrorWarningLine, color: '#EF4444', bg: '#FEF2F2' },
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
  const markRead = (id: number) => update(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id: number) => update(notifs.filter(n => n.id !== id));

  const filtered = notifs.filter(n => filter === 'all' || !n.read);
  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-3xl mx-auto p-6 space-y-4">

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Notifications</h1>
              {unreadCount > 0 && (
                <span className="text-[12px] font-bold text-white bg-blue-500 px-2 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </div>
            <p className="text-[14px] text-[#64748B] mt-0.5">Stay updated on your AI activity</p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-2 rounded-[12px] text-[13px] font-semibold text-[#2563EB] transition-all" style={{ background: '#EFF6FF' }}>
                <RiCheckDoubleLine size={14} /> Mark all read
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: '#F1F5F9' }}>
          {(['all', 'unread'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 rounded-[9px] text-[12.5px] font-semibold transition-all capitalize"
              style={{ background: filter === f ? '#fff' : 'transparent', color: filter === f ? '#0F172A' : '#94A3B8', boxShadow: filter === f ? '0 1px 4px rgba(0,0,0,0.06)' : 'none' }}
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
                  className="group flex items-start gap-4 p-4 rounded-[16px] cursor-pointer transition-all"
                  style={{
                    background: notif.read ? '#fff' : '#FAFBFF',
                    border: `1px solid ${notif.read ? 'rgba(226,232,240,0.8)' : '#BFDBFE'}`,
                    boxShadow: notif.read ? '0 1px 4px rgba(0,0,0,0.03)' : '0 2px 8px rgba(37,99,235,0.06)',
                  }}
                >
                  <div className="w-9 h-9 rounded-[12px] flex items-center justify-center flex-shrink-0 relative" style={{ background: tc.bg }}>
                    <Icon size={16} style={{ color: tc.color }} />
                    {!notif.read && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13.5px] ${notif.read ? 'font-medium text-[#475569]' : 'font-bold text-[#0F172A]'}`}>{notif.title}</p>
                    <p className="text-[12.5px] text-[#64748B] leading-relaxed mt-0.5">{notif.body}</p>
                    <p className="text-[11.5px] text-[#CBD5E1] mt-1.5">{notif.time}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {!notif.read && (
                      <button onClick={e => { e.stopPropagation(); markRead(notif.id); }} className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-all">
                        <RiCheckboxCircleLine size={13} />
                      </button>
                    )}
                    <button onClick={e => { e.stopPropagation(); dismiss(notif.id); }} className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-red-500 hover:bg-red-50 transition-all">
                      <RiDeleteBinLine size={13} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <RiBellLine size={32} className="text-[#CBD5E1] mx-auto mb-3" />
              <p className="text-[15px] font-semibold text-[#475569]">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </p>
              <p className="text-[13px] text-[#94A3B8] mt-1">You're all caught up</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
