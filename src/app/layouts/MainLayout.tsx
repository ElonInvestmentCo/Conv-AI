import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Outlet, NavLink, useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  SquarePen,
  Bell,
  Settings,
  User,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  LogOut,
  Zap,
  Sun,
  Keyboard,
  Images,
  LibraryBig,
  FolderClosed,
  FileAudio,
  LayoutDashboard,
  Mic,
  MoreHorizontal,
  Pencil,
  Archive,
  Trash2,
  Circle,
  X,
} from 'lucide-react';
import { useConversations } from '../context/ConversationsContext';
import { LogoMark } from '../components/LogoMark';
import AccountPage from '../pages/Account';
import SettingsPage from '../pages/Settings';

// ── Toggle icons (from attached SVGs) ─────────────────────────────────────────
const CollapseIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="rgba(165,180,252,1)" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.83582 12L11.0429 18.2071L12.4571 16.7929L7.66424 12L12.4571 7.20712L11.0429 5.79291L4.83582 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z"/>
  </svg>
);
const ExpandIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="rgba(165,180,252,1)" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z"/>
  </svg>
);

// ── Static nav ─────────────────────────────────────────────────────────────────
const secondaryNav = [
  { label: 'Images',         path: '/images',    Icon: Images          },
  { label: 'Library',        path: '/library',   Icon: LibraryBig      },
  { label: 'Projects',       path: '/projects',  Icon: FolderClosed    },
  { label: 'Builder',        path: '/builder',   Icon: LayoutDashboard },
  { label: 'Text to Speech', path: '/tts',       Icon: FileAudio       },
  { label: 'Voice',          path: '/voice',     Icon: Mic             },
];

// ── Profile menu ───────────────────────────────────────────────────────────────
const popupMenu = [
  { Icon: User,       label: 'Account',            path: '/account',  divideAfter: false, accent: false },
  { Icon: Settings,   label: 'Settings',           path: '/settings', divideAfter: false, accent: false },
  { Icon: Sun,        label: 'Theme',              path: null,        divideAfter: false, accent: false },
  { Icon: Keyboard,   label: 'Keyboard Shortcuts', path: null,        divideAfter: true,  accent: false },
  { Icon: Zap,        label: 'Upgrade Plan',       path: null,        divideAfter: false, accent: true  },
  { Icon: HelpCircle, label: 'Help',               path: '/help',     divideAfter: true,  accent: false },
];

// ── Nav item ───────────────────────────────────────────────────────────────────
type IconComponent = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

function NavItem({ path, label, Icon, collapsed }: { path: string; label: string; Icon: IconComponent; collapsed: boolean }) {
  return (
    <NavLink
      to={path}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `group relative flex items-center gap-[14px] rounded-[10px] transition-all duration-[160ms] cursor-pointer
        ${isActive ? 'bg-[#6366F1]/10 text-[#6366F1]' : 'text-[#475569] hover:bg-[#1A1D24] hover:text-[#94A3B8]'}`
      }
      style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, minHeight: 44 }}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div layoutId="sidebarActive" className="absolute inset-0 rounded-[10px] bg-[#6366F1]/10"
              transition={{ type: 'spring', stiffness: 420, damping: 38 }} />
          )}
          <Icon size={20} strokeWidth={1.75}
            className={`relative flex-shrink-0 transition-opacity duration-[160ms] ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-75'}`}
          />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.17 }}
                className="relative overflow-hidden whitespace-nowrap"
                style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', letterSpacing: '-0.01em' }}>
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );
}

// ── Conversation row ───────────────────────────────────────────────────────────
function ConvRow({ conv, isActive, onClick, onRename, onArchive, onDelete }: {
  conv: { id: string; title: string };
  isActive: boolean;
  onClick: () => void;
  onRename: () => void;
  onArchive: () => void;
  onDelete: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const showActions = hovered || menuOpen;

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <button onClick={onClick} className="w-full flex items-center text-left transition-all duration-[160ms] rounded-[10px]"
        style={{
          height: 40, paddingLeft: 12, paddingRight: showActions ? 36 : 12, borderRadius: 10,
          background: isActive ? 'rgba(255,255,255,0.07)' : showActions ? 'rgba(255,255,255,0.04)' : 'transparent',
        }}>
        <span className="truncate block w-full"
          style={{ fontSize: 15, fontWeight: isActive ? 500 : 400, lineHeight: '22px', color: isActive ? '#F8FAFC' : '#94A3B8' }}>
          {conv.title}
        </span>
      </button>

      <AnimatePresence>
        {showActions && (
          <motion.div ref={menuRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={{ duration: 0.15 }} className="absolute right-1 top-1/2 -translate-y-1/2">
            <button onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }}
              className="flex items-center justify-center rounded-lg text-[#475569] hover:text-[#94A3B8] hover:bg-white/[0.06] transition-all duration-[140ms]"
              style={{ width: 28, height: 28 }}>
              <MoreHorizontal size={15} strokeWidth={1.8} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div initial={{ opacity: 0, scale: 0.94, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -4, pointerEvents: 'none' }} transition={{ duration: 0.14, ease: 'easeOut' }}
                  style={{
                    position: 'absolute', top: 32, right: 0, width: 160, zIndex: 9999,
                    background: '#171A20', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12, boxShadow: '0 12px 40px rgba(0,0,0,0.4)', overflow: 'hidden',
                  }}>
                  {[
                    { Icon: Pencil,  label: 'Rename',  color: '#94A3B8', action: onRename  },
                    { Icon: Archive, label: 'Archive', color: '#94A3B8', action: onArchive },
                    { Icon: Trash2,  label: 'Delete',  color: '#EF4444', action: onDelete  },
                  ].map(({ Icon, label, color, action }) => (
                    <button key={label}
                      onClick={e => { e.stopPropagation(); setMenuOpen(false); action(); }}
                      className="w-full flex items-center gap-2.5 px-3 text-left transition-all duration-[130ms] hover:bg-white/[0.05]"
                      style={{ height: 38, color }}>
                      <Icon size={14} strokeWidth={1.8} />
                      <span style={{ fontSize: 14, fontWeight: 400 }}>{label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Search overlay ─────────────────────────────────────────────────────────────
function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { conversations } = useConversations();

  // Auto-focus and reset on open
  useEffect(() => {
    if (open) {
      setQuery('');
      // Small delay so AnimatePresence has mounted the input
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Filtered results
  const q = query.trim().toLowerCase();
  const lastOpened = conversations[0] ?? null;
  const recentChats = q
    ? conversations.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.messages.some(m => m.text.toLowerCase().includes(q))
      )
    : conversations.slice(1, 8); // show up to 7 recents when no query

  const go = (id: string) => {
    navigate(`/chat/${id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '18%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(100% - 32px)',
              maxWidth: 500,
              maxHeight: '65vh',
              zIndex: 10001,
              background: '#1C1F26',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14,
              boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Search input row */}
            <div className="flex items-center flex-shrink-0"
              style={{ height: 56, paddingLeft: 16, paddingRight: 12, borderBottom: '1px solid rgba(255,255,255,0.07)', gap: 10 }}>
              <Search size={17} strokeWidth={1.8} style={{ color: '#6B7280', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 outline-none bg-transparent"
                style={{
                  fontSize: 16, fontWeight: 400, color: '#F8FAFC',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              />
              <button onClick={onClose}
                className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-[140ms]"
                style={{ width: 26, height: 26, background: 'rgba(255,255,255,0.1)', color: '#9CA3AF' }}>
                <X size={13} strokeWidth={2.5} />
              </button>
            </div>

            {/* Results */}
            <div className="overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1E222A transparent' }}>
              {conversations.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <p style={{ fontSize: 14, color: '#475569' }}>No conversations yet. Start a new chat!</p>
                </div>
              ) : (
                <div style={{ padding: '8px 0' }}>
                  {/* Last opened */}
                  {!q && lastOpened && (
                    <div style={{ marginBottom: 8 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', paddingLeft: 16, paddingBottom: 4 }}>
                        Last opened
                      </p>
                      <SearchResultRow conv={lastOpened} onClick={() => go(lastOpened.id)} />
                    </div>
                  )}

                  {/* Recent chats / search results */}
                  {recentChats.length > 0 && (
                    <div style={{ marginTop: !q && lastOpened ? 4 : 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', paddingLeft: 16, paddingBottom: 4 }}>
                        {q ? 'Results' : 'Recent chats'}
                      </p>
                      {recentChats.map(conv => (
                        <SearchResultRow key={conv.id} conv={conv} onClick={() => go(conv.id)} query={q} />
                      ))}
                    </div>
                  )}

                  {q && recentChats.length === 0 && (
                    <div className="flex items-center justify-center py-10">
                      <p style={{ fontSize: 14, color: '#475569' }}>No conversations match "{query}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SearchResultRow({ conv, onClick, query = '' }: { conv: { id: string; title: string }; onClick: () => void; query?: string }) {
  const [hovered, setHovered] = useState(false);

  // Highlight matching portion of title
  const renderTitle = () => {
    if (!query) return <span>{conv.title}</span>;
    const idx = conv.title.toLowerCase().indexOf(query);
    if (idx === -1) return <span>{conv.title}</span>;
    return (
      <span>
        {conv.title.slice(0, idx)}
        <mark style={{ background: 'rgba(99,102,241,0.3)', color: '#F8FAFC', borderRadius: 3, padding: '0 2px' }}>
          {conv.title.slice(idx, idx + query.length)}
        </mark>
        {conv.title.slice(idx + query.length)}
      </span>
    );
  };

  return (
    <button onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center gap-3 text-left transition-all duration-[140ms]"
      style={{
        height: 42, paddingLeft: 16, paddingRight: 16,
        background: hovered ? 'rgba(255,255,255,0.06)' : 'transparent',
      }}>
      <Circle size={16} strokeWidth={1.5} style={{ color: '#6B7280', flexShrink: 0 }} />
      <span className="truncate" style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#D1D5DB' }}>
        {renderTitle()}
      </span>
    </button>
  );
}

// ── PageModal — reusable full-content overlay ──────────────────────────────────
function PageModal({ open, onClose, title, children, wide = false }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed', top: '5%', left: '50%', transform: 'translateX(-50%)',
              width: 'calc(100% - 40px)', maxWidth: wide ? 960 : 760,
              maxHeight: '88vh', zIndex: 10001, display: 'flex', flexDirection: 'column',
              background: '#111318', border: '1px solid #1E222A',
              borderRadius: 20, boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
              overflow: 'hidden',
            }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between flex-shrink-0"
              style={{ height: 56, paddingLeft: 24, paddingRight: 16, borderBottom: '1px solid #1E222A' }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#F8FAFC', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</span>
              <button onClick={onClose}
                className="flex items-center justify-center rounded-full transition-all duration-[140ms] hover:bg-white/10"
                style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.07)', color: '#9CA3AF', flexShrink: 0 }}>
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>
            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1E222A transparent' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── UpgradeModal ───────────────────────────────────────────────────────────────
function UpgradeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const plans = [
    {
      name: 'Plus', price: '$20', period: '/month', color: '#6366F1',
      features: ['GPT-4o access', 'Extended context', 'Image generation', 'Priority support'],
      cta: 'Upgrade to Plus',
    },
    {
      name: 'Pro', price: '$200', period: '/month', color: '#06B6D4', highlight: true,
      features: ['Everything in Plus', 'o1 & o3 models', 'Unlimited usage', 'API access', 'Advanced data analysis'],
      cta: 'Upgrade to Pro',
    },
  ];

  return (
    <PageModal open={open} onClose={onClose} title="Upgrade Plan">
      <div style={{ padding: '28px 28px 32px' }}>
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
            style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <Zap size={22} className="text-[#6366F1]" />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Unlock the full power of Conv AI
          </h2>
          <p style={{ fontSize: 14, color: '#64748B', marginTop: 6 }}>
            Upgrade for more models, higher limits, and advanced features.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
          {plans.map(plan => (
            <div key={plan.name} className="rounded-2xl p-5 flex flex-col gap-4"
              style={{
                background: plan.highlight ? 'rgba(6,182,212,0.07)' : '#1A1D24',
                border: `1.5px solid ${plan.highlight ? 'rgba(6,182,212,0.35)' : '#1E222A'}`,
              }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontSize: 13, fontWeight: 700, color: plan.color }}>{plan.name}</span>
                  {plan.highlight && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(6,182,212,0.15)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.3)' }}>
                      POPULAR
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span style={{ fontSize: 28, fontWeight: 800, color: '#F8FAFC', lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontSize: 13, color: '#475569' }}>{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-2 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${plan.color}22` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: plan.color }} />
                    </div>
                    <span style={{ fontSize: 13, color: '#94A3B8' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all hover:opacity-90"
                style={{
                  background: plan.highlight ? '#06B6D4' : '#6366F1',
                  color: '#fff',
                }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center mt-6" style={{ fontSize: 12, color: '#334155' }}>
          Cancel anytime · Billed monthly · Taxes may apply
        </p>
      </div>
    </PageModal>
  );
}

// ── Main layout ────────────────────────────────────────────────────────────────
export default function MainLayout() {
  const [collapsed, setCollapsed]     = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [renameId, setRenameId]       = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);
  const renameRef  = useRef<HTMLInputElement>(null);
  const navigate   = useNavigate();
  const { id: activeId } = useParams<{ id?: string }>();
  const { conversations, createConversation, renameConversation, deleteConversation, archiveConversation } = useConversations();

  // Close profile on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    if (profileOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [profileOpen]);

  // Focus rename input
  useEffect(() => { if (renameId) renameRef.current?.focus(); }, [renameId]);

  // Ctrl/Cmd+K global shortcut
  const openSearch = useCallback(() => setSearchOpen(true), []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openSearch();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [openSearch]);

  const handleNewChat = () => {
    const id = createConversation();
    navigate(`/chat/${id}`);
  };

  const startRename = (id: string, currentTitle: string) => {
    setRenameId(id);
    setRenameValue(currentTitle === 'New chat' ? '' : currentTitle);
  };

  const commitRename = () => {
    if (renameId) {
      if (renameValue.trim()) renameConversation(renameId, renameValue.trim());
      setRenameId(null);
    }
  };

  const handleDelete = (id: string) => {
    deleteConversation(id);
    if (activeId === id) {
      const next = conversations.find(c => c.id !== id);
      if (next) navigate(`/chat/${next.id}`);
      else navigate('/chat');
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden"
      style={{ background: '#0A0C10', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── Search overlay ──────────────────────────────────────── */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Page modals ─────────────────────────────────────────── */}
      <PageModal open={accountOpen}  onClose={() => setAccountOpen(false)}  title="Account">
        <AccountPage />
      </PageModal>
      <PageModal open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Settings" wide>
        <SettingsPage />
      </PageModal>
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />

      {/* ════ SIDEBAR ═══════════════════════════════════════════════ */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ type: 'spring', stiffness: 420, damping: 42 }}
        className="flex-shrink-0 flex flex-col h-full overflow-hidden"
        style={{ background: '#0A0C10' }}>

        {/* ── SECTION 1: Fixed Header ─────────────────────────────── */}
        <div className="flex-shrink-0">

          {/* Top toolbar */}
          <div className="flex items-center" style={{ height: 58, paddingLeft: 16, paddingRight: 8, gap: 8 }}>
            <LogoMark size={22} />

            {/* Wordmark + search icon — only when expanded */}
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.17 }}
                  className="overflow-hidden flex items-center flex-1 gap-1">
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#F8FAFC', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Conv</span>
                  <span style={{ fontSize: 15, fontWeight: 400, color: '#94A3B8', whiteSpace: 'nowrap' }}>AI</span>
                  {/* Search icon — only in expanded header */}
                  <button onClick={openSearch} title="Search (⌘K)"
                    className="flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-[150ms] ml-auto"
                    style={{ width: 36, height: 36, color: '#475569' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A1D24'; (e.currentTarget as HTMLElement).style.color = '#94A3B8'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#475569'; }}>
                    <Search size={20} strokeWidth={1.75} />
                  </button>
                  {/* « Collapse button — only in expanded header, top-right */}
                  <button onClick={() => setCollapsed(true)} title="Collapse sidebar"
                    className="flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-[150ms]"
                    style={{ width: 36, height: 36 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A1D24'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                    <CollapseIcon size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Primary nav — no search input */}
          <div style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* New Chat */}
            <button onClick={handleNewChat} title={collapsed ? 'New Chat' : undefined}
              className="group relative flex items-center gap-[14px] rounded-[10px] transition-all duration-[160ms] cursor-pointer text-[#475569] hover:bg-[#1A1D24] hover:text-[#94A3B8]"
              style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, minHeight: 44 }}>
              <SquarePen size={20} strokeWidth={1.75} className="relative flex-shrink-0 opacity-50 group-hover:opacity-75 transition-opacity duration-[160ms]" />
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.17 }}
                    className="relative overflow-hidden whitespace-nowrap"
                    style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', letterSpacing: '-0.01em' }}>
                    New Chat
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {secondaryNav.map(item => (
              <NavItem key={item.path} path={item.path} label={item.label} Icon={item.Icon} collapsed={collapsed} />
            ))}
          </div>
        </div>

        {/* ── SECTION 2: Scrollable Recents ───────────────────────── */}
        <div className="flex-1 min-h-0 overflow-x-hidden"
          style={{ overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#1E222A transparent' }}>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 16, paddingBottom: 12 }}>

                {conversations.length === 0 ? (
                  <p className="text-[#2E3440] text-center" style={{ fontSize: 13, paddingTop: 8 }}>
                    No conversations yet
                  </p>
                ) : (
                  <>
                    <p className="text-[#2E3440] uppercase tracking-wider"
                      style={{ fontSize: 11, fontWeight: 600, marginBottom: 8, paddingLeft: 12 }}>
                      Recents
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {conversations.map(conv =>
                        renameId === conv.id ? (
                          <div key={conv.id} className="flex items-center"
                            style={{ height: 40, paddingLeft: 12, paddingRight: 12 }}>
                            <input ref={renameRef} value={renameValue}
                              onChange={e => setRenameValue(e.target.value)}
                              onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenameId(null); }}
                              onBlur={commitRename}
                              className="w-full outline-none bg-transparent"
                              style={{ fontSize: 15, fontWeight: 400, color: '#F8FAFC', borderBottom: '1px solid #6366F1', paddingBottom: 1 }}
                            />
                          </div>
                        ) : (
                          <ConvRow key={conv.id} conv={conv} isActive={activeId === conv.id}
                            onClick={() => navigate(`/chat/${conv.id}`)}
                            onRename={() => startRename(conv.id, conv.title)}
                            onArchive={() => archiveConversation(conv.id)}
                            onDelete={() => handleDelete(conv.id)}
                          />
                        )
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── SECTION 3: Fixed Footer ──────────────────────────────── */}
        <div ref={profileRef} className="flex-shrink-0 relative"
          style={{ borderTop: '1px solid #1E222A', padding: '8px 8px', overflow: 'visible' }}>

          {/* Profile popup */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div initial={{ opacity: 0, scale: 0.94, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10, pointerEvents: 'none' }} transition={{ duration: 0.18, ease: 'easeOut' }}
                style={{
                  position: 'fixed', bottom: 76, left: 12, width: 236, zIndex: 9999,
                  background: '#171A20', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)', overflow: 'hidden',
                }}>
                <div className="py-1">
                  {popupMenu.map(item => {
                    const { Icon } = item;
                    const handleClick = () => {
                      setProfileOpen(false);
                      if (item.label === 'Account')      { setAccountOpen(true);  return; }
                      if (item.label === 'Settings')     { setSettingsOpen(true); return; }
                      if (item.label === 'Upgrade Plan') { setUpgradeOpen(true);  return; }
                      if (item.path) navigate(item.path);
                    };
                    return (
                      <React.Fragment key={item.label}>
                        <button onClick={handleClick}
                          className="w-full flex items-center gap-3 px-4 text-left transition-all duration-[150ms] hover:bg-white/[0.05]"
                          style={{ height: 40 }}>
                          <Icon size={15} className={item.accent ? 'text-[#6366F1]' : 'text-[#475569]'} strokeWidth={1.8} />
                          <span className={item.accent ? 'text-[#6366F1]' : 'text-[#94A3B8]'} style={{ fontSize: 14, fontWeight: 500 }}>
                            {item.label}
                          </span>
                        </button>
                        {item.divideAfter && <div className="mx-3 my-1" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />}
                      </React.Fragment>
                    );
                  })}
                  <div style={{ padding: '6px 12px 4px' }}>
                    <button onClick={() => { setProfileOpen(false); setUpgradeOpen(true); }}
                      className="w-full flex items-center justify-center gap-2 text-white transition-all duration-[150ms] hover:bg-[#4F46E5]"
                      style={{ height: 34, borderRadius: 10, background: '#6366F1', fontSize: 14, fontWeight: 600 }}>
                      <Zap size={14} strokeWidth={2} />Upgrade to Pro
                    </button>
                  </div>
                  <div className="mx-3 my-1" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                  <button onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-3 px-4 text-left transition-all duration-[150ms] hover:bg-[#EF4444]/10"
                    style={{ height: 40 }}>
                    <LogOut size={15} className="text-[#EF4444]" strokeWidth={1.8} />
                    <span className="text-[#EF4444]" style={{ fontSize: 14, fontWeight: 500 }}>Log out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── EXPANDED footer: [avatar + name | flex] [bell] ── */}
          {!collapsed && (
            <div className="flex items-center gap-1">
              {/* Avatar + name — clickable for profile popup */}
              <button onClick={() => setProfileOpen(v => !v)}
                className="flex items-center gap-2.5 flex-1 min-w-0 rounded-[10px] cursor-pointer hover:bg-[#1A1D24] transition-all duration-[150ms]"
                style={{ padding: '6px 10px', minHeight: 48 }}>
                <div className="flex items-center justify-center text-white flex-shrink-0"
                  style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #06B6D4)', fontSize: 12, fontWeight: 700 }}>
                  A
                </div>
                <div className="overflow-hidden text-left flex-1">
                  <p className="whitespace-nowrap text-[#F8FAFC]" style={{ fontSize: 15, fontWeight: 600, lineHeight: '22px' }}>Alex Reed</p>
                  <p className="whitespace-nowrap text-[#475569]" style={{ fontSize: 12, fontWeight: 400 }}>Pro Plan</p>
                </div>
              </button>

              {/* Bell — bottom right, expanded only */}
              <NavLink to="/notifications"
                className="relative flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-[150ms]"
                style={{ width: 36, height: 36, color: '#475569' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A1D24'; (e.currentTarget as HTMLElement).style.color = '#94A3B8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#475569'; }}>
                <Bell size={17} strokeWidth={1.75} />
                <span className="absolute top-[8px] right-[8px] w-[6px] h-[6px] bg-[#6366F1] rounded-full" />
              </NavLink>
            </div>
          )}

          {/* ── COLLAPSED footer: stacked » + bell + avatar ── */}
          {collapsed && (
            <div className="flex flex-col items-center gap-1 py-1">
              {/* » Expand button */}
              <button onClick={() => setCollapsed(false)} title="Expand sidebar"
                className="flex items-center justify-center rounded-lg transition-all duration-[150ms]"
                style={{ width: 40, height: 36 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A1D24'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                <ExpandIcon size={20} />
              </button>

              {/* Bell */}
              <NavLink to="/notifications"
                className="relative flex items-center justify-center rounded-lg transition-all duration-[150ms]"
                style={{ width: 40, height: 36, color: '#475569' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A1D24'; (e.currentTarget as HTMLElement).style.color = '#94A3B8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#475569'; }}>
                <Bell size={17} strokeWidth={1.75} />
                <span className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-[#6366F1] rounded-full" />
              </NavLink>

              {/* Avatar — clickable for profile popup */}
              <button onClick={() => setProfileOpen(v => !v)} title="Alex Reed"
                className="flex items-center justify-center rounded-full cursor-pointer transition-all duration-[150ms] hover:ring-2 hover:ring-[#6366F1]/40"
                style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #6366F1, #06B6D4)', fontSize: 12, fontWeight: 700, color: '#fff', marginTop: 2 }}>
                A
              </button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* ════ MAIN CONTENT ══════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header — no search bar, just model selector + bell + new chat */}
        <header className="flex items-center justify-between px-6 flex-shrink-0"
          style={{ background: '#0A0C10', borderBottom: '1px solid #1E222A', height: 58 }}>

          {/* Left — nothing, keeps header balanced */}
          <div />

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3.5 rounded-xl text-[13px] font-medium cursor-pointer transition-all duration-[150ms] hover:bg-[#1A1D24]"
              style={{ border: '1px solid #1E222A', height: 38, color: '#94A3B8' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /><span>GPT-4o</span>
            </div>

            <button onClick={handleNewChat}
              className="flex items-center gap-2 px-4 rounded-xl text-[13px] font-semibold text-white transition-all duration-[150ms] hover:bg-[#4F46E5]"
              style={{ height: 38, background: '#6366F1', boxShadow: '0 2px 8px rgba(99,102,241,0.28)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(99,102,241,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(99,102,241,0.28)'; }}>
              <SquarePen size={13} strokeWidth={2} />New Chat
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-hidden"><Outlet /></main>
      </div>
    </div>
  );
}
