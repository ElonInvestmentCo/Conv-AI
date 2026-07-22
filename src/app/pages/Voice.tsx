import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RiMicLine,
  RiMicOffLine,
  RiVolumeUpLine,
  RiVolumeMuteLine,
  RiSparklingLine,
  RiPhoneLine,
  RiCloseLine,
  RiArrowRightSLine,
} from '@remixicon/react';

const voices = [
  { id: 'alloy', name: 'Alloy', desc: 'Neutral, balanced', gender: 'Neutral' },
  { id: 'echo', name: 'Echo', desc: 'Deep, authoritative', gender: 'Male' },
  { id: 'fable', name: 'Fable', desc: 'Warm, expressive', gender: 'Male' },
  { id: 'onyx', name: 'Onyx', desc: 'Strong, confident', gender: 'Male' },
  { id: 'nova', name: 'Nova', desc: 'Bright, energetic', gender: 'Female' },
  { id: 'shimmer', name: 'Shimmer', desc: 'Soft, friendly', gender: 'Female' },
];

export default function Voice() {
  const [active, setActive] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speakerOff, setSpeakerOff] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('nova');
  const [transcript] = useState<string[]>([
    'Hello! I\'m ready to have a voice conversation.',
    'You can ask me anything — I\'ll respond in real time.',
  ]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6" style={{ background: '#F7F9FC' }}>
      <div className="w-full max-w-md space-y-6">

        <div className="text-center">
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Voice Mode</h1>
          <p className="text-[14px] text-[#64748B] mt-1">Speak naturally with Conv AI</p>
        </div>

        {/* Orb */}
        <div className="flex justify-center">
          <div className="relative">
            {active && (
              <>
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(37,99,235,0.15)' }}
                    animate={{ scale: [1, 1 + i * 0.3], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
                  />
                ))}
              </>
            )}
            <motion.button
              onClick={() => setActive(!active)}
              whileTap={{ scale: 0.95 }}
              className="relative w-32 h-32 rounded-full flex items-center justify-center transition-all"
              style={{
                background: active ? 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' : '#fff',
                border: active ? 'none' : '2px solid rgba(226,232,240,0.8)',
                boxShadow: active ? '0 8px 32px rgba(37,99,235,0.4)' : '0 4px 16px rgba(0,0,0,0.08)',
              }}
            >
              {active ? (
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <RiSparklingLine size={36} className="text-white" />
                </motion.div>
              ) : (
                <RiMicLine size={36} className="text-[#94A3B8]" />
              )}
            </motion.button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[15px] font-semibold text-[#0F172A]">{active ? 'Listening…' : 'Tap to start'}</p>
          <p className="text-[13px] text-[#94A3B8] mt-0.5">{active ? 'Speak clearly into your microphone' : 'Click the orb to begin voice conversation'}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setMuted(!muted)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
            style={{ background: muted ? '#FEF2F2' : '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)' }}
          >
            {muted ? <RiMicOffLine size={18} className="text-red-500" /> : <RiMicLine size={18} className="text-[#64748B]" />}
          </button>

          {active && (
            <button
              onClick={() => setActive(false)}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
              style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}
            >
              <RiCloseLine size={22} className="text-red-500" />
            </button>
          )}

          <button
            onClick={() => setSpeakerOff(!speakerOff)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
            style={{ background: speakerOff ? '#FEF2F2' : '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)' }}
          >
            {speakerOff ? <RiVolumeMuteLine size={18} className="text-red-500" /> : <RiVolumeUpLine size={18} className="text-[#64748B]" />}
          </button>
        </div>

        {/* Transcript with wave animation */}
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[18px] p-5 space-y-3 max-h-40 overflow-y-auto"
            style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            {transcript.map((line, i) => (
              <p key={i} className="text-[13.5px] text-[#475569] leading-relaxed">{line}</p>
            ))}
            <div className="flex items-center gap-1.5 mt-2">
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-blue-400"
                  animate={{ height: [8, 20 + (i % 3) * 8, 8] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                  style={{ height: 8 }}
                />
              ))}
              <span className="text-[12px] text-[#94A3B8] ml-2">Speaking…</span>
            </div>
          </motion.div>
        )}

        {/* Voice selector */}
        <div className="rounded-[18px] p-5" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
          <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-3">AI Voice</p>
          <div className="grid grid-cols-3 gap-2">
            {voices.map(v => (
              <button
                key={v.id}
                onClick={() => setSelectedVoice(v.id)}
                className="p-3 rounded-[12px] text-center transition-all"
                style={{
                  background: selectedVoice === v.id ? '#EFF6FF' : '#F8FAFC',
                  border: `1px solid ${selectedVoice === v.id ? '#BFDBFE' : 'rgba(226,232,240,0.8)'}`,
                }}
              >
                <p className="text-[13px] font-bold" style={{ color: selectedVoice === v.id ? '#2563EB' : '#0F172A' }}>{v.name}</p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">{v.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
