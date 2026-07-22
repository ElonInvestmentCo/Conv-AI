import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Cpu, Star, Zap, Brain, Eye, Mic, Code, Globe,
  CheckCircle2, ArrowRight, ChevronRight, Sparkles, Lock
} from 'lucide-react';

const models = [
  {
    id: 'gpt4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    badge: 'Recommended',
    badgeColor: '#2563EB',
    description: 'Most capable multimodal model. Exceptional at reasoning, coding, and analysis.',
    capabilities: ['text', 'vision', 'code', 'voice'],
    contextWindow: '128K tokens',
    speed: 'Fast',
    tier: 'pro',
    stars: 4.9,
    uses: '2.4M chats',
    color: '#10A37F',
    gradient: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
    border: '#BBF7D0',
  },
  {
    id: 'o1',
    name: 'o1-preview',
    provider: 'OpenAI',
    badge: 'Best Reasoning',
    badgeColor: '#7C3AED',
    description: 'Extended thinking model for complex problems, math, and scientific reasoning.',
    capabilities: ['text', 'code'],
    contextWindow: '128K tokens',
    speed: 'Slow',
    tier: 'pro',
    stars: 4.8,
    uses: '890K chats',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
    border: '#DDD6FE',
  },
  {
    id: 'claude35',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    badge: 'Top Coding',
    badgeColor: '#D97706',
    description: 'World-class coding and reasoning. Remarkable instruction-following and safety.',
    capabilities: ['text', 'vision', 'code'],
    contextWindow: '200K tokens',
    speed: 'Fast',
    tier: 'pro',
    stars: 4.9,
    uses: '1.8M chats',
    color: '#D97706',
    gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    border: '#FDE68A',
  },
  {
    id: 'gemini15',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    badge: 'Largest Context',
    badgeColor: '#2563EB',
    description: 'Industry-leading 2M context window. Excellent at multimodal and long-document tasks.',
    capabilities: ['text', 'vision', 'code', 'voice'],
    contextWindow: '2M tokens',
    speed: 'Medium',
    tier: 'pro',
    stars: 4.7,
    uses: '1.1M chats',
    color: '#4285F4',
    gradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    border: '#BFDBFE',
  },
  {
    id: 'gpt4omini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    badge: 'Fastest',
    badgeColor: '#059669',
    description: 'Blazing fast for simple tasks. Cost-efficient with strong general capabilities.',
    capabilities: ['text', 'vision', 'code'],
    contextWindow: '128K tokens',
    speed: 'Fastest',
    tier: 'free',
    stars: 4.6,
    uses: '5.2M chats',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
    border: '#BBF7D0',
  },
  {
    id: 'dall3',
    name: 'DALL·E 3',
    provider: 'OpenAI',
    badge: 'Images',
    badgeColor: '#DB2777',
    description: 'State-of-the-art image generation with natural language prompts.',
    capabilities: ['images'],
    contextWindow: '4K tokens',
    speed: 'Medium',
    tier: 'pro',
    stars: 4.7,
    uses: '3.1M images',
    color: '#DB2777',
    gradient: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
    border: '#FBCFE8',
  },
];

const capIcons: Record<string, any> = {
  text: { icon: Brain, label: 'Text' },
  vision: { icon: Eye, label: 'Vision' },
  code: { icon: Code, label: 'Code' },
  voice: { icon: Mic, label: 'Voice' },
  images: { icon: Zap, label: 'Images' },
};

const categories = ['All', 'Text & Reasoning', 'Coding', 'Vision', 'Images', 'Voice'];

export default function Models() {
  const [active, setActive] = useState('gpt4o');
  const [category, setCategory] = useState('All');

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">AI Models</h1>
          <p className="text-[14px] text-[#64748B] mt-0.5">Choose the right model for every task</p>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-all"
              style={{
                background: category === c ? '#0F172A' : '#fff',
                color: category === c ? '#fff' : '#64748B',
                border: `1px solid ${category === c ? '#0F172A' : 'rgba(226,232,240,0.8)'}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Model grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((m, i) => {
            const isActive = active === m.id;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActive(m.id)}
                className="p-5 rounded-[18px] cursor-pointer transition-all hover:shadow-md relative overflow-hidden"
                style={{
                  background: m.gradient,
                  border: `1px solid ${isActive ? m.color : m.border}`,
                  boxShadow: isActive ? `0 0 0 2px ${m.color}30, 0 4px 16px rgba(0,0,0,0.06)` : '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {/* Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[16px] font-bold text-[#0F172A] tracking-[-0.01em]">{m.name}</p>
                      {isActive && <CheckCircle2 size={15} style={{ color: m.color }} />}
                    </div>
                    <p className="text-[12px] text-[#64748B]">{m.provider}</p>
                  </div>
                  <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: m.badgeColor }}>
                    {m.badge}
                  </span>
                </div>

                <p className="text-[13px] text-[#475569] leading-snug mb-4">{m.description}</p>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {m.capabilities.map(cap => {
                    const { icon: Icon, label } = capIcons[cap];
                    return (
                      <span key={cap} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/70 text-[#475569]">
                        <Icon size={10} /> {label}
                      </span>
                    );
                  })}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-[12px] text-[#94A3B8]">
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-amber-400 fill-amber-400" /> {m.stars}
                  </span>
                  <span>{m.contextWindow}</span>
                  <span className="flex items-center gap-1">
                    <Zap size={11} /> {m.speed}
                  </span>
                  <span>{m.uses}</span>
                </div>

                {/* Use button */}
                <button
                  onClick={e => { e.stopPropagation(); setActive(m.id); }}
                  className="mt-4 w-full py-2 rounded-[12px] text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5"
                  style={isActive
                    ? { background: m.color, color: '#fff', boxShadow: `0 2px 8px ${m.color}30` }
                    : { background: 'rgba(255,255,255,0.7)', color: m.color, border: `1px solid ${m.border}` }
                  }
                >
                  {isActive ? <><CheckCircle2 size={14} /> Active model</> : <>Use this model <ArrowRight size={13} /></>}
                </button>

                {m.tier === 'pro' && !isActive && (
                  <div className="absolute top-3 right-12">
                    <Lock size={11} className="text-[#CBD5E1]" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Compare section */}
        <div
          className="rounded-[18px] p-5 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)', boxShadow: '0 4px 20px rgba(15,23,42,0.15)' }}
        >
          <div className="flex-1">
            <p className="text-[15px] font-bold text-white mb-1">Compare models side by side</p>
            <p className="text-[13px] text-[#64748B]">Run the same prompt across multiple models and compare outputs.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-semibold text-white flex-shrink-0 transition-all" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <Cpu size={14} /> Compare <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
