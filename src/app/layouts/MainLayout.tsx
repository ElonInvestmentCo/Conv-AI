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
  MoreHorizontal,
  Pencil,
  Archive,
  Trash2,
} from 'lucide-react';

// ── Conv AI Logo Mark ──────────────────────────────────────────────────────────
const LogoMark = ({ size = 22 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path d="M6 10C6 7.79086 7.79086 6 10 6H16V18C16 22.4183 12.4183 26 8 26H6V10Z" fill="#F8FAFC" />
    <path d="M26 22C26 24.2091 24.2091 26 22 26H16V14C16 9.58172 19.5817 6 24 6H26V22Z" fill="#F8FAFC" fillOpacity={0.5} />
  </svg>
);

// ── Nav config ─────────────────────────────────────────────────────────────────
const mainNav = [
  { label: 'New Chat',       path: '/chat',      Icon: SquarePen       },
  { label: 'Images',         path: '/images',    Icon: Images          },
  { label: 'Library',        path: '/library',   Icon: LibraryBig      },
  { label: 'Projects',       path: '/projects',  Icon: FolderClosed    },
  { label: 'Builder',        path: '/builder',   Icon: LayoutDashboard },
  { label: 'Text to Speech', path: '/tts',       Icon: FileAudio       },
  { label: 'Voice',          path: '/voice',     Icon: Mic             },
];

// ── Recent conversations — newest first ────────────────────────────────────────
const initialConversations = [
  { id: 'r1',  title: 'Design Conv AI Sidebar' },
  { id: 'r2',  title: 'Git LFS Push Error' },
  { id: 'r3',  title: 'LangGraph Implementation' },
  { id: 'r4',  title: 'React DnD Drag Ordering' },
  { id: 'r5',  title: 'Image Generation Prompts' },
  { id: 'r6',  title: 'Dashboard Layout Options' },
  { id: 'r7',  title: 'OpenAI Streaming Responses' },
  { id: 'r8',  title: 'Tailwind v4 Migration Notes' },
  { id: 'r9',  title: 'Auth Flow Architecture' },
  { id: 'r10', title: 'Vector Store Setup (pgvector)' },
  { id: 'r11', title: 'Semantic Search Evaluation' },
  { id: 'r12', title: 'Webhook Handler Patterns' },
  { id: 'r13', title: 'Motion Animation Timing' },
  { id: 'r14', title: 'Recharts Data Formatting' },
  { id: 'r15', title: 'Fintech Dashboard UI' },
];

// ── Profile popup menu ─────────────────────────────────────────────────────────
const popupMenu = [
  { Icon: User,       label: 'Account',            path: '/account',  divideAfter: false, accent: false },
  { Icon: Settings,   label: 'Settings',           path: '/settings', divideAfter: false, accent: false },
  { Icon: Sun,        label: 'Theme',              path: null,        divideAfter: false, accent: false },
  { Icon: Keyboard,   label: 'Keyboard Shortcuts', path: null,        divideAfter: true,  accent: false },
  { Icon: Zap,        label: 'Upgrade Plan',       path: null,        divideAfter: false, accent: true  },
  { Icon: HelpCircle, label: 'Help',               path: '/help',     divideAfter: true,  accent: false },
];

// ── Nav item ───────────────────────────────────────────────────────────────────
function NavItem({ item, collapsed }: { item: typeof mainNav[0]; collapsed: boolean }) {
  const { Icon } = item;
  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `group relative flex items-center gap-[14px] rounded-[10px] transition-all duration-[160ms] cursor-pointer
        ${isActive
          ? 'bg-[#6366F1]/10 text-[#6366F1]'
          : 'text-[#475569] hover:bg-[#1A1D24] hover:text-[#94A3B8]'
        }`
      }
      style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, minHeight: 44 }}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="sidebarActive"
              className="absolute inset-0 rounded-[10px] bg-[#6366F1]/10"
              transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            />
          )}
          <Icon
            size={20}
            strokeWidth={1.75}
            className={`relative flex-shrink-0 transition-opacity duration-[160ms]
              ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-75'}`}
          />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.17 }}
                className="relative overflow-hidden whitespace-nowrap"
                style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', letterSpacing: '-0.01em' }}
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

// ── Conversation row ───────────────────────────────────────────────────────────
function ConvRow({
  conv,
  isActive,
  onClick,
  onRename,
  onArchive,
  onDelete,
}: {
  conv: { id: string; title: string };
  isActive: boolean;
  onClick: () => void;
  onRename: () => void;
  onArchive: () => void;
  onDelete: () => void;
}) {
  const [hovered, setHovered]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); if (!menuOpen) setMenuOpen(false); }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center text-left transition-all duration-[160ms] rounded-[10px]"
        style={{
          height: 40,
          paddingLeft: 12,
          paddingRight: hovered || menuOpen ? 36 : 12,
          borderRadius: 10,
          background: isActive
            ? 'rgba(255,255,255,0.07)'
            : hovered || menuOpen
            ? 'rgba(255,255,255,0.04)'
            : 'transparent',
        }}
      >
        <span
          className="truncate block w-full"
          style={{
            fontSize: 15,
            fontWeight: isActive ? 500 : 400,
            lineHeight: '22px',
            color: isActive ? '#F8FAFC' : '#94A3B8',
          }}
        >
          {conv.title}
        </span>
      </button>

      {/* Three-dot menu button — fades in on hover */}
      <AnimatePresence>
        {(hovered || menuOpen) && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
              className="flex items-center justify-center rounded-lg text-[#475569] hover:text-[#94A3B8] hover:bg-white/[0.06] transition-all duration-[140ms]"
              style={{ width: 28, height: 28 }}
            >
              <MoreHorizontal size={15} strokeWidth={1.8} />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -4 }}
                  transition={{ duration: 0.14, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: 32,
                    right: 0,
                    width: 160,
                    zIndex: 9999,
                    background: '#171A20',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                    overflow: 'hidden',
                  }}
                >
                  {[
                    { Icon: Pencil,  label: 'Rename',  color: '#94A3B8', action: onRename  },
                    { Icon: Archive, label: 'Archive', color: '#94A3B8', action: onArchive },
                    { Icon: Trash2,  label: 'Delete',  color: '#EF4444', action: onDelete  },
                  ].map(({ Icon, label, color, action }) => (
                    <button
                      key={label}
                      onClick={(e) => { e.stopPropagation(); setMenuOpen(false); action(); }}
                      className="w-full flex items-center gap-2.5 px-3 text-left transition-all duration-[130ms] hover:bg-white/[0.05]"
                      style={{ height: 38, color }}
                    >
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

// ── Main layout ────────────────────────────────────────────────────────────────
export default function MainLayout() {
  const [collapsed, setCollapsed]       = useState(false);
  const [profileOpen, setProfileOpen]   = useState(false);
  const [activeConv, setActiveConv]     = useState('r1');
  const [conversations, setConversations] = useState(initialConversations);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate   = useNavigate();

  // Close profile popup on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [profileOpen]);

  const handleRename = (id: string) => {
    const newTitle = prompt('Rename conversation:');
    if (newTitle?.trim()) {
      setConversations(prev => prev.map(c => c.id === id ? { ...c, title: newTitle.trim() } : c));
    }
  };

  const handleDelete = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConv === id) setActiveConv(conversations.find(c => c.id !== id)?.id ?? '');
  };

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ background: '#0A0C10', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* ════════════════════════════════════════════════════════════
          SIDEBAR
      ════════════════════════════════════════════════════════════ */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ type: 'spring', stiffness: 420, damping: 42 }}
        className="flex-shrink-0 flex flex-col h-full overflow-hidden"
        style={{ background: '#0A0C10', borderRight: '1px solid #1E222A' }}
      >

        {/* ── SECTION 1: Fixed Header ─────────────────────────────── */}
        <div className="flex-shrink-0" style={{ borderBottom: '1px solid #1E222A' }}>

          {/* Top toolbar — logo 22px, icons 20px, click target 36×36 */}
          <div
            className="flex items-center"
            style={{ height: 58, paddingLeft: 16, paddingRight: 8, gap: 10 }}
          >
            <LogoMark size={22} />

            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.17 }}
                  className="overflow-hidden flex items-baseline flex-1"
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#F8FAFC', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Conv</span>
                  <span style={{ fontSize: 15, fontWeight: 400, color: '#94A3B8', marginLeft: 3, whiteSpace: 'nowrap' }}>AI</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapse toggle — 36×36, 20px icon */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="flex-shrink-0 flex items-center justify-center rounded-lg text-[#2E3440] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all duration-[150ms] ml-auto"
              style={{ width: 36, height: 36 }}
            >
              {collapsed
                ? <ChevronRight size={20} strokeWidth={1.75} />
                : <ChevronLeft  size={20} strokeWidth={1.75} />
              }
            </button>
          </div>

          {/* Search — hidden when collapsed */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.17 }}
                className="overflow-hidden"
                style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 10 }}
              >
                <div className="relative">
                  <Search size={20} strokeWidth={1.75} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#2E3440]" />
                  <input
                    type="text"
                    placeholder="Search…"
                    className="w-full outline-none transition-all duration-[160ms]"
                    style={{
                      paddingLeft: 36, paddingRight: 12,
                      fontSize: 15, fontWeight: 400, lineHeight: '22px',
                      height: 36, borderRadius: 10,
                      background: '#111318', border: '1px solid #1E222A',
                      color: '#94A3B8',
                      fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#6366F1'; e.target.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.12)'; }}
                    onBlur={e  => { e.target.style.borderColor = '#1E222A'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Primary nav */}
          <div style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {mainNav.map(item => (
              <NavItem key={item.path} item={item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        {/* ── SECTION 2: Scrollable Recents ───────────────────────────
            Only this section scrolls — flex: 1, overflow-y: auto
        ─────────────────────────────────────────────────────────── */}
        <div
          className="flex-1 min-h-0 overflow-x-hidden"
          style={{ overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#1E222A transparent' }}
        >
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 16, paddingBottom: 12 }}
              >
                {/* "Recents" heading — 15px / 600 */}
                <p
                  className="text-[#2E3440] uppercase tracking-wider"
                  style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, paddingLeft: 12 }}
                >
                  Recents
                </p>

                {/* Flat conversation list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {conversations.map(conv => (
                    <ConvRow
                      key={conv.id}
                      conv={conv}
                      isActive={activeConv === conv.id}
                      onClick={() => setActiveConv(conv.id)}
                      onRename={() => handleRename(conv.id)}
                      onArchive={() => {/* archive handler */}}
                      onDelete={() => handleDelete(conv.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── SECTION 3: Fixed Footer ──────────────────────────────── */}
        <div
          ref={profileRef}
          className="flex-shrink-0 relative"
          style={{ borderTop: '1px solid #1E222A', padding: '8px 8px', overflow: 'visible' }}
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
                  position: 'fixed', bottom: 76, left: 12,
                  width: 236, zIndex: 9999,
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
                  {popupMenu.map(item => {
                    const { Icon } = item;
                    return (
                      <React.Fragment key={item.label}>
                        <button
                          onClick={() => { setProfileOpen(false); if (item.path) navigate(item.path); }}
                          className="w-full flex items-center gap-3 px-4 text-left transition-all duration-[150ms] hover:bg-white/[0.05]"
                          style={{ height: 40 }}
                        >
                          <Icon size={15} className={item.accent ? 'text-[#6366F1]' : 'text-[#475569]'} strokeWidth={1.8} />
                          <span className={item.accent ? 'text-[#6366F1]' : 'text-[#94A3B8]'} style={{ fontSize: 14, fontWeight: 500 }}>
                            {item.label}
                          </span>
                        </button>
                        {item.divideAfter && (
                          <div className="mx-3 my-1" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Upgrade button */}
                  <div style={{ padding: '6px 12px 4px' }}>
                    <button
                      className="w-full flex items-center justify-center gap-2 text-white font-semibold transition-all duration-[150ms] hover:bg-[#4F46E5]"
                      style={{ height: 34, borderRadius: 10, background: '#6366F1', fontSize: 14, fontWeight: 600, boxShadow: '0 2px 8px rgba(99,102,241,0.28)' }}
                    >
                      <Zap size={14} strokeWidth={2} />
                      Upgrade to Pro
                    </button>
                  </div>

                  <div className="mx-3 my-1" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-3 px-4 text-left transition-all duration-[150ms] hover:bg-[#EF4444]/10"
                    style={{ height: 40 }}
                  >
                    <LogOut size={15} className="text-[#EF4444]" strokeWidth={1.8} />
                    <span className="text-[#EF4444]" style={{ fontSize: 14, fontWeight: 500 }}>Log out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile row — avatar 32px, username 16px/600, plan 13px/400 */}
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            title={collapsed ? 'Alex Reed' : undefined}
            className="w-full flex items-center rounded-[10px] cursor-pointer hover:bg-[#1A1D24] transition-all duration-[150ms]"
            style={{ gap: 10, padding: '6px 10px', minHeight: 48 }}
          >
            <div
              className="flex items-center justify-center text-white flex-shrink-0"
              style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #06B6D4)', fontSize: 12, fontWeight: 700 }}
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
                  className="overflow-hidden text-left flex-1"
                >
                  <p className="whitespace-nowrap text-[#F8FAFC]" style={{ fontSize: 16, fontWeight: 600, lineHeight: '22px' }}>Alex Reed</p>
                  <p className="whitespace-nowrap text-[#475569]" style={{ fontSize: 13, fontWeight: 400 }}>Pro Plan</p>
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
        <header
          className="flex items-center justify-between px-6 flex-shrink-0"
          style={{ background: '#0A0C10', borderBottom: '1px solid #1E222A', height: 58 }}
        >
          <div className="relative flex-1 max-w-[400px]">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2E3440]" />
            <input
              type="text"
              placeholder="Search conversations, projects, files…"
              className="w-full pl-9 pr-4 text-[13px] rounded-xl outline-none transition-all duration-[160ms]"
              style={{ height: 48, background: '#111318', border: '1px solid #1E222A', color: '#94A3B8' }}
              onFocus={e => { e.target.style.borderColor = '#6366F1'; e.target.style.color = '#F8FAFC'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
              onBlur={e  => { e.target.style.borderColor = '#1E222A'; e.target.style.color = '#94A3B8';  e.target.style.boxShadow = 'none'; }}
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
              style={{ height: 38, background: '#6366F1', boxShadow: '0 2px 8px rgba(99,102,241,0.28)' }}
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
