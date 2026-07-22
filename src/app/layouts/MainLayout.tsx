import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, MessageSquare, Clock, BookOpen, PlusCircle,
  BarChart3, Wallet, TrendingUp, Bitcoin, PieChart,
  Bell, Settings, User, ChevronLeft, ChevronRight,
  Search, Zap, HelpCircle, ArrowLeftRight, CreditCard, Building2, FileText, Lightbulb
} from 'lucide-react';

const chatNav = [
  { label: 'New Chat', path: '/chat', icon: MessageSquare, primary: true },
  { label: 'History', path: '/history', icon: Clock },
  { label: 'Knowledge Base', path: '/accounts', icon: BookOpen },
];

const financeNav = [
  { label: 'Dashboard', path: '/home', icon: BarChart3 },
  { label: 'Wallet', path: '/wallet', icon: Wallet },
  { label: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
  { label: 'Budget', path: '/budget', icon: PieChart },
  { label: 'Analytics', path: '/analytics', icon: TrendingUp },
  { label: 'Investments', path: '/investments', icon: TrendingUp },
  { label: 'Crypto', path: '/crypto', icon: Bitcoin },
  { label: 'Cards', path: '/cards', icon: CreditCard },
  { label: 'Reports', path: '/reports', icon: FileText },
  { label: 'AI Insights', path: '/insights', icon: Lightbulb },
];

const bottomNav = [
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Profile', path: '/profile', icon: User },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const recentChats = [
  'Q2 Portfolio Analysis',
  'Tax Deductions 2024',
  'Mortgage Rate Comparison',
  'Emergency Fund Strategy',
  'Crypto Market Overview',
];

function NavItem({ item, collapsed }: { item: any; collapsed: boolean }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 relative
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
            size={17}
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
                transition={{ duration: 0.2 }}
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
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: '#F7F9FC', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ─── Sidebar ─── */}
      <motion.aside
        animate={{ width: collapsed ? 68 : 256 }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="relative flex-shrink-0 flex flex-col h-full overflow-hidden"
        style={{ background: '#fff', borderRight: '1px solid rgba(226,232,240,0.8)', boxShadow: '1px 0 0 rgba(226,232,240,0.5)' }}
      >
        {/* Logo */}
        <div className="flex items-center h-[60px] px-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(241,245,249,1)' }}>
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[10px] text-white"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}
            >
              <Sparkles size={15} />
            </div>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col leading-tight min-w-0"
                >
                  <span className="font-bold text-[15px] text-[#0F172A] tracking-[-0.02em]">Snow AI</span>
                  <span className="text-[10px] text-[#94A3B8] font-medium tracking-wide">Financial Intelligence</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* New Chat CTA */}
        <div className="px-3 pt-3 pb-1 flex-shrink-0">
          <NavLink to="/chat">
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  collapsed ? 'justify-center' : ''
                } ${isActive
                  ? 'text-[#2563EB] bg-[#EFF6FF]'
                  : 'text-white'
                }`}
                style={!isActive ? {
                  background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                  boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
                } : {}}
              >
                <PlusCircle size={16} className={isActive ? 'text-[#2563EB]' : 'text-white'} />
                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-[13px] font-semibold whitespace-nowrap ${isActive ? 'text-[#2563EB]' : 'text-white'}`}
                    >
                      New Conversation
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </NavLink>
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 scrollbar-none">

          {/* Recent chats */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-2"
              >
                <p className="px-3 py-2 text-[10.5px] font-bold text-[#94A3B8] uppercase tracking-[0.08em]">Recent</p>
                <div className="space-y-0.5">
                  {recentChats.map((chat, i) => (
                    <NavLink key={i} to="/chat" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors group">
                      <MessageSquare size={13} className="flex-shrink-0 text-[#CBD5E1] group-hover:text-[#94A3B8]" />
                      <span className="truncate">{chat}</span>
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Finance section */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-3 py-2 text-[10.5px] font-bold text-[#94A3B8] uppercase tracking-[0.08em]"
              >
                Finance
              </motion.p>
            )}
          </AnimatePresence>

          {collapsed && <div className="h-px mx-3 my-2" style={{ background: '#F1F5F9' }} />}

          {financeNav.map((item) => (
            <NavItem key={item.path} item={item} collapsed={collapsed} />
          ))}
        </div>

        {/* Bottom nav */}
        <div className="flex-shrink-0 px-2 py-2 space-y-0.5" style={{ borderTop: '1px solid rgba(241,245,249,1)' }}>
          {bottomNav.map((item) => (
            <NavItem key={item.path} item={item} collapsed={collapsed} />
          ))}
        </div>

        {/* User + collapse */}
        <div className="flex-shrink-0 px-3 py-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(241,245,249,1)' }}>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                AR
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[#0F172A] truncate leading-tight">Alex Reed</p>
                <p className="text-[11px] text-[#94A3B8] truncate">Premium</p>
              </div>
            </motion.div>
          )}
          {collapsed && (
            <div className="w-7 h-7 mx-auto rounded-full flex items-center justify-center text-white text-[11px] font-bold" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
              AR
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC] transition-all"
            >
              <ChevronLeft size={15} />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <div className="px-3 pb-3 flex-shrink-0">
            <button
              onClick={() => setCollapsed(false)}
              className="w-full flex items-center justify-center p-2 rounded-xl text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC] transition-all"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </motion.aside>

      {/* ─── Main ─── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header
          className="flex-shrink-0 h-[60px] flex items-center justify-between px-6"
          style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(226,232,240,0.7)', zIndex: 10 }}
        >
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="pl-8 pr-3 py-2 text-[13px] rounded-xl outline-none transition-all w-52"
                style={{
                  background: '#F8FAFC',
                  border: '1px solid rgba(226,232,240,0.8)',
                  color: '#0F172A',
                }}
                onFocus={e => { e.target.style.border = '1px solid #93C5FD'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.border = '1px solid rgba(226,232,240,0.8)'; e.target.style.background = '#F8FAFC'; }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Model badge */}
            <NavLink to="/chat" className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-all" style={{ border: '1px solid rgba(226,232,240,0.8)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Snow Pro · GPT-4o
            </NavLink>

            {/* Notification */}
            <NavLink to="/notifications" className="relative p-2.5 rounded-xl text-[#94A3B8] hover:text-[#475569] hover:bg-[#F8FAFC] transition-all">
              <Bell size={17} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </NavLink>

            {/* Ask AI CTA */}
            <NavLink
              to="/chat"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}
            >
              <Sparkles size={14} />
              Ask Snow AI
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
