import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Send,
  Paperclip,
  Mic,
  MicOff,
  Image,
  FileText,
  Globe,
  Code2,
  Lightbulb,
  Pencil,
  Search,
  Zap,
  ChevronDown,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  StopCircle,
  Bot,
} from 'lucide-react';

const prompts = [
  { icon: <Code2 size={15} className="text-blue-500" />, title: 'Write code', desc: 'Debug, refactor, or build something new', bg: '#EFF6FF', border: '#BFDBFE' },
  { icon: <Pencil size={15} className="text-violet-500" />, title: 'Draft content', desc: 'Emails, blog posts, social copy', bg: '#F5F3FF', border: '#DDD6FE' },
  { icon: <Search size={15} className="text-emerald-500" />, title: 'Research', desc: 'Deep analysis and comprehensive summaries', bg: '#F0FDF4', border: '#BBF7D0' },
  { icon: <Lightbulb size={15} className="text-amber-500" />, title: 'Brainstorm', desc: 'Generate ideas and explore possibilities', bg: '#FFFBEB', border: '#FDE68A' },
  { icon: <FileText size={15} className="text-rose-500" />, title: 'Analyze document', desc: 'Upload files for instant AI analysis', bg: '#FFF1F2', border: '#FECDD3' },
  { icon: <Globe size={15} className="text-cyan-500" />, title: 'Browse the web', desc: 'Search and summarize live information', bg: '#ECFEFF', border: '#A5F3FC' },
];

type Msg = { id: number; role: 'user' | 'ai'; text?: string; thinking?: boolean };

const seed: Msg[] = [
  { id: 1, role: 'user', text: 'Can you help me build a multi-step AI agent that can browse the web and summarize research papers?' },
  { id: 2, role: 'ai', text: `Absolutely. Here's a clean architecture for a multi-step research agent:\n\n**Step 1 — Search & Retrieve**\nThe agent uses a web search tool to find relevant papers, then fetches full-text from arXiv or Semantic Scholar via API.\n\n**Step 2 — Chunk & Embed**\nEach paper is chunked into sections and embedded with a fast model (text-embedding-3-small). These vectors land in a temporary vector store per session.\n\n**Step 3 — Synthesize**\nA reasoning model (o1 or Claude 3.5 Sonnet) reads the top-k retrieved chunks and writes a structured summary with citations.\n\n**Step 4 — Format & Export**\nOutput is formatted as Markdown with inline citations, exportable to PDF or Notion.\n\nWant me to generate the full Python implementation with LangGraph or a custom agent loop?` },
];

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
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
    className="flex justify-end"
  >
    <div
      className="max-w-[70%] px-5 py-3.5 text-[14px] leading-relaxed text-white rounded-[20px] rounded-tr-[6px]"
      style={{ background: '#0F172A', boxShadow: '0 2px 12px rgba(15,23,42,0.12)' }}
    >
      {text}
    </div>
  </motion.div>
);

const AIAvatar = () => (
  <div
    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
    style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}
  >
    <Sparkles size={12} className="text-white" />
  </div>
);

function parseMarkdown(text: string) {
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/`(.+?)`/g, '<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-[13px] font-mono">$1</code>');
  return text.split('\n\n');
}

const AIMessage = ({ text }: { text: string }) => {
  const parts = parseMarkdown(text);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
      <AIAvatar />
      <div className="flex-1 min-w-0">
        <div className="space-y-3">
          {parts.map((part, i) => (
            <p key={i} className="text-[14px] leading-relaxed text-[#1E293B]" dangerouslySetInnerHTML={{ __html: part }} />
          ))}
        </div>
        <div className="flex items-center gap-1 mt-3">
          {[Copy, ThumbsUp, ThumbsDown, RotateCcw].map((Icon, i) => (
            <button key={i} className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC] transition-all">
              <Icon size={13} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [model, setModel] = useState('GPT-4o');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setStarted(true);
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: t }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: `I've received your message: "${t}"\n\nI'm processing this with full context from our conversation. Here's my analysis and next steps based on what you've shared. Let me know if you'd like me to go deeper on any specific aspect.`,
      }]);
    }, 1800);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const models = ['GPT-4o', 'GPT-4o mini', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'o1-preview'];

  return (
    <div className="flex h-full overflow-hidden" style={{ background: '#F7F9FC' }}>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {!started ? (
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-2xl"
            >
              <div className="text-center mb-10">
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', boxShadow: '0 4px 20px rgba(37,99,235,0.3)' }}
                >
                  <Sparkles size={24} className="text-white" />
                </div>
                <h1 className="text-[28px] font-bold text-[#0F172A] tracking-[-0.03em] mb-2">What can I help you with?</h1>
                <p className="text-[15px] text-[#64748B]">Powered by <span className="font-semibold text-[#2563EB]">{model}</span></p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {prompts.map((p, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 300 }}
                    onClick={() => send(p.title)}
                    className="text-left p-4 rounded-[16px] transition-all hover:scale-[1.02] hover:shadow-md"
                    style={{ background: p.bg, border: `1px solid ${p.border}` }}
                  >
                    <div className="mb-2">{p.icon}</div>
                    <p className="text-[13.5px] font-semibold text-[#0F172A] mb-0.5">{p.title}</p>
                    <p className="text-[12px] text-[#64748B] leading-snug">{p.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map(msg => (
                <div key={msg.id}>
                  {msg.role === 'user' ? <UserBubble text={msg.text!} /> : <AIMessage text={msg.text!} />}
                </div>
              ))}
              {isTyping && (
                <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <AIAvatar />
                  <div className="px-4 py-3 rounded-2xl" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>
        )}

        {started && !isTyping && (
          <div className="px-6 pb-2 flex gap-2 overflow-x-auto">
            {['Continue this further', 'Show me an example', 'Explain step by step', 'Generate the code'].map((s, i) => (
              <button
                key={i}
                onClick={() => send(s)}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12.5px] font-medium text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all"
                style={{ border: '1px solid rgba(226,232,240,0.9)' }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input bar — ChatGPT-style composer */}
        <div className="px-6 pb-5 pt-2 flex-shrink-0 flex flex-col items-center">
          {/* Pill container */}
          <div
            className="w-full max-w-[773px] flex items-center gap-0 rounded-full px-2 transition-all"
            style={{
              background: '#ffffff',
              minHeight: 52,
              border: '1px solid #e5e5e5',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            {/* Leading — + button */}
            <button
              title="Add attachment"
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-[#6b6b6b] hover:text-[#0d0d0d] hover:bg-black/5 transition-all ml-1"
              onClick={() => {}}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {/* Primary — textarea */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything"
              rows={1}
              className="flex-1 min-w-0 resize-none outline-none bg-transparent text-[#0d0d0d] placeholder-[#8e8ea0] text-[16px] leading-[24px] py-[5px] px-2"
              style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif', maxHeight: 160 }}
              onInput={e => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = 'auto';
                t.style.height = Math.min(t.scrollHeight, 160) + 'px';
              }}
            />

            {/* Trailing — mic + voice button */}
            <div className="flex items-center gap-1 flex-shrink-0 mr-1">
              {/* Mic icon */}
              <button
                className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-[#6b6b6b] hover:text-[#0d0d0d] hover:bg-black/5 transition-all"
                onClick={() => setVoiceMode(!voiceMode)}
                title="Voice input"
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyLjI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1pYy1pY29uIGx1Y2lkZS1taWMiPjxwYXRoIGQ9Ik0xMiAxOXYzIi8+PHBhdGggZD0iTTE5IDEwdjJhNyA3IDAgMCAxLTE0IDB2LTIiLz48cmVjdCB4PSI5IiB5PSIyIiB3aWR0aD0iNiIgaGVpZ2h0PSIxMyIgcng9IjMiLz48L3N2Zz4="
                  width={18}
                  height={18}
                  alt="Mic"
                />
              </button>

              {/* Voice/waveform circular button — 55×53 from screenshot */}
              <button
                onClick={input.trim() ? () => send() : () => setVoiceMode(!voiceMode)}
                className="flex-shrink-0 flex items-center justify-center rounded-full transition-all"
                style={{
                  width: 55,
                  height: 53,
                  background: '#0d0d0d',
                }}
                title={input.trim() ? 'Send' : 'Voice mode'}
              >
                {input.trim() ? (
                  /* Up-arrow send icon when text is present */
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                  </svg>
                ) : voiceMode ? (
                  /* Animated waveform bars when recording */
                  <div className="flex items-center gap-[3px]">
                    {[0, 1, 2, 3, 4].map(i => (
                      <motion.div
                        key={i}
                        className="w-[3px] rounded-full bg-white"
                        animate={{ height: [6, 18 + (i % 3) * 5, 6] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.11, ease: 'easeInOut' }}
                        style={{ height: 6 }}
                      />
                    ))}
                  </div>
                ) : (
                  /* Static waveform icon */
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWF1ZGlvLWxpbmVzLWljb24gbHVjaWRlLWF1ZGlvLWxpbmVzIj48cGF0aCBkPSJNMiAxMHYzIi8+PHBhdGggZD0iTTYgNnYxMSIvPjxwYXRoIGQ9Ik0xMCAzdjE4Ii8+PHBhdGggZD0iTTE0IDh2NyIvPjxwYXRoIGQ9Ik0xOCA1djEzIi8+PHBhdGggZD0iTTIyIDEwdjMiLz48L3N2Zz4="
                    width={20}
                    height={20}
                    alt="Voice"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-[12px] text-[#8E8EA0] mt-2.5" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif' }}>
            Conv AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
