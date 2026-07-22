import React, { useState } from 'react';
import { Sparkles, Moon, Globe, Bell, Shield, Palette, Database, Zap, ChevronRight, Toggle } from 'lucide-react';

const Toggle2 = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
    style={{ background: on ? '#2563EB' : '#E2E8F0' }}
  >
    <span
      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all"
      style={{ left: on ? '22px' : '2px' }}
    />
  </button>
);

const sections = [
  {
    title: 'AI & Model',
    icon: Sparkles,
    settings: [
      { label: 'Default Model', desc: 'AI model used for conversations', type: 'select', value: 'Snow Pro (GPT-4o)' },
      { label: 'Deep Analysis Mode', desc: 'Use extended reasoning for complex queries', type: 'toggle', value: false },
      { label: 'Streaming Responses', desc: 'Show AI responses as they generate', type: 'toggle', value: true },
      { label: 'Voice Responses', desc: 'Read AI responses aloud', type: 'toggle', value: false },
    ],
  },
  {
    title: 'Appearance',
    icon: Palette,
    settings: [
      { label: 'Theme', desc: 'Interface color scheme', type: 'select', value: 'Light' },
      { label: 'Font Size', desc: 'Text size throughout the app', type: 'select', value: 'Medium (14px)' },
      { label: 'Compact Mode', desc: 'Reduce spacing for more content', type: 'toggle', value: false },
      { label: 'Sidebar Collapsed', desc: 'Start with sidebar minimized', type: 'toggle', value: false },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { label: 'AI Insights', desc: 'Personalized financial recommendations', type: 'toggle', value: true },
      { label: 'Spending Alerts', desc: 'Notify when budget thresholds are hit', type: 'toggle', value: true },
      { label: 'Weekly Digest', desc: 'Sunday summary of your financial week', type: 'toggle', value: true },
      { label: 'Transaction Alerts', desc: 'Large or unusual transactions', type: 'toggle', value: false },
    ],
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    settings: [
      { label: 'Two-Factor Authentication', desc: 'Extra security for your account', type: 'toggle', value: true },
      { label: 'Data Analytics', desc: 'Share anonymized usage to improve Snow AI', type: 'toggle', value: false },
      { label: 'Chat History', desc: 'Save conversation history', type: 'toggle', value: true },
      { label: 'Biometric Login', desc: 'Use Face ID or fingerprint to sign in', type: 'toggle', value: false },
    ],
  },
  {
    title: 'Data & Integrations',
    icon: Database,
    settings: [
      { label: 'Auto-Sync Accounts', desc: 'Refresh connected bank data daily', type: 'toggle', value: true },
      { label: 'Export Format', desc: 'Default format for data exports', type: 'select', value: 'CSV' },
      { label: 'Currency', desc: 'Primary display currency', type: 'select', value: 'USD ($)' },
      { label: 'Timezone', desc: 'For transaction timestamps', type: 'select', value: 'Pacific Time (PT)' },
    ],
  },
];

export default function Settings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  const getToggleState = (section: string, label: string, defaultVal: boolean) => {
    const key = `${section}-${label}`;
    return key in toggles ? toggles[key] : defaultVal;
  };

  const flipToggle = (section: string, label: string, defaultVal: boolean) => {
    const key = `${section}-${label}`;
    setToggles(prev => ({ ...prev, [key]: !(key in prev ? prev[key] : defaultVal) }));
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Settings</h1>
          <p className="text-[14px] text-[#64748B] mt-0.5">Customize your Snow AI experience</p>
        </div>

        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="rounded-[16px] overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              {/* Section header */}
              <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: '#F8FAFC' }}>
                  <Icon size={15} className="text-[#64748B]" />
                </div>
                <p className="text-[14px] font-bold text-[#0F172A] tracking-[-0.01em]">{section.title}</p>
              </div>

              {/* Settings rows */}
              <div className="divide-y" style={{ divideColor: '#F8FAFC' }}>
                {section.settings.map((setting, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-5 py-4 hover:bg-[#FAFBFC] transition-colors"
                    style={{ borderBottom: i < section.settings.length - 1 ? '1px solid #F8FAFC' : 'none' }}
                  >
                    <div className="flex-1 pr-6">
                      <p className="text-[14px] font-semibold text-[#0F172A]">{setting.label}</p>
                      <p className="text-[12.5px] text-[#94A3B8] mt-0.5">{setting.desc}</p>
                    </div>
                    {setting.type === 'toggle' ? (
                      <Toggle2
                        on={getToggleState(section.title, setting.label, setting.value as boolean)}
                        onChange={() => flipToggle(section.title, setting.label, setting.value as boolean)}
                      />
                    ) : (
                      <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-all" style={{ border: '1px solid rgba(226,232,240,0.8)' }}>
                        {setting.value}
                        <ChevronRight size={13} className="text-[#CBD5E1]" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Danger zone */}
        <div className="rounded-[16px] overflow-hidden" style={{ background: '#fff', border: '1px solid #FECACA', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #FEF2F2' }}>
            <p className="text-[14px] font-bold text-[#EF4444] tracking-[-0.01em]">Danger Zone</p>
          </div>
          <div className="p-5 space-y-3">
            {['Clear chat history', 'Disconnect all accounts', 'Delete account'].map((action, i) => (
              <button key={i} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13.5px] font-semibold text-[#EF4444] hover:bg-[#FEF2F2] transition-all text-left" style={{ border: '1px solid #FECACA' }}>
                {action}
                <ChevronRight size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
