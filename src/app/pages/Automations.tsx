import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Zap, Plus, Play, Pause, Settings, CheckCircle2,
  Clock, ArrowRight, Mail, MessageSquare, FileText,
  Globe, Bot, AlertCircle, TrendingUp, ChevronRight
} from 'lucide-react';

const automations = [
  {
    id: 1, name: 'Email Triage', desc: 'Classify incoming emails and draft replies with AI', trigger: 'New email received', actions: ['Classify', 'Draft reply', 'Route to folder'], status: 'active', runs: 1240, lastRun: '2 min ago', icon: Mail, color: '#059669', bg: '#F0FDF4',
  },
  {
    id: 2, name: 'Slack Summary', desc: 'Daily digest of important Slack messages sent at 9 AM', trigger: 'Daily at 9:00 AM', actions: ['Fetch messages', 'Summarize', 'Post to #digest'], status: 'active', runs: 84, lastRun: '9 hrs ago', icon: MessageSquare, color: '#2563EB', bg: '#EFF6FF',
  },
  {
    id: 3, name: 'Document Ingestion', desc: 'Auto-analyze new Google Drive files and add to knowledge base', trigger: 'New file in Drive', actions: ['Download', 'Analyze', 'Add to KB'], status: 'active', runs: 312, lastRun: '30 min ago', icon: FileText, color: '#D97706', bg: '#FFFBEB',
  },
  {
    id: 4, name: 'Research Brief', desc: 'Weekly competitive intelligence report on specified topics', trigger: 'Every Monday 8 AM', actions: ['Web search', 'Summarize', 'Email report'], status: 'paused', runs: 18, lastRun: '7 days ago', icon: Globe, color: '#7C3AED', bg: '#F5F3FF',
  },
  {
    id: 5, name: 'Meeting Prep', desc: 'Generate agenda and briefing doc 1 hour before calendar events', trigger: '1hr before calendar event', actions: ['Fetch attendees', 'Research', 'Generate brief'], status: 'active', runs: 67, lastRun: '1 day ago', icon: Bot, color: '#0891B2', bg: '#ECFEFF',
  },
];

const templates = [
  { name: 'Support Ticket Responder', icon: MessageSquare, color: '#2563EB', trigger: 'New support ticket' },
  { name: 'News Monitor', icon: Globe, color: '#059669', trigger: 'Keyword mention' },
  { name: 'Content Publisher', icon: FileText, color: '#7C3AED', trigger: 'Schedule' },
  { name: 'Data Report Generator', icon: TrendingUp, color: '#D97706', trigger: 'Cron schedule' },
];

const statusConfig = {
  active: { label: 'Active', color: '#10B981', bg: '#F0FDF4' },
  paused: { label: 'Paused', color: '#94A3B8', bg: '#F8FAFC' },
  error: { label: 'Error', color: '#EF4444', bg: '#FEF2F2' },
};

export default function Automations() {
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [statuses, setStatuses] = useState<Record<number, string>>(
    Object.fromEntries(automations.map(a => [a.id, a.status]))
  );

  const toggleStatus = (id: number) => {
    setStatuses(prev => ({ ...prev, [id]: prev[id] === 'active' ? 'paused' : 'active' }));
  };

  const filtered = automations.filter(a => filter === 'all' || statuses[a.id] === filter);

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Automations</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">AI-powered workflows that run automatically</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[13.5px] font-semibold text-white" style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}>
            <Plus size={15} /> New Automation
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Runs', value: automations.reduce((s, a) => s + a.runs, 0).toLocaleString(), color: '#2563EB', bg: '#EFF6FF', icon: Zap },
            { label: 'Active', value: Object.values(statuses).filter(s => s === 'active').length.toString(), color: '#10B981', bg: '#F0FDF4', icon: CheckCircle2 },
            { label: 'Paused', value: Object.values(statuses).filter(s => s === 'paused').length.toString(), color: '#94A3B8', bg: '#F8FAFC', icon: Pause },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="p-4 rounded-[16px]" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] text-[#94A3B8]">{s.label}</p>
                  <div className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{ background: s.bg }}>
                    <Icon size={13} style={{ color: s.color }} />
                  </div>
                </div>
                <p className="text-[22px] font-bold text-[#0F172A]">{s.value}</p>
              </div>
            );
          })}
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(['all', 'active', 'paused'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-all capitalize"
              style={{ background: filter === f ? '#0F172A' : '#fff', color: filter === f ? '#fff' : '#64748B', border: `1px solid ${filter === f ? '#0F172A' : 'rgba(226,232,240,0.8)'}` }}
            >{f === 'all' ? 'All' : f}</button>
          ))}
        </div>

        {/* Automations */}
        <div className="space-y-3">
          {filtered.map((auto, i) => {
            const Icon = auto.icon;
            const currentStatus = statuses[auto.id];
            const st = statusConfig[currentStatus as keyof typeof statusConfig];
            return (
              <motion.div
                key={auto.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-5 rounded-[18px]"
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: auto.bg }}>
                    <Icon size={20} style={{ color: auto.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[15px] font-bold text-[#0F172A]">{auto.name}</p>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                    </div>
                    <p className="text-[13px] text-[#64748B] mb-3">{auto.desc}</p>

                    {/* Flow */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11.5px] font-semibold text-[#475569] px-2.5 py-1 rounded-[8px]" style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)' }}>
                        ⚡ {auto.trigger}
                      </span>
                      {auto.actions.map((action, ai) => (
                        <React.Fragment key={ai}>
                          <ArrowRight size={12} className="text-[#CBD5E1] flex-shrink-0" />
                          <span className="text-[11.5px] font-semibold text-[#475569] px-2.5 py-1 rounded-[8px]" style={{ background: '#F8FAFC', border: '1px solid rgba(226,232,240,0.8)' }}>
                            {action}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-[12px] text-[#94A3B8]">
                      <span className="flex items-center gap-1"><TrendingUp size={11} /> {auto.runs.toLocaleString()} runs</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {auto.lastRun}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="p-2 rounded-[10px] text-[#CBD5E1] hover:text-[#475569] hover:bg-[#F8FAFC] transition-all">
                      <Settings size={14} />
                    </button>
                    <button
                      onClick={() => toggleStatus(auto.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12.5px] font-semibold transition-all"
                      style={currentStatus === 'active'
                        ? { background: '#FEF2F2', color: '#EF4444' }
                        : { background: auto.bg, color: auto.color }
                      }
                    >
                      {currentStatus === 'active' ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Resume</>}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Templates */}
        <div>
          <p className="text-[15px] font-bold text-[#0F172A] mb-3">Start from template</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {templates.map((t, i) => {
              const Icon = t.icon;
              return (
                <button key={i} className="p-4 rounded-[16px] text-left transition-all hover:shadow-sm" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)' }}>
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3" style={{ background: t.color + '15' }}>
                    <Icon size={16} style={{ color: t.color }} />
                  </div>
                  <p className="text-[13px] font-bold text-[#0F172A] mb-0.5">{t.name}</p>
                  <p className="text-[11.5px] text-[#94A3B8]">{t.trigger}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
