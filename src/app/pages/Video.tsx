import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Video as VideoIcon, Play, Sparkles, RefreshCw, Download, Clock, Zap, Film, Upload } from 'lucide-react';

const durations = ['5s', '10s', '15s', '30s'];
const styles = ['Cinematic', 'Anime', 'Realistic', 'Cartoon', '3D Animated', 'Documentary'];
const ratios = ['16:9', '9:16', '1:1', '4:3'];

const recent = [
  { title: 'Product demo flythrough', duration: '15s', style: 'Cinematic', status: 'ready', date: '1 hr ago', color: 'linear-gradient(135deg, #667EEA, #764BA2)' },
  { title: 'Abstract fluid motion loop', duration: '10s', style: '3D Animated', status: 'ready', date: '3 hrs ago', color: 'linear-gradient(135deg, #4FACFE, #00F2FE)' },
  { title: 'Nature timelapse sunrise', duration: '30s', style: 'Realistic', status: 'processing', date: 'In progress', color: 'linear-gradient(135deg, #43E97B, #38F9D7)' },
];

export default function Video() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Cinematic');
  const [duration, setDuration] = useState('10s');
  const [ratio, setRatio] = useState('16:9');
  const [generating, setGenerating] = useState(false);
  const [mode, setMode] = useState<'text' | 'image'>('text');

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-4xl mx-auto p-6 space-y-5">

        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Video Generation</h1>
          <p className="text-[14px] text-[#64748B] mt-0.5">Generate videos from text or images</p>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-1 p-1 rounded-[14px] w-fit" style={{ background: '#F1F5F9' }}>
          {(['text', 'image'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-all capitalize"
              style={{
                background: mode === m ? '#fff' : 'transparent',
                color: mode === m ? '#0F172A' : '#94A3B8',
                boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              {m === 'text' ? 'Text to Video' : 'Image to Video'}
            </button>
          ))}
        </div>

        {/* Generator */}
        <div className="rounded-[20px] p-5" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          {mode === 'image' ? (
            <div className="border-2 border-dashed border-[#E2E8F0] rounded-[16px] p-10 text-center mb-4 hover:border-[#93C5FD] transition-all cursor-pointer group">
              <Upload size={28} className="mx-auto mb-3 text-[#CBD5E1] group-hover:text-[#93C5FD] transition-colors" />
              <p className="text-[14px] font-semibold text-[#475569]">Drop an image to animate</p>
              <p className="text-[12.5px] text-[#94A3B8] mt-1">PNG, JPG up to 10MB</p>
            </div>
          ) : null}

          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={mode === 'text' ? 'Describe your video scene in detail…' : 'Describe the motion and animation (optional)…'}
            rows={3}
            className="w-full px-4 py-3 text-[14px] text-[#0F172A] rounded-[14px] outline-none resize-none transition-all mb-4"
            style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)' }}
            onFocus={e => { e.target.style.borderColor = '#93C5FD'; e.target.style.background = '#fff'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; e.target.style.background = '#F8FAFC'; }}
          />

          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <p className="text-[11px] font-semibold text-[#94A3B8] mb-1.5">Style</p>
              <div className="flex flex-wrap gap-1.5">
                {styles.map(s => (
                  <button key={s} onClick={() => setStyle(s)}
                    className="px-2.5 py-1 rounded-full text-[12px] font-semibold transition-all"
                    style={{ background: style === s ? '#0F172A' : '#F8FAFC', color: style === s ? '#fff' : '#64748B', border: `1px solid ${style === s ? '#0F172A' : 'rgba(226,232,240,0.8)'}` }}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 ml-auto">
              <div>
                <p className="text-[11px] font-semibold text-[#94A3B8] mb-1.5">Duration</p>
                <div className="flex gap-1">
                  {durations.map(d => (
                    <button key={d} onClick={() => setDuration(d)}
                      className="px-2.5 py-1.5 rounded-[8px] text-[12px] font-semibold transition-all"
                      style={{ background: duration === d ? '#EFF6FF' : '#F8FAFC', color: duration === d ? '#2563EB' : '#64748B', border: `1px solid ${duration === d ? '#BFDBFE' : 'rgba(226,232,240,0.8)'}` }}
                    >{d}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#94A3B8] mb-1.5">Ratio</p>
                <div className="flex gap-1">
                  {ratios.map(r => (
                    <button key={r} onClick={() => setRatio(r)}
                      className="px-2.5 py-1.5 rounded-[8px] text-[12px] font-semibold transition-all"
                      style={{ background: ratio === r ? '#EFF6FF' : '#F8FAFC', color: ratio === r ? '#2563EB' : '#64748B', border: `1px solid ${ratio === r ? '#BFDBFE' : 'rgba(226,232,240,0.8)'}` }}
                    >{r}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => { setGenerating(true); setTimeout(() => setGenerating(false), 4000); }}
            disabled={!prompt.trim() || generating}
            className="w-full py-3 rounded-[14px] text-[14px] font-semibold text-white flex items-center justify-center gap-2 transition-all"
            style={{
              background: prompt.trim() && !generating ? 'linear-gradient(135deg, #2563EB, #7C3AED)' : '#E2E8F0',
              color: prompt.trim() && !generating ? '#fff' : '#94A3B8',
              boxShadow: prompt.trim() && !generating ? '0 2px 12px rgba(37,99,235,0.3)' : 'none',
            }}
          >
            {generating ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {generating ? 'Generating video…' : 'Generate Video'}
          </button>

          {generating && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #2563EB, #7C3AED)' }}
                  animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
              </div>
              <span className="text-[12px] text-[#94A3B8] flex-shrink-0">Processing…</span>
            </div>
          )}
        </div>

        {/* Credits notice */}
        <div className="flex items-center gap-3 p-4 rounded-[14px]" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <Zap size={16} className="text-amber-500 flex-shrink-0" />
          <p className="text-[13px] text-amber-800">Video generation uses <strong>50 credits per 10 seconds</strong>. You have <strong>500 credits</strong> remaining.</p>
        </div>

        {/* Recent videos */}
        <div>
          <p className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-3">Recent Generations</p>
          <div className="space-y-3">
            {recent.map((v, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-[16px]" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                <div className="w-20 h-12 rounded-[10px] flex items-center justify-center flex-shrink-0 relative" style={{ background: v.color }}>
                  {v.status === 'processing'
                    ? <RefreshCw size={16} className="text-white animate-spin" />
                    : <Play size={16} className="text-white" />
                  }
                  <span className="absolute bottom-1 right-1 text-[10px] font-bold text-white">{v.duration}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#0F172A] truncate">{v.title}</p>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">{v.style} · {v.date}</p>
                </div>
                {v.status === 'ready' && (
                  <button className="p-2 rounded-[10px] text-[#94A3B8] hover:text-[#475569] hover:bg-[#F8FAFC] transition-all">
                    <Download size={15} />
                  </button>
                )}
                {v.status === 'processing' && (
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Processing</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
