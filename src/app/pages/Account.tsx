import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User, Mail, MapPin, Camera, Sparkles,
  Zap, Shield, Bell, KeyRound, CreditCard,
  ChevronRight, MessageSquare, Bot, Image, Star,
} from 'lucide-react';

const stats = [
  { label: 'Conversations',   value: '1,284',   sub: 'All time',   color: '#6366F1' },
  { label: 'Images Generated',value: '347',     sub: 'DALL·E 3',   color: '#06B6D4' },
  { label: 'Audio Generated', value: '5h 32m',  sub: 'TTS total',  color: '#10B981' },
  { label: 'Member Since',    value: 'Jan 2024', sub: '18 months',  color: '#F59E0B' },
];

const sections = [
  {
    title: 'Account',
    items: [
      { icon: User,     label: 'Personal Information', desc: 'Name, email, phone, photo'         },
      { icon: MapPin,   label: 'Location & Language',  desc: 'Timezone, region, language'         },
      { icon: Shield,   label: 'Security',             desc: '2FA, password, active sessions'     },
    ],
  },
  {
    title: 'AI Preferences',
    items: [
      { icon: Bot,          label: 'Default AI Model',  desc: 'Conv AI · Multimodal'           },
      { icon: MessageSquare,label: 'Chat Preferences',  desc: 'Response style, language'       },
      { icon: Bell,         label: 'Notifications',     desc: 'Email, push, in-app alerts'     },
    ],
  },
  {
    title: 'Subscription & Billing',
    items: [
      { icon: Zap,        label: 'Conv AI Pro',       desc: '$19/month · Renews Aug 22', badge: 'Active' },
      { icon: CreditCard, label: 'Payment Method',   desc: 'Visa ending in 4821'                 },
      { icon: Star,       label: 'Referral Program', desc: 'Earn free months by sharing'          },
    ],
  },
];

export default function Account() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#0A0C10' }}>
      <div className="max-w-3xl mx-auto p-6 space-y-5">

        {/* Profile hero */}
        <div className="rounded-2xl p-6" style={{ background: '#111318', border: '1px solid #1E222A' }}>
          <div className="flex items-start gap-5">
            <div className="relative flex-shrink-0">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-[22px] font-bold"
                style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}
              >
                A
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center bg-[#111318] text-[#6366F1] hover:bg-[#1A1D24] transition-all" style={{ border: '1.5px solid #6366F1' }}>
                <Camera size={11} />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[18px] font-semibold text-[#F8FAFC] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Alex Reed</h2>
                  <p className="text-[13px] text-[#475569] mt-0.5">alex@example.com</p>
                </div>
                <button
                  onClick={() => setEditing(!editing)}
                  className="px-4 py-2 rounded-xl text-[13px] font-semibold transition-all"
                  style={{
                    background: editing ? '#6366F1' : '#1A1D24',
                    color: editing ? '#fff' : '#94A3B8',
                    border: editing ? 'none' : '1px solid #1E222A',
                    boxShadow: editing ? '0 2px 8px rgba(99,102,241,0.3)' : 'none',
                  }}
                >
                  {editing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <Sparkles size={12} className="text-[#6366F1]" />
                <span className="text-[12px] font-semibold text-[#6366F1]">Conv AI Pro</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mt-5 pt-5" style={{ borderTop: '1px solid #1E222A' }}>
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-[18px] font-bold tracking-tight" style={{ color: stat.color, fontFamily: "'JetBrains Mono', monospace" }}>{stat.value}</p>
                <p className="text-[11px] font-semibold text-[#94A3B8] mt-0.5">{stat.label}</p>
                <p className="text-[10px] text-[#2E3440] mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {sections.map(section => (
          <div key={section.title} className="rounded-2xl overflow-hidden" style={{ background: '#111318', border: '1px solid #1E222A' }}>
            <p className="px-5 py-3 text-[11px] font-bold text-[#475569] uppercase tracking-widest" style={{ borderBottom: '1px solid #1E222A' }}>
              {section.title}
            </p>
            {section.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.995 }}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all hover:bg-[#1A1D24] group"
                  style={{ borderTop: i > 0 ? '1px solid #1E222A' : 'none' }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#1A1D24' }}>
                    <Icon size={15} className="text-[#475569]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-[#F8FAFC]">{item.label}</p>
                      {'badge' in item && item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#475569] mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight size={15} className="text-[#1E222A] group-hover:text-[#2E3440] transition-colors flex-shrink-0" />
                </motion.button>
              );
            })}
          </div>
        ))}

        <div className="rounded-2xl p-5" style={{ background: '#111318', border: '1px solid #1E222A' }}>
          <p className="text-[11px] font-bold text-[#475569] uppercase tracking-widest mb-3">Danger Zone</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-[#F8FAFC]">Delete Account</p>
              <p className="text-[12px] text-[#475569] mt-0.5">Permanently remove your account and all data</p>
            </div>
            <button className="px-4 py-2 rounded-xl text-[13px] font-semibold text-[#EF4444] transition-all hover:bg-[#EF4444]/10" style={{ border: '1px solid rgba(239,68,68,0.2)' }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
