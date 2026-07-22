import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Mail,
  MapPin,
  Camera,
  Sparkles,
  Zap,
  Shield,
  Bell,
  KeyRound,
  CreditCard,
  ChevronRight,
  MessageSquare,
  Bot,
  Image,
  Star,
} from 'lucide-react';

const stats = [
  { label: 'Conversations', value: '1,284', sub: 'All time', color: '#2563EB' },
  { label: 'Images Generated', value: '347', sub: 'DALL·E 3', color: '#7C3AED' },
  { label: 'Audio Generated', value: '5h 32m', sub: 'TTS total', color: '#DB2777' },
  { label: 'Member Since', value: 'Jan 2024', sub: '18 months', color: '#059669' },
];

const sections = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Personal Information', desc: 'Name, email, phone, photo' },
      { icon: MapPin, label: 'Location & Language', desc: 'Timezone, region, language' },
      { icon: Shield, label: 'Security', desc: '2FA, password, active sessions' },
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
      { icon: Zap, label: 'Conv AI Pro', desc: '$19/month · Renews Aug 22', badge: 'Active' },
      { icon: CreditCard, label: 'Payment Method', desc: 'Visa ending in 4821' },
      { icon: Star, label: 'Referral Program', desc: 'Earn free months by sharing' },
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
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-[22px] font-bold"
                style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
              >
                A
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-md text-[#2563EB] hover:bg-[#EFF6FF] transition-all" style={{ border: '1.5px solid #BFDBFE' }}>
                <Camera size={11} />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[18px] font-bold text-[#0F172A] tracking-[-0.02em]">Alex Reed</h2>
                  <p className="text-[13px] text-[#94A3B8] mt-0.5">alex@example.com</p>
                </div>
                <button
                  onClick={() => setEditing(!editing)}
                  className="px-4 py-2 rounded-xl text-[13px] font-semibold transition-all"
                  style={{
                    background: editing ? 'linear-gradient(135deg, #2563EB, #4F46E5)' : '#F8FAFC',
                    color: editing ? '#fff' : '#475569',
                    border: editing ? 'none' : '1px solid rgba(226,232,240,0.8)',
                    boxShadow: editing ? '0 2px 8px rgba(37,99,235,0.25)' : 'none',
                  }}
                >
                  {editing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)', border: '1px solid #BFDBFE' }}>
                <Sparkles size={12} className="text-[#2563EB]" />
                <span className="text-[12px] font-bold text-[#2563EB]">Conv AI Pro</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mt-5 pt-5" style={{ borderTop: '1px solid rgba(226,232,240,0.6)' }}>
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-[18px] font-bold tracking-[-0.02em]" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-[11px] font-semibold text-[#0F172A] mt-0.5">{stat.label}</p>
                <p className="text-[10.5px] text-[#CBD5E1] mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {sections.map(section => (
          <div key={section.title} className="rounded-[20px] overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <p className="px-5 py-3 text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.08em]" style={{ borderBottom: '1px solid rgba(226,232,240,0.6)' }}>
              {section.title}
            </p>
            {section.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.995 }}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all hover:bg-[#F8FAFC] group"
                  style={{ borderTop: i > 0 ? '1px solid rgba(226,232,240,0.5)' : 'none' }}
                >
                  <div className="w-9 h-9 rounded-[11px] flex items-center justify-center flex-shrink-0" style={{ background: '#F1F5F9' }}>
                    <Icon size={16} className="text-[#64748B]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[13.5px] font-semibold text-[#0F172A]">{item.label}</p>
                      {'badge' in item && item.badge && (
                        <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#94A3B8] mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-[#CBD5E1] group-hover:text-[#94A3B8] transition-colors flex-shrink-0" />
                </motion.button>
              );
            })}
          </div>
        ))}

        <div className="rounded-[20px] p-5" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)' }}>
          <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.08em] mb-3">Danger Zone</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13.5px] font-semibold text-[#0F172A]">Delete Account</p>
              <p className="text-[12px] text-[#94A3B8] mt-0.5">Permanently remove your account and all data</p>
            </div>
            <button className="px-4 py-2 rounded-xl text-[13px] font-semibold text-red-500 transition-all hover:bg-red-50" style={{ border: '1px solid #FECACA' }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
