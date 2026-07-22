import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RiMicLine, RiSparklingLine, RiPlayLine, RiPauseLine,
  RiDownloadLine, RiRefreshLine, RiVolumeUpLine, RiEqualizerLine,
  RiTimeLine, RiFileMusicLine,
} from '@remixicon/react';

const voices = [
  { id: 'alloy', name: 'Alloy', desc: 'Neutral, balanced', gender: 'Neutral' },
  { id: 'echo', name: 'Echo', desc: 'Deep, authoritative', gender: 'Male' },
  { id: 'fable', name: 'Fable', desc: 'Warm, expressive', gender: 'Male' },
  { id: 'onyx', name: 'Onyx', desc: 'Strong, confident', gender: 'Male' },
  { id: 'nova', name: 'Nova', desc: 'Bright, energetic', gender: 'Female' },
  { id: 'shimmer', name: 'Shimmer', desc: 'Soft, friendly', gender: 'Female' },
];

const formats = ['MP3', 'WAV', 'OGG', 'FLAC'];
const speeds = ['0.5×', '0.75×', '1×', '1.25×', '1.5×', '2×'];

const history = [
  { id: 1, text: 'Welcome to our platform. We\'re excited to have you on board.', voice: 'Nova', duration: '0:08', date: '5 min ago' },
  { id: 2, text: 'Chapter one: The journey begins with a single step into the unknown.', voice: 'Echo', duration: '0:06', date: '1 hr ago' },
  { id: 3, text: 'Your order has been confirmed and will ship within 2-3 business days.', voice: 'Alloy', duration: '0:05', date: 'Yesterday' },
];

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('nova');
  const [format, setFormat] = useState('MP3');
  const [speed, setSpeed] = useState('1×');
  const [generating, setGenerating] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);

  const charLimit = 4000;

  const generate = () => {
    if (!text.trim()) return;
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2500);
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-4xl mx-auto p-6 space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Text to Speech</h1>
          <p className="text-[14px] text-[#64748B] mt-0.5">Convert text into natural-sounding AI voice</p>
        </div>

        {/* Main card */}
        <div className="rounded-[20px] p-5 space-y-4" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

          {/* Text input */}
          <div className="relative">
            <textarea
              value={text}
              onChange={e => setText(e.target.value.slice(0, charLimit))}
              placeholder="Type or paste the text you want to convert to speech…"
              rows={5}
              className="w-full px-4 py-3 text-[14px] text-[#0F172A] rounded-[14px] outline-none resize-none transition-all leading-relaxed"
              style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)' }}
              onFocus={e => { e.target.style.borderColor = '#93C5FD'; e.target.style.background = '#fff'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; e.target.style.background = '#F8FAFC'; }}
            />
            <span className="absolute bottom-3 right-3 text-[11px] text-[#CBD5E1]">
              {text.length}/{charLimit}
            </span>
          </div>

          {/* Voice selector */}
          <div>
            <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.08em] mb-2">Voice</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {voices.map(v => (
                <button
                  key={v.id}
                  onClick={() => setVoice(v.id)}
                  className="p-2.5 rounded-[12px] text-center transition-all"
                  style={{
                    background: voice === v.id ? '#EFF6FF' : '#F8FAFC',
                    border: `1px solid ${voice === v.id ? '#BFDBFE' : 'rgba(226,232,240,0.8)'}`,
                  }}
                >
                  <p className="text-[13px] font-bold" style={{ color: voice === v.id ? '#2563EB' : '#0F172A' }}>{v.name}</p>
                  <p className="text-[10.5px] text-[#94A3B8] mt-0.5 leading-tight">{v.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Format + Speed */}
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.08em] mb-2">Format</p>
              <div className="flex gap-1.5">
                {formats.map(f => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className="px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-all"
                    style={{
                      background: format === f ? '#0F172A' : '#F8FAFC',
                      color: format === f ? '#fff' : '#64748B',
                      border: `1px solid ${format === f ? '#0F172A' : 'rgba(226,232,240,0.8)'}`,
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.08em] mb-2">Speed</p>
              <div className="flex gap-1.5">
                {speeds.map(s => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className="px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-all"
                    style={{
                      background: speed === s ? '#0F172A' : '#F8FAFC',
                      color: speed === s ? '#fff' : '#64748B',
                      border: `1px solid ${speed === s ? '#0F172A' : 'rgba(226,232,240,0.8)'}`,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={generate}
            disabled={!text.trim() || generating}
            className="w-full py-3 rounded-[14px] text-[14px] font-semibold text-white flex items-center justify-center gap-2 transition-all"
            style={{
              background: text.trim() && !generating ? 'linear-gradient(135deg, #2563EB, #7C3AED)' : '#E2E8F0',
              color: text.trim() && !generating ? '#fff' : '#94A3B8',
              boxShadow: text.trim() && !generating ? '0 2px 12px rgba(37,99,235,0.3)' : 'none',
            }}
          >
            {generating ? (
              <>
                <RiRefreshLine size={15} className="animate-spin" />
                Generating audio…
              </>
            ) : (
              <>
                <RiSparklingLine size={15} />
                Generate Speech
              </>
            )}
          </button>

          {/* Generating state */}
          <AnimatePresence>
            {generating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center justify-center gap-2 py-3">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full"
                      style={{ background: 'linear-gradient(180deg, #2563EB, #7C3AED)' }}
                      animate={{ height: [8, 28 + (i % 3) * 8, 8] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* History */}
        <div>
          <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-[0.08em] mb-3">Recent Generations</p>
          <div className="space-y-2">
            {history.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-[16px] p-4 flex items-center gap-4"
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
              >
                <button
                  onClick={() => setPlaying(playing === item.id ? null : item.id)}
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: playing === item.id ? 'linear-gradient(135deg, #2563EB, #7C3AED)' : '#EFF6FF' }}
                >
                  {playing === item.id
                    ? <RiPauseLine size={14} className="text-white" />
                    : <RiPlayLine size={14} className="text-[#2563EB]" />
                  }
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#0F172A] line-clamp-1">{item.text}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] text-[#CBD5E1] flex items-center gap-1"><RiVolumeUpLine size={10} />{item.voice}</span>
                    <span className="text-[11px] text-[#CBD5E1] flex items-center gap-1"><RiTimeLine size={10} />{item.duration}</span>
                    <span className="text-[11px] text-[#CBD5E1]">{item.date}</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg text-[#94A3B8] hover:text-[#475569] hover:bg-[#F8FAFC] transition-all flex-shrink-0">
                  <RiDownloadLine size={15} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
