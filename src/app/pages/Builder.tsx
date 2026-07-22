import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Wand2, Sparkles, Bot, Cpu, Globe, FileText, Mic,
  Plus, ChevronRight, Code, Sliders, Save, Play,
  Zap, BookOpen, Shield, MessageSquare
} from 'lucide-react';

const capabilities = [
  { id: 'web', icon: Globe, label: 'Web Browse', desc: 'Search and read live web pages', enabled: true },
  { id: 'code', icon: Code, label: 'Code Execution', desc: 'Run Python, JS, and more', enabled: true },
  { id: 'files', icon: FileText, label: 'File Access', desc: 'Read and write documents', enabled: false },
  { id: 'voice', icon: Mic, label: 'Voice Input', desc: 'Accept spoken commands', enabled: false },
  { id: 'memory', icon: BookOpen, label: 'Memory', desc: 'Persist context across sessions', enabled: true },
  { id: 'api', icon: Zap, label: 'API Calls', desc: 'Connect to external services', enabled: false },
];

const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className="relative w-10 h-5.5 rounded-full transition-all flex-shrink-0"
    style={{ background: on ? '#2563EB' : '#E2E8F0', width: 40, height: 22 }}
  >
    <span
      className="absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-all duration-200"
      style={{ left: on ? '19px' : '2px', width: 18, height: 18 }}
    />
  </button>
);

const tones = ['Professional', 'Friendly', 'Concise', 'Creative', 'Technical', 'Empathetic'];
const templates = [
  { name: 'Customer Support', icon: MessageSquare, color: '#2563EB' },
  { name: 'Research Bot', icon: Globe, color: '#7C3AED' },
  { name: 'Code Assistant', icon: Code, color: '#059669' },
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
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-semibold text-[#475569] transition-all" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)' }}>
              <Play size={14} /> Test
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13.5px] font-semibold text-white transition-all" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}>
              <Save size={14} /> Save & Deploy
            </button>
          </div>
        </div>

        {/* Templates */}
        <div className="mb-6">
          <p className="text-[13px] font-semibold text-[#94A3B8] mb-3">Start from template</p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {templates.map((t, i) => {
              const Icon = t.icon;
              return (
                <button
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-[12px] transition-all hover:shadow-sm"
                  style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)' }}
                >
                  <div className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{ background: t.color + '15' }}>
                    <Icon size={14} style={{ color: t.color }} />
                  </div>
                  <span className="text-[13px] font-semibold text-[#475569]">{t.name}</span>
                </button>
              );
            })}
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-semibold text-[#CBD5E1] transition-all" style={{ border: '1px dashed #E2E8F0' }}>
              <Plus size={14} /> Blank
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Left: Identity */}
          <div className="lg:col-span-2 space-y-4">

            {/* Identity card */}
            <div className="rounded-[18px] p-5" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <p className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-4">Identity</p>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-[18px] flex items-center justify-center flex-shrink-0 cursor-pointer" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
                  <Sparkles size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full text-[18px] font-bold text-[#0F172A] outline-none bg-transparent border-b-2 border-transparent hover:border-[#E2E8F0] focus:border-[#93C5FD] transition-all pb-1"
                  />
                  <p className="text-[12.5px] text-[#94A3B8] mt-1">Click the icon to change avatar</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">System Prompt</label>
                  <textarea
                    value={systemPrompt}
                    onChange={e => setSystemPrompt(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 text-[13.5px] text-[#0F172A] rounded-[14px] outline-none resize-none transition-all leading-relaxed"
                    style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)' }}
                    onFocus={e => { e.target.style.borderColor = '#93C5FD'; e.target.style.background = '#fff'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; e.target.style.background = '#F8FAFC'; }}
                  />
                  <p className="text-[12px] text-[#CBD5E1] mt-1">{systemPrompt.length} / 4000 characters</p>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#475569] mb-2">Tone & Personality</label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map(t => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className="px-3 py-1.5 rounded-full text-[12.5px] font-semibold transition-all"
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
            </div>

            {/* Capabilities */}
            <div className="rounded-[18px] p-5" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <p className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-4">Capabilities</p>
              <div className="grid grid-cols-2 gap-3">
                {capabilities.map(cap => {
                  const Icon = cap.icon;
                  const on = caps[cap.id];
                  return (
                    <div
                      key={cap.id}
                      className="flex items-center gap-3 p-3.5 rounded-[14px] transition-all cursor-pointer"
                      style={{ background: on ? '#EFF6FF' : '#F8FAFC', border: `1px solid ${on ? '#BFDBFE' : 'rgba(226,232,240,0.8)'}` }}
                      onClick={() => setCaps(prev => ({ ...prev, [cap.id]: !prev[cap.id] }))}
                    >
                      <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{ background: on ? '#DBEAFE' : '#E2E8F0' }}>
                        <Icon size={14} style={{ color: on ? '#2563EB' : '#94A3B8' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#0F172A]">{cap.label}</p>
                        <p className="text-[11.5px] text-[#94A3B8]">{cap.desc}</p>
                      </div>
                      <Toggle on={on} onChange={() => setCaps(prev => ({ ...prev, [cap.id]: !prev[cap.id] }))} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Model + Parameters */}
          <div className="space-y-4">

            {/* Model */}
            <div className="rounded-[18px] p-5" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <p className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-3">Base Model</p>
              <div className="space-y-2">
                {['GPT-4o', 'Claude 3.5 Sonnet', 'GPT-4o mini', 'o1-preview'].map(m => (
                  <button
                    key={m}
                    onClick={() => setModel(m)}
                    className="w-full flex items-center gap-3 p-3 rounded-[12px] transition-all text-left"
                    style={{ background: model === m ? '#EFF6FF' : '#F8FAFC', border: `1px solid ${model === m ? '#BFDBFE' : 'transparent'}` }}
                  >
                    <Cpu size={14} className={model === m ? 'text-[#2563EB]' : 'text-[#94A3B8]'} />
                    <span className="text-[13px] font-semibold" style={{ color: model === m ? '#2563EB' : '#475569' }}>{m}</span>
                    {model === m && <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Active</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Parameters */}
            <div className="rounded-[18px] p-5" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <p className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-4">Parameters</p>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-[13px] font-semibold text-[#475569]">Temperature</label>
                    <span className="text-[13px] font-bold text-[#2563EB]">{temperature}</span>
                  </div>
                  <input
                    type="range" min={0} max={2} step={0.1} value={temperature}
                    onChange={e => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-[#CBD5E1] mt-1">
                    <span>Precise</span><span>Balanced</span><span>Creative</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
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
            </div>

            {/* Safety */}
            <div className="rounded-[18px] p-4" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <div className="flex items-center gap-2 mb-1">
                <Shield size={14} className="text-emerald-600" />
                <p className="text-[13px] font-bold text-emerald-900">Safety Filters</p>
              </div>
              <p className="text-[12px] text-emerald-700">Content moderation is enabled. Harmful outputs will be blocked automatically.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
