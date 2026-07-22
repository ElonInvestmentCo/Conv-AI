import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
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
  Pin,
  Folder,
  MessageSquare,
} from 'lucide-react';

// ── Conv AI Logo Mark ──────────────────────────────────────────────────────────
const LogoMark = ({ className = 'w-7 h-7', color = '#F8FAFC' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 10C6 7.79086 7.79086 6 10 6H16V18C16 22.4183 12.4183 26 8 26H6V10Z" fill={color} />
    <path d="M26 22C26 24.2091 24.2091 26 22 26H16V14C16 9.58172 19.5817 6 24 6H26V22Z" fill={color} fillOpacity={0.5} />
  </svg>
);

// ── Nav config ─────────────────────────────────────────────────────────────────
const mainNav = [
  { label: 'New Chat',       path: '/chat',      Icon: SquarePen     },
  { label: 'Images',         path: '/images',    Icon: Images        },
  { label: 'Library',        path: '/library',   Icon: LibraryBig    },
  { label: 'Projects',       path: '/projects',  Icon: FolderClosed  },
  { label: 'Builder',        path: '/builder',   Icon: LayoutDashboard },
  { label: 'Text to Speech', path: '/tts',       Icon: FileAudio     },
  { label: 'Voice',          path: '/voice',     Icon: Mic           },
];

// ── Mock conversation history ──────────────────────────────────────────────────
const pinnedChats = [
  { id: 'p1', label: 'Multi-step research agent' },
  { id: 'p2', label: 'Brand identity system' },
];

const conversationGroups = [
  {
    heading: 'Today',
    items: [
      { id: 'c1', label: 'Conv AI sidebar redesign' },
      { id: 'c2', label: 'LangGraph implementation plan' },
      { id: 'c3', label: 'Vite config troubleshooting' },
    ],
  },
  {
    heading: 'Yesterday',
    items: [
      { id: 'c4', label: 'Document review pipeline' },
      { id: 'c5', label: 'TTS voice model comparison' },
      { id: 'c6', label: 'React DnD drag ordering' },
    ],
  },
  {
    heading: 'Previous 7 days',
    items: [
      { id: 'c7', label: 'OpenAI streaming responses' },
      { id: 'c8', label: 'Tailwind v4 migration notes' },
      { id: 'c9', label: 'Image generation prompts' },
      { id: 'c10', label: 'Project folder structure' },
      { id: 'c11', label: 'Auth flow architecture' },
      { id: 'c12', label: 'Dashboard layout options' },
    ],
  },
  {
    heading: 'Last month',
    items: [
      { id: 'c13', label: 'Vector store setup (pgvector)' },
      { id: 'c14', label: 'Semantic search evaluation' },
      { id: 'c15', label: 'Webhook handler patterns' },
      { id: 'c16', label: 'Recharts data formatting' },
      { id: 'c17', label: 'Motion animation timing' },
    ],
  },
];

const folders = [
  { id: 'f1', label: 'Research', count: 8 },
  { id: 'f2', label: 'Work projects', count: 14 },
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

// ── Reusable nav item ──────────────────────────────────────────────────────────
function NavItem({ item, collapsed }: { item: typeof mainNav[0]; collapsed: boolean }) {
  const { Icon } = item;
  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `group relative flex items-center gap-[14px] px-3 py-[9px] rounded-xl transition-all duration-[160ms] cursor-pointer
        ${isActive
          ? 'bg-[#6366F1]/10 text-[#6366F1]'
          : 'text-[#475569] hover:bg-[#1A1D24] hover:text-[#94A3B8]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="sidebarActive"
              className="absolute inset-0 rounded-xl bg-[#6366F1]/10"
              transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            />
          )}
          <Icon
            size={20}
            strokeWidth={1.75}
            className={`relative flex-shrink-0 transition-opacity duration-[160ms] ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-75'}`}
          />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.17 }}
                className="relative overflow-hidden whitespace-nowrap text-[16px] font-[500] leading-none"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );
}

// ── Conversation history row ───────────────────────────────────────────────────
function ConvItem({ label }: { label: string }) {
  return (
    <button className="group w-full flex items-center gap-2.5 px-3 py-[7px] rounded-lg text-left text-[13px] text-[#475569] hover:bg-[#1A1D24] hover:text-[#94A3B8] transition-all duration-[140ms]">
      <MessageSquare size={13} strokeWidth={1.6} className="flex-shrink-0 opacity-40 group-hover:opacity-60" />
      <span className="truncate">{label}</span>
    </button>
  );
}

// ── Main layout ────────────────────────────────────────────────────────────────
export default function MainLayout() {
  const [collapsed, setCollapsed]     = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate   = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [profileOpen]);

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ background: '#0A0C10', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* ════════════════════════════════════════════════════════════
          SIDEBAR  —  flex column, never scrolls as a whole
      ════════════════════════════════════════════════════════════ */}
      <motion.aside
        animate={{ width: collapsed ? 68 : 248 }}
        transition={{ type: 'spring', stiffness: 420, damping: 42 }}
        className="flex-shrink-0 flex flex-col h-full overflow-hidden"
        style={{ background: '#0A0C10', borderRight: '1px solid #1E222A' }}
      >

        {/* ── SECTION 1: Fixed Header ─────────────────────────────── */}
        <div className="flex-shrink-0" style={{ borderBottom: '1px solid #1E222A' }}>

          {/* Logo row + collapse toggle */}
          <div className="flex items-center gap-3 px-4 h-[58px]">
            <LogoMark className="w-[26px] h-[26px] flex-shrink-0" color="#F8FAFC" />
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.17 }}
                  className="overflow-hidden flex items-baseline flex-1"
                >
                  <span className="text-[15px] font-semibold text-[#F8FAFC] tracking-tight whitespace-nowrap">Conv</span>
                  <span className="text-[15px] font-normal text-[#94A3B8] whitespace-nowrap ml-[3px]">AI</span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[#2E3440] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all duration-[150ms] ml-auto"
            >
              {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>

          {/* Search bar — hidden when collapsed */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.17 }}
                className="overflow-hidden px-3 pb-3"
              >
                <div className="relative">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E3440]" />
                  <input
                    type="text"
                    placeholder="Search…"
                    className="w-full pl-8 pr-3 text-[13px] rounded-lg outline-none transition-all duration-[160ms]"
                    style={{
                      height: 34,
                      background: '#111318',
                      border: '1px solid #1E222A',
                      color: '#94A3B8',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#6366F1';
                      e.target.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.12)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = '#1E222A';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Primary nav items */}
          <div className="px-2 pb-3 space-y-[2px]">
            {mainNav.map((item) => (
              <NavItem key={item.path} item={item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        {/* ── SECTION 2: Scrollable Conversation History ──────────── */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#1E222A transparent' }}
        >
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="py-3"
              >
                {/* Pinned chats */}
                {pinnedChats.length > 0 && (
                  <div className="mb-1">
                    <div className="flex items-center gap-1.5 px-4 py-1 mb-1">
                      <Pin size={10} strokeWidth={2} className="text-[#2E3440]" />
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2E3440]">Pinned</span>
                    </div>
                    <div className="px-2 space-y-[1px]">
                      {pinnedChats.map(c => <ConvItem key={c.id} label={c.label} />)}
                    </div>
                  </div>
                )}

                {/* Folders */}
                {folders.length > 0 && (
                  <div className="mb-1">
                    <div className="flex items-center gap-1.5 px-4 py-1 mb-1">
                      <Folder size={10} strokeWidth={2} className="text-[#2E3440]" />
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2E3440]">Folders</span>
                    </div>
                    <div className="px-2 space-y-[1px]">
                      {folders.map(f => (
                        <button
                          key={f.id}
                          className="group w-full flex items-center gap-2.5 px-3 py-[7px] rounded-lg text-left text-[13px] text-[#475569] hover:bg-[#1A1D24] hover:text-[#94A3B8] transition-all duration-[140ms]"
                        >
                          <Folder size={13} strokeWidth={1.6} className="flex-shrink-0 opacity-40 group-hover:opacity-60" />
                          <span className="truncate flex-1">{f.label}</span>
                          <span className="text-[11px] text-[#2E3440] group-hover:text-[#475569]">{f.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date-grouped conversation history */}
                {conversationGroups.map(group => (
                  <div key={group.heading} className="mb-1">
                    <div className="px-4 py-1 mb-1">
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2E3440]">
                        {group.heading}
                      </span>
                    </div>
                    <div className="px-2 space-y-[1px]">
                      {group.items.map(c => <ConvItem key={c.id} label={c.label} />)}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── SECTION 3: Fixed Footer ──────────────────────────────── */}
        <div
          ref={profileRef}
          className="flex-shrink-0 px-2 py-2 relative"
          style={{ borderTop: '1px solid #1E222A', overflow: 'visible' }}
        >
          {/* Profile popup */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                style={{
                  position: 'fixed',
                  bottom: 72,
                  left: 12,
                  width: 224,
                  zIndex: 9999,
                  background: '#171A20',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.25)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  overflow: 'hidden',
                }}
              >
                <div className="py-1">
                  {popupMenu.map((item) => {
                    const { Icon } = item;
                    return (
                      <React.Fragment key={item.label}>
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            if (item.path) navigate(item.path);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-[10px] text-left transition-all duration-[150ms] hover:bg-white/[0.05]"
                        >
                          <Icon size={15} className={item.accent ? 'text-[#6366F1]' : 'text-[#475569]'} strokeWidth={1.8} />
                          <span className={`text-[14px] font-medium ${item.accent ? 'text-[#6366F1]' : 'text-[#94A3B8]'}`}>
                            {item.label}
                          </span>
                        </button>
                        {item.divideAfter && (
                          <div className="mx-3 my-1" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                        )}
                      </React.Fragment>
                    );
                  })}
                  <div className="mx-3 my-1" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-[10px] text-left transition-all duration-[150ms] hover:bg-[#EF4444]/10"
                  >
                    <LogOut size={15} className="text-[#EF4444]" strokeWidth={1.8} />
                    <span className="text-[14px] font-medium text-[#EF4444]">Log out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile row */}
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            title={collapsed ? 'Alex Reed' : undefined}
            className="w-full flex items-center gap-2 px-2 py-[7px] rounded-xl cursor-pointer hover:bg-[#1A1D24] transition-all duration-[150ms]"
          >
            <div
              className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}
            >
              A
            </div>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.17 }}
                  className="flex-1 overflow-hidden text-left"
                >
                  <p className="text-[13px] font-medium text-[#F8FAFC] whitespace-nowrap">Alex Reed</p>
                  <p className="text-[11px] text-[#475569] whitespace-nowrap">Pro Plan</p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* ════════════════════════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top nav bar */}
        <header
          className="flex items-center justify-between px-6 flex-shrink-0"
          style={{
            background: '#0A0C10',
            borderBottom: '1px solid #1E222A',
            height: 58,
          }}
        >
          <div className="relative flex-1 max-w-[400px]">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2E3440]" />
            <input
              type="text"
              placeholder="Search conversations, projects, files…"
              className="w-full pl-9 pr-4 text-[13px] rounded-xl outline-none transition-all duration-[160ms]"
              style={{
                height: 48,
                background: '#111318',
                border: '1px solid #1E222A',
                color: '#94A3B8',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#6366F1';
                e.target.style.color = '#F8FAFC';
                e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#1E222A';
                e.target.style.color = '#94A3B8';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div className="flex items-center gap-2 ml-4">
            <div
              className="flex items-center gap-2 px-3.5 rounded-xl text-[13px] font-medium cursor-pointer transition-all duration-[150ms] hover:bg-[#1A1D24]"
              style={{ border: '1px solid #1E222A', height: 38, color: '#94A3B8' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>GPT-4o</span>
            </div>

            <NavLink
              to="/notifications"
              className="relative flex items-center justify-center rounded-xl text-[#475569] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all duration-[150ms]"
              style={{ width: 38, height: 38, border: '1px solid #1E222A' }}
            >
              <Bell size={15} strokeWidth={1.8} />
              <span className="absolute top-[9px] right-[9px] w-1.5 h-1.5 bg-[#6366F1] rounded-full" />
            </NavLink>

            <NavLink
              to="/chat"
              className="flex items-center gap-2 px-4 rounded-xl text-[13px] font-semibold text-white transition-all duration-[150ms]"
              style={{
                height: 38,
                background: '#6366F1',
                boxShadow: '0 2px 8px rgba(99,102,241,0.28)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(99,102,241,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(99,102,241,0.28)'; }}
            >
              <SquarePen size={13} strokeWidth={2} />
              New Chat
            </NavLink>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
