import React, { useState } from 'react';
import { useTheme, type Theme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings as SettingsIcon, Bell, User, Puzzle, Mic,
  CreditCard, Database, HardDrive, Shield,
  Lock, Users, Heart, UserCircle,
  Keyboard, ChevronRight, Plus, Info,
  FileText, Image, Grid3X3, Code2,
  Zap, Layers,
} from 'lucide-react';

// ── Conv AI dark brand tokens ─────────────────────────────────────────────────
const T = {
  bg:         '#111318',
  surface:    '#1A1D24',
  border:     '#1E222A',
  borderHov:  '#2E3440',
  text:       '#F8FAFC',
  muted:      '#94A3B8',
  subtle:     '#475569',
  accent:     '#6366F1',
  accentBg:   'rgba(99,102,241,0.1)',
  accentMid:  'rgba(99,102,241,0.25)',
  danger:     '#EF4444',
  dangerBg:   'rgba(239,68,68,0.1)',
  success:    '#10B981',
};

// ── Shared primitives ─────────────────────────────────────────────────────────
const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className="relative w-10 h-[22px] rounded-full transition-all duration-200 flex-shrink-0 focus:outline-none"
    style={{ background: on ? T.accent : '#2E3440' }}
  >
    <span
      className="absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-all duration-200"
      style={{ left: on ? '20px' : '2px' }}
    />
  </button>
);

const SettingRow = ({ label, desc, children, danger }: { label: string; desc?: string; children: React.ReactNode; danger?: boolean }) => (
  <div className="flex items-center justify-between py-3.5 gap-4" style={{ borderBottom: `1px solid ${T.border}` }}>
    <div className="min-w-0">
      <p className="text-[13px] font-medium leading-snug" style={{ color: danger ? T.danger : T.text }}>{label}</p>
      {desc && <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color: T.subtle }}>{desc}</p>}
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

const SettingRowLast = ({ label, desc, children, danger }: { label: string; desc?: string; children: React.ReactNode; danger?: boolean }) => (
  <div className="flex items-center justify-between py-3.5 gap-4">
    <div className="min-w-0">
      <p className="text-[13px] font-medium leading-snug" style={{ color: danger ? T.danger : T.text }}>{label}</p>
      {desc && <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color: T.subtle }}>{desc}</p>}
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

const Chip = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all hover:bg-opacity-90"
    style={{ border: `1px solid ${T.border}`, color: T.muted, background: T.surface }}
  >
    {label}
    <ChevronRight size={11} />
  </button>
);

const ActionBtn = ({ label, variant = 'default', onClick }: { label: string; variant?: 'default' | 'danger' | 'primary'; onClick?: () => void }) => {
  const styles = {
    default: { bg: T.surface,   color: T.muted,   border: T.border        },
    danger:  { bg: T.dangerBg,  color: T.danger,  border: 'rgba(239,68,68,0.2)' },
    primary: { bg: T.accentBg,  color: T.accent,  border: T.accentMid     },
  }[variant];
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all hover:opacity-80"
      style={{ background: styles.bg, color: styles.color, border: `1px solid ${styles.border}` }}
    >
      {label}
    </button>
  );
};

const Select = ({ value, options, onChange }: { value: string; options: string[]; onChange?: (v: string) => void }) => (
  <select
    value={value}
    onChange={e => onChange?.(e.target.value)}
    className="text-[12px] font-medium px-3 py-1.5 rounded-lg appearance-none cursor-pointer outline-none transition-all"
    style={{ border: `1px solid ${T.border}`, color: T.muted, background: T.surface }}
  >
    {options.map(o => <option key={o}>{o}</option>)}
  </select>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-bold uppercase tracking-widest mb-1 mt-5 first:mt-0" style={{ color: T.subtle }}>{children}</p>
);

// ── Panel components ──────────────────────────────────────────────────────────

// Map display label ↔ theme token
const LABEL_TO_THEME: Record<string, Theme> = { Dark: 'dark', Light: 'light', System: 'system' };
const THEME_TO_LABEL: Record<Theme, string>  = { dark: 'Dark', light: 'Light', system: 'System' };

function GeneralPanel() {
  const [mfaDismissed, setMfaDismissed] = useState(false);
  const [intelligence, setIntelligence] = useState(true);
  const [dictation, setDictation]       = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {!mfaDismissed && (
        <div className="flex items-start gap-3 p-4 rounded-xl mb-5" style={{ background: T.accentBg, border: `1px solid ${T.accentMid}` }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: T.accent }}>
            <Shield size={15} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold" style={{ color: T.text }}>Secure your account</p>
            <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color: T.muted }}>
              Add multi-factor authentication (MFA), like a text message or authenticator app, to help protect your account.
            </p>
            <button className="mt-2.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold text-white transition-all" style={{ background: T.accent }}>Set up MFA</button>
          </div>
          <button onClick={() => setMfaDismissed(true)} className="transition-colors p-0.5" style={{ color: T.subtle }}>✕</button>
        </div>
      )}
      <SettingRow label="Appearance" desc="Interface color scheme">
        <Select
          value={THEME_TO_LABEL[theme] ?? 'Dark'}
          options={['Dark', 'Light', 'System']}
          onChange={label => setTheme(LABEL_TO_THEME[label] ?? 'dark')}
        />
      </SettingRow>
      <SettingRow label="Contrast">
        <Select value="System" options={['System', 'Standard', 'High']} />
      </SettingRow>
      <SettingRow label="Accent color">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border" style={{ background: T.accent, borderColor: T.accentMid }} />
          <Select value="Indigo" options={['Indigo', 'Blue', 'Violet', 'Cyan', 'Rose']} />
        </div>
      </SettingRow>
      <SettingRow label="Language">
        <Select value="Auto-detect" options={['Auto-detect', 'English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese']} />
      </SettingRow>
      <SettingRow label="Higher intelligence" desc="Automatically use a higher intelligence setting when you ask a complex question.">
        <Toggle on={intelligence} onChange={() => setIntelligence(!intelligence)} />
      </SettingRow>
      <SettingRowLast label="Enable Dictation" desc="Use voice input to type messages hands-free.">
        <Toggle on={dictation} onChange={() => setDictation(!dictation)} />
      </SettingRowLast>
    </div>
  );
}

function NotificationsPanel() {
  const notifItems = [
    { key: 'codex',      label: 'Codex',             desc: 'Get notified about Codex tasks.',                                              value: 'Push'        },
    { key: 'group',      label: 'Group chats',        desc: "You'll receive notifications for new messages in group chats.",               value: 'Push'        },
    { key: 'marketing',  label: 'Marketing',          desc: 'Stay in the loop on new tools and features.',                                 value: 'Push, Email' },
    { key: 'tips',       label: 'Personalized tips',  desc: 'Get helpful recommendations based on your conversations.',                   value: 'Push, Email' },
    { key: 'projects',   label: 'Projects',           desc: 'Get notified when you receive an email invitation to a shared project.',      value: 'Email'       },
    { key: 'responses',  label: 'Responses',          desc: 'Get notified when responses to requests are ready.',                         value: 'Push'        },
    { key: 'tasks',      label: 'Tasks',              desc: "Get notified when tasks you've created have updates.",                       value: 'Push, Email' },
  ];
  return (
    <div>
      {notifItems.map((item, i) => {
        const isLast = i === notifItems.length - 1;
        const Row = isLast ? SettingRowLast : SettingRow;
        return <Row key={item.key} label={item.label} desc={item.desc}><Chip label={item.value} /></Row>;
      })}
    </div>
  );
}

function PersonalizationPanel() {
  const [fastAnswers, setFastAnswers] = useState(true);
  const [memory, setMemory]           = useState(true);
  const chars = ['Warm', 'Enthusiastic', 'Headers & Lists', 'Emoji'];
  return (
    <div>
      <SettingRow label="Base style and tone" desc="Set the style and tone of how Conv AI responds to you.">
        <Select value="Default" options={['Default', 'Concise', 'Detailed', 'Casual', 'Professional']} />
      </SettingRow>
      <div className="py-3.5" style={{ borderBottom: `1px solid ${T.border}` }}>
        <p className="text-[13px] font-medium" style={{ color: T.text }}>Characteristics</p>
        <p className="text-[12px] mt-0.5" style={{ color: T.subtle }}>Choose additional customizations on top of your base style and tone.</p>
        <div className="mt-3 space-y-2.5">
          {chars.map(c => (
            <div key={c} className="flex items-center justify-between">
              <span className="text-[13px]" style={{ color: T.text }}>{c}</span>
              <Select value="Default" options={['Default', 'On', 'Off']} />
            </div>
          ))}
        </div>
      </div>
      <SettingRow label="Fast answers" desc="Conv AI can sometimes use its general knowledge to give fast, in-depth answers.">
        <Toggle on={fastAnswers} onChange={() => setFastAnswers(!fastAnswers)} />
      </SettingRow>
      <div className="py-3.5" style={{ borderBottom: `1px solid ${T.border}` }}>
        <p className="text-[13px] font-medium" style={{ color: T.text }}>Custom instructions</p>
        <textarea
          placeholder="Additional behavior, style, and tone preferences"
          rows={3}
          className="mt-2 w-full px-3.5 py-3 text-[13px] rounded-xl outline-none resize-none transition-all"
          style={{ border: `1px solid ${T.border}`, color: T.muted, background: T.surface }}
          onFocus={e => { e.target.style.borderColor = T.accent; }}
          onBlur={e => { e.target.style.borderColor = T.border; }}
        />
      </div>
      <SettingRow label="About you" desc="Help Conv AI personalize responses by sharing information about yourself.">
        <Chip label="Manage" />
      </SettingRow>
      <SettingRowLast label="Memory" desc="Conv AI will remember things from your conversations to personalize your experience.">
        <Toggle on={memory} onChange={() => setMemory(!memory)} />
      </SettingRowLast>
    </div>
  );
}

function PluginsPanel() {
  const pluginList = [
    { icon: FileText, label: 'Default templates', color: '#F59E0B' },
    { icon: FileText, label: 'Documents',          color: '#6366F1' },
    { icon: FileText, label: 'PDF',                color: '#EF4444' },
    { icon: Layers,   label: 'Presentations',      color: '#F59E0B' },
    { icon: FileText, label: 'Spreadsheets',       color: '#10B981' },
  ];
  return (
    <div>
      <div className="py-3.5" style={{ borderBottom: `1px solid ${T.border}` }}>
        <p className="text-[13px] font-semibold" style={{ color: T.text }}>Permissions</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-[12px]" style={{ color: T.subtle }}>Choose when Conv AI should ask for permission when using plugins.</p>
          <button className="flex items-center gap-1 text-[12px] font-medium flex-shrink-0 ml-3" style={{ color: T.accent }}>
            Allow low-risk actions <ChevronRight size={11} />
          </button>
        </div>
      </div>
      {pluginList.map((p, i) => {
        const Icon = p.icon;
        const isLast = i === pluginList.length - 1;
        return (
          <div key={p.label} className="flex items-center justify-between py-3.5 gap-4" style={{ borderBottom: isLast ? 'none' : `1px solid ${T.border}` }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${p.color}15` }}>
                <Icon size={14} style={{ color: p.color }} />
              </div>
              <span className="text-[13px] font-medium" style={{ color: T.text }}>{p.label}</span>
            </div>
            <ChevronRight size={14} style={{ color: T.subtle }} />
          </div>
        );
      })}
      <div className="flex items-center justify-between py-3.5" style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: T.surface }}>
            <Grid3X3 size={14} style={{ color: T.subtle }} />
          </div>
          <span className="text-[13px] font-medium" style={{ color: T.text }}>Browse plugins</span>
        </div>
        <ChevronRight size={14} style={{ color: T.subtle }} />
      </div>
    </div>
  );
}

const voiceList = [
  { name: 'Alloy',   desc: 'Neutral and balanced'   },
  { name: 'Echo',    desc: 'Warm and natural'        },
  { name: 'Fable',   desc: 'Expressive and dynamic'  },
  { name: 'Juniper', desc: 'Open and upbeat'         },
  { name: 'Nova',    desc: 'Bright and conversational'},
  { name: 'Onyx',    desc: 'Deep and authoritative'  },
  { name: 'Sage',    desc: 'Calm and thoughtful'     },
  { name: 'Shimmer', desc: 'Clear and precise'       },
  { name: 'Verse',   desc: 'Rich and nuanced'        },
];

const voiceColors = [
  'linear-gradient(135deg,#6366f1,#818cf8)',
  'linear-gradient(135deg,#3b82f6,#06b6d4)',
  'linear-gradient(135deg,#f59e0b,#ef4444)',
  'linear-gradient(135deg,#8b5cf6,#a3e635)',
  'linear-gradient(135deg,#ec4899,#f97316)',
  'linear-gradient(135deg,#1e293b,#475569)',
  'linear-gradient(135deg,#10b981,#3b82f6)',
  'linear-gradient(135deg,#f472b6,#a855f7)',
  'linear-gradient(135deg,#fbbf24,#84cc16)',
];

function VoicePanel() {
  const [activeVoice, setActiveVoice] = useState(3);
  return (
    <div>
      <div className="pt-1 pb-5" style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="flex items-center gap-3 overflow-x-auto pb-1 -mx-0.5 px-0.5">
          {voiceList.map((v, i) => (
            <button key={v.name} onClick={() => setActiveVoice(i)} className="flex-shrink-0 flex flex-col items-center gap-2 group">
              <div
                className="w-14 h-14 rounded-full transition-all"
                style={{
                  background: voiceColors[i % voiceColors.length],
                  boxShadow: activeVoice === i ? `0 0 0 3px ${T.accentMid}, 0 0 0 5px ${T.accent}` : '0 2px 8px rgba(0,0,0,0.5)',
                  transform: activeVoice === i ? 'scale(1.08)' : 'scale(1)',
                }}
              />
              <div className="text-center">
                <p className="text-[12px] font-semibold" style={{ color: activeVoice === i ? T.accent : T.text }}>{v.name}</p>
                <p className="text-[11px]" style={{ color: T.subtle }}>{v.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 justify-center mt-3">
          {voiceList.map((_, i) => (
            <button key={i} onClick={() => setActiveVoice(i)} className="w-1.5 h-1.5 rounded-full transition-all" style={{ background: i === activeVoice ? T.accent : T.border }} />
          ))}
        </div>
      </div>
      <SettingRow label="Model">
        <Select value="Live" options={['Live', 'Advanced', 'Standard']} />
      </SettingRow>
      <SettingRowLast label="Language">
        <Select value="Auto-detect" options={['Auto-detect', 'English', 'Spanish', 'French', 'German', 'Japanese']} />
      </SettingRowLast>
    </div>
  );
}

function BillingPanel() {
  return (
    <div>
      <div className="rounded-xl p-4 mb-0" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: T.accent }}>
                <Zap size={13} className="text-white" />
              </div>
              <p className="text-[15px] font-semibold" style={{ color: T.text }}>Conv AI Free</p>
            </div>
            <p className="text-[12px] mt-1 ml-9" style={{ color: T.muted }}>Intelligence for everyday tasks</p>
          </div>
          <button className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold text-white" style={{ background: T.accent }}>Upgrade</button>
        </div>
      </div>
      <div className="pt-4 mt-4" style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[14px] font-semibold" style={{ color: T.text }}>Billing information</p>
          <ActionBtn label="Edit" />
        </div>
        <div className="py-3" style={{ borderBottom: `1px solid ${T.border}` }}>
          <p className="text-[11px] font-medium uppercase tracking-wide mb-1" style={{ color: T.subtle }}>Billing email</p>
          <p className="text-[13px]" style={{ color: T.text }}>alex@convai.com</p>
        </div>
        <div className="py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide mb-1" style={{ color: T.subtle }}>Next billing date</p>
          <p className="text-[13px]" style={{ color: T.muted }}>No active subscription</p>
        </div>
      </div>
    </div>
  );
}

function DataControlsPanel() {
  const [location, setLocation] = useState(false);
  const [improve, setImprove]   = useState(true);
  return (
    <div>
      <SettingRow label="Improve the model for everyone" desc="Allow your data to help improve Conv AI models for all users.">
        <Toggle on={improve} onChange={() => setImprove(!improve)} />
      </SettingRow>
      <SettingRow label="Location" desc="When enabled, your location helps Conv AI provide more relevant information.">
        <ActionBtn label={location ? 'Turn off' : 'Turn on'} onClick={() => setLocation(!location)} />
      </SettingRow>
      <SettingRow label="Shared links"><ActionBtn label="Manage" /></SettingRow>
      <SettingRow label="Archived chats"><ActionBtn label="Manage" /></SettingRow>
      <SettingRow label="Archive all chats"><ActionBtn label="Archive all" /></SettingRow>
      <SettingRow label="Delete all chats" desc="Permanently removes all conversations. This cannot be undone.">
        <ActionBtn label="Delete all" variant="danger" />
      </SettingRow>
      <SettingRow label="Export data" desc="Download a copy of your data including conversations.">
        <ActionBtn label="Export" />
      </SettingRow>
      <SettingRowLast label="Marketing privacy">
        <button className="flex items-center gap-1 text-[12px] font-medium" style={{ color: T.muted }}>Manage <ChevronRight size={11} /></button>
      </SettingRowLast>
    </div>
  );
}

function StoragePanel() {
  const used = 243, total = 512;
  const pct  = (used / total) * 100;
  return (
    <div>
      <div className="py-4" style={{ borderBottom: `1px solid ${T.border}` }}>
        <p className="text-[13px] font-semibold mb-3" style={{ color: T.text }}>{used} MB of {total} MB used</p>
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: T.surface }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#6366F1,#06B6D4)' }} />
        </div>
        <p className="text-[12px] mt-2" style={{ color: T.muted }}>{total - used} MB remaining</p>
      </div>
      <div className="flex items-center justify-between py-3.5 cursor-pointer group" style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: T.accentBg }}>
            <FileText size={15} style={{ color: T.accent }} />
          </div>
          <div>
            <p className="text-[13px] font-medium" style={{ color: T.text }}>Files</p>
            <p className="text-[12px]" style={{ color: T.subtle }}>140 MB · 44 files</p>
          </div>
        </div>
        <ChevronRight size={14} style={{ color: T.subtle }} />
      </div>
      <div className="flex items-center justify-between py-3.5 cursor-pointer group">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,182,212,0.1)' }}>
            <Image size={15} style={{ color: '#06B6D4' }} />
          </div>
          <div>
            <p className="text-[13px] font-medium" style={{ color: T.text }}>Images</p>
            <p className="text-[12px]" style={{ color: T.subtle }}>102 MB · 275 images</p>
          </div>
        </div>
        <ChevronRight size={14} style={{ color: T.subtle }} />
      </div>
    </div>
  );
}

function SafetyPanel() {
  const [sensitive, setSensitive] = useState(false);
  return (
    <div>
      <SettingRowLast label="Reduce sensitive content" desc="Add extra safeguards around sensitive topics and limit certain types of content in Conv AI.">
        <Toggle on={sensitive} onChange={() => setSensitive(!sensitive)} />
      </SettingRowLast>
    </div>
  );
}

function SecurityPanel() {
  const [mfa, setMfa]         = useState(false);
  const [passkey, setPasskey] = useState(false);
  return (
    <div>
      <SettingRow label="Password"><ActionBtn label="Add →" /></SettingRow>
      <div className="py-3.5" style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] font-medium" style={{ color: T.text }}>Security keys &amp; passkeys</p>
            <p className="text-[12px] mt-0.5" style={{ color: T.subtle }}>Use hardware security keys or passkeys to sign in. These phishing-resistant methods provide stronger protection.</p>
          </div>
          <ActionBtn label="Add →" />
        </div>
      </div>
      <div className="pt-4 pb-2">
        <p className="text-[14px] font-semibold" style={{ color: T.text }}>Multi-factor authentication (MFA)</p>
      </div>
      <SettingRow label="Authenticator app" desc="Use one-time codes from an authenticator app.">
        <Toggle on={mfa} onChange={() => setMfa(!mfa)} />
      </SettingRow>
      <div className="pt-4 pb-2" style={{ borderTop: `1px solid ${T.border}`, marginTop: '0.5rem' }}>
        <p className="text-[14px] font-semibold" style={{ color: T.text }}>Sessions</p>
      </div>
      <SettingRow label="Active sessions" desc="View all devices that have accessed your account.">
        <button className="flex items-center gap-1 text-[12px] font-medium" style={{ color: T.muted }}>
          2 <ChevronRight size={11} />
        </button>
      </SettingRow>
      <div className="pt-4 pb-2" style={{ borderTop: `1px solid ${T.border}`, marginTop: '0.5rem' }}>
        <p className="text-[14px] font-semibold" style={{ color: T.text }}>Advanced security</p>
      </div>
      <SettingRowLast label="Advanced account security" desc="Adds the highest level of account security by requiring stronger sign-in methods.">
        <ActionBtn label="Enroll →" />
      </SettingRowLast>
    </div>
  );
}

function ParentalPanel() {
  return (
    <div>
      <div className="py-3 rounded-xl p-4 mb-1" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        <p className="text-[13px] leading-relaxed" style={{ color: T.muted }}>
          Parents and teens can link accounts, giving parents tools to adjust certain features.{' '}
          <button className="font-medium underline" style={{ color: T.accent }}>Learn more</button>
        </p>
      </div>
      <div className="pt-4">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all hover:opacity-90 w-full justify-center" style={{ border: `1.5px dashed ${T.border}`, color: T.subtle }}>
          <Plus size={14} />
          Add family member
        </button>
      </div>
    </div>
  );
}

function TrustedContactPanel() {
  return (
    <div>
      <div className="py-3 rounded-xl p-4 mb-4" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        <p className="text-[13px] font-semibold mb-1" style={{ color: T.text }}>Having a trusted contact can make it easier to get support from someone who knows you well.</p>
        <p className="text-[12px] leading-relaxed mt-2" style={{ color: T.muted }}>
          In the future, if you discuss a serious safety concern, we may automatically notify your trusted contact.{' '}
          <button className="font-medium underline" style={{ color: T.accent }}>Learn more</button>
        </p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all hover:opacity-90 w-full justify-center" style={{ border: `1.5px dashed ${T.border}`, color: T.subtle }}>
        <Plus size={14} />
        Add contact
      </button>
    </div>
  );
}

function AccountPanel() {
  return (
    <div>
      <SettingRow label="Name">
        <span className="text-[13px] font-medium" style={{ color: T.muted }}>Alex Reed</span>
      </SettingRow>
      <SettingRow label="Username">
        <button className="flex items-center gap-1 text-[13px] font-medium" style={{ color: T.muted }}>
          @alexreed <ChevronRight size={11} />
        </button>
      </SettingRow>
      <SettingRow label="Email">
        <button className="flex items-center gap-1 text-[13px] font-medium" style={{ color: T.muted }}>
          alex@convai.com <ChevronRight size={11} />
        </button>
      </SettingRow>
      <SettingRowLast label="Delete account" danger>
        <ActionBtn label="Delete" variant="danger" />
      </SettingRowLast>

      <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${T.border}` }}>
        <p className="text-[14px] font-semibold mb-1" style={{ color: T.text }}>Builder profile</p>
        <p className="text-[12px] mb-4" style={{ color: T.muted }}>
          Personalize your builder profile to connect with users of your agents. These settings apply to publicly shared agents.
        </p>
        <div className="rounded-xl p-4 flex items-start justify-between" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366F1,#06B6D4)' }}>
              <Zap size={17} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-semibold" style={{ color: T.text }}>PlaceholderAgent</p>
              <p className="text-[11px]" style={{ color: T.subtle }}>By community builder</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: T.subtle }}>Preview</span>
        </div>
        <div className="flex items-start gap-3 mt-3 p-3.5 rounded-xl" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <Info size={14} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <p className="text-[12px]" style={{ color: '#D97706' }}>
            Complete verification to publish agents to everyone. Verify your identity by adding billing details or verifying your phone number.
          </p>
        </div>
      </div>
    </div>
  );
}

const shortcuts = [
  { label: 'Open new chat',           keys: 'Ctrl + Shift + O', on: true },
  { label: 'Show shortcuts',          keys: 'Ctrl + /',         on: true },
  { label: 'Search',                  keys: 'Ctrl + K',         on: true },
  { label: 'Toggle dev mode',         keys: 'Ctrl + .',         on: true },
  { label: 'Toggle sidebar',          keys: 'Ctrl + Shift + S', on: true },
  { label: 'Set custom instructions', keys: 'Ctrl + Shift + I', on: true },
  { label: 'Copy last code block',    keys: 'Ctrl + Shift + ;', on: true },
  { label: 'Delete chat',             keys: 'Ctrl + Shift + ⌫', on: true },
];

function KeyboardPanel() {
  const [states, setStates] = useState(shortcuts.map(s => s.on));
  const toggle = (i: number) => setStates(prev => prev.map((v, idx) => idx === i ? !v : v));
  return (
    <div>
      <p className="text-[12px] pb-4" style={{ color: T.muted, borderBottom: `1px solid ${T.border}` }}>
        To change a shortcut, select the key combination, and then type the new keys.
      </p>
      <p className="text-[11px] font-bold uppercase tracking-widest mt-4 mb-2" style={{ color: T.subtle }}>App</p>
      <div className="space-y-0">
        {shortcuts.map((s, i) => (
          <div key={s.label} className="flex items-center justify-between py-3" style={{ borderBottom: i < shortcuts.length - 1 ? `1px solid ${T.border}` : 'none' }}>
            <div className="flex items-center gap-3">
              <Toggle on={states[i]} onChange={() => toggle(i)} />
              <span className="text-[13px] font-medium" style={{ color: T.text }}>{s.label}</span>
            </div>
            <span className="text-[12px] font-medium px-2.5 py-1 rounded-md" style={{ background: T.surface, color: T.muted, border: `1px solid ${T.border}`, fontFamily: "'JetBrains Mono', monospace" }}>
              {s.keys}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <ActionBtn label="Restore defaults" />
      </div>
    </div>
  );
}

// ── Nav config ────────────────────────────────────────────────────────────────
const navItems = [
  { id: 'general',         label: 'General',            icon: SettingsIcon, panel: GeneralPanel         },
  { id: 'notifications',   label: 'Notifications',      icon: Bell,         panel: NotificationsPanel   },
  { id: 'personalization', label: 'Personalization',    icon: User,         panel: PersonalizationPanel },
  { id: 'plugins',         label: 'Plugins',            icon: Puzzle,       panel: PluginsPanel         },
  { id: 'voice',           label: 'Voice',              icon: Mic,          panel: VoicePanel           },
  { id: 'billing',         label: 'Billing',            icon: CreditCard,   panel: BillingPanel         },
  { id: 'data-controls',   label: 'Data controls',      icon: Database,     panel: DataControlsPanel    },
  { id: 'storage',         label: 'Storage',            icon: HardDrive,    panel: StoragePanel         },
  { id: 'safety',          label: 'Safety',             icon: Shield,       panel: SafetyPanel          },
  { id: 'security',        label: 'Security and login', icon: Lock,         panel: SecurityPanel        },
  { id: 'parental',        label: 'Parental controls',  icon: Users,        panel: ParentalPanel        },
  { id: 'trusted',         label: 'Trusted contact',    icon: Heart,        panel: TrustedContactPanel  },
  { id: 'account',         label: 'Account',            icon: UserCircle,   panel: AccountPanel         },
  { id: 'keyboard',        label: 'Keyboard',           icon: Keyboard,     panel: KeyboardPanel        },
];

// ── Main Settings page ────────────────────────────────────────────────────────
export default function Settings() {
  const [active, setActive] = useState('general');
  const current = navItems.find(n => n.id === active)!;
  const PanelComponent = current.panel;

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#0A0C10' }}>
      <div className="max-w-5xl mx-auto p-6">
        <div
          className="flex rounded-2xl overflow-hidden"
          style={{ background: T.bg, boxShadow: '0 4px 24px rgba(0,0,0,0.5)', border: `1px solid ${T.border}`, minHeight: '600px' }}
        >
          {/* Left navigation */}
          <aside className="w-52 flex-shrink-0 py-4" style={{ background: '#0A0C10', borderRight: `1px solid ${T.border}` }}>
            <div className="px-3 mb-3">
              <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: T.subtle }}>Settings</p>
            </div>
            <nav className="space-y-0.5 px-2">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = item.id === active;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all text-left"
                    style={{
                      background: isActive ? T.accentBg : 'transparent',
                      color: isActive ? T.accent : T.subtle,
                    }}
                  >
                    <Icon size={13} style={{ color: isActive ? T.accent : T.subtle, flexShrink: 0 }} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right content */}
          <div className="flex-1 min-w-0 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                <h2 className="text-[18px] font-semibold mb-5" style={{ color: T.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{current.label}</h2>
                <PanelComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
