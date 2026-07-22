import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  KeyRound, Plus, Copy, Eye, EyeOff, Trash2, RefreshCw,
  Shield, CheckCircle2, AlertTriangle, Clock, Globe, Zap
} from 'lucide-react';

const keys = [
  { id: 1, name: 'Production API', key: 'sk-conv-prod-...4a8f', created: 'Jun 1, 2026', lastUsed: '2 min ago', requests: 142840, status: 'active', scopes: ['chat', 'agents', 'files'] },
  { id: 2, name: 'Development', key: 'sk-conv-dev-...9c2d', created: 'May 12, 2026', lastUsed: '1 hr ago', requests: 8291, status: 'active', scopes: ['chat'] },
  { id: 3, name: 'Webhook Service', key: 'sk-conv-wh-...3e7b', created: 'Apr 3, 2026', lastUsed: '3 days ago', requests: 4102, status: 'active', scopes: ['automations', 'agents'] },
  { id: 4, name: 'Legacy Integration', key: 'sk-conv-lg-...1f4c', created: 'Jan 15, 2026', lastUsed: '45 days ago', requests: 290, status: 'inactive', scopes: ['chat'] },
];

const scopeColors: Record<string, string> = {
  chat: 'bg-blue-50 text-blue-700',
  agents: 'bg-violet-50 text-violet-700',
  files: 'bg-emerald-50 text-emerald-700',
  automations: 'bg-orange-50 text-orange-700',
};

const endpoints = [
  { method: 'POST', path: '/v1/chat/completions', desc: 'Send a message to Conv AI' },
  { method: 'POST', path: '/v1/agents/run', desc: 'Trigger an agent execution' },
  { method: 'GET', path: '/v1/conversations', desc: 'List conversation history' },
  { method: 'POST', path: '/v1/files/upload', desc: 'Upload a file for analysis' },
  { method: 'POST', path: '/v1/images/generate', desc: 'Generate an image' },
];

export default function APIKeys() {
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const toggleVisible = (id: number) => {
    setVisibleKeys(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const copyKey = (id: number) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-4xl mx-auto p-6 space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">API Keys</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">Manage access keys for the Conv AI API</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[13.5px] font-semibold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}
          >
            <Plus size={15} /> Create Key
          </button>
        </div>

        {/* Security notice */}
        <div className="flex items-start gap-3 p-4 rounded-[14px]" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <Shield size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-amber-800">Never share your API keys publicly. Rotate keys immediately if compromised. Keys are only shown once at creation.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Requests', value: keys.reduce((s, k) => s + k.requests, 0).toLocaleString(), icon: Zap, color: '#2563EB', bg: '#EFF6FF' },
            { label: 'Active Keys', value: keys.filter(k => k.status === 'active').length.toString(), icon: CheckCircle2, color: '#10B981', bg: '#F0FDF4' },
            { label: 'Rate Limit', value: '60 / min', icon: Globe, color: '#7C3AED', bg: '#F5F3FF' },
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

        {/* Keys list */}
        <div className="space-y-3">
          {keys.map((k, i) => (
            <motion.div
              key={k.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="p-5 rounded-[18px]"
              style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 ${k.status === 'active' ? '' : ''}`} style={{ background: k.status === 'active' ? '#EFF6FF' : '#F8FAFC' }}>
                  <KeyRound size={16} style={{ color: k.status === 'active' ? '#2563EB' : '#94A3B8' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[14px] font-bold text-[#0F172A]">{k.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${k.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {k.status}
                    </span>
                  </div>

                  {/* Key display */}
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-[13px] font-mono text-[#475569] bg-[#F8FAFC] px-3 py-1.5 rounded-[8px]" style={{ border: '1px solid rgba(226,232,240,0.8)' }}>
                      {visibleKeys.has(k.id) ? k.key.replace('...', 'xxxxxxxxxxxxxxxx') : k.key}
                    </code>
                    <button onClick={() => toggleVisible(k.id)} className="p-1.5 rounded-[8px] text-[#94A3B8] hover:text-[#475569] hover:bg-[#F8FAFC] transition-all">
                      {visibleKeys.has(k.id) ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button onClick={() => copyKey(k.id)} className="p-1.5 rounded-[8px] text-[#94A3B8] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-all">
                      {copied === k.id ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-[12px] text-[#94A3B8]">
                    <span className="flex items-center gap-1"><Clock size={11} /> Created {k.created}</span>
                    <span>·</span>
                    <span>Last used {k.lastUsed}</span>
                    <span>·</span>
                    <span>{k.requests.toLocaleString()} requests</span>
                  </div>

                  <div className="flex gap-1.5 mt-3">
                    {k.scopes.map(s => (
                      <span key={s} className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${scopeColors[s]}`}>{s}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="p-2 rounded-[10px] text-[#CBD5E1] hover:text-[#64748B] hover:bg-[#F8FAFC] transition-all" title="Rotate">
                    <RefreshCw size={14} />
                  </button>
                  <button className="p-2 rounded-[10px] text-[#CBD5E1] hover:text-red-500 hover:bg-red-50 transition-all" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick reference */}
        <div className="rounded-[18px] overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
          <div className="px-5 py-3.5" style={{ borderBottom: '1px solid #F1F5F9' }}>
            <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.06em]">API Quick Reference</p>
          </div>
          <div className="divide-y" style={{ divideColor: '#F8FAFC' }}>
            {endpoints.map((ep, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded font-mono flex-shrink-0 ${ep.method === 'POST' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>{ep.method}</span>
                <code className="text-[13px] font-mono text-[#475569] flex-1">{ep.path}</code>
                <span className="text-[12.5px] text-[#94A3B8]">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
