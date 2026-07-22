import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FolderOpen, File, FileText, FileImage, FileCode, FileAudio,
  Upload, Search, Grid, List, Plus, Trash2, Download,
  MoreHorizontal, ChevronRight, FolderPlus, Star, Clock
} from 'lucide-react';

const folders = [
  { name: 'Projects', count: 34, color: '#2563EB', bg: '#EFF6FF' },
  { name: 'Research', count: 12, color: '#7C3AED', bg: '#F5F3FF' },
  { name: 'Generated', count: 89, color: '#059669', bg: '#F0FDF4' },
  { name: 'Uploads', count: 21, color: '#D97706', bg: '#FFFBEB' },
];

const files = [
  { id: 1, name: 'architecture-diagram.png', type: 'image', size: '2.4 MB', date: '2 min ago', starred: true },
  { id: 2, name: 'api-spec.yaml', type: 'code', size: '0.1 MB', date: '1 hr ago', starred: false },
  { id: 3, name: 'product-brief.pdf', type: 'pdf', size: '1.8 MB', date: '3 hrs ago', starred: true },
  { id: 4, name: 'generated-report.md', type: 'text', size: '0.04 MB', date: 'Yesterday', starred: false },
  { id: 5, name: 'podcast-episode.mp3', type: 'audio', size: '42 MB', date: '2 days ago', starred: false },
  { id: 6, name: 'component-library.tsx', type: 'code', size: '0.3 MB', date: '3 days ago', starred: false },
  { id: 7, name: 'user-research.pdf', type: 'pdf', size: '4.7 MB', date: '1 week ago', starred: false },
  { id: 8, name: 'hero-image.jpg', type: 'image', size: '3.1 MB', date: '1 week ago', starred: false },
];

const typeConfig: Record<string, { icon: any; color: string; bg: string }> = {
  image: { icon: FileImage, color: '#DB2777', bg: '#FDF2F8' },
  code: { icon: FileCode, color: '#059669', bg: '#F0FDF4' },
  pdf: { icon: FileText, color: '#EF4444', bg: '#FEF2F2' },
  text: { icon: File, color: '#2563EB', bg: '#EFF6FF' },
  audio: { icon: FileAudio, color: '#7C3AED', bg: '#F5F3FF' },
};

const filters = ['All', 'Starred', 'Images', 'Documents', 'Code', 'Audio'];

export default function Files() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [filter, setFilter] = useState('All');
  const [dragging, setDragging] = useState(false);

  const filtered = files.filter(f => {
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' ? true
      : filter === 'Starred' ? f.starred
      : filter === 'Images' ? f.type === 'image'
      : filter === 'Documents' ? f.type === 'pdf' || f.type === 'text'
      : filter === 'Code' ? f.type === 'code'
      : filter === 'Audio' ? f.type === 'audio'
      : true;
    return matchSearch && matchFilter;
  });

  const totalSize = files.reduce((s, f) => s + parseFloat(f.size), 0).toFixed(1);

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Files</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">{files.length} files · {totalSize} MB used</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView('grid')} className={`p-2.5 rounded-[10px] transition-all ${view === 'grid' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#94A3B8] hover:bg-[#F8FAFC]'}`}><Grid size={15} /></button>
            <button onClick={() => setView('list')} className={`p-2.5 rounded-[10px] transition-all ${view === 'list' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#94A3B8] hover:bg-[#F8FAFC]'}`}><List size={15} /></button>
            <button className="flex items-center gap-2 px-3 py-2.5 rounded-[12px] text-[13px] font-semibold text-[#475569] transition-all" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)' }}>
              <FolderPlus size={14} /> New Folder
            </button>
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[13.5px] font-semibold text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}>
              <Upload size={14} /> Upload
              <input type="file" className="hidden" multiple />
            </label>
          </div>
        </div>

        {/* Folders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {folders.map((folder, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-[16px] text-left transition-all hover:shadow-sm"
              style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
            >
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3" style={{ background: folder.bg }}>
                <FolderOpen size={17} style={{ color: folder.color }} />
              </div>
              <p className="text-[13.5px] font-bold text-[#0F172A]">{folder.name}</p>
              <p className="text-[12px] text-[#94A3B8] mt-0.5">{folder.count} files</p>
            </motion.button>
          ))}
        </div>

        {/* Search + filters */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search files…"
              className="w-full pl-10 pr-4 py-2.5 text-[13.5px] rounded-[12px] outline-none"
              style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A' }}
            />
          </div>
          <div className="flex gap-1.5">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all"
                style={{ background: filter === f ? '#0F172A' : '#fff', color: filter === f ? '#fff' : '#64748B', border: `1px solid ${filter === f ? '#0F172A' : 'rgba(226,232,240,0.8)'}` }}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* Drop zone */}
        <div
          className="border-2 border-dashed rounded-[16px] p-6 text-center transition-all cursor-pointer"
          style={{ borderColor: dragging ? '#93C5FD' : '#E2E8F0', background: dragging ? '#EFF6FF' : 'transparent' }}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); }}
        >
          <p className="text-[13px] font-medium text-[#94A3B8]">Drop files here to upload</p>
        </div>

        {/* File list */}
        <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 gap-3' : 'space-y-1.5'}>
          {filtered.map((file, i) => {
            const tc = typeConfig[file.type];
            const Icon = tc.icon;
            return (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`group cursor-pointer rounded-[14px] transition-all hover:shadow-sm ${view === 'list' ? 'flex items-center gap-3 px-4 py-3' : 'p-4'}`}
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)' }}
              >
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 ${view === 'grid' ? 'mb-3' : ''}`} style={{ background: tc.bg }}>
                  <Icon size={16} style={{ color: tc.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {file.starred && <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" />}
                    <p className="text-[13px] font-semibold text-[#0F172A] truncate">{file.name}</p>
                  </div>
                  <p className="text-[11.5px] text-[#94A3B8] mt-0.5">{file.size} · {file.date}</p>
                </div>
                {view === 'list' && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-[8px] text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC] transition-all"><Download size={13} /></button>
                    <button className="p-1.5 rounded-[8px] text-[#CBD5E1] hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={13} /></button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
