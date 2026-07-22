import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NavLink } from 'react-router';
import {
  User, Mail, Phone, MapPin, Camera, Sparkles, Zap,
  Shield, Bell, KeyRound, CreditCard, ChevronRight,
  MessageSquare, Bot, Image, Star, Globe
} from 'lucide-react';

const stats = [
  { label: 'Conversations', value: '1,284', sub: 'All time', color: '#2563EB' },
  { label: 'Agents Created', value: '12', sub: '3 active', color: '#7C3AED' },
  { label: 'Images Generated', value: '347', sub: 'DALL·E 3', color: '#DB2777' },
  { label: 'Member Since', value: 'Jan 2024', sub: '18 months', color: '#059669' },
];

const sections = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Personal Information', desc: 'Name, email, phone, photo' },
      { icon: MapPin, label: 'Location & Language', desc: 'Timezone, region, language' },
      { icon: Shield, label: 'Security', desc: '2FA, password, active sessions', path: null },
    ],
  },
  {
    title: 'AI Preferences',
    items: [
      { icon: Bot, label: 'Default AI Model', desc: 'GPT-4o · Multimodal' },
      { icon: MessageSquare, label: 'Chat Preferences', desc: 'Response style, language' },
      { icon: Bell, label: 'Notifications', desc: 'Email, push, in-app alerts' },
    ],
  },
  {
    title: 'Subscription & Billing',
    items: [
      { icon: Zap, label: 'Snow Pro Plan', desc: '$19/month · Renews Aug 22', badge: 'Active' },
      { icon: CreditCard, label: 'Payment Method', desc: 'Visa ending in 4821' },
      { icon: Star, label: 'Referral Program', desc: 'Earn free months by sharing' },
    ],
  },
  {
    title: 'Developer',
    items: [
      { icon: KeyRound, label: 'API Keys', desc: '3 active keys', path: '/api-keys' },
      { icon: Globe, label: 'Connected Apps', desc: '3 integrations active', path: '/integrations' },
    ],
  },
];

export default function Account() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-3xl mx-auto p-6 space-y-5">

        {/* Profile hero */}
        <div className="rounded-[20px] p-6" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="flex items-start gap-5">
            <div className="relative flex-shrink-0">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[28px] font-bold"
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', boxShadow: '0 4px 16px rgba(37,99,235,0.3)' }}
              >
                A
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
                      <Sparkles size={11} /> Snow Pro
                    </span>
                    <span className="text-[12px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full">
                      Member since Jan 2024
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

          {/* Contact info */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5" style={{ borderTop: '1px solid #F1F5F9' }}>
            {[
              { icon: Mail, label: 'alex.reed@gmail.com' },
              { icon: Phone, label: '+1 (415) 555-0192' },
              { icon: MapPin, label: 'San Francisco, CA' },
            ].map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="flex items-center gap-2.5">
                  <Icon size={13} className="text-[#94A3B8] flex-shrink-0" />
                  <span className="text-[12.5px] text-[#64748B] truncate">{info.label}</span>
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
        {sections.map((section, si) => (
          <div key={si} className="rounded-[16px] overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <div className="px-5 py-3.5" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em]">{section.title}</p>
            </div>
            <div>
              {section.items.map((item, ii) => {
                const Icon = item.icon;
                const content = (
                  <div
                    key={ii}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F8FAFC] transition-all text-left group cursor-pointer"
                    style={{ borderBottom: ii < section.items.length - 1 ? '1px solid #F8FAFC' : 'none' }}
                  >
                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: '#F8FAFC' }}>
                      <Icon size={15} className="text-[#64748B]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-[#0F172A]">{item.label}</p>
                      <p className="text-[12px] text-[#94A3B8] mt-0.5">{item.desc}</p>
                    </div>
                    {(item as any).badge && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{(item as any).badge}</span>
                    )}
                    <ChevronRight size={14} className="text-[#CBD5E1] group-hover:text-[#94A3B8] transition-colors flex-shrink-0" />
                  </div>
                );

                return (item as any).path
                  ? <NavLink key={ii} to={(item as any).path}>{content}</NavLink>
                  : <div key={ii}>{content}</div>;
              })}
            </div>
          </div>
        ))}

        {/* Danger zone */}
        <div className="rounded-[16px] overflow-hidden" style={{ background: '#fff', border: '1px solid #FECACA' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #FEF2F2' }}>
            <p className="text-[14px] font-bold text-[#EF4444]">Danger Zone</p>
          </div>
          <div className="p-5 space-y-3">
            {['Delete all conversations', 'Export all data', 'Delete account'].map((action, i) => (
              <button key={i} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13.5px] font-semibold text-[#EF4444] hover:bg-[#FEF2F2] transition-all text-left" style={{ border: '1px solid #FECACA' }}>
                {action}
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
