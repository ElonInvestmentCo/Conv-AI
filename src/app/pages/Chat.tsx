import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Pencil,
  Search,
  Lightbulb,
  FileText,
  Globe,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { useConversations } from '../context/ConversationsContext';
import { LogoMark } from '../components/LogoMark';

// ── Welcome prompts ───────────────────────────────────────────────────────────
const prompts = [
  { icon: <Code2 size={15} className="text-[#6366F1]" />,    title: 'Write code',       desc: 'Debug, refactor, or build something new'   },
  { icon: <Pencil size={15} className="text-[#94A3B8]" />,   title: 'Draft content',    desc: 'Emails, blog posts, social copy'             },
  { icon: <Search size={15} className="text-[#10B981]" />,   title: 'Research',         desc: 'Deep analysis and comprehensive summaries'   },
  { icon: <Lightbulb size={15} className="text-[#F59E0B]" />,title: 'Brainstorm',       desc: 'Generate ideas and explore possibilities'    },
  { icon: <FileText size={15} className="text-[#EF4444]" />, title: 'Analyze document', desc: 'Upload files for instant AI analysis'        },
  { icon: <Globe size={15} className="text-[#06B6D4]" />,    title: 'Browse the web',   desc: 'Search and summarize live information'       },
];

const chips = ['Continue this further', 'Show me an example', 'Explain step by step', 'Generate the code'];

// ── Simulated AI responses ────────────────────────────────────────────────────
function buildAIResponse(userText: string): string {
  return `I've received your message: "${userText}"\n\nI'm processing this with full context from our conversation. Here's my analysis and next steps based on what you've shared.\n\nLet me know if you'd like me to go deeper on any specific aspect.`;
}

// ── Typing indicator ──────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-[5px] py-0.5">
    {[0, 1, 2].map(i => (
      <motion.span key={i} className="block w-[6px] h-[6px] rounded-full bg-[#6366F1]"
        animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.17, ease: 'easeInOut' }} />
    ))}
  </div>
);

// ── Markdown renderer (subset) ────────────────────────────────────────────────
function renderLine(line: string, key: number) {
  let html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`(.+?)`/g,
    `<code style="background:#1A1D24;color:#818CF8;padding:2px 7px;border-radius:5px;font-size:12.5px;font-family:'JetBrains Mono',monospace">$1</code>`);
  return <span key={key} dangerouslySetInnerHTML={{ __html: html }} />;
}

function parseMarkdown(text: string) {
  return text.split('\n\n').map(block => block.split('\n'));
}

// ── Bubbles ───────────────────────────────────────────────────────────────────
const UserBubble = ({ text }: { text: string }) => (
  <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: 'spring', stiffness: 420, damping: 36 }} className="flex justify-end">
    <div className="max-w-[62%] px-5 py-[14px] text-[15px] leading-[1.65] text-[#F8FAFC]"
      style={{ background: '#1A1D24', border: '1px solid #2E3440', borderRadius: '20px 20px 4px 20px' }}>
      {text}
    </div>
  </motion.div>
);

const AIAvatar = () => (
  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
    style={{ background: '#111318', border: '1px solid #1E222A', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
    <LogoMark className="w-[17px] h-[17px]" variant="brand" />
  </div>
);

const AIMessage = ({ text }: { text: string }) => {
  const blocks = parseMarkdown(text);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }} className="flex gap-4">
      <AIAvatar />
      <div className="flex-1 min-w-0">
        <div className="space-y-[14px]">
          {blocks.map((lines, bi) => (
            <p key={bi} className="text-[15px] text-[#F8FAFC]" style={{ lineHeight: 1.68 }}>
              {lines.map((line, li) => (
                <React.Fragment key={li}>
                  {renderLine(line, li)}
                  {li < lines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-0.5 mt-4">
          {[
            { Icon: Copy,      title: 'Copy'        },
            { Icon: ThumbsUp,  title: 'Helpful'     },
            { Icon: ThumbsDown,title: 'Not helpful'  },
            { Icon: RotateCcw, title: 'Regenerate'  },
            { Icon: Pencil,    title: 'Edit'        },
          ].map(({ Icon, title }) => (
            <button key={title} title={title}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-[140ms]"
              style={{ color: 'rgba(148,163,184,0.65)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A1D24'; (e.currentTarget as HTMLElement).style.color = '#94A3B8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(148,163,184,0.65)'; }}>
              <Icon size={14} strokeWidth={1.8} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Chat component ───────────────────────────────────────────────────────
export default function Chat() {
  const { id: convId } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { getConversation, createConversation, addMessage } = useConversations();

  const [input, setInput]           = useState('');
  const [isTyping, setIsTyping]     = useState(false);
  const [voiceMode, setVoiceMode]   = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef   = useRef<HTMLDivElement>(null);

  // Resolve the active conversation (or redirect if id is invalid)
  const conversation = convId ? getConversation(convId) : undefined;

  // If no id was given, create one and redirect immediately
  useEffect(() => {
    if (!convId) {
      const id = createConversation();
      navigate(`/chat/${id}`, { replace: true });
    }
  }, [convId, createConversation, navigate]);

  // If a convId was given but doesn't exist (e.g. stale URL), create new
  useEffect(() => {
    if (convId && !conversation) {
      navigate('/chat', { replace: true });
    }
  }, [convId, conversation, navigate]);

  const messages = conversation?.messages ?? [];
  const started  = messages.length > 0;

  // Scroll to bottom on new messages / typing
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isTyping]);

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t || !convId || isTyping) return;

    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    // Save user message
    addMessage(convId, { role: 'user', text: t });

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Save AI response — this also triggers auto-title generation
      addMessage(convId, { role: 'ai', text: buildAIResponse(t) });
    }, 1600);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  };

  if (!convId || !conversation) return null; // briefly null while redirecting

  return (
    <div className="flex h-full overflow-hidden" style={{ background: '#0A0C10' }}>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Empty / welcome state ── */}
        {!started ? (
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 py-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="w-full max-w-[860px]">
              <div className="text-center mb-10">
                <div className="w-[52px] h-[52px] rounded-2xl mx-auto mb-5 flex items-center justify-center"
                  style={{ background: '#111318', border: '1px solid #1E222A', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                  <LogoMark className="w-[30px] h-[30px]" />
                </div>
                <h1 className="text-[28px] font-semibold text-[#F8FAFC] tracking-tight mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  What can I help you with?
                </h1>
                <p className="text-[14px] text-[#475569]">
                  Powered by <span className="text-[#6366F1] font-medium">GPT-4o</span>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {prompts.map((p, i) => (
                  <motion.button key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, type: 'spring', stiffness: 300 }}
                    whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                    onClick={() => send(p.title)}
                    className="text-left p-4 rounded-2xl transition-colors duration-[160ms] hover:border-[#2E3440]"
                    style={{ background: '#111318', border: '1px solid #1E222A' }}>
                    <div className="mb-2.5">{p.icon}</div>
                    <p className="text-[13px] font-semibold text-[#F8FAFC] mb-1">{p.title}</p>
                    <p className="text-[12px] text-[#475569] leading-snug">{p.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* ── Conversation messages ── */
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[880px] mx-auto px-6 py-8 space-y-8">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <div key={msg.id}>
                    {msg.role === 'user'
                      ? <UserBubble text={msg.text} />
                      : <AIMessage text={msg.text} />
                    }
                  </div>
                ))}
                {isTyping && (
                  <motion.div key="typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }} className="flex gap-4">
                    <AIAvatar />
                    <div className="px-5 py-4 rounded-2xl" style={{ background: '#111318', border: '1px solid #1E222A' }}>
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>
          </div>
        )}

        {/* ── Bottom: chips + composer ── */}
        <div className="flex-shrink-0 pb-5">
          <AnimatePresence>
            {started && !isTyping && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex gap-2 overflow-x-auto px-6 mb-3" style={{ scrollbarWidth: 'none' }}>
                {chips.map((s, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
                    onClick={() => send(s)}
                    className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12.5px] font-medium text-[#475569] hover:text-[#94A3B8] transition-all hover:border-[#2E3440]"
                    style={{ border: '1px solid #1E222A', whiteSpace: 'nowrap' }}>
                    {s}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Composer */}
          <div className="px-6 pb-0 pt-2 flex-shrink-0 flex flex-col items-center">
            <div className="w-full max-w-[773px] flex items-center gap-0 rounded-full px-2 transition-all"
              style={{ background: '#ffffff', minHeight: 52, border: '1px solid #e5e5e5', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <button title="Add attachment"
                className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-[#6b6b6b] hover:text-[#0d0d0d] hover:bg-black/5 transition-all ml-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

              <textarea ref={textareaRef} value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                onInput={e => autoResize(e.target as HTMLTextAreaElement)}
                placeholder="Ask anything"
                rows={1}
                className="flex-1 min-w-0 resize-none outline-none bg-transparent text-[#0d0d0d] placeholder-[#8e8ea0] text-[16px] leading-[24px] py-[5px] px-2"
                style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif', maxHeight: 160 }}
              />

              <div className="flex items-center gap-1 flex-shrink-0 mr-1">
                <button className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-[#6b6b6b] hover:text-[#0d0d0d] hover:bg-black/5 transition-all"
                  onClick={() => setVoiceMode(v => !v)} title="Voice input">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19v3" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><rect x="9" y="2" width="6" height="13" rx="3" />
                  </svg>
                </button>
                <button
                  onClick={input.trim() ? () => send() : () => setVoiceMode(v => !v)}
                  className="flex-shrink-0 flex items-center justify-center rounded-full transition-all"
                  style={{ width: 55, height: 53, background: '#0d0d0d' }}
                  title={input.trim() ? 'Send' : 'Voice mode'}>
                  {input.trim() ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                    </svg>
                  ) : voiceMode ? (
                    <div className="flex items-center gap-[3px]">
                      {[0, 1, 2, 3, 4].map(i => (
                        <motion.div key={i} className="w-[3px] rounded-full bg-white"
                          animate={{ height: [6, 18 + (i % 3) * 5, 6] }}
                          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.11, ease: 'easeInOut' }}
                          style={{ height: 6 }} />
                      ))}
                    </div>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 10v3" /><path d="M6 6v11" /><path d="M10 3v18" /><path d="M14 8v7" /><path d="M18 5v13" /><path d="M22 10v3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <p className="text-center text-[12px] text-[#8E8EA0] mt-2.5"
              style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif' }}>
              Conv AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
