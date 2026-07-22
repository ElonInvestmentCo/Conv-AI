import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, ChevronDown, ChevronRight,
  MessageSquare, Bot, Zap, BookOpen,
  Code2, Globe, Mail, Sparkles,
} from 'lucide-react';

const faqs = [
  { q: 'What is Conv AI?', a: "Conv AI is a premium AI platform that gives you access to the world's best AI models — including GPT-4o, Claude 3.5, and o1 — in a single, precision-designed workspace. You can chat, generate images, run agents, automate workflows, and more." },
  { q: 'Which AI models are available?', a: 'Conv AI includes GPT-4o, GPT-4o mini, o1-preview, Claude 3.5 Sonnet, Gemini 1.5 Pro, and DALL·E 3. You can switch models per conversation or set a default in Settings.' },
  { q: 'What are AI Agents?', a: 'Agents are autonomous AI workflows that can complete multi-step tasks on your behalf — like researching a topic, reviewing code, drafting emails, or processing documents. They run independently and report results when complete.' },
  { q: 'How does the Knowledge Base work?', a: 'Upload your documents, PDFs, or connect data sources like Notion and Google Drive. Conv AI embeds them into a searchable vector database. When you chat, the AI can retrieve relevant information from your knowledge base automatically.' },
  { q: 'What are Automations?', a: 'Automations are event-triggered AI workflows. For example: "When a new email arrives → classify it → draft a reply → add to my CRM." You can build them with a visual editor or describe them in plain English.' },
  { q: 'How do credits work?', a: 'Different features use different amounts of credits. Text chat (GPT-4o) costs ~1 credit/message. Image generation costs 10 credits. Agent runs cost 25 credits. Your plan includes a monthly credit allowance.' },
  { q: 'Is my data private?', a: 'Yes. Your conversations and files are private by default. You can opt out of training data usage in Settings → Privacy. We use enterprise-grade encryption and never share your data with third parties.' },
  { q: 'How do I use the API?', a: 'Go to API Keys to create a key. Conv AI provides a REST API compatible with the OpenAI SDK. Point your base URL to api.convai.io and use your Conv AI key to access all models and features programmatically.' },
];

const guides = [
  { title: 'Getting started with Conv AI',    icon: Sparkles,     color: '#6366F1', time: '5 min'  },
  { title: 'Building your first AI Agent',    icon: Bot,          color: '#06B6D4', time: '10 min' },
  { title: 'Setting up Automations',          icon: Zap,          color: '#F59E0B', time: '8 min'  },
  { title: 'Knowledge Base best practices',   icon: BookOpen,     color: '#10B981', time: '12 min' },
  { title: 'Using the API',                   icon: Code2,        color: '#94A3B8', time: '15 min' },
  { title: 'Prompt engineering tips',         icon: MessageSquare,color: '#EF4444', time: '7 min'  },
];

export default function Help() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filtered = faqs.filter(f =>
    !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#0A0C10' }}>
      <div className="max-w-3xl mx-auto p-6 space-y-6">

        <div className="text-center py-4">
          <h1 className="text-[22px] font-semibold text-[#F8FAFC] tracking-tight mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>How can we help?</h1>
          <p className="text-[13px] text-[#475569]">Search the docs, browse guides, or contact support</p>
        </div>

        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2E3440]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search help articles…"
            className="w-full pl-12 pr-4 py-3 text-[14px] rounded-2xl outline-none transition-all text-[#F8FAFC] placeholder-[#2E3440]"
            style={{ background: '#111318', border: '1px solid #1E222A' }}
            onFocus={e => { e.target.style.borderColor = '#6366F1'; }}
            onBlur={e => { e.target.style.borderColor = '#1E222A'; }}
          />
        </div>

        <div>
          <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest mb-3">Guides</p>
          <div className="grid grid-cols-2 gap-3">
            {guides.map((guide, i) => {
              const Icon = guide.icon;
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all hover:border-[#2E3440] group"
                  style={{ background: '#111318', border: '1px solid #1E222A' }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${guide.color}15` }}>
                    <Icon size={15} style={{ color: guide.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#F8FAFC] leading-snug">{guide.title}</p>
                    <p className="text-[11px] text-[#475569] mt-0.5">{guide.time} read</p>
                  </div>
                  <ChevronRight size={14} className="text-[#1E222A] group-hover:text-[#2E3440] transition-colors flex-shrink-0" />
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest mb-3">
            {search ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}` : 'Frequently Asked Questions'}
          </p>
          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: '#111318', border: '1px solid #1E222A' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <p className="text-[14px] font-semibold text-[#F8FAFC] pr-4">{faq.q}</p>
                  <ChevronDown
                    size={15}
                    className="text-[#475569] flex-shrink-0 transition-transform duration-200"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-0" style={{ borderTop: '1px solid #1E222A' }}>
                        <p className="text-[13px] text-[#94A3B8] leading-relaxed mt-3">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Contact support */}
        <div className="rounded-2xl p-6 text-center" style={{ background: '#111318', border: '1px solid #1E222A' }}>
          <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <MessageSquare size={20} className="text-[#6366F1]" />
          </div>
          <p className="text-[16px] font-semibold text-[#F8FAFC] mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Still need help?</p>
          <p className="text-[13px] text-[#475569] mb-4">Our support team typically responds in under 2 hours.</p>
          <div className="flex items-center justify-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-[#94A3B8] transition-all hover:bg-[#1A1D24]" style={{ background: '#1A1D24', border: '1px solid #2E3440' }}>
              <Mail size={13} /> Email Support
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all hover:bg-[#4F46E5]" style={{ background: '#6366F1', boxShadow: '0 2px 8px rgba(99,102,241,0.3)' }}>
              <MessageSquare size={13} /> Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
