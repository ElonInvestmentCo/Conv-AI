import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plug, Search, CheckCircle2, Plus, ChevronRight, Zap, Globe, Star } from 'lucide-react';

const categories = ['All', 'Productivity', 'Communication', 'Storage', 'Developer', 'CRM', 'Data'];

const integrations = [
  { name: 'Notion', cat: 'Productivity', icon: '📝', desc: 'Sync pages and databases as knowledge', connected: true, popular: true },
  { name: 'Slack', cat: 'Communication', icon: '💬', desc: 'Send AI summaries and alerts to channels', connected: true, popular: true },
  { name: 'GitHub', cat: 'Developer', icon: '💻', desc: 'Review PRs and analyze repositories', connected: false, popular: true },
  { name: 'Google Drive', cat: 'Storage', icon: '📁', desc: 'Access and analyze Drive documents', connected: true, popular: true },
  { name: 'Jira', cat: 'Productivity', icon: '🎯', desc: 'Manage tickets and sprints with AI', connected: false, popular: false },
  { name: 'Salesforce', cat: 'CRM', icon: '☁️', desc: 'Analyze CRM data and generate reports', connected: false, popular: true },
  { name: 'HubSpot', cat: 'CRM', icon: '🔶', desc: 'Automate marketing and sales tasks', connected: false, popular: false },
  { name: 'Zapier', cat: 'Productivity', icon: '⚡', desc: 'Connect 5000+ apps with AI workflows', connected: false, popular: true },
  { name: 'Linear', cat: 'Productivity', icon: '🔷', desc: 'AI-powered issue tracking', connected: false, popular: false },
  { name: 'Figma', cat: 'Developer', icon: '🎨', desc: 'Analyze designs and generate specs', connected: false, popular: false },
  { name: 'Snowflake', cat: 'Data', icon: '❄️', desc: 'Query and analyze warehouse data', connected: false, popular: false },
  { name: 'Airtable', cat: 'Data', icon: '📊', desc: 'Sync bases and automate records', connected: false, popular: false },
];

export default function Integrations() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [connected, setConnected] = useState<Set<string>>(
    new Set(integrations.filter(i => i.connected).map(i => i.name))
  );

  const filtered = integrations.filter(i => {
    const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || i.cat === category;
    return matchSearch && matchCat;
  });

  const toggle = (name: string) => {
    setConnected(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F7F9FC' }}>
      <div className="max-w-5xl mx-auto p-6 space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">Integrations</h1>
            <p className="text-[14px] text-[#64748B] mt-0.5">{connected.size} connected · {integrations.length} available</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[13.5px] font-semibold text-[#475569] transition-all" style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)' }}>
            <Plus size={14} /> Request Integration
          </button>
        </div>

        {/* Connected banner */}
        {connected.size > 0 && (
          <div className="rounded-[18px] p-5" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)', border: '1px solid #BBF7D0' }}>
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <p className="text-[14px] font-bold text-emerald-900">Active Integrations</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[...connected].map(name => {
                const intg = integrations.find(i => i.name === name);
                return (
                  <div key={name} className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: '#fff', border: '1px solid #BBF7D0' }}>
                    <span className="text-base">{intg?.icon}</span>
                    <span className="text-[13px] font-semibold text-emerald-900">{name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search integrations…"
            className="w-full pl-11 pr-4 py-2.5 text-[14px] rounded-[14px] outline-none"
            style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.8)', color: '#0F172A', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-all"
              style={{ background: category === c ? '#0F172A' : '#fff', color: category === c ? '#fff' : '#64748B', border: `1px solid ${category === c ? '#0F172A' : 'rgba(226,232,240,0.8)'}` }}
            >{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((intg, i) => {
            const isConnected = connected.has(intg.name);
            return (
              <motion.div
                key={intg.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="p-5 rounded-[18px] transition-all hover:shadow-sm"
                style={{ background: '#fff', border: `1px solid ${isConnected ? '#BBF7D0' : 'rgba(226,232,240,0.8)'}`, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{intg.icon}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-[14px] font-bold text-[#0F172A]">{intg.name}</p>
                        {intg.popular && <Star size={10} className="text-amber-400 fill-amber-400" />}
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">{intg.cat}</p>
                    </div>
                  </div>
                  {isConnected && <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />}
                </div>

                <p className="text-[13px] text-[#64748B] leading-snug mb-4">{intg.desc}</p>

                <button
                  onClick={() => toggle(intg.name)}
                  className="w-full py-2 rounded-[12px] text-[13px] font-semibold transition-all"
                  style={isConnected
                    ? { background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA' }
                    : { background: 'linear-gradient(135deg, #2563EB, #4F46E5)', color: '#fff', boxShadow: '0 2px 6px rgba(37,99,235,0.25)' }
                  }
                >
                  {isConnected ? 'Disconnect' : 'Connect'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
