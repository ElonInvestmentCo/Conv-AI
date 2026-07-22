import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NavLink } from 'react-router';
import {
  Search, MessageSquare, Star, Trash2, Archive,
  Clock, Filter, ChevronRight, Sparkles, Bot, Hash
} from 'lucide-react';

const conversations = [
  {
    id: 1, title: 'Build a multi-agent research pipeline', preview: 'Use LangGraph with a planner agent, a web search tool, and a summarizer...', time: '2 min ago', model: 'GPT-4o', pinned: true, tags: ['code', 'agents'],
  },
  {
    id: 2, title: 'Summarize this 80-page PDF', preview: 'Here is a structured summary with key findings from each section...', time: '1 hr ago', model: 'Claude 3.5', pinned: false, tags: ['documents'],
  },
  {
    id: 3, title: 'Generate product images for launch', preview: 'I have created 6 variations with different backgrounds and lighting...', time: '3 hrs ago', model: 'DALL·E 3', pinned: false, tags: ['images'],
  },
  {
    id: 4, title: 'Write API integration docs', preview: 'Here is the full OpenAPI specification and markdown documentation...', time: 'Yesterday', model: 'GPT-4o', pinned: false, tags: ['code', 'writing'],
  },
  {
    id: 5, title: 'Automate my email workflow', preview: 'I have set up a Zapier-style automation that triggers on incoming emails...', time: 'Yesterday', model: 'GPT-4o', pinned: true, tags: ['automations'],
  },
  {
    id: 6, title: 'Explain transformer attention mechanism', preview: 'The attention mechanism works by computing query, key, and value matrices...', time: '2 days ago', model: 'GPT-4o', pinned: false, tags: ['research'],
  },
  {
    id: 7, title: 'Draft launch announcement post', preview: 'We are thrilled to announce Conv AI — the next generation AI platform...', time: '3 days ago', model: 'Claude 3.5', pinned: false, tags: ['writing'],
  },
  {
    id: 8, title: 'Optimize Python data pipeline', preview: 'Here is a refactored version using vectorized operations and async I/O...', time: '1 week ago', model: 'GPT-4o', pinned: false, tags: ['code'],
  },
];

const tagColors: Record<string, string> = {
  code: 'bg-blue-50 text-blue-700',
  agents: 'bg-violet-50 text-violet-700',
  documents: 'bg-amber-50 text-amber-700',
  images: 'bg-rose-50 text-rose-700',
  writing: 'bg-emerald-50 text-emerald-700',
  automations: 'bg-orange-50 text-orange-700',
  research: 'bg-cyan-50 text-cyan-700',
};

const filters = ['All', 'Pinned', 'Code', 'Writing', 'Agents', 'Images', 'Documents'];

export default function Conversations() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = conversations.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || activeFilter === 'Pinned'
      ? (activeFilter === 'Pinned' ? c.pinned : true)
      : c.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase());
    return matchSearch && matchFilter;
  });

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-4xl mx-auto p-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Conversations</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">{conversations.length} total · {conversations.filter(c => c.pinned).length} pinned</p>
          </div>
          <NavLink
            to="/chat"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[13.5px] font-semibold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}
          >
            <Sparkles size={14} /> New Chat
          </NavLink>
        </div>

        {/* Search + filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-11 pr-4 py-3 text-[14px] rounded-[14px] outline-none transition-all"
              style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              onFocus={e => { e.target.style.borderColor = '#93C5FD'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-all"
                style={{
                  background: activeFilter === f ? '#0F172A' : '#fff',
                  color: activeFilter === f ? '#fff' : '#64748B',
                  border: `1px solid ${activeFilter === f ? '#0F172A' : 'rgba(226,232,240,0.8)'}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Pinned */}
        {filtered.some(c => c.pinned) && activeFilter === 'All' && (
          <div>
            <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-2">Pinned</p>
            <div className="space-y-2">
              {filtered.filter(c => c.pinned).map(c => (
                <ConvCard key={c.id} c={c} />
              ))}
            </div>
          </div>
        )}

        {/* All */}
        <div>
          {activeFilter === 'All' && <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-2">All Conversations</p>}
          <div className="space-y-2">
            {filtered.filter(c => activeFilter !== 'All' || !c.pinned).map(c => (
              <ConvCard key={c.id} c={c} />
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare size={32} className="text-[#CBD5E1] mx-auto mb-3" />
            <p className="text-[15px] font-semibold text-[#475569]">No conversations found</p>
            <p className="text-[13px] text-[#94A3B8] mt-1">Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ConvCard({ c }: { c: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex items-center gap-4 p-4 rounded-[16px] cursor-pointer transition-all hover:shadow-sm"
      style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
    >
      <div className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)' }}>
        <MessageSquare size={17} className="text-[#2563EB]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          {c.pinned && <Star size={11} className="text-amber-400 fill-amber-400 flex-shrink-0" />}
          <p className="text-[14px] font-semibold text-[#0F172A] truncate">{c.title}</p>
        </div>
        <p className="text-[12.5px] text-[#94A3B8] truncate">{c.preview}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[11px] font-medium text-[#CBD5E1] flex items-center gap-1">
            <Clock size={10} /> {c.time}
          </span>
          <span className="text-[11px] text-[#CBD5E1]">·</span>
          <span className="text-[11px] font-medium text-[#94A3B8] flex items-center gap-1">
            <Bot size={10} /> {c.model}
          </span>
          {c.tags.map((t: string) => (
            <span key={t} className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tagColors[t] ?? 'bg-slate-50 text-slate-600'}`}>{t}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-amber-400 hover:bg-amber-50 transition-all" title="Pin">
          <Star size={14} />
        </button>
        <button className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC] transition-all" title="Archive">
          <Archive size={14} />
        </button>
        <button className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-red-500 hover:bg-red-50 transition-all" title="Delete">
          <Trash2 size={14} />
        </button>
      </div>
      <ChevronRight size={15} className="text-[#E2E8F0] flex-shrink-0" />
    </motion.div>
  );
}
