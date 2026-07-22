import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, MessageSquare, Clock, ChevronLeft, ChevronRight,
  Search, Bell, Settings, User, HelpCircle,
  Wand2, Bot, Cpu, Mic, Image, Video, FileText,
  Zap, BookOpen, FolderOpen, Plug, KeyRound,
  BarChart3, PieChart, ChevronDown
} from 'lucide-react';

const navGroups = [
  {
    label: 'AI',
    items: [
      { label: 'New Chat', path: '/chat', icon: MessageSquare, primary: true },
      { label: 'History', path: '/history', icon: Clock },
      { label: 'Builder', path: '/builder', icon: Wand2 },
    ],
  },
  {
    label: 'Create',
    items: [
      { label: 'Agents', path: '/agents', icon: Bot },
      { label: 'Models', path: '/models', icon: Cpu },
      { label: 'Voice', path: '/voice', icon: Mic },
      { label: 'Images', path: '/images', icon: Image },
      { label: 'Video', path: '/video', icon: Video },
    ],
  },
  {
    label: 'Organize',
    items: [
      { label: 'Documents', path: '/documents', icon: FileText },
      { label: 'Knowledge Base', path: '/knowledge', icon: BookOpen },
      { label: 'Files', path: '/files', icon: FolderOpen },
    ],
  },
  {
    label: 'Automate',
    items: [
      { label: 'Automations', path: '/automations', icon: Zap },
    ],
  },
  {
    label: 'Develop',
    items: [
      { label: 'Integrations', path: '/integrations', icon: Plug },
      { label: 'API Keys', path: '/api-keys', icon: KeyRound },
      { label: 'Analytics', path: '/analytics', icon: BarChart3 },
      { label: 'Usage', path: '/usage', icon: PieChart },
    ],
  },
];

const bottomNav = [
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Account', path: '/account', icon: User },
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Help', path: '/help', icon: HelpCircle },
];

const recentChats = [
  'Build a multi-agent pipeline',
  'Summarize this 80-page PDF',
  'Generate product images for launch',
  'Write API integration docs',
  'Automate my email workflow',
];

function NavItem({ item, collapsed }: { item: any; collapsed: boolean }) {
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
            size={16}
            className={`relative flex-shrink-0 transition-colors ${
              isActive ? 'text-[#2563EB]' : 'text-[#94A3B8] group-hover:text-[#475569]'
            }`}
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
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: '#F7F9FC', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ─── Sidebar ─── */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 248 }}
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

        {/* Nav groups */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="px-3 mb-1 text-[10px] font-bold text-[#CBD5E1] uppercase tracking-[0.08em]"
                  >
                    {group.label}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavItem key={item.path} item={item} collapsed={collapsed} />
                ))}
              </div>
            </div>
          ))}

          {/* Recent chats */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <p className="px-3 mb-1 text-[10px] font-bold text-[#CBD5E1] uppercase tracking-[0.08em]">Recent</p>
                <div className="space-y-0.5">
                  {recentChats.map((chat, i) => (
                    <NavLink
                      key={i}
                      to="/history"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-all truncate"
                    >
                      <MessageSquare size={12} className="text-[#CBD5E1] flex-shrink-0" />
                      <span className="truncate">{chat}</span>
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <div className="px-2 py-2 flex-shrink-0 space-y-0.5" style={{ borderTop: '1px solid rgba(226,232,240,0.5)' }}>
          {bottomNav.map((item) => (
            <NavItem key={item.path} item={item} collapsed={collapsed} />
          ))}
        </div>

        {/* User + collapse toggle */}
        <div className="px-2 py-2 flex-shrink-0" style={{ borderTop: '1px solid rgba(226,232,240,0.5)' }}>
          <div className="flex items-center gap-2 px-2 py-2">
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
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#475569] hover:bg-[#F8FAFC] transition-all"
            >
              {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* ─── Main area ─── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="flex items-center justify-between px-6 h-14 flex-shrink-0" style={{ background: '#fff', borderBottom: '1px solid rgba(226,232,240,0.8)' }}>
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
            <input
              type="text"
              placeholder="Search conversations, files, agents..."
              className="pl-9 pr-3 py-2 text-[13px] rounded-xl outline-none transition-all w-full"
              style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A' }}
              onFocus={e => { e.target.style.borderColor = '#93C5FD'; e.target.style.background = '#fff'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; e.target.style.background = '#F8FAFC'; }}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Model indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[13px] font-medium text-[#475569]" style={{ border: '1px solid rgba(226,232,240,0.8)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              GPT-4o
            </div>

            {/* Notifications */}
            <NavLink to="/notifications" className="relative p-2.5 rounded-xl text-[#94A3B8] hover:text-[#475569] hover:bg-[#F8FAFC] transition-all">
              <Bell size={16} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </NavLink>

            {/* New chat CTA */}
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

        {/* Page content */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
