import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────────
export type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: number;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  titleGenerated: boolean; // true once auto-title has been set
};

interface ConversationsContextType {
  /** All conversations, newest-first by updatedAt */
  conversations: Conversation[];
  getConversation: (id: string) => Conversation | undefined;
  /** Create a new empty conversation and return its id */
  createConversation: () => string;
  /** Append a message and persist. Returns the updated conversation. */
  addMessage: (convId: string, msg: Omit<Message, 'id' | 'timestamp'>) => Conversation;
  renameConversation: (id: string, title: string) => void;
  deleteConversation: (id: string) => void;
  archiveConversation: (id: string) => void;
}

// ── Context ────────────────────────────────────────────────────────────────────
const ConversationsContext = createContext<ConversationsContextType | null>(null);

export function useConversations() {
  const ctx = useContext(ConversationsContext);
  if (!ctx) throw new Error('useConversations must be used within ConversationsProvider');
  return ctx;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'convai:conversations';

function load(): Conversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw) as Conversation[];
    // Drop empty shells that were created before a message was ever sent
    return all.filter(c => c.messages.length > 0);
  } catch {
    return [];
  }
}

function save(convs: Conversation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(convs));
  } catch {
    // storage full — fail silently
  }
}

function sortByActivity(convs: Conversation[]): Conversation[] {
  return [...convs].sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Filler words to strip for the local fallback title */
const FILLERS = new Set([
  'a', 'an', 'the', 'i', 'me', 'my', 'we', 'our', 'you', 'your',
  'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'could', 'should', 'can', 'may', 'might', 'shall',
  'to', 'of', 'in', 'on', 'at', 'for', 'with', 'by', 'from',
  'and', 'or', 'but', 'so', 'if', 'that', 'this', 'it',
  'help', 'please', 'need', 'want', 'make', 'create',
  'how', 'why', 'what', 'when', 'where', 'which', 'who',
  'get', 'give', 'just', 'really', 'very', 'some', 'any',
]);

/** Local fallback: extract 2–5 meaningful words from the first user message */
function localTitle(firstUserMessage: string): string {
  const cleaned = firstUserMessage
    .replace(/\n+/g, ' ')
    .replace(/[?!.,;:'"]+/g, '')
    .trim();
  const allWords = cleaned.split(/\s+/);
  const meaningful = allWords.filter(w => !FILLERS.has(w.toLowerCase()));
  const source = meaningful.length >= 2 ? meaningful : allWords;
  const title = source.slice(0, 5).join(' ');
  return title.charAt(0).toUpperCase() + title.slice(1);
}

/**
 * Generate a title via the /api/title endpoint (gpt-4o-mini).
 * Falls back to localTitle() if the request fails or the key is missing.
 * Sets the title immediately with the local result, then updates once the
 * API responds — so the sidebar never shows "New chat" for long.
 */
async function generateTitle(
  convId: string,
  firstUserMessage: string,
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
): Promise<void> {
  // Show an instant local title right away
  const fallback = localTitle(firstUserMessage);
  setConversations(prev =>
    prev.map(c => (c.id === convId ? { ...c, title: fallback } : c))
  );

  try {
    const res = await fetch('/api/title', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: firstUserMessage.slice(0, 400) }),
    });
    if (res.ok) {
      const data = await res.json();
      const title = data.title?.trim();
      if (title) {
        setConversations(prev =>
          prev.map(c => (c.id === convId ? { ...c, title } : c))
        );
      }
    }
  } catch {
    // Network error — local title stays, no action needed
  }
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ── Provider ───────────────────────────────────────────────────────────────────
export function ConversationsProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(() => sortByActivity(load()));

  // Persist on every change
  useEffect(() => {
    save(conversations);
  }, [conversations]);

  const getConversation = useCallback(
    (id: string) => conversations.find(c => c.id === id),
    [conversations]
  );

  const createConversation = useCallback((): string => {
    const now = Date.now();
    const conv: Conversation = {
      id: uid(),
      title: 'New chat',
      messages: [],
      createdAt: now,
      updatedAt: now,
      titleGenerated: false,
    };
    setConversations(prev => sortByActivity([conv, ...prev]));
    return conv.id;
  }, []);

  const addMessage = useCallback(
    (convId: string, msg: Omit<Message, 'id' | 'timestamp'>): Conversation => {
      const now = Date.now();
      const newMsg: Message = { ...msg, id: uid(), timestamp: now };
      let updated!: Conversation;
      let titleText: string | null = null; // set when we should kick off title generation

      setConversations(prev => {
        const existing = prev.find(c => c.id === convId);

        // Trigger title generation on the first user message only
        if (msg.role === 'user' && existing && !existing.titleGenerated && existing.messages.length === 0) {
          titleText = newMsg.text;
        }

        const next = prev.map(c => {
          if (c.id !== convId) return c;
          const messages = [...c.messages, newMsg];
          // Mark as generated immediately so nothing else races to generate it
          const titleGenerated = titleText ? true : c.titleGenerated;
          updated = { ...c, messages, titleGenerated, updatedAt: now };
          return updated;
        });

        if (!updated) {
          // Conversation not yet in state — first message ever
          if (msg.role === 'user') titleText = newMsg.text;
          updated = { id: convId, title: 'New chat', messages: [newMsg], createdAt: now, updatedAt: now, titleGenerated: !!titleText };
          return sortByActivity([updated, ...prev]);
        }

        return sortByActivity(next);
      });

      // Fire-and-forget async title generation (does not block the return)
      if (titleText) {
        generateTitle(convId, titleText, setConversations);
      }

      // If the conversation wasn't found (shouldn't happen), return a stub
      if (!updated) {
        updated = { id: convId, title: 'New chat', messages: [newMsg], createdAt: now, updatedAt: now, titleGenerated: false };
      }

      return updated;
    },
    []
  );

  const renameConversation = useCallback((id: string, title: string) => {
    setConversations(prev =>
      prev.map(c => c.id === id ? { ...c, title: title.trim() || c.title } : c)
    );
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
  }, []);

  const archiveConversation = useCallback((id: string) => {
    // For now, archive = delete. Can be extended with an `archived` flag later.
    setConversations(prev => prev.filter(c => c.id !== id));
  }, []);

  return (
    <ConversationsContext.Provider value={{
      conversations,
      getConversation,
      createConversation,
      addMessage,
      renameConversation,
      deleteConversation,
      archiveConversation,
    }}>
      {children}
    </ConversationsContext.Provider>
  );
}
