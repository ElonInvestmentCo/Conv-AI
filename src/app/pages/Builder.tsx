import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bot, Cpu, Globe, FileText, Mic, Plus,
  ChevronRight, Code2, SlidersHorizontal,
  Save, Play, Zap, BookOpen, Shield, MessageSquare,
} from 'lucide-react';

const capabilities = [
  { id: 'web',    icon: Globe,    label: 'Web Browse',      desc: 'Search and read live web pages',       enabled: true  },
  { id: 'code',   icon: Code2,    label: 'Code Execution',  desc: 'Run Python, JS, and more',             enabled: true  },
  { id: 'files',  icon: FileText, label: 'File Access',     desc: 'Read and write documents',             enabled: false },
  { id: 'voice',  icon: Mic,      label: 'Voice Input',     desc: 'Accept spoken commands',               enabled: false },
  { id: 'memory', icon: BookOpen, label: 'Memory',          desc: 'Persist context across sessions',      enabled: true  },
  { id: 'api',    icon: Zap,      label: 'API Calls',       desc: 'Connect to external services',         enabled: false },
];

const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className="relative rounded-full transition-all flex-shrink-0"
    style={{ background: on ? '#6366F1' : '#1E222A', width: 40, height: 22 }}
  >
    <span
      className="absolute top-0.5 bg-white rounded-full shadow-sm transition-all duration-200"
      style={{ left: on ? '19px' : '2px', width: 18, height: 18 }}
    />
  </button>
);

const tones = ['Professional', 'Friendly', 'Concise', 'Creative', 'Technical', 'Empathetic'];
const templates = [
  { name: 'Customer Support', icon: MessageSquare, color: '#6366F1' },
  { name: 'Research Bot',     icon: Globe,         color: '#06B6D4' },
  { name: 'Code Assistant',   icon: Code2,         color: '#10B981' },
  { name: 'Content Writer',   icon: FileText,      color: '#F59E0B' },
];

export default function Builder() {
  const [name, setName] = useState('My Custom AI');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful AI assistant. You are knowledgeable, accurate, and always respond in a clear and structured way.');
  const [model, setModel] = useState('GPT-4o');
  const [tone, setTone] = useState('Professional');
  const [caps, setCaps] = useState<Record<string, boolean>>(
    Object.fromEntries(capabilities.map(c => [c.id, c.enabled]))
  );
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#0A0C10' }}>
      <div className="max-w-5xl mx-auto p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[20px] font-semibold text-[#F8FAFC] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>AI Builder</h1>
            <p className="text-[13px] text-[#475569] mt-0.5">Build and customize your own AI assistants</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-[#94A3B8] transition-all hover:bg-[#1A1D24]" style={{ border: '1px solid #1E222A' }}>
              <Play size={13} /> Preview
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all hover:bg-[#4F46E5]" style={{ background: '#6366F1', boxShadow: '0 2px 8px rgba(99,102,241,0.3)' }}>
              <Save size={13} /> Save Agent
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-5">

            {/* Templates */}
            <div className="rounded-2xl p-5" style={{ background: '#111318', border: '1px solid #1E222A' }}>
              <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest mb-3">Start from Template</p>
              <div className="grid grid-cols-2 gap-2">
                {templates.map(t => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.name}
                      className="flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:bg-[#1A1D24]"
                      style={{ background: `${t.color}08`, border: `1px solid ${t.color}20` }}
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${t.color}15` }}>
                        <Icon size={14} style={{ color: t.color }} />
                      </div>
                      <span className="text-[13px] font-semibold text-[#F8FAFC]">{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Identity */}
            <div className="rounded-2xl p-5 space-y-4" style={{ background: '#111318', border: '1px solid #1E222A' }}>
              <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest">Identity</p>
              <div>
                <label className="text-[12px] font-semibold text-[#475569] mb-1.5 block">Agent Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-[14px] rounded-xl outline-none transition-all"
                  style={{ background: '#1A1D24', border: '1px solid #1E222A', color: '#F8FAFC' }}
                  onFocus={e => { e.target.style.borderColor = '#6366F1'; }}
                  onBlur={e => { e.target.style.borderColor = '#1E222A'; }}
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#475569] mb-1.5 block">System Prompt</label>
                <textarea
                  value={systemPrompt}
                  onChange={e => setSystemPrompt(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 text-[13px] rounded-xl outline-none resize-none transition-all leading-relaxed"
                  style={{ background: '#1A1D24', border: '1px solid #1E222A', color: '#F8FAFC' }}
                  onFocus={e => { e.target.style.borderColor = '#6366F1'; }}
                  onBlur={e => { e.target.style.borderColor = '#1E222A'; }}
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#475569] mb-1.5 block">Tone</label>
                <div className="flex flex-wrap gap-1.5">
                  {tones.map(t => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className="px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all"
                      style={{
                        background: tone === t ? '#6366F1' : '#1A1D24',
                        color: tone === t ? '#fff' : '#475569',
                        border: `1px solid ${tone === t ? '#6366F1' : '#1E222A'}`,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="rounded-2xl p-5" style={{ background: '#111318', border: '1px solid #1E222A' }}>
              <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest mb-3">Capabilities</p>
              <div className="grid grid-cols-2 gap-3">
                {capabilities.map(cap => {
                  const Icon = cap.icon;
                  return (
                    <div
                      key={cap.id}
                      className="flex items-center gap-3 p-3.5 rounded-xl"
                      style={{ background: '#1A1D24', border: '1px solid #1E222A' }}
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: caps[cap.id] ? 'rgba(99,102,241,0.1)' : '#111318' }}>
                        <Icon size={14} className={caps[cap.id] ? 'text-[#6366F1]' : 'text-[#475569]'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#F8FAFC]">{cap.label}</p>
                        <p className="text-[11px] text-[#475569]">{cap.desc}</p>
                      </div>
                      <Toggle on={caps[cap.id]} onChange={() => setCaps(prev => ({ ...prev, [cap.id]: !prev[cap.id] }))} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">

            {/* Model */}
            <div className="rounded-2xl p-5" style={{ background: '#111318', border: '1px solid #1E222A' }}>
              <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest mb-3">Model</p>
              {['GPT-4o', 'GPT-4o mini', 'Claude 3.5 Sonnet', 'o1-preview'].map(m => (
                <button
                  key={m}
                  onClick={() => setModel(m)}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl mb-1.5 transition-all text-left"
                  style={{
                    background: model === m ? 'rgba(99,102,241,0.1)' : '#1A1D24',
                    border: `1px solid ${model === m ? '#6366F1' : '#1E222A'}`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu size={13} className={model === m ? 'text-[#6366F1]' : 'text-[#475569]'} />
                    <span className="text-[13px] font-semibold" style={{ color: model === m ? '#6366F1' : '#94A3B8' }}>{m}</span>
                  </div>
                  {model === m && <div className="w-2 h-2 rounded-full bg-[#6366F1]" />}
                </button>
              ))}
            </div>

            {/* Parameters */}
            <div className="rounded-2xl p-5 space-y-4" style={{ background: '#111318', border: '1px solid #1E222A' }}>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={13} className="text-[#475569]" />
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest">Parameters</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[13px] font-semibold text-[#94A3B8]">Temperature</label>
                  <span className="text-[13px] font-bold text-[#6366F1]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{temperature.toFixed(1)}</span>
                </div>
                <input type="range" min={0} max={2} step={0.1} value={temperature} onChange={e => setTemperature(parseFloat(e.target.value))} className="w-full" />
                <div className="flex justify-between text-[10px] text-[#2E3440] mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span>Precise</span><span>Creative</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[13px] font-semibold text-[#94A3B8]">Max Tokens</label>
                  <span className="text-[13px] font-bold text-[#6366F1]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{maxTokens.toLocaleString()}</span>
                </div>
                <input type="range" min={256} max={8192} step={256} value={maxTokens} onChange={e => setMaxTokens(parseInt(e.target.value))} className="w-full" />
              </div>
            </div>

            {/* Deploy */}
            <div className="rounded-2xl p-5 text-center" style={{ background: '#111318', border: '1px solid #1E222A' }}>
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <Bot size={18} className="text-[#6366F1]" />
              </div>
              <p className="text-[14px] font-semibold text-[#F8FAFC] mb-1">Ready to deploy?</p>
              <p className="text-[12px] text-[#475569] mb-4">Share your agent or embed it anywhere</p>
              <button className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all flex items-center justify-center gap-2 hover:bg-[#4F46E5]" style={{ background: '#6366F1' }}>
                <Zap size={13} /> Deploy Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
