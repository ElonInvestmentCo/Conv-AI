import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Wand2,
  Sparkles,
  Bot,
  Cpu,
  Globe,
  FileText,
  Mic,
  Plus,
  ChevronRight,
  Code2,
  SlidersHorizontal,
  Save,
  Play,
  Zap,
  BookOpen,
  Shield,
  MessageSquare,
} from 'lucide-react';

const capabilities = [
  { id: 'web', icon: Globe, label: 'Web Browse', desc: 'Search and read live web pages', enabled: true },
  { id: 'code', icon: Code2, label: 'Code Execution', desc: 'Run Python, JS, and more', enabled: true },
  { id: 'files', icon: FileText, label: 'File Access', desc: 'Read and write documents', enabled: false },
  { id: 'voice', icon: Mic, label: 'Voice Input', desc: 'Accept spoken commands', enabled: false },
  { id: 'memory', icon: BookOpen, label: 'Memory', desc: 'Persist context across sessions', enabled: true },
  { id: 'api', icon: Zap, label: 'API Calls', desc: 'Connect to external services', enabled: false },
];

const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className="relative rounded-full transition-all flex-shrink-0"
    style={{ background: on ? '#2563EB' : '#E2E8F0', width: 40, height: 22 }}
  >
    <span
      className="absolute top-0.5 bg-white rounded-full shadow-sm transition-all duration-200"
      style={{ left: on ? '19px' : '2px', width: 18, height: 18 }}
    />
  </button>
);

const tones = ['Professional', 'Friendly', 'Concise', 'Creative', 'Technical', 'Empathetic'];
const templates = [
  { name: 'Customer Support', icon: MessageSquare, color: '#2563EB' },
  { name: 'Research Bot', icon: Globe, color: '#7C3AED' },
  { name: 'Code Assistant', icon: Code2, color: '#059669' },
  { name: 'Content Writer', icon: FileText, color: '#D97706' },
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
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-5xl mx-auto p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">AI Builder</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">Build and customize your own AI assistants</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-[#475569] transition-all hover:bg-[#F8FAFC]" style={{ border: '1px solid rgba(226,232,240,0.8)' }}>
              <Play size={14} /> Preview
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all" style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}>
              <Save size={14} /> Save Agent
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-5">

            {/* Templates */}
            <div className="rounded-[20px] p-5" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-3">Start from Template</p>
              <div className="grid grid-cols-2 gap-2">
                {templates.map(t => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.name}
                      className="flex items-center gap-3 p-3 rounded-[14px] text-left transition-all hover:scale-[1.01]"
                      style={{ background: `${t.color}08`, border: `1px solid ${t.color}20` }}
                    >
                      <div className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: `${t.color}15` }}>
                        <Icon size={15} style={{ color: t.color }} />
                      </div>
                      <span className="text-[13px] font-semibold text-[#0F172A]">{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Identity */}
            <div className="rounded-[20px] p-5 space-y-4" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-[0.06em]">Identity</p>
              <div>
                <label className="text-[12px] font-semibold text-[#475569] mb-1.5 block">Agent Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-[14px] rounded-[12px] outline-none transition-all"
                  style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A' }}
                  onFocus={e => { e.target.style.borderColor = '#93C5FD'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; }}
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#475569] mb-1.5 block">System Prompt</label>
                <textarea
                  value={systemPrompt}
                  onChange={e => setSystemPrompt(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 text-[13.5px] rounded-[12px] outline-none resize-none transition-all leading-relaxed"
                  style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A' }}
                  onFocus={e => { e.target.style.borderColor = '#93C5FD'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; }}
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
                        background: tone === t ? '#0F172A' : '#F8FAFC',
                        color: tone === t ? '#fff' : '#64748B',
                        border: `1px solid ${tone === t ? '#0F172A' : 'rgba(226,232,240,0.8)'}`,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="rounded-[20px] p-5" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-3">Capabilities</p>
              <div className="grid grid-cols-2 gap-3">
                {capabilities.map(cap => {
                  const Icon = cap.icon;
                  return (
                    <div
                      key={cap.id}
                      className="flex items-center gap-3 p-3.5 rounded-[14px]"
                      style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.6)' }}
                    >
                      <div className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: caps[cap.id] ? '#EFF6FF' : '#F1F5F9' }}>
                        <Icon size={15} className={caps[cap.id] ? 'text-[#2563EB]' : 'text-[#94A3B8]'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#0F172A]">{cap.label}</p>
                        <p className="text-[11.5px] text-[#94A3B8]">{cap.desc}</p>
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
            <div className="rounded-[20px] p-5" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-3">Model</p>
              {['GPT-4o', 'GPT-4o mini', 'Claude 3.5 Sonnet', 'o1-preview'].map(m => (
                <button
                  key={m}
                  onClick={() => setModel(m)}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-[12px] mb-1.5 transition-all text-left"
                  style={{
                    background: model === m ? '#EFF6FF' : '#F8FAFC',
                    border: `1px solid ${model === m ? '#BFDBFE' : 'rgba(226,232,240,0.6)'}`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu size={14} className={model === m ? 'text-[#2563EB]' : 'text-[#94A3B8]'} />
                    <span className="text-[13px] font-semibold" style={{ color: model === m ? '#2563EB' : '#0F172A' }}>{m}</span>
                  </div>
                  {model === m && <div className="w-2 h-2 rounded-full bg-[#2563EB]" />}
                </button>
              ))}
            </div>

            {/* Parameters */}
            <div className="rounded-[20px] p-5 space-y-4" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-[#94A3B8]" />
                <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-[0.06em]">Parameters</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[13px] font-semibold text-[#475569]">Temperature</label>
                  <span className="text-[13px] font-bold text-[#2563EB]">{temperature.toFixed(1)}</span>
                </div>
                <input
                  type="range" min={0} max={2} step={0.1} value={temperature}
                  onChange={e => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-[10.5px] text-[#CBD5E1] mt-1">
                  <span>Precise</span><span>Creative</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[13px] font-semibold text-[#475569]">Max Tokens</label>
                  <span className="text-[13px] font-bold text-[#2563EB]">{maxTokens.toLocaleString()}</span>
                </div>
                <input
                  type="range" min={256} max={8192} step={256} value={maxTokens}
                  onChange={e => setMaxTokens(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            {/* Deploy */}
            <div className="rounded-[20px] p-5 text-center" style={{ background: 'linear-gradient(135deg, #0F172A, #1E1B4B)', boxShadow: '0 4px 20px rgba(15,23,42,0.15)' }}>
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                <Bot size={18} className="text-white" />
              </div>
              <p className="text-[14px] font-bold text-white mb-1">Ready to deploy?</p>
              <p className="text-[12px] text-[#64748B] mb-4">Share your agent or embed it anywhere</p>
              <button className="w-full py-2.5 rounded-[12px] text-[13px] font-semibold text-white transition-all flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}>
                <Zap size={14} /> Deploy Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
