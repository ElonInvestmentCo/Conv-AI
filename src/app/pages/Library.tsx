import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, SlidersHorizontal, LayoutGrid, List, Plus, ChevronDown,
  FileText, Image as ImageIcon, File, MoreHorizontal, Download,
  Share2, Trash2, Star, ChevronUp, ChevronRight,
} from 'lucide-react';

type FilterTab = 'All' | 'Images' | 'Documents';
type SortKey = 'name' | 'modified' | 'size';
type SortDir = 'asc' | 'desc';

interface LibFile {
  id: number;
  name: string;
  type: 'image' | 'document' | 'svg';
  modified: string;
  modifiedTs: number;
  size: string;
  sizeKb: number;
  starred: boolean;
  thumb: string; // gradient for placeholder
}

const files: LibFile[] = [
  { id: 1,  name: '38d07014-4028-42ec-b2e7-e6f78adefa22.png', type: 'image',    modified: 'Jul 21, 8:17 PM', modifiedTs: 8,  size: '185 KB', sizeKb: 185,  starred: false, thumb: 'linear-gradient(135deg,#667EEA,#764BA2)' },
  { id: 2,  name: '48706ed2-69e1-4c58-977a-ffe9cbe97663.png', type: 'image',    modified: 'Jul 21, 8:00 PM', modifiedTs: 7,  size: '240 KB', sizeKb: 240,  starred: false, thumb: 'linear-gradient(135deg,#F093FB,#F5576C)' },
  { id: 3,  name: '08661b6c-5da8-4186-8744-9278ad7abc7c.png', type: 'image',    modified: 'Jul 21, 7:20 PM', modifiedTs: 6,  size: '533 KB', sizeKb: 533,  starred: true,  thumb: 'linear-gradient(135deg,#4FACFE,#00F2FE)' },
  { id: 4,  name: '6578dc41-99b6-44d3-a745-ff830727fb41.png', type: 'image',    modified: 'Jul 21, 7:46 PM', modifiedTs: 5,  size: '274 KB', sizeKb: 274,  starred: false, thumb: 'linear-gradient(135deg,#43E97B,#38F9D7)' },
  { id: 5,  name: '11a92260-1fdf-4694-8148-6cf6f7490f1c.png', type: 'image',    modified: 'Jul 21, 7:46 PM', modifiedTs: 5,  size: '274 KB', sizeKb: 274,  starred: false, thumb: 'linear-gradient(135deg,#FA709A,#FEE140)' },
  { id: 6,  name: 'Speech bubble with gradient sound waves.png', type: 'image', modified: 'Jul 21, 4:25 PM', modifiedTs: 4,  size: '1.30 MB', sizeKb: 1300, starred: true,  thumb: 'linear-gradient(135deg,#a78bfa,#60a5fa)' },
  { id: 7,  name: 'Gradient speech bubble with sound waves.png', type: 'image', modified: 'Jul 21, 4:23 PM', modifiedTs: 3,  size: '1.32 MB', sizeKb: 1320, starred: false, thumb: 'linear-gradient(135deg,#fb7185,#c084fc)' },
  { id: 8,  name: 'AI conversation logo with speech bubble.png', type: 'image', modified: 'Jul 21, 4:22 PM', modifiedTs: 3,  size: '692 KB', sizeKb: 692,  starred: false, thumb: 'linear-gradient(135deg,#34d399,#60a5fa)' },
  { id: 9,  name: 'gemini_sparkle_aurora_33f86dc0c0257da337c63.svg', type: 'svg', modified: 'Jul 21, 4:21 PM', modifiedTs: 2, size: '27.1 KB', sizeKb: 27,  starred: false, thumb: 'linear-gradient(135deg,#fbbf24,#f97316)' },
  { id: 10, name: 'b56486b7-ba82-40c4-b775-477df9e5733b.png', type: 'image',    modified: 'Jul 21, 12:05 PM', modifiedTs: 1, size: '145 KB', sizeKb: 145,  starred: false, thumb: 'linear-gradient(135deg,#818cf8,#6ee7b7)' },
  { id: 11, name: 'AI workflow diagram.pdf',                   type: 'document', modified: 'Jul 21, 10:00 AM', modifiedTs: 0, size: '14.2 MB', sizeKb: 14200, starred: true, thumb: '' },
  { id: 12, name: 'Application workspace terminology.docx',    type: 'document', modified: 'Jul 21, 9:30 AM',  modifiedTs: 0, size: '80.6 KB', sizeKb: 80,   starred: false, thumb: '' },
  { id: 13, name: 'Branch - AI workflow diagram.pdf',          type: 'document', modified: 'Jul 21, 9:00 AM',  modifiedTs: 0, size: '14.2 MB', sizeKb: 14200, starred: false, thumb: '' },
  { id: 14, name: 'Dev Server Setup Plan.txt',                 type: 'document', modified: 'Jul 20',           modifiedTs: 0, size: '34.1 KB', sizeKb: 34,   starred: false, thumb: '' },
];

const docColor = (name: string) => {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return { color: '#EF4444', bg: '#FFF1F2' };
  if (ext === 'docx' || ext === 'doc') return { color: '#2563EB', bg: '#EFF6FF' };
  if (ext === 'txt') return { color: '#64748B', bg: '#F8FAFC' };
  return { color: '#64748B', bg: '#F8FAFC' };
};

function FileThumb({ file, size = 32 }: { file: LibFile; size?: number }) {
  if (file.type === 'image' || file.type === 'svg') {
    return (
      <div
        className="rounded-lg flex-shrink-0"
        style={{ width: size, height: size, background: file.thumb }}
      />
    );
  }
  const { color, bg } = docColor(file.name);
  const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
  return (
    <div className="rounded-lg flex-shrink-0 flex items-center justify-center" style={{ width: size, height: size, background: bg }}>
      <span className="text-[9px] font-[800]" style={{ color }}>{ext.slice(0, 3)}</span>
    </div>
  );
}

export default function Library() {
  const [tab, setTab] = useState<FilterTab>('All');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [sortKey, setSortKey] = useState<SortKey>('modified');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [hovered, setHovered] = useState<number | null>(null);
  const [actionRow, setActionRow] = useState<number | null>(null);

  const filtered = files
    .filter(f => {
      if (tab === 'Images') return f.type === 'image' || f.type === 'svg';
      if (tab === 'Documents') return f.type === 'document';
      return true;
    })
    .filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let diff = 0;
      if (sortKey === 'name') diff = a.name.localeCompare(b.name);
      if (sortKey === 'modified') diff = a.modifiedTs - b.modifiedTs;
      if (sortKey === 'size') diff = a.sizeKb - b.sizeKb;
      return sortDir === 'asc' ? diff : -diff;
    });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <span className="w-3" />;
    return sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F8FAFC' }}>
      <div className="max-w-5xl mx-auto p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[22px] font-[800] tracking-[-0.02em]" style={{ color: '#0F172A' }}>Library</h1>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#CBD5E1' }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search files…"
                className="pl-8 pr-3 py-2 text-[13px] rounded-xl outline-none w-52 transition-all"
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)', color: '#0F172A' }}
                onFocus={e => { e.target.style.borderColor = '#93C5FD'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.9)'; }}
              />
            </div>
            {/* New button */}
            <button
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-[600] text-white transition-all"
              style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', boxShadow: '0 2px 8px rgba(15,23,42,0.2)' }}
            >
              New
              <ChevronDown size={13} />
            </button>
          </div>
        </div>

        {/* Filter tabs + view controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)' }}>
            {(['All', 'Images', 'Documents'] as FilterTab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-3.5 py-1.5 rounded-lg text-[12.5px] font-[600] transition-all"
                style={{
                  background: tab === t ? '#0F172A' : 'transparent',
                  color: tab === t ? '#fff' : '#64748B',
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button className="p-2 rounded-lg text-[#94A3B8] hover:text-[#475569] hover:bg-white transition-all" style={{ border: '1px solid rgba(226,232,240,0.9)' }}>
              <SlidersHorizontal size={14} />
            </button>
            <button
              onClick={() => setView('grid')}
              className="p-2 rounded-lg transition-all"
              style={{
                background: view === 'grid' ? '#EFF6FF' : 'transparent',
                color: view === 'grid' ? '#2563EB' : '#94A3B8',
                border: '1px solid rgba(226,232,240,0.9)',
              }}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setView('list')}
              className="p-2 rounded-lg transition-all"
              style={{
                background: view === 'list' ? '#EFF6FF' : 'transparent',
                color: view === 'list' ? '#2563EB' : '#94A3B8',
                border: '1px solid rgba(226,232,240,0.9)',
              }}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {/* List view */}
        {view === 'list' && (
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}>
            {/* Table header */}
            <div
              className="grid px-4 py-2.5"
              style={{ gridTemplateColumns: '1fr 140px 100px 36px', borderBottom: '1px solid rgba(226,232,240,0.9)', background: '#F8FAFC' }}
            >
              <button className="flex items-center gap-1 text-[11.5px] font-[700] uppercase tracking-[0.06em] text-left" style={{ color: '#94A3B8' }} onClick={() => handleSort('name')}>
                Name <SortIcon k="name" />
              </button>
              <button className="flex items-center gap-1 text-[11.5px] font-[700] uppercase tracking-[0.06em]" style={{ color: '#94A3B8' }} onClick={() => handleSort('modified')}>
                Modified <SortIcon k="modified" />
              </button>
              <button className="flex items-center gap-1 text-[11.5px] font-[700] uppercase tracking-[0.06em]" style={{ color: '#94A3B8' }} onClick={() => handleSort('size')}>
                Size <SortIcon k="size" />
              </button>
              <div />
            </div>

            {/* Rows */}
            {filtered.map((file, i) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                onMouseEnter={() => setHovered(file.id)}
                onMouseLeave={() => { setHovered(null); if (actionRow === file.id) setActionRow(null); }}
                className="grid px-4 py-2.5 items-center cursor-pointer transition-all relative"
                style={{
                  gridTemplateColumns: '1fr 140px 100px 36px',
                  borderBottom: i < filtered.length - 1 ? '1px solid rgba(226,232,240,0.6)' : 'none',
                  background: hovered === file.id ? '#F8FAFC' : 'transparent',
                }}
              >
                {/* Name + thumb */}
                <div className="flex items-center gap-3 min-w-0">
                  <FileThumb file={file} size={30} />
                  <span className="text-[13px] font-[500] truncate" style={{ color: '#0F172A' }}>{file.name}</span>
                  {file.starred && <Star size={11} className="flex-shrink-0 fill-amber-400 text-amber-400" />}
                </div>
                {/* Modified */}
                <span className="text-[12.5px]" style={{ color: '#94A3B8' }}>{file.modified}</span>
                {/* Size */}
                <span className="text-[12.5px]" style={{ color: '#94A3B8' }}>{file.size}</span>
                {/* Actions */}
                <div className="flex justify-end">
                  <AnimatePresence>
                    {hovered === file.id && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={e => { e.stopPropagation(); setActionRow(actionRow === file.id ? null : file.id); }}
                        className="p-1 rounded-lg transition-all"
                        style={{ color: '#94A3B8' }}
                      >
                        <MoreHorizontal size={15} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Context menu */}
                <AnimatePresence>
                  {actionRow === file.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-4 top-10 z-10 rounded-xl overflow-hidden"
                      style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)', boxShadow: '0 8px 24px rgba(15,23,42,0.12)', width: 160 }}
                    >
                      {[
                        { icon: Download, label: 'Download' },
                        { icon: Share2, label: 'Share' },
                        { icon: Star, label: file.starred ? 'Unstar' : 'Star' },
                        { icon: Trash2, label: 'Delete', danger: true },
                      ].map(action => (
                        <button
                          key={action.label}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] font-[500] transition-all hover:bg-[#F8FAFC] text-left"
                          style={{ color: action.danger ? '#EF4444' : '#0F172A' }}
                        >
                          <action.icon size={13} />
                          {action.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-[14px] font-[500]" style={{ color: '#94A3B8' }}>No files found</p>
              </div>
            )}
          </div>
        )}

        {/* Grid view */}
        {view === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filtered.map((file, i) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-md"
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)' }}
              >
                {file.type === 'image' || file.type === 'svg' ? (
                  <div className="w-full h-28" style={{ background: file.thumb }} />
                ) : (
                  <div className="w-full h-28 flex items-center justify-center" style={{ background: '#F8FAFC' }}>
                    <FileThumb file={file} size={40} />
                  </div>
                )}
                <div className="p-3">
                  <p className="text-[12px] font-[600] truncate" style={{ color: '#0F172A' }}>{file.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: '#94A3B8' }}>{file.size} · {file.modified}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
