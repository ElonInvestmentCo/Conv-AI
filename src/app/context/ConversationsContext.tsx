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

/** Generate a short title from the first user message */
function autoTitle(firstUserMessage: string): string {
  const cleaned = firstUserMessage
    .replace(/\n+/g, ' ')
    .replace(/[?!.,;:]+$/, '')
    .trim();
  const words = cleaned.split(/\s+/);
  const short = words.slice(0, 7).join(' ');
  // Capitalize first letter
  return short.charAt(0).toUpperCase() + short.slice(1);
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

      setConversations(prev => {
        const next = prev.map(c => {
          if (c.id !== convId) return c;

          const messages = [...c.messages, newMsg];

          // Auto-generate title after first AI reply, using the first user message
          let title = c.title;
          let titleGenerated = c.titleGenerated;
          if (!titleGenerated && msg.role === 'ai') {
            const firstUser = messages.find(m => m.role === 'user');
            if (firstUser) {
              title = autoTitle(firstUser.text);
              titleGenerated = true;
            }
          }

          updated = { ...c, messages, title, titleGenerated, updatedAt: now };
          return updated;
        });
        return sortByActivity(next);
      });

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
