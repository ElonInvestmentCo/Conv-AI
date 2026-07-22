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
  Image,
  Library,
  FolderOpen,
  LayoutDashboard,
  FileAudio,
  Sun,
  Keyboard,
} from 'lucide-react';

// ── Conv AI Logo Mark ─────────────────────────────────────────────────────────
const LogoMark = ({ className = 'w-7 h-7', color = '#F8FAFC' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 10C6 7.79086 7.79086 6 10 6H16V18C16 22.4183 12.4183 26 8 26H6V10Z" fill={color} />
    <path d="M26 22C26 24.2091 24.2091 26 22 26H16V14C16 9.58172 19.5817 6 24 6H26V22Z" fill={color} fillOpacity={0.5} />
  </svg>
);

const mainNav = [
  { label: 'New Chat',       path: '/chat',      Icon: SquarePen       },
  { label: 'Images',         path: '/images',    Icon: Image           },
  { label: 'Library',        path: '/library',   Icon: Library         },
  { label: 'Projects',       path: '/projects',  Icon: FolderOpen      },
  { label: 'Builder',        path: '/builder',   Icon: LayoutDashboard },
  { label: 'Text to Speech', path: '/tts',       Icon: FileAudio       },
];

// Simplified popup menu — 7 focused items only
const popupMenu = [
  { Icon: User,     label: 'Account',            path: '/account',       divideAfter: false },
  { Icon: Settings, label: 'Settings',           path: '/settings',      divideAfter: false },
  { Icon: Sun,      label: 'Theme',              path: null,             divideAfter: false },
  { Icon: Keyboard, label: 'Keyboard Shortcuts', path: null,             divideAfter: true  },
  { Icon: Zap,      label: 'Upgrade Plan',       path: null,             accent: true, divideAfter: false },
  { Icon: HelpCircle,label: 'Help',              path: '/help',          divideAfter: true  },
];

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
          <Icon size={20} className="relative flex-shrink-0" strokeWidth={1.75} />
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

export default function MainLayout() {
  const [collapsed, setCollapsed]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef  = useRef<HTMLDivElement>(null);
  const navigate    = useNavigate();

  // Close on outside click
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
      {/* ─── Sidebar ──────────────────────────────────────────────── */}
      <motion.aside
        animate={{ width: collapsed ? 68 : 248 }}
        transition={{ type: 'spring', stiffness: 420, damping: 42 }}
        className="relative flex-shrink-0 flex flex-col h-full"
        style={{ background: '#0A0C10', borderRight: '1px solid #1E222A', overflow: 'visible' }}
      >
        {/* Logo row */}
        <div
          className="flex items-center gap-3 px-4 h-[58px] flex-shrink-0"
          style={{ borderBottom: '1px solid #1E222A' }}
        >
          <LogoMark className="w-[26px] h-[26px] flex-shrink-0" color="#F8FAFC" />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.17 }}
                className="overflow-hidden flex items-baseline"
              >
                <span className="text-[15px] font-semibold text-[#F8FAFC] tracking-tight whitespace-nowrap">Conv</span>
                <span className="text-[15px] font-normal text-[#94A3B8] whitespace-nowrap ml-[3px]">AI</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-[2px]">
          {mainNav.map((item) => (
            <NavItem key={item.path} item={item} collapsed={collapsed} />
          ))}
        </div>

        {/* Profile strip + popup — overflow visible so popup escapes */}
        <div
          ref={profileRef}
          className="px-2 py-2 flex-shrink-0 relative"
          style={{ borderTop: '1px solid #1E222A', overflow: 'visible' }}
        >
          {/* ── Popup ── */}
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

                  {/* Log out */}
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
          <div className="flex items-center gap-2 px-2 py-[7px]">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer rounded-lg hover:bg-[#1A1D24] transition-all duration-[150ms] p-1 -ml-1"
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
                    className="flex-1 overflow-hidden"
                  >
                    <p className="text-[13px] font-medium text-[#F8FAFC] whitespace-nowrap">Alex Reed</p>
                    <p className="text-[11px] text-[#475569] whitespace-nowrap">Pro Plan</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[#2E3440] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all duration-[150ms]"
            >
              {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* ─── Main content ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top nav */}
        <header
          className="flex items-center justify-between px-6 flex-shrink-0"
          style={{
            background: '#0A0C10',
            borderBottom: '1px solid #1E222A',
            height: 58,
          }}
        >
          {/* Search — 48px tall */}
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
            {/* Model selector */}
            <div
              className="flex items-center gap-2 px-3.5 rounded-xl text-[13px] font-medium cursor-pointer transition-all duration-[150ms] hover:bg-[#1A1D24] hover:border-[#2E3440]"
              style={{ border: '1px solid #1E222A', height: 38, color: '#94A3B8' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>GPT-4o</span>
            </div>

            {/* Notifications */}
            <NavLink
              to="/notifications"
              className="relative flex items-center justify-center rounded-xl text-[#475569] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all duration-[150ms]"
              style={{ width: 38, height: 38, border: '1px solid #1E222A' }}
            >
              <Bell size={15} strokeWidth={1.8} />
              <span className="absolute top-[9px] right-[9px] w-1.5 h-1.5 bg-[#6366F1] rounded-full" />
            </NavLink>

            {/* New Chat */}
            <NavLink
              to="/chat"
              className="flex items-center gap-2 px-4 rounded-xl text-[13px] font-semibold text-white transition-all duration-[150ms] hover:bg-[#4F46E5] hover:shadow-lg"
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

        {/* Page outlet */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
