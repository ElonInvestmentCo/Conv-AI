import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NavLink } from 'react-router';
import {
  Bot, Plus, Play, Pause, Settings, MoreHorizontal,
  Globe, Search, FileText, Mail, Code, Zap, Clock,
  CheckCircle2, AlertCircle, ArrowRight, ChevronRight,
  TrendingUp, MessageSquare, Layers
} from 'lucide-react';

const agents = [
  {
    id: 1, name: 'Research Assistant', desc: 'Browses the web, reads papers, and synthesizes comprehensive research reports on any topic.',
    icon: Search, color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE',
    status: 'active', runs: 142, successRate: 98, lastRun: '5 min ago',
    tools: ['Web Browse', 'PDF Reader', 'Summarizer'],
  },
  {
    id: 2, name: 'Code Review Agent', desc: 'Reviews pull requests, suggests improvements, checks for security issues, and generates test cases.',
    icon: Code, color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE',
    status: 'active', runs: 87, successRate: 96, lastRun: '2 hrs ago',
    tools: ['GitHub', 'Code Analyzer', 'Test Generator'],
  },
  {
    id: 3, name: 'Email Drafter', desc: 'Reads your email context and drafts professional, personalized responses with appropriate tone.',
    icon: Mail, color: '#059669', bg: '#F0FDF4', border: '#BBF7D0',
    status: 'paused', runs: 234, successRate: 99, lastRun: '1 day ago',
    tools: ['Gmail', 'Calendar', 'CRM'],
  },
  {
    id: 4, name: 'Document Analyst', desc: 'Processes uploaded PDFs, extracts key information, and generates structured summaries with action items.',
    icon: FileText, color: '#D97706', bg: '#FFFBEB', border: '#FDE68A',
    status: 'active', runs: 56, successRate: 94, lastRun: '30 min ago',
    tools: ['PDF Parser', 'OCR', 'Extractor'],
  },
  {
    id: 5, name: 'Web Scraper', desc: 'Extracts and structures data from websites, monitors for changes, and alerts on updates.',
    icon: Globe, color: '#0891B2', bg: '#ECFEFF', border: '#A5F3FC',
    status: 'error', runs: 19, successRate: 78, lastRun: '2 hrs ago',
    tools: ['Browser', 'Parser', 'Storage'],
  },
];

const templates = [
  { name: 'Customer Support', icon: MessageSquare, color: '#2563EB', desc: 'Handle support tickets automatically' },
  { name: 'Data Pipeline', icon: Layers, color: '#7C3AED', desc: 'Extract, transform, load data' },
  { name: 'Content Writer', icon: FileText, color: '#059669', desc: 'Generate and publish content' },
  { name: 'Workflow Trigger', icon: Zap, color: '#D97706', desc: 'Automate multi-step processes' },
];

const statusConfig = {
  active: { label: 'Active', color: '#10B981', bg: '#F0FDF4' },
  paused: { label: 'Paused', color: '#94A3B8', bg: '#F8FAFC' },
  error: { label: 'Error', color: '#EF4444', bg: '#FEF2F2' },
};

export default function Agents() {
  const [filter, setFilter] = useState<'all' | 'active' | 'paused' | 'error'>('all');

  const filtered = agents.filter(a => filter === 'all' || a.status === filter);

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">AI Agents</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">Autonomous agents that work for you 24/7</p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[13.5px] font-semibold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}
          >
            <Plus size={15} /> New Agent
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Agents', value: agents.length.toString(), icon: Bot, color: '#2563EB', bg: '#EFF6FF' },
            { label: 'Active', value: agents.filter(a => a.status === 'active').length.toString(), icon: CheckCircle2, color: '#10B981', bg: '#F0FDF4' },
            { label: 'Total Runs', value: agents.reduce((s, a) => s + a.runs, 0).toString(), icon: TrendingUp, color: '#7C3AED', bg: '#F5F3FF' },
            { label: 'Avg Success', value: Math.round(agents.reduce((s, a) => s + a.successRate, 0) / agents.length) + '%', icon: Zap, color: '#D97706', bg: '#FFFBEB' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-4 rounded-[16px]"
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] text-[#94A3B8] font-medium">{s.label}</p>
                  <div className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{ background: s.bg }}>
                    <Icon size={13} style={{ color: s.color }} />
                  </div>
                </div>
                <p className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">{s.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(['all', 'active', 'paused', 'error'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-all capitalize"
              style={{
                background: filter === f ? '#0F172A' : '#fff',
                color: filter === f ? '#fff' : '#64748B',
                border: `1px solid ${filter === f ? '#0F172A' : 'rgba(226,232,240,0.8)'}`,
              }}
            >
              {f === 'all' ? 'All agents' : f}
            </button>
          ))}
        </div>

        {/* Agent cards */}
        <div className="space-y-3">
          {filtered.map((agent, i) => {
            const Icon = agent.icon;
            const st = statusConfig[agent.status as keyof typeof statusConfig];
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-5 rounded-[18px]"
                style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: agent.bg, border: `1px solid ${agent.border}` }}>
                    <Icon size={20} style={{ color: agent.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-[15px] font-bold text-[#0F172A]">{agent.name}</p>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: st.bg, color: st.color }}>
                        {st.label}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#64748B] leading-snug mb-3">{agent.desc}</p>
                    <div className="flex items-center gap-4 text-[12px] text-[#94A3B8]">
                      <span className="flex items-center gap-1"><TrendingUp size={11} /> {agent.runs} runs</span>
                      <span className="flex items-center gap-1"><CheckCircle2 size={11} className="text-emerald-500" /> {agent.successRate}% success</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {agent.lastRun}</span>
                    </div>
                    <div className="flex gap-1.5 mt-3">
                      {agent.tools.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F8FAFC] text-[#64748B]" style={{ border: '1px solid rgba(226,232,240,0.8)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="p-2 rounded-[10px] text-[#94A3B8] hover:text-[#475569] hover:bg-[#F8FAFC] transition-all" title="Settings">
                      <Settings size={15} />
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[13px] font-semibold transition-all"
                      style={agent.status === 'active'
                        ? { background: '#FEF2F2', color: '#EF4444' }
                        : { background: agent.bg, color: agent.color }
                      }
                    >
                      {agent.status === 'active' ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Run</>}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Templates */}
        <div>
          <p className="text-[15px] font-bold text-[#0F172A] mb-3">Start from a template</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {templates.map((t, i) => {
              const Icon = t.icon;
              return (
                <button
                  key={i}
                  className="p-4 rounded-[16px] text-left transition-all hover:shadow-md"
                  style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
                >
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3" style={{ background: t.color + '15' }}>
                    <Icon size={16} style={{ color: t.color }} />
                  </div>
                  <p className="text-[13.5px] font-semibold text-[#0F172A] mb-0.5">{t.name}</p>
                  <p className="text-[12px] text-[#94A3B8]">{t.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
