import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
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
  Image,
  Library,
  FolderOpen,
  LayoutDashboard,
  FileAudio,
} from 'lucide-react';

// ── Conv AI Logo Mark ─────────────────────────────────────────────────────────
const LogoMark = ({ className = 'w-7 h-7', color = '#F8FAFC' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 10C6 7.79086 7.79086 6 10 6H16V18C16 22.4183 12.4183 26 8 26H6V10Z" fill={color} />
    <path d="M26 22C26 24.2091 24.2091 26 22 26H16V14C16 9.58172 19.5817 6 24 6H26V22Z" fill={color} fillOpacity={0.5} />
  </svg>
);

const mainNav = [
  { label: 'New Chat',      path: '/chat',      Icon: SquarePen   },
  { label: 'Images',        path: '/images',    Icon: Image       },
  { label: 'Library',       path: '/library',   Icon: Library     },
  { label: 'Projects',      path: '/projects',  Icon: FolderOpen  },
  { label: 'Builder',       path: '/builder',   Icon: LayoutDashboard },
  { label: 'Text to Speech',path: '/tts',       Icon: FileAudio   },
];

const profileMenu = [
  { Icon: Zap,         label: 'Upgrade Plan',  path: null,            accent: true  },
  { Icon: Bell,        label: 'Notifications', path: '/notifications', accent: false },
  { Icon: User,        label: 'Account',       path: '/account',       accent: false },
  { Icon: Settings,    label: 'Settings',      path: '/settings',      accent: false },
  { Icon: HelpCircle,  label: 'Help',          path: '/help',          accent: false, chevron: true },
];

function NavItem({ item, collapsed }: { item: typeof mainNav[0]; collapsed: boolean }) {
  const { Icon } = item;
  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 relative
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
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
          <Icon
            size={18}
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
    <div className="flex h-screen w-full overflow-hidden" style={{ background: '#0A0C10', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ─── Sidebar ─── */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="relative flex-shrink-0 flex flex-col h-full overflow-hidden"
        style={{ background: '#0A0C10', borderRight: '1px solid #1E222A' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-14 flex-shrink-0" style={{ borderBottom: '1px solid #1E222A' }}>
          <LogoMark className="w-7 h-7 flex-shrink-0" color="#F8FAFC" />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden flex items-baseline gap-0.5"
              >
                <span className="text-[15px] font-semibold text-[#F8FAFC] tracking-tight whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif" }}>Conv</span>
                <span className="text-[15px] font-normal text-[#94A3B8] whitespace-nowrap ml-0.5">AI</span>
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
        <div className="px-2 py-2 flex-shrink-0 relative" style={{ borderTop: '1px solid #1E222A' }} ref={profileRef}>

          {/* Profile popup */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                className="absolute bottom-full left-2 right-2 mb-2 rounded-[14px] overflow-hidden z-50"
                style={{
                  background: '#111318',
                  border: '1px solid #1E222A',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
                }}
              >
                {/* User row */}
                <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid #1E222A' }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}
                  >
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#F8FAFC] truncate">Alex Reed</p>
                    <p className="text-[11px] text-[#475569]">Pro Plan</p>
                  </div>
                  <ChevronRight size={14} className="text-[#2E3440] flex-shrink-0" />
                </div>

                {/* Menu items */}
                <div className="py-1.5">
                  {profileMenu.map((item) => {
                    const { Icon } = item;
                    return (
                      <button
                        key={item.label}
                        onClick={() => { setProfileOpen(false); if (item.path) navigate(item.path); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all hover:bg-[#1A1D24]"
                      >
                        <Icon size={14} className={item.accent ? 'text-[#6366F1]' : 'text-[#475569]'} />
                        <span className={`flex-1 text-[13px] font-medium ${item.accent ? 'text-[#6366F1]' : 'text-[#94A3B8]'}`}>
                          {item.label}
                        </span>
                        {item.chevron && <ChevronRight size={13} className="text-[#2E3440]" />}
                      </button>
                    );
                  })}
                </div>

                {/* Log out */}
                <div style={{ borderTop: '1px solid #1E222A' }}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-[#EF4444]/10">
                    <LogOut size={14} className="text-[#EF4444]" />
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
                    transition={{ duration: 0.18 }}
                    className="flex-1 overflow-hidden"
                  >
                    <p className="text-[13px] font-medium text-[#F8FAFC] whitespace-nowrap">Alex Reed</p>
                    <p className="text-[11px] text-[#475569] whitespace-nowrap">Pro Plan</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all"
            >
              {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* ─── Main area ─── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 h-14 flex-shrink-0" style={{ background: '#0A0C10', borderBottom: '1px solid #1E222A' }}>
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E3440]" />
            <input
              type="text"
              placeholder="Search conversations, projects, files..."
              className="pl-9 pr-3 py-2 text-[13px] rounded-xl outline-none transition-all w-full"
              style={{ background: '#111318', border: '1px solid #1E222A', color: '#94A3B8' }}
              onFocus={e => { e.target.style.borderColor = '#6366F1'; e.target.style.color = '#F8FAFC'; }}
              onBlur={e => { e.target.style.borderColor = '#1E222A'; e.target.style.color = '#94A3B8'; }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[13px] font-medium text-[#475569]" style={{ border: '1px solid #1E222A' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[#94A3B8]">GPT-4o</span>
            </div>
            <NavLink to="/notifications" className="relative p-2.5 rounded-xl text-[#475569] hover:text-[#94A3B8] hover:bg-[#1A1D24] transition-all">
              <Bell size={15} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#6366F1] rounded-full" />
            </NavLink>
            <NavLink
              to="/chat"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all hover:bg-[#4F46E5]"
              style={{ background: '#6366F1', boxShadow: '0 2px 8px rgba(99,102,241,0.3)' }}
            >
              <SquarePen size={13} />
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
