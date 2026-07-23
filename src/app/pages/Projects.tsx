import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers, Plus, MessageSquare, Image,
  Mic, MoreHorizontal, ChevronRight,
  Search, Clock, Users, Star, Folder,
} from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Product Launch Campaign',
    description: 'AI-generated copy, visuals, and narration for Q3 product launch',
    color: '#6366F1',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
    stats: { chats: 14, images: 32, audio: 5 },
    members: 3,
    updated: '2 min ago',
    starred: true,
  },
  {
    id: 2,
    name: 'Research Assistant',
    description: 'Automated literature review and summarization pipeline',
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    stats: { chats: 41, images: 0, audio: 0 },
    members: 1,
    updated: '1 hr ago',
    starred: false,
  },
  {
    id: 3,
    name: 'Brand Voice System',
    description: 'Consistent AI persona for all customer-facing content',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    stats: { chats: 8, images: 18, audio: 12 },
    members: 5,
    updated: '3 hrs ago',
    starred: true,
  },
  {
    id: 4,
    name: 'Technical Docs',
    description: 'Auto-generate and maintain API reference documentation',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    stats: { chats: 22, images: 0, audio: 0 },
    members: 2,
    updated: 'Yesterday',
    starred: false,
  },
];

export default function Projects() {
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');

  const filtered = projects.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#0A0C10' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-semibold text-[#F8FAFC] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Projects</h1>
            <p className="text-[13px] text-[#475569] mt-0.5">Organise your AI work into focused workspaces</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all hover:bg-[#1D4ED8]"
            style={{ background: '#2563EB', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}
          >
            <Plus size={14} />
            New Project
          </motion.button>
        </div>

        {/* New project inline */}
        <AnimatePresence>
          {showNew && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl p-5" style={{ background: '#111318', border: '1px solid #6366F1', boxShadow: '0 2px 12px rgba(99,102,241,0.15)' }}>
                <p className="text-[13px] font-semibold text-[#F8FAFC] mb-3">New Project</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="Project name…"
                    autoFocus
                    className="flex-1 px-4 py-2.5 text-[13px] rounded-xl outline-none"
                    style={{ background: '#1A1D24', border: '1px solid #2E3440', color: '#F8FAFC' }}
                    onFocus={e => { e.target.style.borderColor = '#6366F1'; }}
                    onBlur={e => { e.target.style.borderColor = '#2E3440'; }}
                    onKeyDown={e => { if (e.key === 'Escape') { setShowNew(false); setNewName(''); } }}
                  />
                  <button
                    onClick={() => { setShowNew(false); setNewName(''); }}
                    className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-[#475569] transition-all hover:bg-[#1A1D24]"
                    style={{ border: '1px solid #1E222A' }}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!newName.trim()}
                    className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all disabled:opacity-30"
                    style={{ background: '#2563EB' }}
                    onClick={() => { setShowNew(false); setNewName(''); }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E3440]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="w-full pl-9 pr-3 py-2.5 text-[13px] rounded-xl outline-none transition-all"
            style={{ background: '#111318', border: '1px solid #1E222A', color: '#94A3B8' }}
            onFocus={e => { e.target.style.borderColor = '#6366F1'; }}
            onBlur={e => { e.target.style.borderColor = '#1E222A'; }}
          />
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-[#2E3440]"
              style={{ background: '#111318', border: '1px solid #1E222A', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
            >
              {/* Color band */}
              <div className="h-1 w-full" style={{ background: project.gradient }} />

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${project.color}15` }}
                    >
                      <Folder size={17} style={{ color: project.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-[14px] font-semibold text-[#F8FAFC]">{project.name}</p>
                        {project.starred && <Star size={11} className="text-[#F59E0B] fill-[#F59E0B]" />}
                      </div>
                      <p className="text-[12px] text-[#475569] mt-0.5 line-clamp-1">{project.description}</p>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg text-[#2E3440] hover:text-[#475569] hover:bg-[#1A1D24] transition-all opacity-0 group-hover:opacity-100">
                    <MoreHorizontal size={14} />
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 mb-4">
                  {project.stats.chats > 0 && (
                    <span className="flex items-center gap-1 text-[12px] text-[#475569]">
                      <MessageSquare size={11} className="text-[#6366F1]" />
                      {project.stats.chats} chats
                    </span>
                  )}
                  {project.stats.images > 0 && (
                    <span className="flex items-center gap-1 text-[12px] text-[#475569]">
                      <Image size={11} className="text-[#06B6D4]" />
                      {project.stats.images} images
                    </span>
                  )}
                  {project.stats.audio > 0 && (
                    <span className="flex items-center gap-1 text-[12px] text-[#475569]">
                      <Mic size={11} className="text-[#10B981]" />
                      {project.stats.audio} audio
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #1E222A' }}>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] text-[#2E3440]">
                      <Clock size={10} />
                      {project.updated}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#2E3440]">
                      <Users size={10} />
                      {project.members}
                    </span>
                  </div>
                  <button
                    className="flex items-center gap-1 text-[12px] font-semibold transition-all px-3 py-1.5 rounded-xl hover:opacity-80"
                    style={{ color: project.color, background: `${project.color}12` }}
                  >
                    Open
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="rounded-2xl p-12 text-center" style={{ background: '#111318', border: '1px solid #1E222A' }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#1A1D24' }}>
              <Layers size={20} className="text-[#475569]" />
            </div>
            <p className="text-[15px] font-semibold text-[#F8FAFC]">No projects found</p>
            <p className="text-[13px] text-[#475569] mt-1">Create a project to organise your AI work</p>
          </div>
        )}
      </div>
    </div>
  );
}
