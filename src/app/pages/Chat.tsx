import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Paperclip,
  Mic,
  Image,
  FileText,
  Globe,
  Code2,
  Lightbulb,
  Pencil,
  Search,
  ChevronDown,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Plus,
} from 'lucide-react';

// ── Conv AI Logo Mark ─────────────────────────────────────────────────────────
const LogoMark = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 10C6 7.79086 7.79086 6 10 6H16V18C16 22.4183 12.4183 26 8 26H6V10Z" fill="#6366F1" />
    <path d="M26 22C26 24.2091 24.2091 26 22 26H16V14C16 9.58172 19.5817 6 24 6H26V22Z" fill="#6366F1" fillOpacity={0.5} />
  </svg>
);

const prompts = [
  { icon: <Code2 size={14} className="text-[#6366F1]" />,  title: 'Write code',         desc: 'Debug, refactor, or build something new'   },
  { icon: <Pencil size={14} className="text-[#94A3B8]" />,  title: 'Draft content',      desc: 'Emails, blog posts, social copy'             },
  { icon: <Search size={14} className="text-[#10B981]" />,  title: 'Research',           desc: 'Deep analysis and comprehensive summaries'  },
  { icon: <Lightbulb size={14} className="text-[#F59E0B]"/>, title: 'Brainstorm',         desc: 'Generate ideas and explore possibilities'   },
  { icon: <FileText size={14} className="text-[#EF4444]" />, title: 'Analyze document',   desc: 'Upload files for instant AI analysis'       },
  { icon: <Globe size={14} className="text-[#06B6D4]" />,   title: 'Browse the web',     desc: 'Search and summarize live information'      },
];

type Msg = { id: number; role: 'user' | 'ai'; text?: string; thinking?: boolean };

const seed: Msg[] = [
  { id: 1, role: 'user', text: 'Can you help me build a multi-step AI agent that can browse the web and summarize research papers?' },
  { id: 2, role: 'ai',   text: `Absolutely. Here's a clean architecture for a multi-step research agent:\n\n**Step 1 — Search & Retrieve**\nThe agent uses a web search tool to find relevant papers, then fetches full-text from arXiv or Semantic Scholar via API.\n\n**Step 2 — Chunk & Embed**\nEach paper is chunked into sections and embedded with a fast model (text-embedding-3-small). These vectors land in a temporary vector store per session.\n\n**Step 3 — Synthesize**\nA reasoning model (o1 or Claude 3.5 Sonnet) reads the top-k retrieved chunks and writes a structured summary with citations.\n\n**Step 4 — Format & Export**\nOutput is formatted as Markdown with inline citations, exportable to PDF or Notion.\n\nWant me to generate the full Python implementation with LangGraph or a custom agent loop?` },
];

const TypingDots = () => (
  <div className="flex items-center gap-1 py-1">
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        className="block w-1.5 h-1.5 rounded-full bg-[#6366F1]"
        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
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
      className="max-w-[70%] px-4 py-3 text-[14px] leading-relaxed text-[#F8FAFC] rounded-2xl rounded-tr-md"
      style={{ background: '#1A1D24', border: '1px solid #2E3440' }}
    >
      {text}
    </div>
  </motion.div>
);

const AIAvatar = () => (
  <div
    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
    style={{ background: '#111318', border: '1px solid #1E222A' }}
  >
    <LogoMark className="w-4 h-4" />
  </div>
);

function parseMarkdown(text: string) {
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/`(.+?)`/g, '<code style="background:#1A1D24;color:#6366F1;padding:2px 6px;border-radius:4px;font-size:12px;font-family:\'JetBrains Mono\',monospace">$1</code>');
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
            <p key={i} className="text-[14px] leading-relaxed text-[#F8FAFC]" dangerouslySetInnerHTML={{ __html: part }} />
          ))}
        </div>
        <div className="flex items-center gap-1 mt-3">
          {[Copy, ThumbsUp, ThumbsDown, RotateCcw].map((Icon, i) => (
            <button key={i} className="p-1.5 rounded-lg text-[#2E3440] hover:text-[#475569] hover:bg-[#1A1D24] transition-all">
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

  return (
    <div className="flex h-full overflow-hidden" style={{ background: '#0A0C10' }}>
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
                  className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                  style={{ background: '#111318', border: '1px solid #1E222A' }}
                >
                  <LogoMark className="w-8 h-8" />
                </div>
                <h1 className="text-[26px] font-semibold text-[#F8FAFC] tracking-tight mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  What can I help you with?
                </h1>
                <p className="text-[14px] text-[#475569]">
                  Powered by <span className="text-[#6366F1] font-medium">{model}</span>
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {prompts.map((p, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 300 }}
                    onClick={() => send(p.title)}
                    className="text-left p-4 rounded-2xl transition-all hover:bg-[#1A1D24]"
                    style={{ background: '#111318', border: '1px solid #1E222A' }}
                  >
                    <div className="mb-2">{p.icon}</div>
                    <p className="text-[13px] font-semibold text-[#F8FAFC] mb-0.5">{p.title}</p>
                    <p className="text-[12px] text-[#475569] leading-snug">{p.desc}</p>
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
                  <div className="px-4 py-3 rounded-2xl" style={{ background: '#111318', border: '1px solid #1E222A' }}>
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
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium text-[#475569] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all"
                style={{ border: '1px solid #1E222A' }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <div className="px-6 pb-5 pt-2 flex-shrink-0 flex flex-col items-center">
          <div
            className="w-full max-w-[773px] flex items-center gap-0 rounded-2xl px-2 transition-all"
            style={{
              background: '#111318',
              minHeight: 52,
              border: '1px solid #1E222A',
            }}
            onFocus={() => {}}
          >
            <button
              title="Add attachment"
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl text-[#475569] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all ml-1"
            >
              <Plus size={17} />
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything"
              rows={1}
              className="flex-1 min-w-0 resize-none outline-none bg-transparent text-[#F8FAFC] placeholder-[#2E3440] text-[15px] leading-[24px] py-[5px] px-2"
              style={{ maxHeight: 160 }}
              onInput={e => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = 'auto';
                t.style.height = Math.min(t.scrollHeight, 160) + 'px';
              }}
            />

            <div className="flex items-center gap-1 flex-shrink-0 mr-1">
              <button
                className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl text-[#475569] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all"
                onClick={() => setVoiceMode(!voiceMode)}
                title="Voice input"
              >
                <Mic size={17} />
              </button>

              <button
                onClick={input.trim() ? () => send() : () => setVoiceMode(!voiceMode)}
                className="flex-shrink-0 flex items-center justify-center rounded-xl transition-all"
                style={{
                  width: 36,
                  height: 36,
                  background: input.trim() ? '#6366F1' : '#1A1D24',
                }}
                title={input.trim() ? 'Send' : 'Voice mode'}
              >
                {input.trim() ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                  </svg>
                ) : voiceMode ? (
                  <div className="flex items-center gap-[3px]">
                    {[0, 1, 2, 3, 4].map(i => (
                      <motion.div
                        key={i}
                        className="w-[2px] rounded-full bg-[#6366F1]"
                        animate={{ height: [4, 14 + (i % 3) * 4, 4] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.11, ease: 'easeInOut' }}
                        style={{ height: 4 }}
                      />
                    ))}
                  </div>
                ) : (
                  <Send size={15} className="text-[#475569]" />
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-[12px] text-[#2E3440] mt-2.5">
            Conv AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
