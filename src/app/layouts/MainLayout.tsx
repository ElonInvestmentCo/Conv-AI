import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  SquarePen,
  Mic2,
  Bell,
  Settings,
  User,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  LogOut,
  Zap,
} from 'lucide-react';

function ImagesIcon({ className }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvcHktaW1hZ2UtaWNvbiBsdWNpZGUtY29weS1pbWFnZSI+PHBhdGggZD0iTTQgMTZhMiAyIDAgMCAxLTItMlY0YTIgMiAwIDAgMSAyLTJoMTBhMiAyIDAgMCAxIDIgMiIvPjxyZWN0IHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgeD0iOCIgeT0iOCIgcng9IjIiLz48Y2lyY2xlIGN4PSIxNCIgY3k9IjE0IiByPSIyIi8+PHBhdGggZD0ibTEzLjQgMjIgNC43LTMuOWMuOC0uOCAyLS44IDIuOCAwbDEuMSAxLjEiLz48L3N2Zz4="
      width={24}
      height={24}
      alt="Images"
      className={className}
    />
  );
}

function LibraryIcon({ className }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxpYnJhcnktYmlnLWljb24gbHVjaWRlLWxpYnJhcnktYmlnIj48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjEiLz48cGF0aCBkPSJNNyAzdjE4Ii8+PHBhdGggZD0iTTIwLjQgMTguOWMuMi41LS4xIDEuMS0uNiAxLjNsLTEuOS43Yy0uNS4yLTEuMS0uMS0xLjMtLjZMMTEuMSA1LjFjLS4yLS41LjEtMS4xLjYtMS4zbDEuOS0uN2MuNS0uMiAxLjEuMSAxLjMuNloiLz48L3N2Zz4="
      width={24}
      height={24}
      alt="Library"
      className={className}
    />
  );
}

function ProjectsIcon({ className }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZvbGRlci1jbG9zZWQtaWNvbiBsdWNpZGUtZm9sZGVyLWNsb3NlZCI+PHBhdGggZD0iTTIwIDIwYTIgMiAwIDAgMCAyLTJWOGEyIDIgMCAwIDAtMi0yaC03LjlhMiAyIDAgMCAxLTEuNjktLjlMOS42IDMuOUEyIDIgMCAwIDAgNy45MyAzSDRhMiAyIDAgMCAwLTIgMnYxM2EyIDIgMCAwIDAgMiAyWiIvPjxwYXRoIGQ9Ik0yIDEwaDIwIi8+PC9zdmc+"
      width={24}
      height={24}
      alt="Projects"
      className={className}
    />
  );
}

function TTSIcon({ className }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyLjI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtc2lnbmFsLWljb24gbHVjaWRlLWZpbGUtc2lnbmFsIj48cGF0aCBkPSJNNiAyMmEyIDIgMCAwIDEtMi0yVjRhMiAyIDAgMCAxIDItMmg4YTIuNCAyLjQgMCAwIDEgMS43MDQuNzA2bDMuNTg4IDMuNTg4QTIuNCAyLjQgMCAwIDEgMjAgOHYxMmEyIDIgMCAwIDEtMiAyeiIvPjxwYXRoIGQ9Ik0xNCAydjVhMSAxIDAgMCAwIDEgMWg1Ii8+PHBhdGggZD0iTTggMTVoLjAxIi8+PHBhdGggZD0iTTExLjUgMTMuNWEyLjUgMi41IDAgMCAxIDAgMyIvPjxwYXRoIGQ9Ik0xNSAxMmE1IDUgMCAwIDEgMCA2Ii8+PC9zdmc+"
      width={24}
      height={24}
      alt="Text to Speech"
      className={className}
    />
  );
}

function BuilderIcon({ className }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxheW91dC1kYXNoYm9hcmQtaWNvbiBsdWNpZGUtbGF5b3V0LWRhc2hib2FyZCI+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iOSIgeD0iMyIgeT0iMyIgcng9IjEiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSI1IiB4PSIxNCIgeT0iMyIgcng9IjEiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSI5IiB4PSIxNCIgeT0iMTIiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iNSIgeD0iMyIgeT0iMTYiIHJ4PSIxIi8+PC9zdmc+"
      width={24}
      height={24}
      alt="Builder"
      className={className}
    />
  );
}

const mainNav = [
  { label: 'New Chat', path: '/chat', icon: SquarePen, noColor: true },
  { label: 'Images', path: '/images', icon: ImagesIcon },
  { label: 'Library', path: '/library', icon: LibraryIcon },
  { label: 'Projects', path: '/projects', icon: ProjectsIcon },
  { label: 'Builder', path: '/builder', icon: BuilderIcon },
  { label: 'Text to Speech', path: '/tts', icon: TTSIcon },
];

const profileMenu = [
  { icon: Zap, label: 'Upgrade Plan', path: null, accent: true, chevron: false },
  { icon: Bell, label: 'Notifications', path: '/notifications', accent: false, chevron: false },
  { icon: User, label: 'Account', path: '/account', accent: false, chevron: false },
  { icon: Settings, label: 'Settings', path: '/settings', accent: false, chevron: false },
  { icon: HelpCircle, label: 'Help', path: '/help', accent: false, chevron: true },
];

function NavItem({ item, collapsed }: { item: { label: string; path: string; icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; className?: string }>; noColor?: boolean }; collapsed: boolean }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 relative
        ${isActive
          ? 'bg-[#EFF6FF] text-[#1D4ED8]'
          : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="sidebarActive"
              className="absolute inset-0 rounded-xl bg-[#EFF6FF]"
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
          <Icon
            size={24}
            color="#000000"
            strokeWidth={2}
            className="relative flex-shrink-0"
          />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="relative overflow-hidden whitespace-nowrap"
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
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [profileOpen]);

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: '#F7F9FC', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ─── Sidebar ─── */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 259 }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="relative flex-shrink-0 flex flex-col h-full overflow-hidden"
        style={{ background: '#fff', borderRight: '1px solid rgba(226,232,240,0.8)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-14 flex-shrink-0" style={{ borderBottom: '1px solid rgba(226,232,240,0.5)' }}>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.35)' }}
          >
            <Sparkles size={15} className="text-white" />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden"
              >
                <p className="text-[15px] font-bold text-[#0F172A] tracking-[-0.02em] whitespace-nowrap">Conv AI</p>
                <p className="text-[11px] text-[#94A3B8] whitespace-nowrap -mt-0.5">AI Platform</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main nav */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          {mainNav.map((item) => (
            <NavItem key={item.path} item={item} collapsed={collapsed} />
          ))}
        </div>

        {/* User profile + popup */}
        <div className="px-2 py-2 flex-shrink-0 relative" style={{ borderTop: '1px solid rgba(226,232,240,0.5)' }} ref={profileRef}>

          {/* Profile popup */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                className="absolute bottom-full left-2 right-2 mb-2 rounded-[16px] overflow-hidden z-50"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(226,232,240,0.9)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                {/* User row */}
                <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid rgba(226,232,240,0.7)' }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                  >
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#0F172A] truncate">Alex Reed</p>
                    <p className="text-[11px] text-[#94A3B8]">Pro Plan</p>
                  </div>
                  <ChevronRight size={16} className="text-[#CBD5E1] flex-shrink-0" />
                </div>

                {/* Menu items */}
                <div className="py-1.5">
                  {profileMenu.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        onClick={() => { setProfileOpen(false); if (item.path) navigate(item.path); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all hover:bg-[#F8FAFC]"
                      >
                        <Icon size={15} className={item.accent ? 'text-[#7C3AED]' : 'text-[#64748B]'} />
                        <span className={`flex-1 text-[13px] font-medium ${item.accent ? 'text-[#7C3AED] font-semibold' : 'text-[#0F172A]'}`}>
                          {item.label}
                        </span>
                        {item.chevron && <ChevronRight size={14} className="text-[#CBD5E1]" />}
                      </button>
                    );
                  })}
                </div>

                {/* Log out */}
                <div style={{ borderTop: '1px solid rgba(226,232,240,0.7)' }}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-[#FEF2F2]">
                    <LogOut size={15} className="text-[#EF4444]" />
                    <span className="text-[13px] font-medium text-[#EF4444]">Log out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile row */}
          <div className="flex items-center gap-2 px-2 py-2">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setProfileOpen(!profileOpen)}
              onKeyDown={e => e.key === 'Enter' && setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
              >
                A
              </div>
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex-1 overflow-hidden"
                  >
                    <p className="text-[13px] font-semibold text-[#0F172A] whitespace-nowrap">Alex Reed</p>
                    <p className="text-[11px] text-[#94A3B8] whitespace-nowrap">Pro Plan</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#475569] hover:bg-[#F8FAFC] transition-all"
            >
              {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* ─── Main area ─── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 h-14 flex-shrink-0" style={{ background: '#fff', borderBottom: '1px solid rgba(226,232,240,0.8)' }}>
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
            <input
              type="text"
              placeholder="Search conversations, projects, files..."
              className="pl-9 pr-3 py-2 text-[13px] rounded-xl outline-none transition-all w-full"
              style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A' }}
              onFocus={e => { e.target.style.borderColor = '#93C5FD'; e.target.style.background = '#fff'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; e.target.style.background = '#F8FAFC'; }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[13px] font-medium text-[#475569]" style={{ border: '1px solid rgba(226,232,240,0.8)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              GPT-4o
            </div>
            <NavLink to="/notifications" className="relative p-2.5 rounded-xl text-[#94A3B8] hover:text-[#475569] hover:bg-[#F8FAFC] transition-all">
              <Bell size={16} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </NavLink>
            <NavLink
              to="/chat"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}
            >
              <Sparkles size={13} />
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
