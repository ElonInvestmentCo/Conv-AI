import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen, Sparkles, Search, Filter, Star, Clock,
  MessageSquare, Image, FileText, Mic2, Plus, ChevronRight
} from 'lucide-react';

type ItemType = 'all' | 'chat' | 'image' | 'audio' | 'document';

const typeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  chat: MessageSquare,
  image: Image,
  audio: Mic2,
  document: FileText,
};

const typeColors: Record<string, string> = {
  chat: '#2563EB',
  image: '#7C3AED',
  audio: '#DB2777',
  document: '#059669',
};

const items = [
  { id: 1, type: 'chat', title: 'Build a multi-agent research pipeline', preview: 'We discussed orchestrating multiple AI agents to handle complex research tasks autonomously…', date: '2 min ago', starred: true, tokens: '4.2k' },
  { id: 2, type: 'image', title: 'Product launch visuals — neon cityscape', preview: 'Generated 6 images · Cinematic style · 16:9', date: '1 hr ago', starred: false, tokens: null },
  { id: 3, type: 'chat', title: 'Summarize 80-page technical report', preview: 'The document covered cloud infrastructure patterns, cost optimization strategies…', date: '3 hrs ago', starred: true, tokens: '12.1k' },
  { id: 4, type: 'audio', title: 'Onboarding narration — Nova voice', preview: 'Generated 2m 34s · Nova · MP3', date: 'Yesterday', starred: false, tokens: null },
  { id: 5, type: 'document', title: 'API integration docs — Stripe webhooks', preview: 'A comprehensive guide on handling Stripe webhook events including signature verification…', date: 'Yesterday', starred: true, tokens: '8.7k' },
  { id: 6, type: 'chat', title: 'Automate email workflow with AI', preview: 'We designed a pipeline that reads incoming emails, classifies intent, and drafts replies…', date: '2 days ago', starred: false, tokens: '6.3k' },
  { id: 7, type: 'image', title: 'Brand identity assets — minimal style', preview: 'Generated 12 images · Digital Art style · 1:1', date: '2 days ago', starred: true, tokens: null },
  { id: 8, type: 'audio', title: 'Product demo voiceover — Echo voice', preview: 'Generated 5m 12s · Echo · WAV', date: '3 days ago', starred: false, tokens: null },
];

export default function Library() {
  const [filter, setFilter] = useState<ItemType>('all');
  const [search, setSearch] = useState('');
  const [starredOnly, setStarredOnly] = useState(false);

  const filters: { key: ItemType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'chat', label: 'Chats' },
    { key: 'image', label: 'Images' },
    { key: 'audio', label: 'Audio' },
    { key: 'document', label: 'Documents' },
  ];

  const filtered = items.filter(item => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (starredOnly && !item.starred) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-4xl mx-auto p-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Library</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">All your AI-generated content in one place</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}
          >
            <Plus size={14} />
            New Chat
          </motion.button>
        </div>

        {/* Search + filters */}
        <div className="rounded-[20px] p-4" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search library…"
                className="w-full pl-9 pr-3 py-2 text-[13px] rounded-xl outline-none transition-all"
                style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A' }}
                onFocus={e => { e.target.style.borderColor = '#93C5FD'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; e.target.style.background = '#F8FAFC'; }}
              />
            </div>

            {/* Type filters */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {filters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="px-3 py-1.5 rounded-[10px] text-[12.5px] font-semibold transition-all"
                  style={{
                    background: filter === f.key ? '#0F172A' : '#F8FAFC',
                    color: filter === f.key ? '#fff' : '#64748B',
                    border: `1px solid ${filter === f.key ? '#0F172A' : 'rgba(226,232,240,0.8)'}`,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Starred toggle */}
            <button
              onClick={() => setStarredOnly(!starredOnly)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[12.5px] font-semibold transition-all"
              style={{
                background: starredOnly ? '#FFFBEB' : '#F8FAFC',
                color: starredOnly ? '#D97706' : '#94A3B8',
                border: `1px solid ${starredOnly ? '#FDE68A' : 'rgba(226,232,240,0.8)'}`,
              }}
            >
              <Star size={12} className={starredOnly ? 'fill-amber-400 text-amber-400' : ''} />
              Starred
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="rounded-[20px] p-12 text-center" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#F1F5F9' }}>
                <BookOpen size={22} className="text-[#94A3B8]" />
              </div>
              <p className="text-[15px] font-semibold text-[#0F172A]">Nothing here yet</p>
              <p className="text-[13px] text-[#94A3B8] mt-1">Start a chat or generate content to populate your library</p>
            </div>
          ) : filtered.map((item, i) => {
            const Icon = typeIcons[item.type];
            const color = typeColors[item.type];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group rounded-[16px] p-4 flex items-start gap-4 cursor-pointer transition-all hover:shadow-sm"
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)' }}
              >
                <div
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${color}12` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-semibold text-[#0F172A] leading-snug">{item.title}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {item.starred && <Star size={13} className="text-amber-400 fill-amber-400" />}
                      <ChevronRight size={14} className="text-[#CBD5E1] group-hover:text-[#94A3B8] transition-colors" />
                    </div>
                  </div>
                  <p className="text-[12.5px] text-[#94A3B8] mt-0.5 line-clamp-1">{item.preview}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[11px] text-[#CBD5E1] flex items-center gap-1">
                      <Clock size={10} />
                      {item.date}
                    </span>
                    {item.tokens && (
                      <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-md" style={{ background: '#F1F5F9', color: '#64748B' }}>
                        {item.tokens} tokens
                      </span>
                    )}
                    <span
                      className="text-[11px] font-semibold px-1.5 py-0.5 rounded-md capitalize"
                      style={{ background: `${color}12`, color }}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
