import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { HelpCircle, Search, MessageSquare, BookOpen, Sparkles, ChevronRight, ChevronDown, ArrowRight, Zap, Shield, TrendingUp, CreditCard } from 'lucide-react';

const faqs = [
  { q: 'How does Snow AI access my financial data?', a: 'Snow AI connects to your accounts via Plaid, a bank-level secure read-only connection. We never store your banking credentials and can only read — never move — your money.' },
  { q: 'Can Snow AI execute transactions on my behalf?', a: 'No. Snow AI is read-only. It analyzes your data and gives you recommendations, but all transactions require your explicit action through your bank or brokerage.' },
  { q: 'How accurate are the AI financial insights?', a: 'Snow AI uses real-time data from your connected accounts combined with market data. Insights are updated daily. For critical decisions, always consult a licensed financial advisor.' },
  { q: 'Is my data encrypted and private?', a: 'Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never sell your data and you can delete everything at any time from Settings.' },
  { q: 'What AI model powers Snow AI?', a: 'Snow Pro uses GPT-4o, fine-tuned on financial reasoning tasks. Snow Basic uses GPT-3.5-turbo. You can switch models in Settings → AI & Model.' },
  { q: 'How do I disconnect a bank account?', a: 'Go to Accounts → select the account → tap the three-dot menu → Disconnect. Your historical data is retained for 30 days unless you request full deletion.' },
];

const guides = [
  { icon: Sparkles, title: 'Getting started with Snow AI', desc: 'Your first 10 conversations', color: '#EFF6FF', iconColor: '#2563EB' },
  { icon: TrendingUp, title: 'Understanding AI insights', desc: 'How to act on recommendations', color: '#F0FDF4', iconColor: '#10B981' },
  { icon: CreditCard, title: 'Connecting your accounts', desc: 'Plaid setup step-by-step', color: '#F5F3FF', iconColor: '#7C3AED' },
  { icon: Shield, title: 'Privacy & security guide', desc: 'How we protect your data', color: '#FFFBEB', iconColor: '#F59E0B' },
];

export default function Help() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Hero */}
        <div
          className="rounded-[20px] p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)', border: '1px solid #BFDBFE' }}
        >
          <div className="w-14 h-14 rounded-[16px] flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', boxShadow: '0 4px 16px rgba(37,99,235,0.3)' }}>
            <HelpCircle size={24} className="text-white" />
          </div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em] mb-2">How can we help?</h1>
          <p className="text-[14px] text-[#64748B] mb-5">Search our knowledge base or chat with Snow AI directly</p>
          <div className="relative max-w-md mx-auto">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-[14px] outline-none transition-all"
              style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            />
          </div>
        </div>

        {/* Quick guides */}
        <div>
          <h2 className="text-[15px] font-bold text-[#0F172A] tracking-[-0.01em] mb-3">Popular Guides</h2>
          <div className="grid grid-cols-2 gap-3">
            {guides.map((g, i) => {
              const Icon = g.icon;
              return (
                <button key={i} className="flex items-center gap-3 p-4 rounded-[16px] text-left hover:shadow-md transition-all group" style={{ background: g.color, border: `1px solid rgba(226,232,240,0.6)` }}>
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: '#fff' }}>
                    <Icon size={18} style={{ color: g.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold text-[#0F172A] leading-tight">{g.title}</p>
                    <p className="text-[12px] text-[#64748B] mt-0.5">{g.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-[#CBD5E1] group-hover:text-[#94A3B8] flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-[15px] font-bold text-[#0F172A] tracking-[-0.01em] mb-3">Frequently Asked Questions</h2>
          <div className="rounded-[16px] overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            {filtered.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#F8FAFC] transition-all text-left"
                >
                  <p className="text-[14px] font-semibold text-[#0F172A] pr-4">{faq.q}</p>
                  <ChevronDown
                    size={16}
                    className="text-[#94A3B8] flex-shrink-0 transition-transform"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none' }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-[13.5px] text-[#64748B] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-5 py-8 text-center">
                <p className="text-[14px] text-[#94A3B8]">No results for "{search}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact & AI help */}
        <div className="grid grid-cols-2 gap-3">
          <NavLink
            to="/chat"
            className="flex flex-col items-center gap-3 p-5 rounded-[16px] text-center hover:shadow-md transition-all group"
            style={{ background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)', border: '1px solid #BFDBFE' }}
          >
            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#0F172A]">Ask Snow AI</p>
              <p className="text-[12px] text-[#64748B]">Get instant answers from your AI assistant</p>
            </div>
            <span className="text-[13px] font-semibold text-[#2563EB] flex items-center gap-1 group-hover:gap-2 transition-all">Start chat <ArrowRight size={13} /></span>
          </NavLink>

          <button
            className="flex flex-col items-center gap-3 p-5 rounded-[16px] text-center hover:shadow-md transition-all group"
            style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)' }}
          >
            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: '#F8FAFC' }}>
              <MessageSquare size={18} className="text-[#64748B]" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#0F172A]">Contact Support</p>
              <p className="text-[12px] text-[#64748B]">Avg. response time: 2 hours</p>
            </div>
            <span className="text-[13px] font-semibold text-[#475569] flex items-center gap-1 group-hover:gap-2 transition-all">Open ticket <ArrowRight size={13} /></span>
          </button>
        </div>
      </div>
    </div>
  );
}
