import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Send, Paperclip, Mic, MicOff, Zap,
  TrendingUp, PieChart, Shield, Search, BarChart3,
  ChevronDown, ArrowRight, Plus, Image, FileText,
  Volume2, X, RefreshCw, Copy, ThumbsUp, ThumbsDown,
  Clock, Star, Hash
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

// ── Data ──────────────────────────────────────────────
const cashFlowData = [
  { month: 'Jan', income: 14500, expenses: 8200 },
  { month: 'Feb', income: 15200, expenses: 7900 },
  { month: 'Mar', income: 14800, expenses: 8500 },
  { month: 'Apr', income: 16100, expenses: 8100 },
  { month: 'May', income: 15900, expenses: 7600 },
  { month: 'Jun', income: 18400, expenses: 9200 },
];

const netWorthData = [
  { m: 'Jan', v: 980000 }, { m: 'Feb', v: 1020000 }, { m: 'Mar', v: 995000 },
  { m: 'Apr', v: 1080000 }, { m: 'May', v: 1150000 }, { m: 'Jun', v: 1245600 },
];

const prompts = [
  { icon: <TrendingUp size={16} className="text-emerald-500" />, title: 'Analyze my cash flow', desc: 'H1 income vs. expenses breakdown', bg: '#F0FDF4', border: '#BBF7D0' },
  { icon: <PieChart size={16} className="text-blue-500" />, title: 'Portfolio review', desc: 'Asset allocation & performance', bg: '#EFF6FF', border: '#BFDBFE' },
  { icon: <Shield size={16} className="text-violet-500" />, title: 'Tax optimization', desc: 'Deductions & strategies for 2024', bg: '#F5F3FF', border: '#DDD6FE' },
  { icon: <BarChart3 size={16} className="text-amber-500" />, title: 'Budget forecast', desc: 'Spending projections for Q3', bg: '#FFFBEB', border: '#FDE68A' },
  { icon: <Search size={16} className="text-rose-500" />, title: 'Market summary', desc: "Today's financial news digest", bg: '#FFF1F2', border: '#FECDD3' },
  { icon: <Star size={16} className="text-orange-500" />, title: 'Investment ideas', desc: 'AI-curated opportunities', bg: '#FFF7ED', border: '#FED7AA' },
];

// ── Types ─────────────────────────────────────────────
type Msg = { id: number; role: 'user' | 'ai'; text?: string; widget?: 'cashflow' | 'networth' | boolean };

const seed: Msg[] = [
  { id: 1, role: 'user', text: 'Can you analyze my cash flow for the first half of the year? I feel like my expenses are creeping up.' },
  { id: 2, role: 'ai', widget: 'cashflow' },
];

// ── Components ────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-1 py-1">
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        className="block w-1.5 h-1.5 rounded-full bg-blue-400"
        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
      />
    ))}
  </div>
);

const UserBubble = ({ text }: { text: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
    className="flex justify-end"
  >
    <div
      className="max-w-[72%] px-5 py-3.5 text-[14.5px] leading-relaxed text-white rounded-[20px] rounded-tr-[6px]"
      style={{ background: '#0F172A', boxShadow: '0 2px 12px rgba(15,23,42,0.15)' }}
    >
      {text}
    </div>
  </motion.div>
);

const AIAvatar = () => (
  <div
    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
    style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}
  >
    <Sparkles size={13} className="text-white" />
  </div>
);

const AIMessageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
    className="flex items-start gap-3"
  >
    <AIAvatar />
    <div className="flex-1 min-w-0 space-y-2.5">
      {children}
    </div>
  </motion.div>
);

const CashFlowWidget = () => (
  <div
    className="rounded-[18px] overflow-hidden"
    style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
  >
    {/* Header */}
    <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-[15px] font-semibold text-[#0F172A] tracking-[-0.01em]">H1 Cash Flow Analysis</h4>
          <p className="text-[12px] text-[#94A3B8] mt-0.5">Income vs. Expenses · Jan – Jun 2026</p>
        </div>
        <div className="flex items-center gap-3 text-[12px] text-[#64748B]">
          <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full bg-blue-500" /> Income</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full bg-slate-200" /> Expenses</span>
        </div>
      </div>
    </div>
    {/* Chart */}
    <div className="px-5 pt-4 pb-2 h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={cashFlowData} margin={{ left: -16, right: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={6} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} tickFormatter={v => `$${v / 1000}k`} />
          <Tooltip
            cursor={{ fill: 'rgba(241,245,249,0.8)', radius: 8 }}
            contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 13 }}
            formatter={(v: number) => [`$${v.toLocaleString()}`, '']}
          />
          <Bar dataKey="income" fill="#3B82F6" radius={[5, 5, 0, 0]} maxBarSize={32} />
          <Bar dataKey="expenses" fill="#E2E8F0" radius={[5, 5, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    {/* Stats row */}
    <div className="grid grid-cols-3 divide-x px-0 pb-0" style={{ borderTop: '1px solid #F1F5F9', divideColor: '#F1F5F9' }}>
      {[
        { label: 'Total Income', value: '$95,100', delta: '+8.4%', up: true },
        { label: 'Total Expenses', value: '$49,500', delta: '+12.1%', up: false },
        { label: 'Net Saved', value: '$45,600', delta: '47.9% rate', up: true },
      ].map((s, i) => (
        <div key={i} className="px-5 py-3.5" style={{ borderRight: i < 2 ? '1px solid #F1F5F9' : 'none' }}>
          <p className="text-[11px] text-[#94A3B8] font-medium mb-0.5">{s.label}</p>
          <p className="text-[15px] font-bold text-[#0F172A] tracking-[-0.01em]">{s.value}</p>
          <p className={`text-[11px] font-semibold mt-0.5 ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>{s.delta}</p>
        </div>
      ))}
    </div>
  </div>
);

const AITextBubble = ({ text, actions = true }: { text: React.ReactNode; actions?: boolean }) => (
  <div>
    <div
      className="px-5 py-4 rounded-[18px] rounded-tl-[6px] text-[14.5px] text-[#0F172A] leading-[1.7]"
      style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
    >
      {text}
    </div>
    {actions && (
      <div className="flex items-center gap-1 mt-2 ml-1">
        {[{ icon: <Copy size={13} />, label: 'Copy' }, { icon: <ThumbsUp size={13} />, label: 'Good' }, { icon: <ThumbsDown size={13} />, label: 'Bad' }, { icon: <RefreshCw size={13} />, label: 'Retry' }].map(a => (
          <button key={a.label} title={a.label} className="flex items-center gap-1 px-2 py-1 rounded-lg text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC] transition-all text-[12px]">
            {a.icon}
          </button>
        ))}
      </div>
    )}
  </div>
);

const FollowUpChips = ({ chips }: { chips: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-1">
    {chips.map((chip, i) => (
      <button key={i} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium text-[#475569] hover:text-[#0F172A] transition-all" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        {chip}
      </button>
    ))}
  </div>
);

// ── Main Component ────────────────────────────────────
export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [deepMode, setDeepMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(10);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 200) + 'px'; }
  };

  const sendMessage = () => {
    if (!input.trim() || thinking) return;
    const text = input.trim();
    setInput('');
    setStarted(true);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setMessages(prev => [...prev, { id: nextId.current++, role: 'user', text }]);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages(prev => [...prev, {
        id: nextId.current++, role: 'ai',
        text: `Great question. Based on your connected accounts and recent transactions, I can see clear patterns in your financial data. Your overall trajectory is strong — net worth growing at a healthy pace, income trending up. Would you like me to drill into a specific area or generate a detailed report?`,
      }]);
    }, 2200);
  };

  return (
    <div className="flex h-full" style={{ background: '#F7F9FC' }}>

      {/* ── Chat workspace ── */}
      <div className="flex-1 flex flex-col min-w-0 relative">

        {/* Empty / welcome state */}
        {!started ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-2xl"
            >
              {/* Hero */}
              <div className="text-center mb-10">
                <div
                  className="w-16 h-16 rounded-[20px] flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', boxShadow: '0 8px 32px rgba(37,99,235,0.3)' }}
                >
                  <Sparkles size={28} className="text-white" />
                </div>
                <h1 className="text-[32px] font-bold text-[#0F172A] tracking-[-0.03em] mb-2">Good morning, Alex</h1>
                <p className="text-[16px] text-[#64748B] leading-relaxed">Your intelligent financial co-pilot. Ask me anything about your money.</p>
              </div>

              {/* Prompt grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {prompts.map((p, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    onClick={() => { setInput(p.title); setStarted(true); textareaRef.current?.focus(); }}
                    whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                    whileTap={{ scale: 0.98 }}
                    className="text-left p-4 rounded-[16px] transition-all cursor-pointer"
                    style={{ background: p.bg, border: `1px solid ${p.border}` }}
                  >
                    <div className="mb-2.5">{p.icon}</div>
                    <p className="text-[13.5px] font-semibold text-[#0F172A] leading-tight mb-1">{p.title}</p>
                    <p className="text-[12px] text-[#64748B] leading-tight">{p.desc}</p>
                  </motion.button>
                ))}
              </div>

              {/* Quick context chips */}
              <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
                <span className="text-[12px] text-[#94A3B8]">Quick context:</span>
                {['My net worth', 'This month spending', 'Top investments', 'Tax summary'].map(t => (
                  <button key={t} onClick={() => setInput(t)} className="px-3 py-1 rounded-full text-[12px] font-medium text-[#475569] hover:text-[#0F172A] transition-all" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)' }}>
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* ── Messages ── */
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[760px] mx-auto px-6 py-8 pb-40 space-y-8">

              {messages.map(msg => (
                <div key={msg.id}>
                  {msg.role === 'user' ? (
                    <UserBubble text={msg.text!} />
                  ) : msg.widget === 'cashflow' ? (
                    <AIMessageWrapper>
                      <AITextBubble actions={false} text={
                        <span>
                          Certainly, Alex. I've analyzed your connected accounts for H1 2026. You're right to flag the trend — while your income remains strong, expenses have climbed approximately <strong>12%</strong> since January. Here's the full picture:
                        </span>
                      } />
                      <CashFlowWidget />
                      <AITextBubble text={
                        <ul className="space-y-2 text-[14px]">
                          <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">↑</span><span>The June spike ($9,200) was driven by <strong>Travel & Entertainment</strong> — summer vacation bookings.</span></li>
                          <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">→</span><span>Core recurring expenses (housing, utilities, subscriptions) held <strong>stable</strong> throughout H1.</span></li>
                          <li className="flex items-start gap-2"><span className="text-indigo-500 mt-0.5">✦</span><span>Despite the increase, you maintained a positive net cash flow of <strong>+$45,600</strong> — a 47.9% savings rate.</span></li>
                        </ul>
                      } />
                      <FollowUpChips chips={['Drill into June expenses', 'Show category breakdown', 'Forecast Q3', 'Set a spending alert']} />
                    </AIMessageWrapper>
                  ) : (
                    <AIMessageWrapper>
                      <AITextBubble text={msg.text} />
                      <FollowUpChips chips={['Tell me more', 'Generate a report', 'Show chart']} />
                    </AIMessageWrapper>
                  )}
                </div>
              ))}

              {/* Thinking */}
              <AnimatePresence>
                {thinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex items-start gap-3"
                  >
                    <AIAvatar />
                    <div
                      className="px-5 py-3.5 rounded-[18px] rounded-tl-[6px] flex items-center gap-3"
                      style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.9)', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
                    >
                      <TypingDots />
                      <span className="text-[13px] text-[#94A3B8]">Snow AI is analyzing your data…</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>
          </div>
        )}

        {/* ── Composer ── */}
        <div
          className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-10"
          style={{ background: 'linear-gradient(to top, #F7F9FC 65%, transparent)' }}
        >
          <div className="max-w-[760px] mx-auto">
            <motion.div
              className="relative rounded-[20px] overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(226,232,240,0.9)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
              }}
              whileFocusWithin={{ boxShadow: '0 4px 32px rgba(37,99,235,0.12), 0 0 0 3px rgba(37,99,235,0.1)', borderColor: 'rgba(147,197,253,0.8)' } as any}
            >
              {/* Voice mode banner */}
              <AnimatePresence>
                {voiceMode && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 56, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex items-center justify-center gap-3 border-b"
                    style={{ borderColor: '#F1F5F9', background: '#EFF6FF' }}
                  >
                    <div className="flex gap-1 items-center">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 rounded-full bg-blue-500"
                          animate={{ height: [8, Math.random() * 24 + 8, 8] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.05 }}
                        />
                      ))}
                    </div>
                    <span className="text-[13px] font-medium text-blue-700">Listening… speak your question</span>
                    <button onClick={() => setVoiceMode(false)} className="ml-2 p-1 rounded-lg hover:bg-blue-100">
                      <X size={14} className="text-blue-600" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Textarea */}
              <div className="px-4 pt-3.5 pb-1">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => { setInput(e.target.value); autoResize(); }}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Ask Snow AI about your finances, investments, taxes, or anything money-related…"
                  rows={1}
                  className="w-full resize-none outline-none text-[14.5px] text-[#0F172A] placeholder:text-[#CBD5E1] bg-transparent leading-relaxed"
                  style={{ minHeight: 28, maxHeight: 200, fontFamily: 'inherit' }}
                />
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between px-3 pb-3 pt-1">
                <div className="flex items-center gap-0.5">
                  {[
                    { icon: <Paperclip size={16} />, label: 'Attach file' },
                    { icon: <Image size={16} />, label: 'Upload image' },
                    { icon: <FileText size={16} />, label: 'Upload PDF' },
                  ].map(btn => (
                    <button key={btn.label} title={btn.label} className="p-2 rounded-lg text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC] transition-all">
                      {btn.icon}
                    </button>
                  ))}
                  <div className="w-px h-4 bg-[#E2E8F0] mx-1" />
                  <button
                    onClick={() => setVoiceMode(!voiceMode)}
                    className={`p-2 rounded-lg transition-all ${voiceMode ? 'text-blue-600 bg-blue-50' : 'text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC]'}`}
                    title="Voice mode"
                  >
                    {voiceMode ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                  <button
                    onClick={() => setDeepMode(!deepMode)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-semibold transition-all ml-1 ${deepMode ? 'text-violet-700 bg-violet-50' : 'text-[#94A3B8] hover:text-[#475569] hover:bg-[#F8FAFC]'}`}
                  >
                    <Zap size={13} /> Deep Analysis
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#CBD5E1]">{input.length > 0 ? `${input.length}` : 'Enter ↵'}</span>
                  <motion.button
                    onClick={sendMessage}
                    whileTap={{ scale: 0.93 }}
                    disabled={!input.trim() || thinking}
                    className="w-9 h-9 rounded-[12px] flex items-center justify-center transition-all"
                    style={input.trim() && !thinking
                      ? { background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.35)', color: '#fff' }
                      : { background: '#F1F5F9', color: '#CBD5E1', cursor: 'not-allowed' }
                    }
                  >
                    <Send size={15} className={input.trim() ? 'translate-x-px' : ''} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <p className="text-center text-[11px] text-[#CBD5E1] mt-3">
              Snow AI · Financial data is read-only · Responses may not reflect real-time market data
            </p>
          </div>
        </div>
      </div>

      {/* ── Right context panel ── */}
      <div
        className="w-72 flex-shrink-0 flex-col hidden xl:flex overflow-y-auto"
        style={{ background: '#fff', borderLeft: '1px solid rgba(226,232,240,0.8)' }}
      >
        {/* Net worth widget */}
        <div className="p-5" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em]">Net Worth</p>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp size={10} /> +8.4%
            </span>
          </div>
          <p className="text-[26px] font-bold text-[#0F172A] tracking-[-0.02em]">$1,245,600</p>
          <div className="h-16 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={netWorthData}>
                <defs>
                  <linearGradient id="nwGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} fill="url(#nwGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick stats */}
        <div className="p-5 space-y-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em]">This Month</p>
          {[
            { label: 'Income', value: '$18,400', color: '#10B981', icon: '↓' },
            { label: 'Expenses', value: '$9,200', color: '#EF4444', icon: '↑' },
            { label: 'Savings', value: '$9,200', color: '#2563EB', icon: '✦' },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between py-2 px-3 rounded-xl" style={{ background: '#F8FAFC' }}>
              <div className="flex items-center gap-2">
                <span className="text-[13px]" style={{ color: s.color }}>{s.icon}</span>
                <span className="text-[13px] text-[#64748B] font-medium">{s.label}</span>
              </div>
              <span className="text-[13px] font-bold text-[#0F172A]">{s.value}</span>
            </div>
          ))}
        </div>

        {/* AI alert */}
        <div className="p-5" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-3">AI Alert</p>
          <div className="p-4 rounded-[14px]" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <p className="text-[12.5px] font-semibold text-[#92400E] mb-1">Subscription increase detected</p>
            <p className="text-[12px] text-[#B45309] leading-relaxed">CloudServices Inc. charge up 45% this month ($29 → $42). Want me to investigate?</p>
            <button className="mt-2.5 text-[12px] font-semibold text-[#92400E] flex items-center gap-1 hover:opacity-70 transition-opacity">
              Investigate <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Suggested next */}
        <div className="p-5">
          <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-3">Try Next</p>
          <div className="space-y-2">
            {['Optimize my tax strategy', 'Review investment allocations', 'Set a savings goal', 'Analyze spending trends'].map((q, i) => (
              <button
                key={i}
                onClick={() => { setInput(q); setStarted(true); textareaRef.current?.focus(); }}
                className="w-full text-left px-3.5 py-2.5 rounded-[12px] text-[13px] text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all flex items-center gap-2 group"
                style={{ border: '1px solid rgba(226,232,240,0.8)' }}
              >
                <Hash size={12} className="text-[#CBD5E1] group-hover:text-[#94A3B8] flex-shrink-0" />
                <span className="truncate">{q}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
