import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Play, Pause,
  Download, RefreshCw, Volume2, Clock,
} from 'lucide-react';

const voices = [
  { id: 'alloy',   name: 'Alloy',   desc: 'Neutral, balanced',   gender: 'Neutral' },
  { id: 'echo',    name: 'Echo',    desc: 'Deep, authoritative',  gender: 'Male'    },
  { id: 'fable',   name: 'Fable',   desc: 'Warm, expressive',    gender: 'Male'    },
  { id: 'onyx',    name: 'Onyx',    desc: 'Strong, confident',   gender: 'Male'    },
  { id: 'nova',    name: 'Nova',    desc: 'Bright, energetic',   gender: 'Female'  },
  { id: 'shimmer', name: 'Shimmer', desc: 'Soft, friendly',      gender: 'Female'  },
];

const formats = ['MP3', 'WAV', 'OGG', 'FLAC'];
const speeds  = ['0.5×', '0.75×', '1×', '1.25×', '1.5×', '2×'];

const history = [
  { id: 1, text: "Welcome to our platform. We're excited to have you on board.", voice: 'Nova',  duration: '0:08', date: '5 min ago'  },
  { id: 2, text: 'Chapter one: The journey begins with a single step into the unknown.',          voice: 'Echo',  duration: '0:06', date: '1 hr ago'   },
  { id: 3, text: 'Your order has been confirmed and will ship within 2-3 business days.',         voice: 'Alloy', duration: '0:05', date: 'Yesterday'  },
];

const speedMap: Record<string, number> = {
  '0.5×': 0.5, '0.75×': 0.75, '1×': 1, '1.25×': 1.25, '1.5×': 1.5, '2×': 2,
};

export default function TextToSpeech() {
  const [text, setText]           = useState('');
  const [voice, setVoice]         = useState('nova');
  const [format, setFormat]       = useState('MP3');
  const [speed, setSpeed]         = useState('1×');
  const [generating, setGenerating] = useState(false);
  const [playing, setPlaying]     = useState<number | null>(null);
  const [genError, setGenError]   = useState('');
  const [audioHistory, setAudioHistory] = useState<
    { id: number; text: string; voice: string; audioUrl: string; duration: string; date: string }[]
  >([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const charLimit = 4000;

  const generate = async () => {
    if (!text.trim() || generating) return;
    setGenerating(true);
    setGenError('');
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice, format, speed: speedMap[speed] ?? 1 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'TTS generation failed');

      const id = Date.now();
      setAudioHistory(prev => [
        { id, text, voice: voices.find(v => v.id === voice)?.name ?? voice,
          audioUrl: data.audio, duration: '—', date: 'Just now' },
        ...prev,
      ]);
      // Auto-play the new audio
      if (audioRef.current) audioRef.current.pause();
      audioRef.current = new Audio(data.audio);
      audioRef.current.play();
      setPlaying(id);
      audioRef.current.onended = () => setPlaying(null);
    } catch (err) {
      setGenError(err instanceof Error ? err.message : 'TTS generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const togglePlay = (id: number, audioUrl: string) => {
    if (playing === id) {
      audioRef.current?.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setPlaying(id);
      audioRef.current.onended = () => setPlaying(null);
    }
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#0A0C10' }}>
      <div className="max-w-4xl mx-auto p-6 space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-[20px] font-semibold text-[#F8FAFC] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Text to Speech</h1>
          <p className="text-[13px] text-[#475569] mt-0.5">Convert text into natural-sounding AI voice</p>
        </div>

        {/* Main card */}
        <div className="rounded-2xl p-5 space-y-4" style={{ background: '#111318', border: '1px solid #1E222A' }}>

          {/* Text input */}
          <div className="relative">
            <textarea
              value={text}
              onChange={e => setText(e.target.value.slice(0, charLimit))}
              placeholder="Type or paste the text you want to convert to speech…"
              rows={5}
              className="w-full px-4 py-3 text-[14px] rounded-xl outline-none resize-none transition-all leading-relaxed text-[#F8FAFC] placeholder-[#2E3440]"
              style={{ background: '#1A1D24' }}
            />
            <span className="absolute bottom-3 right-3 text-[11px] text-[#2E3440]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {text.length}/{charLimit}
            </span>
          </div>

          {/* Voice selector */}
          <div>
            <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest mb-2">Voice</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {voices.map(v => (
                <button
                  key={v.id}
                  onClick={() => setVoice(v.id)}
                  className="p-2.5 rounded-xl text-center transition-all"
                  style={{
                    background: voice === v.id ? 'rgba(99,102,241,0.1)' : '#1A1D24',
                    border: `1px solid ${voice === v.id ? '#6366F1' : '#1E222A'}`,
                  }}
                >
                  <p className="text-[13px] font-bold" style={{ color: voice === v.id ? '#6366F1' : '#F8FAFC' }}>{v.name}</p>
                  <p className="text-[10px] text-[#475569] mt-0.5 leading-tight">{v.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Format + Speed */}
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest mb-2">Format</p>
              <div className="flex gap-1.5">
                {formats.map(f => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                    style={{
                      background: format === f ? '#6366F1' : '#1A1D24',
                      color: format === f ? '#fff' : '#475569',
                      border: `1px solid ${format === f ? '#6366F1' : '#1E222A'}`,
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest mb-2">Speed</p>
              <div className="flex gap-1.5">
                {speeds.map(s => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                    style={{
                      background: speed === s ? '#6366F1' : '#1A1D24',
                      color: speed === s ? '#fff' : '#475569',
                      border: `1px solid ${speed === s ? '#6366F1' : '#1E222A'}`,
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
            className="w-full py-3 rounded-xl text-[14px] font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-30"
            style={{
              background: text.trim() && !generating ? '#6366F1' : '#1A1D24',
              boxShadow: text.trim() && !generating ? '0 2px 12px rgba(99,102,241,0.3)' : 'none',
            }}
          >
            {generating ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Generating audio…
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Generate Speech
              </>
            )}
          </button>

          {/* Generating state waveform */}
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
                      style={{ background: 'linear-gradient(180deg, #6366F1, #06B6D4)' }}
                      animate={{ height: [6, 24 + (i % 3) * 6, 6] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Error */}
        {genError && (
          <div className="rounded-xl px-4 py-3 text-[13px]" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#F87171' }}>
            ⚠️ {genError}
          </div>
        )}

        {/* History */}
        {audioHistory.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest mb-3">Recent Generations</p>
            <div className="space-y-2">
              {audioHistory.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl p-4 flex items-center gap-4"
                  style={{ background: '#111318', border: '1px solid #1E222A' }}
                >
                  <button
                    onClick={() => togglePlay(item.id, item.audioUrl)}
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                    style={{ background: playing === item.id ? '#6366F1' : 'rgba(99,102,241,0.1)' }}
                  >
                    {playing === item.id
                      ? <Pause size={14} className="text-white" />
                      : <Play  size={14} className="text-[#6366F1]" />
                    }
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#F8FAFC] line-clamp-1">{item.text}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[11px] text-[#475569] flex items-center gap-1"><Volume2 size={10} />{item.voice}</span>
                      <span className="text-[11px] text-[#475569] flex items-center gap-1"><Clock size={10} />{item.duration}</span>
                      <span className="text-[11px] text-[#2E3440]">{item.date}</span>
                    </div>
                  </div>
                  <a
                    href={item.audioUrl}
                    download={`tts-${item.id}.${format.toLowerCase()}`}
                    className="p-2 rounded-lg text-[#475569] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all flex-shrink-0"
                  >
                    <Download size={14} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
