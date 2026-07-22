import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  RiImageLine,
  RiSparklingLine,
  RiDownloadLine,
  RiLoopRightLine,
  RiMagicLine,
  RiLayoutGridLine,
  RiListView,
  RiArrowDownSLine,
  RiEqualizerLine,
  RiAddLine,
  RiStarLine,
  RiStarFill,
  RiFileCopyLine,
} from '@remixicon/react';

const styles = ['Photorealistic', 'Digital Art', 'Oil Painting', 'Watercolor', 'Anime', 'Sketch', '3D Render', 'Cinematic'];
const sizes = ['1:1 Square', '16:9 Landscape', '9:16 Portrait', '4:3 Standard'];
const qualities = ['Standard', 'HD', 'Ultra HD'];

const gallery = [
  { id: 1, prompt: 'Futuristic city at sunset with neon lights and flying cars', style: 'Cinematic', size: '16:9', date: '2 min ago', liked: true },
  { id: 2, prompt: 'Abstract digital art with flowing blue and purple gradients', style: 'Digital Art', size: '1:1', date: '1 hr ago', liked: false },
  { id: 3, prompt: 'Portrait of a robot with human-like eyes, photorealistic', style: 'Photorealistic', size: '1:1', date: '3 hrs ago', liked: true },
  { id: 4, prompt: 'Serene Japanese garden with cherry blossoms and koi pond', style: 'Watercolor', size: '4:3', date: 'Yesterday', liked: false },
  { id: 5, prompt: 'Minimalist geometric patterns in black and gold', style: 'Digital Art', size: '1:1', date: 'Yesterday', liked: true },
  { id: 6, prompt: '3D rendered isometric city blocks with tiny people', style: '3D Render', size: '1:1', date: '2 days ago', liked: false },
];

const placeholderColors = [
  'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
  'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
  'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
  'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
  'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)',
  'linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)',
];

export default function Images() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Photorealistic');
  const [size, setSize] = useState('1:1 Square');
  const [quality, setQuality] = useState('HD');
  const [generating, setGenerating] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const generate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => setGenerating(false), 3000);
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-5">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Image Generation</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">Create stunning visuals with AI</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView('grid')} className={`p-2.5 rounded-[10px] transition-all ${view === 'grid' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#94A3B8] hover:bg-[#F8FAFC]'}`}><RiLayoutGridLine size={16} /></button>
            <button onClick={() => setView('list')} className={`p-2.5 rounded-[10px] transition-all ${view === 'list' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#94A3B8] hover:bg-[#F8FAFC]'}`}><RiListView size={16} /></button>
          </div>
        </div>

        <div className="rounded-[20px] p-5" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create…"
                rows={2}
                className="w-full px-4 py-3 text-[14px] text-[#0F172A] rounded-[14px] outline-none resize-none transition-all"
                style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)' }}
                onFocus={e => { e.target.style.borderColor = '#93C5FD'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; e.target.style.background = '#F8FAFC'; }}
              />
            </div>
            <button
              onClick={generate}
              disabled={!prompt.trim() || generating}
              className="flex-shrink-0 px-5 py-3 rounded-[14px] text-[13.5px] font-semibold text-white transition-all flex items-center gap-2"
              style={{
                background: prompt.trim() && !generating ? 'linear-gradient(135deg, #2563EB, #7C3AED)' : '#E2E8F0',
                color: prompt.trim() && !generating ? '#fff' : '#94A3B8',
                boxShadow: prompt.trim() && !generating ? '0 2px 12px rgba(37,99,235,0.3)' : 'none',
              }}
            >
              {generating ? <RiLoopRightLine size={15} className="animate-spin" /> : <RiSparklingLine size={15} />}
              {generating ? 'Generating…' : 'Generate'}
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <div>
              <p className="text-[11px] font-semibold text-[#94A3B8] mb-1.5">Style</p>
              <div className="flex flex-wrap gap-1.5">
                {styles.map(s => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className="px-2.5 py-1 rounded-full text-[12px] font-semibold transition-all"
                    style={{
                      background: style === s ? '#0F172A' : '#F8FAFC',
                      color: style === s ? '#fff' : '#64748B',
                      border: `1px solid ${style === s ? '#0F172A' : 'rgba(226,232,240,0.8)'}`,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 ml-auto">
              <div>
                <p className="text-[11px] font-semibold text-[#94A3B8] mb-1.5">Size</p>
                <select value={size} onChange={e => setSize(e.target.value)} className="px-3 py-1.5 rounded-[10px] text-[12.5px] font-medium text-[#475569] outline-none" style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)' }}>
                  {sizes.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#94A3B8] mb-1.5">Quality</p>
                <select value={quality} onChange={e => setQuality(e.target.value)} className="px-3 py-1.5 rounded-[10px] text-[12.5px] font-medium text-[#475569] outline-none" style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)' }}>
                  {qualities.map(q => <option key={q}>{q}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {generating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[20px] overflow-hidden"
            style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', aspectRatio: '16/7' }}
          >
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <RiSparklingLine size={24} className="text-white" />
              </motion.div>
              <div className="text-center">
                <p className="text-[15px] font-semibold text-[#0F172A]">Creating your image…</p>
                <p className="text-[13px] text-[#94A3B8] mt-0.5">This usually takes 5–15 seconds</p>
              </div>
              <div className="w-48 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #2563EB, #7C3AED)' }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div>
          <p className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-3">Recent Generations</p>
          <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
            {gallery.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-[16px] overflow-hidden relative cursor-pointer"
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                <div className="w-full" style={{ background: placeholderColors[i % placeholderColors.length], aspectRatio: '4/3' }} />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                  <button className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"><RiDownloadLine size={16} /></button>
                  <button className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"><RiFileCopyLine size={16} /></button>
                  <button className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"><RiLoopRightLine size={16} /></button>
                </div>
                <div className="p-3">
                  <p className="text-[12.5px] font-medium text-[#475569] line-clamp-2">{img.prompt}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] font-semibold text-[#CBD5E1]">{img.style} · {img.date}</span>
                    {img.liked && <RiStarFill size={12} className="text-amber-400" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
