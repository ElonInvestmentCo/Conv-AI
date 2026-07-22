import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic, Plus, ChevronLeft, ChevronRight, Download,
  RotateCcw, Copy, Edit, MoreHorizontal, Star, Search,
} from 'lucide-react';

const stylePresets = [
  { label: 'Handwritten style', color: 'linear-gradient(135deg,#fbbf24,#f97316)', emoji: '✍️' },
  { label: 'Anime',            color: 'linear-gradient(135deg,#a78bfa,#ec4899)', emoji: '🎌' },
  { label: 'Interior design',  color: 'linear-gradient(135deg,#6ee7b7,#3b82f6)', emoji: '🛋️' },
  { label: 'Deco mode',        color: 'linear-gradient(135deg,#fcd34d,#f59e0b)', emoji: '✨' },
  { label: 'App design',       color: 'linear-gradient(135deg,#818cf8,#6366f1)', emoji: '📱' },
  { label: 'Watercolor',       color: 'linear-gradient(135deg,#67e8f9,#a78bfa)', emoji: '🎨' },
  { label: '3D Render',        color: 'linear-gradient(135deg,#f9a8d4,#fb7185)', emoji: '🧊' },
  { label: 'Photorealistic',   color: 'linear-gradient(135deg,#94a3b8,#475569)', emoji: '📷' },
];

const gallery = [
  { id: 1,  prompt: 'Futuristic AI platform logo with speech bubble and gradient',    style: 'Digital Art',    size: '1:1',  date: '2 min ago', liked: true,  color: 'linear-gradient(135deg,#3b82f6,#a855f7)' },
  { id: 2,  prompt: 'Conv AI logo in dark background with glowing blue ring',         style: 'Digital Art',    size: '1:1',  date: '2 min ago', liked: true,  color: 'linear-gradient(135deg,#1e293b,#3b82f6)' },
  { id: 3,  prompt: 'Conv AI wordmark flat design on dark surface',                   style: 'Digital Art',    size: '1:1',  date: '2 min ago', liked: false, color: 'linear-gradient(135deg,#0f172a,#2563eb)' },
  { id: 4,  prompt: 'C letter monogram with chat dots, gradient purple to blue',      style: 'Digital Art',    size: '1:1',  date: '1 hr ago',  liked: true,  color: 'linear-gradient(135deg,#7c3aed,#2563eb)' },
  { id: 5,  prompt: 'Fintech mobile app UI: fund wallet, transactions, send money',   style: 'App design',     size: '9:16', date: '1 hr ago',  liked: false, color: 'linear-gradient(135deg,#064e3b,#065f46)' },
  { id: 6,  prompt: 'Transaction success screen with dark teal fintech UI',           style: 'App design',     size: '9:16', date: '1 hr ago',  liked: false, color: 'linear-gradient(135deg,#0f4c3a,#1e7a5a)' },
  { id: 7,  prompt: 'Options trading dashboard: per-contract pricing, commissions',   style: 'App design',     size: '16:9', date: '2 hrs ago', liked: false, color: 'linear-gradient(135deg,#0c1222,#1e293b)' },
  { id: 8,  prompt: 'P monogram logo minimal bold black on white rounded square',     style: 'Minimal',        size: '1:1',  date: '4 hrs ago', liked: true,  color: 'linear-gradient(135deg,#f8fafc,#e2e8f0)' },
  { id: 9,  prompt: 'Gradient AI profile silhouette, purple blue cosmic background',  style: 'Cinematic',      size: '1:1',  date: '4 hrs ago', liked: false, color: 'linear-gradient(135deg,#1e1b4b,#7c3aed)' },
  { id: 10, prompt: 'Headshot photo of tech executive in grey turtleneck',            style: 'Photorealistic', size: '1:1',  date: 'Yesterday', liked: false, color: 'linear-gradient(135deg,#cbd5e1,#94a3b8)' },
];

const aspectClass: Record<string, string> = {
  '1:1':  'aspect-square',
  '16:9': 'aspect-video',
  '9:16': 'aspect-[9/16]',
};

function ImageCard({ img }: { img: typeof gallery[0] }) {
  const [hov, setHov] = useState(false);
  const [liked, setLiked] = useState(img.liked);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-2xl overflow-hidden relative cursor-pointer"
      style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image placeholder */}
      <div className={`w-full ${aspectClass[img.size] || 'aspect-square'}`} style={{ background: img.color }} />

      {/* Hover overlay */}
      <AnimatePresence>
        {hov && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center gap-2"
            style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(2px)' }}
          >
            {[
              { icon: Edit, title: 'Edit' },
              { icon: Download, title: 'Download' },
              { icon: Copy, title: 'Copy' },
              { icon: RotateCcw, title: 'Regenerate' },
            ].map(a => (
              <button
                key={a.title}
                title={a.title}
                className="p-2.5 rounded-xl text-white transition-all hover:bg-white/20"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <a.icon size={14} />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Star button */}
      <button
        onClick={e => { e.stopPropagation(); setLiked(!liked); }}
        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
        style={{ background: liked ? '#FEF3C7' : 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)' }}
      >
        <Star size={12} className={liked ? 'fill-amber-400 text-amber-400' : 'text-[#94A3B8]'} />
      </button>

      {/* Caption */}
      <div className="p-3">
        <p className="text-[12px] font-[500] line-clamp-2 leading-snug" style={{ color: '#475569' }}>{img.prompt}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px]" style={{ color: '#CBD5E1' }}>{img.style} · {img.date}</span>
          <button className="p-0.5 text-[#CBD5E1] hover:text-[#64748B]">
            <MoreHorizontal size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Images() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [presetIdx, setPresetIdx] = useState(0);
  const [search, setSearch] = useState('');
  const visiblePresets = 5;

  const generate = () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setTimeout(() => setGenerating(false), 3000);
  };

  const filteredGallery = gallery.filter(g =>
    !search || g.prompt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F8FAFC' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Page header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] font-[800] tracking-[-0.02em]" style={{ color: '#0F172A' }}>Images</h1>
        </div>

        {/* Prompt bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)', boxShadow: '0 2px 12px rgba(15,23,42,0.06)' }}
        >
          <Mic size={16} style={{ color: '#CBD5E1', flexShrink: 0 }} />
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generate()}
            placeholder="Describe a new image…"
            className="flex-1 text-[14px] outline-none bg-transparent"
            style={{ color: '#0F172A' }}
          />
          <button
            onClick={generate}
            disabled={!prompt.trim()}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-40"
            style={{ background: prompt.trim() ? 'linear-gradient(135deg,#0F172A,#1E293B)' : '#E2E8F0' }}
          >
            {generating ? (
              <motion.div
                className="w-3 h-3 rounded-full border-2 border-white border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
            ) : (
              <Plus size={15} className="text-white" />
            )}
          </button>
        </div>

        {/* Create an image — style presets */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[15px] font-[700]" style={{ color: '#0F172A' }}>Create an image</p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPresetIdx(Math.max(0, presetIdx - 1))}
                disabled={presetIdx === 0}
                className="p-1.5 rounded-lg transition-all disabled:opacity-30"
                style={{ border: '1px solid rgba(226,232,240,0.9)', background: '#fff', color: '#64748B' }}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setPresetIdx(Math.min(stylePresets.length - visiblePresets, presetIdx + 1))}
                disabled={presetIdx >= stylePresets.length - visiblePresets}
                className="p-1.5 rounded-lg transition-all disabled:opacity-30"
                style={{ border: '1px solid rgba(226,232,240,0.9)', background: '#fff', color: '#64748B' }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${visiblePresets}, 1fr)` }}>
            {stylePresets.slice(presetIdx, presetIdx + visiblePresets).map((preset, i) => (
              <motion.button
                key={preset.label}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setPrompt(preset.label + ' style: ')}
                className="rounded-2xl overflow-hidden text-left transition-all hover:shadow-md hover:-translate-y-0.5 group"
                style={{ border: '1px solid rgba(226,232,240,0.9)' }}
              >
                <div className="h-20 relative" style={{ background: preset.color }}>
                  <span className="absolute bottom-2 left-2 text-xl">{preset.emoji}</span>
                </div>
                <div className="px-2.5 py-2" style={{ background: '#fff' }}>
                  <p className="text-[12px] font-[600] leading-snug" style={{ color: '#0F172A' }}>{preset.label}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Generating state */}
        <AnimatePresence>
          {generating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl p-6 flex flex-col items-center gap-4 text-center"
              style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)' }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#EFF6FF,#F5F3FF)' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  ✨
                </motion.div>
              </div>
              <div>
                <p className="text-[15px] font-[600]" style={{ color: '#0F172A' }}>Creating your image…</p>
                <p className="text-[13px] mt-0.5" style={{ color: '#94A3B8' }}>This usually takes 5–15 seconds</p>
              </div>
              <div className="w-48 h-1.5 rounded-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg,#2563EB,#7C3AED)' }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* My images */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[15px] font-[700]" style={{ color: '#0F172A' }}>My images</p>
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#CBD5E1' }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search images…"
                className="pl-8 pr-3 py-1.5 text-[12.5px] rounded-xl outline-none w-44 transition-all"
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)', color: '#0F172A' }}
                onFocus={e => { e.target.style.borderColor = '#93C5FD'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.9)'; }}
              />
            </div>
          </div>

          {/* Masonry-style grid: 2 wide + 3 narrow columns */}
          <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
            {filteredGallery.map(img => (
              <div key={img.id} className="break-inside-avoid">
                <ImageCard img={img} />
              </div>
            ))}
          </div>

          {filteredGallery.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[14px]" style={{ color: '#94A3B8' }}>No images found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
