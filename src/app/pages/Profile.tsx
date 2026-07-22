import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Shield, CreditCard, Bell, ChevronRight, Camera, Star, TrendingUp, Zap } from 'lucide-react';

const stats = [
  { label: 'Net Worth', value: '$1,245,600', sub: '+8.4% this year', color: '#2563EB' },
  { label: 'Savings Rate', value: '47.9%', sub: '+3.2pp vs last year', color: '#10B981' },
  { label: 'AI Chats', value: '248', sub: 'Conversations with Snow', color: '#7C3AED' },
  { label: 'Fin. Score', value: '87/100', sub: 'Excellent health', color: '#F59E0B' },
];

const menuSections = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Personal Information', desc: 'Name, email, phone' },
      { icon: MapPin, label: 'Address & Location', desc: 'Billing and contact address' },
      { icon: Shield, label: 'Security & Privacy', desc: '2FA, password, data settings' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { icon: CreditCard, label: 'Connected Accounts', desc: '6 accounts linked' },
      { icon: TrendingUp, label: 'Investment Preferences', desc: 'Risk profile, goals' },
      { icon: Bell, label: 'Notification Settings', desc: 'Alerts, summaries, digests' },
    ],
  },
  {
    title: 'Subscription',
    items: [
      { icon: Zap, label: 'Snow AI Premium', desc: 'Manage your plan', badge: 'Active' },
      { icon: Star, label: 'Referral Program', desc: 'Earn rewards by sharing' },
    ],
  },
];

export default function Profile() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-3xl mx-auto p-6 space-y-6">

        {/* Profile hero */}
        <div
          className="rounded-[20px] p-6"
          style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-start gap-5">
            <div className="relative flex-shrink-0">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[28px] font-bold"
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
              >
                AR
              </div>
              <button
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-white"
                style={{ background: '#0F172A', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
              >
                <Camera size={13} />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[20px] font-bold text-[#0F172A] tracking-[-0.02em]">Alex Reed</h2>
                  <p className="text-[14px] text-[#64748B] mt-0.5">alex.reed@gmail.com</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full">
                      <Zap size={11} /> Premium Plan
                    </span>
                    <span className="text-[12px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full">
                      Member since 2022
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setEditing(!editing)}
                  className="px-4 py-2 rounded-xl text-[13px] font-semibold transition-all"
                  style={{ background: editing ? '#EFF6FF' : '#F8FAFC', color: editing ? '#2563EB' : '#475569', border: '1px solid rgba(226,232,240,0.8)' }}
                >
                  {editing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5" style={{ borderTop: '1px solid #F1F5F9' }}>
            {[
              { icon: Mail, label: 'alex.reed@gmail.com' },
              { icon: Phone, label: '+1 (415) 555-0192' },
              { icon: MapPin, label: 'San Francisco, CA' },
            ].map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="flex items-center gap-2.5">
                  <Icon size={14} className="text-[#94A3B8] flex-shrink-0" />
                  <span className="text-[13px] text-[#64748B] truncate">{info.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="p-4 rounded-[16px]"
              style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
            >
              <p className="text-[11px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-[20px] font-bold tracking-[-0.02em]" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Menu sections */}
        {menuSections.map((section, si) => (
          <div key={si} className="rounded-[16px] overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <div className="px-5 py-3.5" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em]">{section.title}</p>
            </div>
            <div className="divide-y" style={{ divideColor: '#F8FAFC' }}>
              {section.items.map((item, ii) => {
                const Icon = item.icon;
                return (
                  <button
                    key={ii}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F8FAFC] transition-all text-left group"
                    style={{ borderBottom: ii < section.items.length - 1 ? '1px solid #F8FAFC' : 'none' }}
                  >
                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: '#F8FAFC' }}>
                      <Icon size={16} className="text-[#64748B]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-[#0F172A]">{item.label}</p>
                      <p className="text-[12px] text-[#94A3B8] mt-0.5">{item.desc}</p>
                    </div>
                    {(item as any).badge && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{(item as any).badge}</span>
                    )}
                    <ChevronRight size={15} className="text-[#CBD5E1] group-hover:text-[#94A3B8] transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
