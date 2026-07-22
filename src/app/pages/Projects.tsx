import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers, Plus, Sparkles, MessageSquare, Image, Mic2,
  FileText, MoreHorizontal, ChevronRight, Search,
  Clock, Users, Star, Folder
} from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Product Launch Campaign',
    description: 'AI-generated copy, visuals, and narration for Q3 product launch',
    color: '#2563EB',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
    stats: { chats: 14, images: 32, audio: 5 },
    members: 3,
    updated: '2 min ago',
    starred: true,
  },
  {
    id: 2,
    name: 'Research Assistant',
    description: 'Automated literature review and summarization pipeline',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    stats: { chats: 41, images: 0, audio: 0 },
    members: 1,
    updated: '1 hr ago',
    starred: false,
  },
  {
    id: 3,
    name: 'Brand Voice System',
    description: 'Consistent AI persona for all customer-facing content',
    color: '#DB2777',
    gradient: 'linear-gradient(135deg, #DB2777 0%, #BE185D 100%)',
    stats: { chats: 8, images: 18, audio: 12 },
    members: 5,
    updated: '3 hrs ago',
    starred: true,
  },
  {
    id: 4,
    name: 'Technical Docs',
    description: 'Auto-generate and maintain API reference documentation',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
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
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Projects</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">Organise your AI work into focused workspaces</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}
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
              <div className="rounded-[20px] p-5" style={{ background: '#fff', border: '2px solid #BFDBFE', boxShadow: '0 2px 12px rgba(37,99,235,0.1)' }}>
                <p className="text-[13px] font-bold text-[#0F172A] mb-3">New Project</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="Project name…"
                    autoFocus
                    className="flex-1 px-4 py-2.5 text-[13.5px] rounded-[12px] outline-none"
                    style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A' }}
                    onFocus={e => { e.target.style.borderColor = '#93C5FD'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; }}
                    onKeyDown={e => { if (e.key === 'Escape') { setShowNew(false); setNewName(''); } }}
                  />
                  <button
                    onClick={() => { setShowNew(false); setNewName(''); }}
                    className="px-4 py-2.5 rounded-[12px] text-[13px] font-semibold text-[#475569] transition-all hover:bg-[#F8FAFC]"
                    style={{ border: '1px solid rgba(226,232,240,0.8)' }}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!newName.trim()}
                    className="px-4 py-2.5 rounded-[12px] text-[13px] font-semibold text-white transition-all"
                    style={{
                      background: newName.trim() ? 'linear-gradient(135deg, #2563EB, #4F46E5)' : '#E2E8F0',
                      color: newName.trim() ? '#fff' : '#94A3B8',
                    }}
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
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="w-full pl-9 pr-3 py-2.5 text-[13px] rounded-xl outline-none transition-all"
            style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A' }}
            onFocus={e => { e.target.style.borderColor = '#93C5FD'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; }}
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
              className="group rounded-[20px] overflow-hidden cursor-pointer hover:shadow-md transition-all"
              style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              {/* Color band */}
              <div className="h-1.5 w-full" style={{ background: project.gradient }} />

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0"
                      style={{ background: `${project.color}12` }}
                    >
                      <Folder size={18} style={{ color: project.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-[14px] font-bold text-[#0F172A]">{project.name}</p>
                        {project.starred && <Star size={12} className="text-amber-400 fill-amber-400" />}
                      </div>
                      <p className="text-[12px] text-[#94A3B8] mt-0.5 line-clamp-1">{project.description}</p>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC] transition-all opacity-0 group-hover:opacity-100">
                    <MoreHorizontal size={15} />
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 mb-4">
                  {project.stats.chats > 0 && (
                    <span className="flex items-center gap-1 text-[12px] text-[#64748B]">
                      <MessageSquare size={12} className="text-[#93C5FD]" />
                      {project.stats.chats} chats
                    </span>
                  )}
                  {project.stats.images > 0 && (
                    <span className="flex items-center gap-1 text-[12px] text-[#64748B]">
                      <Image size={12} className="text-[#C4B5FD]" />
                      {project.stats.images} images
                    </span>
                  )}
                  {project.stats.audio > 0 && (
                    <span className="flex items-center gap-1 text-[12px] text-[#64748B]">
                      <Mic2 size={12} className="text-[#F9A8D4]" />
                      {project.stats.audio} audio
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(226,232,240,0.6)' }}>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11.5px] text-[#CBD5E1]">
                      <Clock size={10} />
                      {project.updated}
                    </span>
                    <span className="flex items-center gap-1 text-[11.5px] text-[#CBD5E1]">
                      <Users size={10} />
                      {project.members}
                    </span>
                  </div>
                  <button
                    className="flex items-center gap-1 text-[12px] font-semibold transition-all px-3 py-1.5 rounded-[10px]"
                    style={{ color: project.color, background: `${project.color}10` }}
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
          <div className="rounded-[20px] p-12 text-center" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)' }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#F1F5F9' }}>
              <Layers size={22} className="text-[#94A3B8]" />
            </div>
            <p className="text-[15px] font-semibold text-[#0F172A]">No projects found</p>
            <p className="text-[13px] text-[#94A3B8] mt-1">Create a project to organise your AI work</p>
          </div>
        )}
      </div>
    </div>
  );
}
