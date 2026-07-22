import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText, Upload, Search, Sparkles, Download, Trash2,
  Eye, MessageSquare, Clock, File, FileImage, FileCode,
  Filter, Grid, List, Plus, ChevronRight
} from 'lucide-react';

const docs = [
  { id: 1, name: 'Q3 Product Roadmap.pdf', type: 'pdf', size: '2.4 MB', pages: 24, date: '5 min ago', analyzed: true, summary: 'Strategic product direction for Q3 covering 6 major initiatives.' },
  { id: 2, name: 'Technical Architecture.docx', type: 'doc', size: '1.1 MB', pages: 38, date: '2 hrs ago', analyzed: true, summary: 'System architecture for microservices migration.' },
  { id: 3, name: 'User Research Report.pdf', type: 'pdf', size: '4.7 MB', pages: 56, date: '1 day ago', analyzed: false, summary: null },
  { id: 4, name: 'API Documentation.md', type: 'code', size: '0.3 MB', pages: null, date: '2 days ago', analyzed: true, summary: 'Complete REST API reference with authentication and examples.' },
  { id: 5, name: 'Brand Guidelines.pdf', type: 'pdf', size: '8.2 MB', pages: 72, date: '3 days ago', analyzed: true, summary: 'Brand identity system including typography, colors, and usage.' },
  { id: 6, name: 'Screenshot.png', type: 'image', size: '1.8 MB', pages: null, date: '1 week ago', analyzed: false, summary: null },
];

const typeConfig: Record<string, { icon: any; color: string; bg: string }> = {
  pdf: { icon: FileText, color: '#EF4444', bg: '#FEF2F2' },
  doc: { icon: File, color: '#2563EB', bg: '#EFF6FF' },
  code: { icon: FileCode, color: '#059669', bg: '#F0FDF4' },
  image: { icon: FileImage, color: '#7C3AED', bg: '#F5F3FF' },
};

export default function Documents() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = docs.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()));
  const selectedDoc = docs.find(d => d.id === selected);

  return (
    <div className="h-full flex overflow-hidden" style={{ background: '#F7F9FC' }}>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Documents</h1>
              <p className="text-[14px] text-[#64748B] mt-0.5">{docs.length} files · {docs.filter(d => d.analyzed).length} analyzed</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setView('grid')} className={`p-2.5 rounded-[10px] transition-all ${view === 'grid' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#94A3B8] hover:bg-[#F8FAFC]'}`}><Grid size={15} /></button>
              <button onClick={() => setView('list')} className={`p-2.5 rounded-[10px] transition-all ${view === 'list' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#94A3B8] hover:bg-[#F8FAFC]'}`}><List size={15} /></button>
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[13.5px] font-semibold text-white cursor-pointer transition-all" style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}>
                <Plus size={15} /> Upload
                <input type="file" className="hidden" multiple />
              </label>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search documents…"
              className="w-full pl-11 pr-4 py-2.5 text-[14px] rounded-[14px] outline-none"
              style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            />
          </div>

          {/* Drop zone */}
          <div
            className="border-2 border-dashed rounded-[18px] p-8 text-center transition-all cursor-pointer"
            style={{ borderColor: dragging ? '#93C5FD' : '#E2E8F0', background: dragging ? '#EFF6FF' : '#fff' }}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); }}
          >
            <Upload size={24} className="mx-auto mb-2" style={{ color: dragging ? '#2563EB' : '#CBD5E1' }} />
            <p className="text-[14px] font-semibold" style={{ color: dragging ? '#2563EB' : '#475569' }}>Drop files to analyze with AI</p>
            <p className="text-[12.5px] text-[#94A3B8] mt-0.5">PDF, DOCX, TXT, MD, PNG, JPG up to 50MB</p>
          </div>

          {/* Doc list */}
          <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'space-y-2'}>
            {filtered.map((doc, i) => {
              const tc = typeConfig[doc.type];
              const Icon = tc.icon;
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelected(doc.id === selected ? null : doc.id)}
                  className={`group cursor-pointer transition-all rounded-[16px] ${view === 'list' ? 'flex items-center gap-4 p-4' : 'p-4'}`}
                  style={{
                    background: '#fff',
                    border: `1px solid ${selected === doc.id ? '#93C5FD' : 'rgba(226,232,240,0.8)'}`,
                    boxShadow: selected === doc.id ? '0 0 0 2px #BFDBFE' : '0 1px 4px rgba(0,0,0,0.03)',
                  }}
                >
                  <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 ${view === 'grid' ? 'mb-3' : ''}`} style={{ background: tc.bg }}>
                    <Icon size={18} style={{ color: tc.color }} />
                  </div>
                  <div className={`flex-1 min-w-0 ${view === 'list' ? '' : ''}`}>
                    <div className="flex items-center gap-2">
                      <p className="text-[13.5px] font-semibold text-[#0F172A] truncate">{doc.name}</p>
                      {doc.analyzed && <Sparkles size={11} className="text-[#2563EB] flex-shrink-0" />}
                    </div>
                    <p className="text-[12px] text-[#94A3B8] mt-0.5 flex items-center gap-2">
                      <span>{doc.size}</span>
                      {doc.pages && <span>· {doc.pages} pages</span>}
                      <span>· {doc.date}</span>
                    </p>
                    {doc.summary && view === 'list' && (
                      <p className="text-[12px] text-[#64748B] mt-1 line-clamp-1">{doc.summary}</p>
                    )}
                  </div>
                  {view === 'list' && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-all" title="Chat"><MessageSquare size={13} /></button>
                      <button className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC] transition-all" title="Download"><Download size={13} /></button>
                      <button className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-red-500 hover:bg-red-50 transition-all" title="Delete"><Trash2 size={13} /></button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selectedDoc && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 flex-shrink-0 flex flex-col overflow-hidden"
          style={{ background: '#fff', borderLeft: '1px solid rgba(226,232,240,0.8)' }}
        >
          <div className="p-5" style={{ borderBottom: '1px solid #F1F5F9' }}>
            <div className="flex items-center gap-3 mb-4">
              {(() => { const tc = typeConfig[selectedDoc.type]; const Icon = tc.icon; return <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: tc.bg }}><Icon size={18} style={{ color: tc.color }} /></div>; })()}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-[#0F172A] truncate">{selectedDoc.name}</p>
                <p className="text-[12px] text-[#94A3B8]">{selectedDoc.size} {selectedDoc.pages ? `· ${selectedDoc.pages} pages` : ''}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-[10px] text-[13px] font-semibold text-[#2563EB] flex items-center justify-center gap-1.5 transition-all" style={{ background: '#EFF6FF' }}>
                <MessageSquare size={13} /> Chat
              </button>
              <button className="p-2 rounded-[10px] text-[#94A3B8] hover:text-[#475569] hover:bg-[#F8FAFC] transition-all">
                <Download size={15} />
              </button>
              <button className="p-2 rounded-[10px] text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-all">
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {selectedDoc.analyzed && selectedDoc.summary && (
              <div>
                <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-2">AI Summary</p>
                <div className="p-4 rounded-[14px]" style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)' }}>
                  <p className="text-[13px] text-[#475569] leading-relaxed">{selectedDoc.summary}</p>
                </div>
              </div>
            )}
            {!selectedDoc.analyzed && (
              <div className="text-center py-8">
                <Sparkles size={24} className="mx-auto mb-3 text-[#CBD5E1]" />
                <p className="text-[13px] font-semibold text-[#475569]">Not yet analyzed</p>
                <button className="mt-3 px-4 py-2 rounded-[12px] text-[13px] font-semibold text-white" style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}>
                  Analyze with AI
                </button>
              </div>
            )}
            <div>
              <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-2">Details</p>
              {[
                { label: 'Uploaded', value: selectedDoc.date },
                { label: 'Size', value: selectedDoc.size },
                { label: 'Pages', value: selectedDoc.pages?.toString() ?? '—' },
                { label: 'Type', value: selectedDoc.type.toUpperCase() },
              ].map((d, i) => (
                <div key={i} className="flex justify-between py-2.5" style={{ borderBottom: i < 3 ? '1px solid #F8FAFC' : 'none' }}>
                  <span className="text-[12.5px] text-[#94A3B8]">{d.label}</span>
                  <span className="text-[12.5px] font-semibold text-[#0F172A]">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
