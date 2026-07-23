import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Pencil,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Mic,
} from 'lucide-react';
import { useConversations } from '../context/ConversationsContext';
import { LogoMark } from '../components/LogoMark';
import { EmptyState } from '../components/EmptyState';

const chips = ['Continue this further', 'Show me an example', 'Explain step by step', 'Generate the code'];


// ── Animated voice waveform — 5 white bars ────────────────────────────────────
const VoiceWaveform = () => (
  <div className="flex items-center gap-[3px]">
    {[0, 1, 2, 3, 4].map(i => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full bg-white"
        animate={{ height: ['5px', `${13 + (i % 3) * 5}px`, '5px'] }}
        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.09, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

// ── Typing indicator ──────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-[5px] py-0.5">
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        className="block w-[6px] h-[6px] rounded-full bg-[#6366F1]"
        animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.17, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

// ── Markdown renderer ─────────────────────────────────────────────────────────
function renderLine(line: string, key: number) {
  let html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(
    /`(.+?)`/g,
    `<code style="background:#1A1D24;color:#818CF8;padding:2px 7px;border-radius:5px;font-size:12.5px;font-family:'JetBrains Mono',monospace">$1</code>`
  );
  return <span key={key} dangerouslySetInnerHTML={{ __html: html }} />;
}

function parseMarkdown(text: string) {
  return text.split('\n\n').map(block => block.split('\n'));
}

// ── Message components ────────────────────────────────────────────────────────
const UserBubble = ({ text }: { text: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
    className="flex justify-end"
  >
    <div
      className="max-w-[62%] px-5 py-[14px] text-[15px] leading-[1.65] text-[#F8FAFC]"
      style={{ background: '#1A1D24', border: '1px solid #2E3440', borderRadius: '20px 20px 4px 20px' }}
    >
      {text}
    </div>
  </motion.div>
);

const AIAvatar = () => (
  <div
    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
    style={{ background: '#111318', border: '1px solid #1E222A', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
  >
    <LogoMark className="w-[17px] h-[17px]" variant="auto" />
  </div>
);

const AIMessage = ({ text }: { text: string }) => {
  const blocks = parseMarkdown(text);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className="flex gap-4"
    >
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
            { Icon: Copy,       title: 'Copy'        },
            { Icon: ThumbsUp,   title: 'Helpful'     },
            { Icon: ThumbsDown, title: 'Not helpful'  },
            { Icon: RotateCcw,  title: 'Regenerate'  },
            { Icon: Pencil,     title: 'Edit'        },
          ].map(({ Icon, title }) => (
            <button
              key={title}
              title={title}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-[140ms]"
              style={{ color: 'rgba(148,163,184,0.65)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#1A1D24';
                (e.currentTarget as HTMLElement).style.color = '#94A3B8';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'rgba(148,163,184,0.65)';
              }}
            >
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

  // Pending suggestion text to pre-fill the composer after a card click
  const pendingSuggestion = useRef<string | null>(null);

  const [input, setInput]             = useState('');
  const [isTyping, setIsTyping]       = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [voiceMode, setVoiceMode]     = useState(false);
  const [composerFocused, setComposerFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef   = useRef<HTMLDivElement>(null);

  // Resolve the active conversation
  const conversation = convId ? getConversation(convId) : undefined;

  // If convId is stale / invalid, go back to /chat (welcome screen)
  useEffect(() => {
    if (convId && !conversation) {
      navigate('/chat', { replace: true });
    }
  }, [convId, conversation, navigate]);

  const messages = conversation?.messages ?? [];
  const started  = messages.length > 0;

  // Pre-fill composer if a suggestion was clicked before a conversation existed
  useEffect(() => {
    if (pendingSuggestion.current && textareaRef.current) {
      setInput(pendingSuggestion.current);
      pendingSuggestion.current = null;
      textareaRef.current.focus();
    }
  }, [convId]);

  // Auto-scroll on new messages or typing indicator
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isTyping]);

  const send = useCallback(async (text?: string) => {
    const t = (text ?? input).trim();
    if (!t || isTyping) return;

    setInput('');
    setStreamingText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    // Lazily create a conversation the first time the user sends a real message
    let activeId = convId;
    if (!activeId) {
      activeId = createConversation();
      navigate(`/chat/${activeId}`, { replace: true });
    }

    // Build API messages from existing history + the new user turn
    const currentMsgs = getConversation(activeId)?.messages ?? [];
    const apiMessages = [
      ...currentMsgs.map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user' as const,
        content: m.text,
      })),
      { role: 'user' as const, content: t },
    ];

    addMessage(activeId, { role: 'user', text: t });
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(err.error || 'Chat request failed');
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let aiText = '';
      let buf = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (payload === '[DONE]') continue;
          try {
            const { content } = JSON.parse(payload);
            if (content) { aiText += content; setStreamingText(aiText); }
          } catch { /* ignore malformed chunks */ }
        }
      }

      setIsTyping(false);
      setStreamingText('');
      if (aiText) addMessage(activeId!, { role: 'ai', text: aiText });
    } catch (err) {
      setIsTyping(false);
      setStreamingText('');
      const msg = err instanceof Error ? err.message : 'An error occurred';
      addMessage(activeId!, { role: 'ai', text: `⚠️ **Error:** ${msg}` });
    }
  }, [input, convId, isTyping, addMessage, createConversation, navigate, getConversation]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  };

  // Stale convId — redirect handled by effect above; render nothing while redirecting
  if (convId && !conversation) return null;

  return (
    <div className="flex h-full overflow-hidden" style={{ background: '#0A0C10' }}>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Empty / welcome state ───────────────────────────────── */}
        {!started ? (
          <div className="flex-1 overflow-y-auto flex flex-col">
            <EmptyState onSuggest={(text) => { setInput(text); setTimeout(() => textareaRef.current?.focus(), 0); }} />
          </div>
        ) : (
          /* ── Conversation thread ─────────────────────────────────── */
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
                  streamingText ? (
                    <AIMessage key="streaming" text={streamingText} />
                  ) : (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4"
                    >
                      <AIAvatar />
                      <div className="px-5 py-4 rounded-2xl" style={{ background: '#111318', border: '1px solid #1E222A' }}>
                        <TypingDots />
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>
          </div>
        )}

        {/* ── Bottom: suggestion chips + composer ─────────────────── */}
        <div className="flex-shrink-0 pb-5">

          {/* Suggestion chips */}
          <AnimatePresence>
            {started && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-2 overflow-x-auto px-6 mb-4"
                style={{ scrollbarWidth: 'none' }}
              >
                {chips.map((s, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => send(s)}
                    className="flex-shrink-0 text-[13px] font-medium text-[#475569] hover:text-[#94A3B8] transition-all duration-[160ms] hover:border-[#2E3440]"
                    style={{
                      height: 38,
                      paddingLeft: 16,
                      paddingRight: 16,
                      borderRadius: 999,
                      border: '1px solid #1E222A',
                      background: 'transparent',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Composer ─────────────────────────────────────────────── */}
          <div className="px-6 flex justify-center">
            <motion.div
              animate={{
                boxShadow: composerFocused
                  ? '0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.35)'
                  : '0 4px 24px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.25)',
              }}
              transition={{ duration: 0.18 }}
              className="relative flex items-center gap-1 w-full"
              style={{
                maxWidth: 773,
                minHeight: 53,
                background: '#181b21',
                border: 'none',
                borderRadius: 32,
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 6,
                paddingBottom: 6,
              }}
            >
              {/* Attachment */}
              <button
                className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-[150ms] text-[#475569] hover:text-[#94A3B8] hover:bg-[#181b21]"
                style={{ width: 38, height: 38 }}
                title="Add attachment"
              >
                <Plus size={20} strokeWidth={2} />
              </button>

              {/* Text input */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                onFocus={() => setComposerFocused(true)}
                onBlur={() => setComposerFocused(false)}
                onInput={e => autoResize(e.target as HTMLTextAreaElement)}
                placeholder="Ask anything…"
                rows={1}
                className="flex-1 min-w-0 resize-none outline-none bg-transparent text-[15px] leading-[1.5] py-1.5 px-1"
                style={{
                  maxHeight: 180,
                  color: '#F8FAFC',
                  caretColor: '#6366F1',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  outline: 'none',
                  border: 'none',
                }}
              />

              {/* Mic + Send */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => setVoiceMode(v => !v)}
                  title={voiceMode ? 'Stop voice' : 'Voice input'}
                  className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-[150ms]"
                  style={{
                    width: 38,
                    height: 38,
                    background: voiceMode ? 'rgba(99,102,241,0.15)' : 'transparent',
                    color: voiceMode ? '#6366F1' : '#475569',
                  }}
                  onMouseEnter={e => {
                    if (!voiceMode) {
                      (e.currentTarget as HTMLElement).style.background = '#181b21';
                      (e.currentTarget as HTMLElement).style.color = '#94A3B8';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!voiceMode) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = '#475569';
                    }
                  }}
                >
                  {voiceMode ? <VoiceWaveform /> : <Mic size={18} strokeWidth={1.8} />}
                </button>

                <motion.button
                  onClick={() => send()}
                  whileHover={input.trim() ? { scale: 1.04 } : {}}
                  whileTap={input.trim() ? { scale: 0.96 } : {}}
                  transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                  title="Send message"
                  className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-[160ms]"
                  style={{
                    width: 44,
                    height: 44,
                    background: input.trim() ? '#6366F1' : '#181b21',
                    boxShadow: input.trim() ? '0 2px 12px rgba(99,102,241,0.35)' : 'none',
                    cursor: input.trim() ? 'pointer' : 'default',
                  }}
                  onMouseEnter={e => {
                    if (input.trim()) {
                      (e.currentTarget as HTMLElement).style.background = '#4F46E5';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(99,102,241,0.45)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (input.trim()) {
                      (e.currentTarget as HTMLElement).style.background = '#6366F1';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(99,102,241,0.35)';
                    }
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ opacity: input.trim() ? 1 : 0.3 }}
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>

          <p className="text-center text-[12px] text-[#2E3440] mt-3">
            Conv AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
