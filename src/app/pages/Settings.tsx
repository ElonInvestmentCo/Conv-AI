import React, { useState } from 'react';
import {
  RiSparklingLine,
  RiMoonLine,
  RiGlobalLine,
  RiBellLine,
  RiShieldLine,
  RiPaletteLine,
  RiDatabase2Line,
  RiCpuLine,
  RiArrowRightSLine,
  RiMessage3Line,
  RiMicLine,
  RiEyeLine,
  RiFlashlightLine,
} from '@remixicon/react';

const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
    style={{ background: on ? '#2563EB' : '#E2E8F0' }}
  >
    <span
      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200"
      style={{ left: on ? '22px' : '2px' }}
    />
  </button>
);

const sections = [
  {
    title: 'AI & Models',
    icon: RiSparklingLine,
    settings: [
      { label: 'Default Model', desc: 'AI model for new conversations', type: 'select', value: 'GPT-4o' },
      { label: 'Streaming Responses', desc: 'Display responses as they generate', type: 'toggle', value: true },
      { label: 'Deep Analysis Mode', desc: 'Use extended reasoning for complex queries', type: 'toggle', value: false },
      { label: 'Voice Responses', desc: 'Read AI responses aloud', type: 'toggle', value: false },
    ],
  },
  {
    title: 'Chat Behavior',
    icon: RiMessage3Line,
    settings: [
      { label: 'Auto-save Conversations', desc: 'Save all chats to history automatically', type: 'toggle', value: true },
      { label: 'Follow-up Suggestions', desc: 'Show suggested next prompts after responses', type: 'toggle', value: true },
      { label: 'Markdown Rendering', desc: 'Render bold, code, and formatting in responses', type: 'toggle', value: true },
      { label: 'Code Syntax Highlighting', desc: 'Highlight code blocks with language colors', type: 'toggle', value: true },
    ],
  },
  {
    title: 'Appearance',
    icon: RiPaletteLine,
    settings: [
      { label: 'Theme', desc: 'Interface color scheme', type: 'select', value: 'Light' },
      { label: 'Font Size', desc: 'Text size throughout the app', type: 'select', value: 'Medium (14px)' },
      { label: 'Compact Mode', desc: 'Reduce spacing for more content', type: 'toggle', value: false },
      { label: 'Sidebar Collapsed by Default', desc: 'Start with sidebar minimized', type: 'toggle', value: false },
    ],
  },
  {
    title: 'Voice',
    icon: RiMicLine,
    settings: [
      { label: 'Voice', desc: 'AI voice for spoken responses', type: 'select', value: 'Nova' },
      { label: 'Auto-detect Speech End', desc: 'Automatically send when you stop speaking', type: 'toggle', value: true },
      { label: 'Noise Cancellation', desc: 'Filter background noise during voice input', type: 'toggle', value: true },
    ],
  },
  {
    title: 'Notifications',
    icon: RiBellLine,
    settings: [
      { label: 'Agent Completion', desc: 'Notify when an agent finishes a task', type: 'toggle', value: true },
      { label: 'Automation Alerts', desc: 'Notify on automation errors or failures', type: 'toggle', value: true },
      { label: 'Weekly Usage Report', desc: 'Receive weekly AI usage summary by email', type: 'toggle', value: false },
      { label: 'New Features', desc: 'Get notified about Conv AI updates', type: 'toggle', value: true },
    ],
  },
  {
    title: 'Privacy & Security',
    icon: RiShieldLine,
    settings: [
      { label: 'Two-Factor Authentication', desc: 'Extra security for your account', type: 'toggle', value: true },
      { label: 'Conversation Privacy', desc: 'Exclude my data from model training', type: 'toggle', value: true },
      { label: 'Analytics Sharing', desc: 'Share anonymized usage to improve Conv AI', type: 'toggle', value: false },
      { label: 'Biometric Login', desc: 'Use Face ID or fingerprint to sign in', type: 'toggle', value: false },
    ],
  },
  {
    title: 'Data & Storage',
    icon: RiDatabase2Line,
    settings: [
      { label: 'Auto-delete History', desc: 'Automatically delete chats older than', type: 'select', value: 'Never' },
      { label: 'Export Format', desc: 'Default format for conversation exports', type: 'select', value: 'Markdown' },
      { label: 'Sync Across Devices', desc: 'Keep conversations in sync everywhere', type: 'toggle', value: true },
    ],
  },
];

export default function Settings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  const getToggle = (section: string, label: string, def: boolean) => {
    const key = `${section}-${label}`;
    return key in toggles ? toggles[key] : def;
  };

  const flip = (section: string, label: string, def: boolean) => {
    const key = `${section}-${label}`;
    setToggles(prev => ({ ...prev, [key]: !(key in prev ? prev[key] : def) }));
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Settings</h1>
          <p className="text-[14px] text-[#64748B] mt-0.5">Customize your Conv AI experience</p>
        </div>

        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="rounded-[16px] overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: '#F8FAFC' }}>
                  <Icon size={15} className="text-[#64748B]" />
                </div>
                <p className="text-[14px] font-bold text-[#0F172A] tracking-[-0.01em]">{section.title}</p>
              </div>
              <div>
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
                      <Toggle
                        on={getToggle(section.title, setting.label, setting.value as boolean)}
                        onChange={() => flip(section.title, setting.label, setting.value as boolean)}
                      />
                    ) : (
                      <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-all" style={{ border: '1px solid rgba(226,232,240,0.8)' }}>
                        {setting.value}
                        <RiArrowRightSLine size={14} className="text-[#CBD5E1]" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="rounded-[16px] overflow-hidden" style={{ background: '#fff', border: '1px solid #FECACA' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #FEF2F2' }}>
            <p className="text-[14px] font-bold text-[#EF4444]">Danger Zone</p>
          </div>
          <div className="p-5 space-y-3">
            {['Clear all conversation history', 'Revoke all API keys', 'Delete account'].map((action, i) => (
              <button key={i} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13.5px] font-semibold text-[#EF4444] hover:bg-[#FEF2F2] transition-all text-left" style={{ border: '1px solid #FECACA' }}>
                {action} <RiArrowRightSLine size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
