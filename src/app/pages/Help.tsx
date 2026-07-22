import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle, Search, ChevronDown, ChevronRight,
  MessageSquare, Bot, Zap, BookOpen, Code, Globe,
  ExternalLink, Mail, Sparkles
} from 'lucide-react';

const faqs = [
  {
    q: 'What is Conv AI?',
    a: 'Conv AI is a premium AI platform that gives you access to the world\'s best AI models — including GPT-4o, Claude 3.5, and o1 — in a single, beautifully designed workspace. You can chat, generate images, run agents, automate workflows, and more.',
  },
  {
    q: 'Which AI models are available?',
    a: 'Conv AI includes GPT-4o, GPT-4o mini, o1-preview, Claude 3.5 Sonnet, Gemini 1.5 Pro, and DALL·E 3. You can switch models per conversation or set a default in Settings.',
  },
  {
    q: 'What are AI Agents?',
    a: 'Agents are autonomous AI workflows that can complete multi-step tasks on your behalf — like researching a topic, reviewing code, drafting emails, or processing documents. They run independently and report results when complete.',
  },
  {
    q: 'How does the Knowledge Base work?',
    a: 'Upload your documents, PDFs, or connect data sources like Notion and Google Drive. Conv AI embeds them into a searchable vector database. When you chat, the AI can retrieve relevant information from your knowledge base automatically.',
  },
  {
    q: 'What are Automations?',
    a: 'Automations are event-triggered AI workflows. For example: "When a new email arrives → classify it → draft a reply → add to my CRM." You can build them with a visual editor or describe them in plain English.',
  },
  {
    q: 'How do credits work?',
    a: 'Different features use different amounts of credits. Text chat (GPT-4o) costs ~1 credit/message. Image generation costs 10 credits. Agent runs cost 25 credits. Your plan includes a monthly credit allowance.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Your conversations and files are private by default. You can opt out of training data usage in Settings → Privacy. We use enterprise-grade encryption and never share your data with third parties.',
  },
  {
    q: 'How do I use the API?',
    a: 'Go to API Keys to create a key. Conv AI provides a REST API compatible with the OpenAI SDK. Point your base URL to api.convai.io and use your Conv AI key to access all models and features programmatically.',
  },
];

const guides = [
  { title: 'Getting started with Conv AI', icon: Sparkles, color: '#2563EB', bg: '#EFF6FF', time: '5 min' },
  { title: 'Building your first AI Agent', icon: Bot, color: '#7C3AED', bg: '#F5F3FF', time: '10 min' },
  { title: 'Setting up Automations', icon: Zap, color: '#D97706', bg: '#FFFBEB', time: '8 min' },
  { title: 'Knowledge Base best practices', icon: BookOpen, color: '#059669', bg: '#F0FDF4', time: '12 min' },
  { title: 'Using the API', icon: Code, color: '#0891B2', bg: '#ECFEFF', time: '15 min' },
  { title: 'Prompt engineering tips', icon: MessageSquare, color: '#DB2777', bg: '#FDF2F8', time: '7 min' },
];

export default function Help() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filtered = faqs.filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-3xl mx-auto p-6 space-y-6">

        {/* Header */}
        <div className="text-center py-4">
          <h1 className="text-[24px] font-bold text-[#0F172A] tracking-[-0.02em] mb-2">How can we help?</h1>
          <p className="text-[14px] text-[#64748B]">Search the docs, browse guides, or contact support</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search help articles…"
            className="w-full pl-12 pr-4 py-3 text-[14px] rounded-[16px] outline-none transition-all"
            style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            onFocus={e => { e.target.style.borderColor = '#93C5FD'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; }}
          />
        </div>

        {/* Guides */}
        <div>
          <p className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-3">Guides</p>
          <div className="grid grid-cols-2 gap-3">
            {guides.map((guide, i) => {
              const Icon = guide.icon;
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-[16px] text-left transition-all hover:shadow-sm group"
                  style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
                >
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: guide.bg }}>
                    <Icon size={16} style={{ color: guide.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#0F172A] leading-snug">{guide.title}</p>
                    <p className="text-[11.5px] text-[#94A3B8] mt-0.5">{guide.time} read</p>
                  </div>
                  <ChevronRight size={13} className="text-[#E2E8F0] group-hover:text-[#94A3B8] transition-colors flex-shrink-0" />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <p className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-3">
            {search ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}` : 'Frequently Asked Questions'}
          </p>
          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <div
                key={i}
                className="rounded-[16px] overflow-hidden"
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <p className="text-[14px] font-semibold text-[#0F172A] pr-4">{faq.q}</p>
                  <ChevronDown
                    size={16}
                    className="text-[#94A3B8] flex-shrink-0 transition-transform duration-200"
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
                      <div className="px-5 pb-4 pt-0" style={{ borderTop: '1px solid #F8FAFC' }}>
                        <p className="text-[13.5px] text-[#475569] leading-relaxed mt-2">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="rounded-[20px] p-6 text-center" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)', boxShadow: '0 4px 20px rgba(15,23,42,0.15)' }}>
          <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
            <MessageSquare size={20} className="text-white" />
          </div>
          <p className="text-[16px] font-bold text-white mb-1">Still need help?</p>
          <p className="text-[13px] text-[#64748B] mb-4">Our support team typically responds in under 2 hours.</p>
          <div className="flex items-center justify-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-semibold text-white transition-all" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <Mail size={14} /> Email Support
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-semibold text-white transition-all" style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}>
              <MessageSquare size={14} /> Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
