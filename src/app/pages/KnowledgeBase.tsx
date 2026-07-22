import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen, Plus, Search, Sparkles, FileText, Globe,
  Database, Upload, ChevronRight, Zap, CheckCircle2, Trash2, Edit3
} from 'lucide-react';

const collections = [
  { id: 1, name: 'Product Documentation', docs: 48, size: '12 MB', icon: FileText, color: '#2563EB', bg: '#EFF6FF', synced: '2 min ago', status: 'active' },
  { id: 2, name: 'Company Policies', docs: 12, size: '3.4 MB', icon: Database, color: '#7C3AED', bg: '#F5F3FF', synced: '1 hr ago', status: 'active' },
  { id: 3, name: 'Engineering Wiki', docs: 134, size: '28 MB', icon: Globe, color: '#059669', bg: '#F0FDF4', synced: '30 min ago', status: 'active' },
  { id: 4, name: 'Research Papers', docs: 67, size: '145 MB', icon: BookOpen, color: '#D97706', bg: '#FFFBEB', synced: '1 day ago', status: 'syncing' },
];

const sources = [
  { name: 'Notion', icon: '📝', connected: true },
  { name: 'Confluence', icon: '📚', connected: false },
  { name: 'Google Drive', icon: '📁', connected: true },
  { name: 'GitHub', icon: '💻', connected: false },
  { name: 'Slack', icon: '💬', connected: false },
  { name: 'Zendesk', icon: '🎯', connected: false },
];

export default function KnowledgeBase() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'collections' | 'sources'>('collections');

  const totalDocs = collections.reduce((s, c) => s + c.docs, 0);

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-4xl mx-auto p-6 space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Knowledge Base</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">{totalDocs} documents across {collections.length} collections</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[13.5px] font-semibold text-white transition-all" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}>
            <Plus size={15} /> New Collection
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Documents', value: totalDocs.toString(), color: '#2563EB', bg: '#EFF6FF' },
            { label: 'Collections', value: collections.length.toString(), color: '#7C3AED', bg: '#F5F3FF' },
            { label: 'Connected Sources', value: sources.filter(s => s.connected).length.toString(), color: '#059669', bg: '#F0FDF4' },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-[16px]" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <p className="text-[12px] text-[#94A3B8] mb-1">{s.label}</p>
              <p className="text-[24px] font-bold" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Ask KB */}
        <div className="rounded-[18px] p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)', boxShadow: '0 4px 20px rgba(15,23,42,0.15)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top right, rgba(99,102,241,0.2) 0%, transparent 60%)' }} />
          <div className="relative flex items-center gap-4">
            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', boxShadow: '0 2px 8px rgba(37,99,235,0.4)' }}>
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <input
                placeholder="Ask a question across your entire knowledge base…"
                className="w-full text-[14px] outline-none bg-transparent text-white placeholder-[#475569]"
              />
            </div>
            <button className="px-4 py-2 rounded-[10px] text-[13px] font-semibold text-white flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              Ask AI
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-[12px] w-fit" style={{ background: '#F1F5F9' }}>
          {(['collections', 'sources'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className="px-4 py-2 rounded-[9px] text-[13px] font-semibold transition-all capitalize"
              style={{ background: activeTab === t ? '#fff' : 'transparent', color: activeTab === t ? '#0F172A' : '#94A3B8', boxShadow: activeTab === t ? '0 1px 4px rgba(0,0,0,0.06)' : 'none' }}
            >{t}</button>
          ))}
        </div>

        {activeTab === 'collections' ? (
          <div className="space-y-3">
            {collections.map((col, i) => {
              const Icon = col.icon;
              return (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex items-center gap-4 p-5 rounded-[18px] cursor-pointer transition-all hover:shadow-sm"
                  style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
                >
                  <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: col.bg }}>
                    <Icon size={20} style={{ color: col.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[15px] font-bold text-[#0F172A]">{col.name}</p>
                      {col.status === 'syncing' && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Syncing</span>}
                      {col.status === 'active' && <CheckCircle2 size={13} className="text-emerald-500" />}
                    </div>
                    <p className="text-[12.5px] text-[#94A3B8]">{col.docs} documents · {col.size} · Synced {col.synced}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-[10px] text-[#CBD5E1] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-all"><Edit3 size={14} /></button>
                    <button className="p-2 rounded-[10px] text-[#CBD5E1] hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={14} /></button>
                  </div>
                  <ChevronRight size={15} className="text-[#E2E8F0] flex-shrink-0" />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div>
            <p className="text-[13px] text-[#64748B] mb-4">Connect data sources to automatically sync content into your knowledge base.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sources.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-[16px] transition-all hover:shadow-sm"
                  style={{ background: '#fff', border: `1px solid ${src.connected ? '#BBF7D0' : 'rgba(226,232,240,0.8)'}` }}
                >
                  <span className="text-2xl">{src.icon}</span>
                  <div className="flex-1">
                    <p className="text-[13.5px] font-semibold text-[#0F172A]">{src.name}</p>
                    <p className="text-[11.5px] font-semibold" style={{ color: src.connected ? '#10B981' : '#94A3B8' }}>
                      {src.connected ? '✓ Connected' : 'Not connected'}
                    </p>
                  </div>
                  <button className="text-[12px] font-semibold transition-all" style={{ color: src.connected ? '#EF4444' : '#2563EB' }}>
                    {src.connected ? 'Remove' : 'Connect'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
