import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, SlidersHorizontal, LayoutGrid, List,
  Plus, ChevronDown, ChevronUp, ChevronRight,
  MoreHorizontal, Download, Share2, Trash2, Star,
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
  thumb: string;
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
  { id: 9,  name: 'gemini_sparkle_aurora_33f86dc0c0257da337c63.svg', type: 'svg', modified: 'Jul 21, 4:21 PM', modifiedTs: 2, size: '27.1 KB', sizeKb: 27, starred: false, thumb: 'linear-gradient(135deg,#fbbf24,#f97316)' },
  { id: 10, name: 'b56486b7-ba82-40c4-b775-477df9e5733b.png', type: 'image',    modified: 'Jul 21, 12:05 PM', modifiedTs: 1, size: '145 KB', sizeKb: 145, starred: false,  thumb: 'linear-gradient(135deg,#818cf8,#6ee7b7)' },
  { id: 11, name: 'AI workflow diagram.pdf',                   type: 'document', modified: 'Jul 21, 10:00 AM', modifiedTs: 0, size: '14.2 MB', sizeKb: 14200, starred: true,  thumb: '' },
  { id: 12, name: 'Application workspace terminology.docx',    type: 'document', modified: 'Jul 21, 9:30 AM',  modifiedTs: 0, size: '80.6 KB', sizeKb: 80,   starred: false, thumb: '' },
  { id: 13, name: 'Branch - AI workflow diagram.pdf',          type: 'document', modified: 'Jul 21, 9:00 AM',  modifiedTs: 0, size: '14.2 MB', sizeKb: 14200, starred: false, thumb: '' },
  { id: 14, name: 'Dev Server Setup Plan.txt',                 type: 'document', modified: 'Jul 20',           modifiedTs: 0, size: '34.1 KB', sizeKb: 34,   starred: false, thumb: '' },
];

const docColor = (name: string) => {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf')               return { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' };
  if (ext === 'docx' || ext === 'doc') return { color: '#6366F1', bg: 'rgba(99,102,241,0.1)' };
  return { color: '#475569', bg: '#1A1D24' };
};

function FileThumb({ file, size = 32 }: { file: LibFile; size?: number }) {
  if (file.type === 'image' || file.type === 'svg') {
    return <div className="rounded-lg flex-shrink-0" style={{ width: size, height: size, background: file.thumb }} />;
  }
  const { color, bg } = docColor(file.name);
  const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
  return (
    <div className="rounded-lg flex-shrink-0 flex items-center justify-center" style={{ width: size, height: size, background: bg }}>
      <span className="text-[9px] font-bold" style={{ color }}>{ext.slice(0, 3)}</span>
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
      if (tab === 'Images')    return f.type === 'image' || f.type === 'svg';
      if (tab === 'Documents') return f.type === 'document';
      return true;
    })
    .filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let diff = 0;
      if (sortKey === 'name')     diff = a.name.localeCompare(b.name);
      if (sortKey === 'modified') diff = a.modifiedTs - b.modifiedTs;
      if (sortKey === 'size')     diff = a.sizeKb - b.sizeKb;
      return sortDir === 'asc' ? diff : -diff;
    });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <span className="w-3" />;
    return sortDir === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />;
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#0A0C10' }}>
      <div className="max-w-5xl mx-auto p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[20px] font-semibold text-[#F8FAFC] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Library</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E3440]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search files…"
                className="pl-8 pr-3 py-2 text-[13px] rounded-xl outline-none w-52 transition-all"
                style={{ background: '#111318', border: '1px solid #1E222A', color: '#94A3B8' }}
                onFocus={e => { e.target.style.borderColor = '#6366F1'; }}
                onBlur={e => { e.target.style.borderColor = '#1E222A'; }}
              />
            </div>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-semibold text-white transition-all hover:bg-[#1D4ED8]" style={{ background: '#2563EB' }}>
              New <ChevronDown size={13} />
            </button>
          </div>
        </div>

        {/* Filter tabs + view controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: '#111318', border: '1px solid #1E222A' }}>
            {(['All', 'Images', 'Documents'] as FilterTab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                style={{
                  background: tab === t ? '#6366F1' : 'transparent',
                  color: tab === t ? '#fff' : '#475569',
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button className="p-2 rounded-lg text-[#475569] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all" style={{ border: '1px solid #1E222A' }}>
              <SlidersHorizontal size={13} />
            </button>
            <button
              onClick={() => setView('grid')}
              className="p-2 rounded-lg transition-all"
              style={{
                background: view === 'grid' ? 'rgba(99,102,241,0.1)' : 'transparent',
                color: view === 'grid' ? '#6366F1' : '#475569',
                border: '1px solid #1E222A',
              }}
            >
              <LayoutGrid size={13} />
            </button>
            <button
              onClick={() => setView('list')}
              className="p-2 rounded-lg transition-all"
              style={{
                background: view === 'list' ? 'rgba(99,102,241,0.1)' : 'transparent',
                color: view === 'list' ? '#6366F1' : '#475569',
                border: '1px solid #1E222A',
              }}
            >
              <List size={13} />
            </button>
          </div>
        </div>

        {/* List view */}
        {view === 'list' && (
          <div className="rounded-2xl overflow-hidden" style={{ background: '#111318', border: '1px solid #1E222A' }}>
            <div
              className="grid px-4 py-2.5"
              style={{ gridTemplateColumns: '1fr 140px 100px 36px', borderBottom: '1px solid #1E222A', background: '#0A0C10' }}
            >
              <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-left text-[#475569]" onClick={() => handleSort('name')}>
                Name <SortIcon k="name" />
              </button>
              <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#475569]" onClick={() => handleSort('modified')}>
                Modified <SortIcon k="modified" />
              </button>
              <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#475569]" onClick={() => handleSort('size')}>
                Size <SortIcon k="size" />
              </button>
              <div />
            </div>

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
                  borderBottom: i < filtered.length - 1 ? '1px solid #1E222A' : 'none',
                  background: hovered === file.id ? '#1A1D24' : 'transparent',
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileThumb file={file} size={28} />
                  <span className="text-[13px] font-medium truncate text-[#F8FAFC]">{file.name}</span>
                  {file.starred && <Star size={11} className="flex-shrink-0 fill-[#F59E0B] text-[#F59E0B]" />}
                </div>
                <span className="text-[12px] text-[#475569]">{file.modified}</span>
                <span className="text-[12px] text-[#475569]">{file.size}</span>
                <div className="flex justify-end">
                  <AnimatePresence>
                    {hovered === file.id && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={e => { e.stopPropagation(); setActionRow(actionRow === file.id ? null : file.id); }}
                        className="p-1 rounded-lg text-[#475569] hover:text-[#94A3B8] transition-all"
                      >
                        <MoreHorizontal size={14} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {actionRow === file.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-4 top-10 z-10 rounded-xl overflow-hidden"
                      style={{ background: '#1A1D24', border: '1px solid #2E3440', boxShadow: '0 12px 40px rgba(0,0,0,0.7)', width: 160 }}
                    >
                      {[
                        { icon: Download, label: 'Download' },
                        { icon: Share2,   label: 'Share' },
                        { icon: Star,     label: file.starred ? 'Unstar' : 'Star' },
                        { icon: Trash2,   label: 'Delete', danger: true },
                      ].map(action => (
                        <button
                          key={action.label}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] font-medium transition-all hover:bg-[#2E3440] text-left"
                          style={{ color: action.danger ? '#EF4444' : '#94A3B8' }}
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
                <p className="text-[14px] font-medium text-[#475569]">No files found</p>
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
                className="group rounded-xl overflow-hidden cursor-pointer transition-all hover:border-[#2E3440]"
                style={{ background: '#111318', border: '1px solid #1E222A' }}
              >
                {file.type === 'image' || file.type === 'svg' ? (
                  <div className="w-full h-28" style={{ background: file.thumb }} />
                ) : (
                  <div className="w-full h-28 flex items-center justify-center" style={{ background: '#1A1D24' }}>
                    <FileThumb file={file} size={40} />
                  </div>
                )}
                <div className="p-3">
                  <p className="text-[12px] font-semibold truncate text-[#F8FAFC]">{file.name}</p>
                  <p className="text-[11px] mt-0.5 text-[#475569]">{file.size} · {file.modified}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
