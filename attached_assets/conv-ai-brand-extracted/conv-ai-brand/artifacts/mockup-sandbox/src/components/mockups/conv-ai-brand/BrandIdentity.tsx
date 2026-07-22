import React, { useState } from 'react';
import { 
  MessageSquare, Zap, Settings, Database, BarChart3, 
  Search, Send, CheckCircle2, AlertCircle, XCircle, 
  Clock, Terminal, User, Sparkles, MoreHorizontal, Plus
} from 'lucide-react';

const COLORS = {
  background: '#0A0C10',
  surface: '#111318',
  surfaceHover: '#1A1D24',
  border: '#1E222A',
  borderHover: '#2E3440',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#475569',
  accent: '#6366F1',
  accentHover: '#4F46E5',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  aiSubtle: 'rgba(99, 102, 241, 0.1)',
};

const LogoMark = ({ className = "w-8 h-8", color = "currentColor", opacity = 1 }: any) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 10C6 7.79086 7.79086 6 10 6H16V18C16 22.4183 12.4183 26 8 26H6V10Z" fill={color} fillOpacity={opacity} />
    <path d="M26 22C26 24.2091 24.2091 26 22 26H16V14C16 9.58172 19.5817 6 24 6H26V22Z" fill={color} fillOpacity={opacity * 0.5} />
  </svg>
);

const Wordmark = ({ className = "text-xl", theme = "dark" }: any) => (
  <div className={`font-['Inter'] font-semibold tracking-tight flex items-center ${className}`}>
    <span className={theme === "dark" ? "text-[#F8FAFC]" : "text-[#0A0C10]"}>Conv</span>
    <span className={`${theme === "dark" ? "text-[#94A3B8]" : "text-[#64748B]"} font-normal ml-0.5`}>AI</span>
  </div>
);

const FullLogo = ({ className = "w-8 h-8", textClass = "text-xl", theme = "dark" }: any) => (
  <div className="flex items-center gap-3">
    <LogoMark className={className} color={theme === "dark" ? "#F8FAFC" : "#0A0C10"} />
    <Wordmark className={textClass} theme={theme} />
  </div>
);

const SectionHeader = ({ title, subtitle, number }: any) => (
  <div className="mb-16 border-b border-[#1E222A] pb-8">
    <div className="flex items-baseline gap-4 mb-4">
      <span className="font-['JetBrains_Mono'] text-[#6366F1] text-sm">0{number}</span>
      <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-medium tracking-tight text-[#F8FAFC]">{title}</h2>
    </div>
    <p className="text-[#94A3B8] text-lg max-w-2xl font-light">{subtitle}</p>
  </div>
);

export default function BrandIdentity() {
  const [chatInput, setChatInput] = useState("");

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#F8FAFC] font-['Inter'] selection:bg-[#6366F1]/30 selection:text-white pb-40">
      
      {/* Hero Section */}
      <header className="px-12 py-32 md:px-24 md:py-48 max-w-7xl mx-auto flex flex-col items-start border-b border-[#1E222A]">
        <FullLogo className="w-12 h-12 mb-16" textClass="text-3xl" />
        <h1 className="font-['Plus_Jakarta_Sans'] text-5xl md:text-7xl font-medium tracking-tighter leading-tight mb-8">
          Precision over noise. <br/>
          <span className="text-[#6366F1]">Intelligence over flair.</span>
        </h1>
        <p className="text-[#94A3B8] text-xl md:text-2xl max-w-3xl font-light leading-relaxed">
          The brand identity system for Conv AI. Designed to communicate cold precision,
          institutional trust, and razor-sharp capability. Every pixel intentional.
        </p>
      </header>

      {/* 01 Color System */}
      <section className="px-12 py-24 md:px-24 max-w-7xl mx-auto">
        <SectionHeader 
          number="1" 
          title="Color System" 
          subtitle="A dark-mode-forward palette built around deep space blacks and surgical titanium, punctuated by an electric indigo accent." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ColorSwatch name="Background" hex="#0A0C10" variable="--color-background" color="#0A0C10" />
          <ColorSwatch name="Surface" hex="#111318" variable="--color-surface" color="#111318" />
          <ColorSwatch name="Border" hex="#1E222A" variable="--color-border" color="#1E222A" />
          <ColorSwatch name="Accent" hex="#6366F1" variable="--color-accent" color="#6366F1" text="white" />
          
          <ColorSwatch name="Text Primary" hex="#F8FAFC" variable="--color-text-primary" color="#F8FAFC" text="black" />
          <ColorSwatch name="Text Secondary" hex="#94A3B8" variable="--color-text-secondary" color="#94A3B8" text="black" />
          <ColorSwatch name="Text Muted" hex="#475569" variable="--color-text-muted" color="#475569" text="white" />
          
          <div className="grid grid-rows-3 gap-2 h-full">
            <SemanticSwatch name="Success" hex="#10B981" color="#10B981" />
            <SemanticSwatch name="Warning" hex="#F59E0B" color="#F59E0B" />
            <SemanticSwatch name="Error" hex="#EF4444" color="#EF4444" />
          </div>
        </div>
      </section>

      {/* 02 Logo & Icon System */}
      <section className="px-12 py-24 md:px-24 max-w-7xl mx-auto">
        <SectionHeader 
          number="2" 
          title="Logo & Icon System" 
          subtitle="A precise, geometric cut-out that implies connection without resorting to literal conversation bubbles. Structural, architectural, unbalanced yet perfectly weighted." 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#111318] border border-[#1E222A] rounded-2xl p-16 flex items-center justify-center min-h-[300px]">
            <FullLogo className="w-16 h-16" textClass="text-5xl" theme="dark" />
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-16 flex items-center justify-center min-h-[300px]">
            <FullLogo className="w-16 h-16" textClass="text-5xl" theme="light" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#111318] border border-[#1E222A] rounded-2xl p-8 flex flex-col items-center justify-center gap-4">
            <LogoMark className="w-16 h-16" color="#F8FAFC" />
            <span className="font-['JetBrains_Mono'] text-[#94A3B8] text-xs">64px</span>
          </div>
          <div className="bg-[#111318] border border-[#1E222A] rounded-2xl p-8 flex flex-col items-center justify-center gap-4">
            <LogoMark className="w-8 h-8" color="#F8FAFC" />
            <span className="font-['JetBrains_Mono'] text-[#94A3B8] text-xs">32px</span>
          </div>
          <div className="bg-[#111318] border border-[#1E222A] rounded-2xl p-8 flex flex-col items-center justify-center gap-4">
            <LogoMark className="w-4 h-4" color="#F8FAFC" />
            <span className="font-['JetBrains_Mono'] text-[#94A3B8] text-xs">16px</span>
          </div>
          <div className="bg-[#111318] border border-[#1E222A] rounded-2xl p-8 flex flex-col items-center justify-center gap-4">
            <Wordmark className="text-3xl" theme="dark" />
            <span className="font-['JetBrains_Mono'] text-[#94A3B8] text-xs">Wordmark Only</span>
          </div>
        </div>
      </section>

      {/* 03 Typography System */}
      <section className="px-12 py-24 md:px-24 max-w-7xl mx-auto border-t border-[#1E222A]">
        <SectionHeader 
          number="3" 
          title="Typography System" 
          subtitle="Plus Jakarta Sans provides geometric rigor for displays. Inter offers unparalleled legibility for UI. JetBrains Mono brings technical precision to data and code." 
        />
        
        <div className="flex flex-col gap-12">
          <TypeRow label="Display 72" size="72px" weight="Medium" family="Plus Jakarta Sans" sample="Precision instrument." className="text-[72px] leading-tight font-['Plus_Jakarta_Sans'] font-medium" />
          <TypeRow label="Display 64" size="64px" weight="Medium" family="Plus Jakarta Sans" sample="Compute over intuition." className="text-[64px] leading-tight font-['Plus_Jakarta_Sans'] font-medium" />
          <TypeRow label="Heading 1" size="48px" weight="Medium" family="Plus Jakarta Sans" sample="Enterprise AI capabilities" className="text-[48px] leading-tight font-['Plus_Jakarta_Sans'] font-medium" />
          <TypeRow label="Heading 2" size="36px" weight="Medium" family="Plus Jakarta Sans" sample="System configurations" className="text-[36px] leading-tight font-['Plus_Jakarta_Sans'] font-medium" />
          <TypeRow label="Heading 3" size="28px" weight="Medium" family="Plus Jakarta Sans" sample="Deploying inference endpoints" className="text-[28px] leading-tight font-['Plus_Jakarta_Sans'] font-medium" />
          <TypeRow label="Heading 4" size="22px" weight="Medium" family="Plus Jakarta Sans" sample="Context window management" className="text-[22px] leading-tight font-['Plus_Jakarta_Sans'] font-medium" />
          <TypeRow label="Heading 5" size="18px" weight="Semibold" family="Inter" sample="Model parameters" className="text-[18px] leading-tight font-semibold" />
          
          <div className="h-px bg-[#1E222A] my-4"></div>

          <TypeRow label="Body Large" size="16px" weight="Regular" family="Inter" sample="The system aggregates disparate data sources into a unified vector space, enabling semantic retrieval across organizational boundaries with sub-millisecond latency." className="text-[16px] leading-relaxed font-normal" />
          <TypeRow label="Body" size="14px" weight="Regular" family="Inter" sample="Models are automatically versioned and deployed based on performance metrics against baseline benchmarks." className="text-[14px] leading-relaxed font-normal" />
          <TypeRow label="Small" size="12px" weight="Medium" family="Inter" sample="Last synchronized: 2 mins ago" className="text-[12px] leading-relaxed font-medium" />
          <TypeRow label="Micro" size="11px" weight="Medium" family="Inter" sample="SESSION ID: 0x8F9A2B" className="text-[11px] leading-relaxed font-medium uppercase tracking-wider" />
        </div>
      </section>

      {/* 04 Design Tokens */}
      <section className="px-12 py-24 md:px-24 max-w-7xl mx-auto border-t border-[#1E222A]">
        <SectionHeader 
          number="4" 
          title="Design Tokens" 
          subtitle="The underlying variables that ensure systematic consistency across all surfaces." 
        />

        <div className="space-y-20">
          <div>
            <h3 className="font-['JetBrains_Mono'] text-[#94A3B8] text-sm uppercase tracking-widest mb-8">Spacing Scale</h3>
            <div className="flex flex-col gap-3">
              {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80].map((space) => (
                <div key={space} className="flex items-center gap-8">
                  <div className="w-16 font-['JetBrains_Mono'] text-[#94A3B8] text-xs text-right">{space}px</div>
                  <div className="h-6 bg-[#6366F1]/20 rounded-sm border border-[#6366F1]/40" style={{ width: space * 4 }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-['JetBrains_Mono'] text-[#94A3B8] text-sm uppercase tracking-widest mb-8">Border Radius</h3>
            <div className="flex flex-wrap gap-8">
              {[
                { label: '2px', class: 'rounded-sm' },
                { label: '4px', class: 'rounded' },
                { label: '6px', class: 'rounded-md' },
                { label: '8px', class: 'rounded-lg' },
                { label: '12px', class: 'rounded-xl' },
                { label: '16px', class: 'rounded-2xl' },
                { label: '24px', class: 'rounded-3xl' },
                { label: '999px', class: 'rounded-full px-6' },
              ].map((radius) => (
                <div key={radius.label} className="flex flex-col items-center gap-4">
                  <div className={`h-16 w-16 bg-[#111318] border border-[#1E222A] flex items-center justify-center ${radius.class}`}>
                  </div>
                  <div className="font-['JetBrains_Mono'] text-[#94A3B8] text-xs">{radius.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-['JetBrains_Mono'] text-[#94A3B8] text-sm uppercase tracking-widest mb-8">Elevation</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="h-32 bg-[#111318] border border-[#1E222A] rounded-xl flex items-center justify-center">
                <span className="font-['JetBrains_Mono'] text-[#94A3B8] text-xs">Level 0: None</span>
              </div>
              <div className="h-32 bg-[#111318] border border-[#1E222A] rounded-xl flex items-center justify-center shadow-sm">
                <span className="font-['JetBrains_Mono'] text-[#94A3B8] text-xs">Level 1: SM</span>
              </div>
              <div className="h-32 bg-[#1A1D24] border border-[#2E3440] rounded-xl flex items-center justify-center shadow-lg shadow-black/50">
                <span className="font-['JetBrains_Mono'] text-[#F8FAFC] text-xs">Level 2: MD</span>
              </div>
              <div className="h-32 bg-[#1E222A] border border-[#2E3440] rounded-xl flex items-center justify-center shadow-2xl shadow-black/80">
                <span className="font-['JetBrains_Mono'] text-[#F8FAFC] text-xs">Level 3: LG</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 UI Component Gallery */}
      <section className="px-12 py-24 md:px-24 max-w-7xl mx-auto border-t border-[#1E222A]">
        <SectionHeader 
          number="5" 
          title="Component Gallery" 
          subtitle="Interaction primitives rendered with precision. High contrast, distinct states, and unambiguous feedback." 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Primitives */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            
            {/* Buttons */}
            <div>
              <h3 className="font-['JetBrains_Mono'] text-[#94A3B8] text-sm uppercase tracking-widest mb-6 border-b border-[#1E222A] pb-2">Buttons</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">Primary Action</button>
                  <button className="bg-transparent border border-[#2E3440] hover:border-[#475569] hover:bg-[#1A1D24] text-[#F8FAFC] px-4 py-2 rounded-lg font-medium text-sm transition-colors">Secondary Action</button>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-[#94A3B8] hover:text-[#F8FAFC] px-4 py-2 rounded-lg font-medium text-sm transition-colors">Ghost Action</button>
                  <button className="text-[#EF4444] bg-[#EF4444]/10 hover:bg-[#EF4444]/20 px-4 py-2 rounded-lg font-medium text-sm transition-colors">Destructive</button>
                </div>
                <div className="flex items-center gap-4">
                  <button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-3 py-1.5 rounded-md font-medium text-xs transition-colors shadow-sm">Small Primary</button>
                  <button className="bg-transparent border border-[#2E3440] hover:border-[#475569] hover:bg-[#1A1D24] text-[#F8FAFC] px-3 py-1.5 rounded-md font-medium text-xs transition-colors">Small Sec</button>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <h3 className="font-['JetBrains_Mono'] text-[#94A3B8] text-sm uppercase tracking-widest mb-6 border-b border-[#1E222A] pb-2">Inputs</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[#94A3B8] text-xs font-medium mb-1.5 block">Default State</label>
                  <input type="text" placeholder="Enter configuration value" className="w-full bg-[#111318] border border-[#1E222A] focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] rounded-lg px-3 py-2 text-sm text-[#F8FAFC] placeholder-[#475569] outline-none transition-all" />
                </div>
                <div>
                  <label className="text-[#94A3B8] text-xs font-medium mb-1.5 block">Error State</label>
                  <input type="text" defaultValue="invalid_param_value" className="w-full bg-[#111318] border border-[#EF4444] focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444] rounded-lg px-3 py-2 text-sm text-[#F8FAFC] outline-none transition-all" />
                  <p className="text-[#EF4444] text-xs mt-1.5 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Invalid parameter format</p>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#475569] absolute left-3 top-2.5" />
                  <input type="text" placeholder="Search indices..." className="w-full bg-[#111318] border border-[#1E222A] focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] rounded-lg pl-9 pr-3 py-2 text-sm text-[#F8FAFC] placeholder-[#475569] outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="font-['JetBrains_Mono'] text-[#94A3B8] text-sm uppercase tracking-widest mb-6 border-b border-[#1E222A] pb-2">Status Badges</h3>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#10B981]/10 text-[#10B981] text-xs font-medium border border-[#10B981]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> Active
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-medium border border-[#F59E0B]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span> Pending
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#EF4444]/10 text-[#EF4444] text-xs font-medium border border-[#EF4444]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span> Error
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#6366F1]/10 text-[#6366F1] text-xs font-medium border border-[#6366F1]/20 shadow-[0_0_8px_rgba(99,102,241,0.2)]">
                  <Sparkles className="w-3 h-3" /> AI Generated
                </span>
              </div>
            </div>
            
          </div>

          {/* Right Column - Composed Layouts */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            
            <h3 className="font-['JetBrains_Mono'] text-[#94A3B8] text-sm uppercase tracking-widest mb-2 border-b border-[#1E222A] pb-2">Composed Interface</h3>
            
            <div className="border border-[#1E222A] rounded-2xl bg-[#0A0C10] overflow-hidden flex h-[600px] shadow-2xl shadow-black/50">
              
              {/* Sidebar */}
              <div className="w-16 md:w-64 border-r border-[#1E222A] bg-[#0A0C10] flex flex-col">
                <div className="h-16 flex items-center justify-center md:justify-start md:px-4 border-b border-[#1E222A]">
                  <LogoMark className="w-8 h-8" color="#F8FAFC" />
                  <Wordmark className="text-xl ml-3 hidden md:block" theme="dark" />
                </div>
                
                <div className="flex-1 py-4 flex flex-col gap-1 md:px-3">
                  <NavItem icon={MessageSquare} label="Conversations" active />
                  <NavItem icon={Database} label="Knowledge Base" />
                  <NavItem icon={BarChart3} label="Analytics" />
                  <NavItem icon={Terminal} label="Developer" />
                  <NavItem icon={Settings} label="Settings" />
                </div>

                <div className="p-4 border-t border-[#1E222A] flex justify-center md:justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="ml-3 hidden md:block overflow-hidden">
                    <p className="text-sm font-medium text-[#F8FAFC] truncate">Admin User</p>
                    <p className="text-xs text-[#94A3B8] truncate">Pro Plan</p>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col bg-[#0A0C10] relative">
                
                {/* Header */}
                <div className="h-16 border-b border-[#1E222A] flex items-center px-6 justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[#F8FAFC] font-medium text-sm">System Architect Bot</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] bg-[#1E222A] text-[#94A3B8]">GPT-4o</span>
                  </div>
                  <button className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Chat Feed */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-[#1A1D24] border border-[#2E3440] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                      <p className="text-sm text-[#F8FAFC] leading-relaxed">Analyze the latency spikes in the us-east-1 vector database cluster over the last 24 hours.</p>
                    </div>
                  </div>

                  {/* AI Loading Skeleton */}
                  <div className="flex justify-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#111318] border border-[#1E222A] flex items-center justify-center shrink-0">
                      <LogoMark className="w-4 h-4" color="#6366F1" />
                    </div>
                    <div className="flex flex-col gap-2 w-full max-w-[85%] mt-1">
                      <div className="h-4 bg-[#111318] rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-[#111318] rounded animate-pulse w-1/2"></div>
                      <div className="h-4 bg-[#111318] rounded animate-pulse w-5/6"></div>
                    </div>
                  </div>

                  {/* AI Response Card */}
                  <div className="flex justify-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#111318] border border-[#1E222A] flex items-center justify-center shrink-0">
                      <LogoMark className="w-4 h-4" color="#6366F1" />
                    </div>
                    <div className="bg-[#111318] border border-[#1E222A] rounded-2xl rounded-tl-sm w-full max-w-[85%] overflow-hidden">
                      <div className="p-4 border-b border-[#1E222A] bg-[#0A0C10]/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                          <span className="text-xs font-medium text-[#F8FAFC]">Analysis Complete</span>
                        </div>
                        <span className="text-[10px] text-[#94A3B8] font-['JetBrains_Mono'] flex items-center gap-1"><Clock className="w-3 h-3" /> 1.2s</span>
                      </div>
                      <div className="p-4 space-y-4">
                        <p className="text-sm text-[#F8FAFC] leading-relaxed">
                          I found a correlation between the latency spikes and the ingestion of large batch updates from the analytics pipeline. 
                        </p>
                        <div className="bg-[#0A0C10] border border-[#1E222A] rounded-lg p-3 font-['JetBrains_Mono'] text-xs text-[#94A3B8]">
                          <span className="text-[#F59E0B]">WARN</span> [14:32:01] Index rebuild threshold exceeded<br/>
                          <span className="text-[#6366F1]">INFO</span> [14:32:05] Scaling read replicas +2
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Composer */}
                <div className="p-4 bg-[#0A0C10] shrink-0">
                  <div className="relative flex items-end gap-2 bg-[#111318] border border-[#1E222A] focus-within:border-[#6366F1] focus-within:ring-1 focus-within:ring-[#6366F1]/50 rounded-xl p-2 transition-all">
                    <button className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[#1A1D24] shrink-0">
                      <Plus className="w-5 h-5" />
                    </button>
                    <textarea 
                      rows={1}
                      placeholder="Ask the system..." 
                      className="w-full bg-transparent border-none focus:ring-0 resize-none py-2 text-sm text-[#F8FAFC] placeholder-[#475569] outline-none max-h-32 min-h-[40px]"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                    />
                    <button className={`p-2 rounded-lg shrink-0 transition-all ${chatInput.length > 0 ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5] shadow-sm' : 'bg-[#1A1D24] text-[#475569]'}`}>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-center mt-3">
                    <span className="text-[10px] text-[#475569]">Conv AI can make mistakes. Verify critical actions.</span>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 06 App Icons Section */}
      <section className="px-12 py-24 md:px-24 max-w-7xl mx-auto border-t border-[#1E222A]">
        <SectionHeader 
          number="6" 
          title="App Iconography" 
          subtitle="Designed to sit cleanly on any dock or home screen. Precision masking and subtle drop shadows." 
        />
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-shrink-0">
            <div className="w-64 h-64 bg-gradient-to-br from-[#1E222A] to-[#0A0C10] rounded-[56px] p-[2px] shadow-2xl shadow-black/80">
              <div className="w-full h-full bg-[#111318] rounded-[54px] flex items-center justify-center shadow-inner relative overflow-hidden">
                {/* Subtle sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0"></div>
                <LogoMark className="w-32 h-32" color="#6366F1" />
              </div>
            </div>
            <p className="font-['JetBrains_Mono'] text-[#94A3B8] text-xs text-center mt-6">Master Icon (macOS)</p>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-12">
            <div>
              <h4 className="text-[#F8FAFC] text-sm font-medium mb-6 border-b border-[#1E222A] pb-2">Dark Variant Scale</h4>
              <div className="flex items-end gap-8">
                <AppIconPreview size={64} radius={14} color="#6366F1" bg="#111318" border="#1E222A" />
                <AppIconPreview size={32} radius={8} color="#6366F1" bg="#111318" border="#1E222A" />
                <AppIconPreview size={16} radius={4} color="#6366F1" bg="#111318" border="#1E222A" />
              </div>
            </div>
            <div>
              <h4 className="text-[#F8FAFC] text-sm font-medium mb-6 border-b border-[#1E222A] pb-2">Light Variant Scale</h4>
              <div className="flex items-end gap-8">
                <AppIconPreview size={64} radius={14} color="#6366F1" bg="#F8FAFC" border="#E2E8F0" />
                <AppIconPreview size={32} radius={8} color="#6366F1" bg="#F8FAFC" border="#E2E8F0" />
                <AppIconPreview size={16} radius={4} color="#6366F1" bg="#F8FAFC" border="#E2E8F0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 Brand Guidelines Section */}
      <section className="px-12 py-24 md:px-24 max-w-7xl mx-auto border-t border-[#1E222A]">
        <SectionHeader 
          number="7" 
          title="Usage Guidelines" 
          subtitle="Strict rules for brand application. Maintain the precision of the mark at all times." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-[#111318] border border-[#1E222A] rounded-xl p-6 flex flex-col h-full">
            <h4 className="text-[#F8FAFC] font-medium mb-4 flex items-center justify-between">
              Clear Space <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            </h4>
            <div className="flex-1 border border-[#1E222A] bg-[#0A0C10] rounded-lg flex items-center justify-center p-8 relative mb-4">
              <div className="border border-dashed border-[#6366F1]/50 p-6 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-1 text-[#6366F1] text-[10px] font-['JetBrains_Mono']">x</div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-1 text-[#6366F1] text-[10px] font-['JetBrains_Mono']">x</div>
                <FullLogo className="w-8 h-8" textClass="text-2xl" />
              </div>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">Leave space equal to the width of the mark 'x' around the entire logo to ensure visibility.</p>
          </div>

          <div className="bg-[#111318] border border-[#1E222A] rounded-xl p-6 flex flex-col h-full">
            <h4 className="text-[#F8FAFC] font-medium mb-4 flex items-center justify-between">
              Do not distort <XCircle className="w-4 h-4 text-[#EF4444]" />
            </h4>
            <div className="flex-1 border border-[#1E222A] bg-[#0A0C10] rounded-lg flex items-center justify-center p-8 mb-4">
              <div className="scale-x-150 origin-center opacity-50">
                <FullLogo className="w-8 h-8" textClass="text-2xl" />
              </div>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">Never stretch, squeeze, or skew the logo in any direction.</p>
          </div>

          <div className="bg-[#111318] border border-[#1E222A] rounded-xl p-6 flex flex-col h-full">
            <h4 className="text-[#F8FAFC] font-medium mb-4 flex items-center justify-between">
              Do not alter colors <XCircle className="w-4 h-4 text-[#EF4444]" />
            </h4>
            <div className="flex-1 border border-[#1E222A] bg-[#0A0C10] rounded-lg flex items-center justify-center p-8 mb-4">
              <div className="flex items-center gap-3 opacity-50">
                <LogoMark className="w-8 h-8" color="#10B981" />
                <Wordmark className="text-2xl text-[#EF4444]" theme="dark" />
              </div>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">Only use the approved primary, monochrome white, or monochrome black variants.</p>
          </div>

        </div>
      </section>

    </div>
  );
}

// Subcomponents

function ColorSwatch({ name, hex, variable, color, text = "white" }: any) {
  const isLightText = text === "white";
  return (
    <div className="flex flex-col gap-3 group">
      <div 
        className="h-32 rounded-xl w-full border border-[#1E222A] transition-transform duration-300 group-hover:-translate-y-1"
        style={{ backgroundColor: color }}
      />
      <div>
        <div className="text-[#F8FAFC] font-medium text-sm mb-1">{name}</div>
        <div className="flex items-center justify-between font-['JetBrains_Mono'] text-xs text-[#94A3B8]">
          <span>{hex}</span>
        </div>
      </div>
    </div>
  );
}

function SemanticSwatch({ name, hex, color }: any) {
  return (
    <div className="flex items-center rounded-lg border border-[#1E222A] bg-[#111318] overflow-hidden group">
      <div className="w-12 h-full shrink-0 border-r border-[#1E222A]" style={{ backgroundColor: color }} />
      <div className="px-4 py-3 flex-1 flex items-center justify-between">
        <span className="text-[#F8FAFC] font-medium text-sm">{name}</span>
        <span className="font-['JetBrains_Mono'] text-xs text-[#94A3B8]">{hex}</span>
      </div>
    </div>
  );
}

function TypeRow({ label, size, weight, family, sample, className }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline border-b border-[#1E222A] pb-8 last:border-0 last:pb-0">
      <div className="lg:col-span-3 font-['JetBrains_Mono'] text-sm text-[#94A3B8] flex flex-col gap-1">
        <span className="text-[#F8FAFC] font-['Inter'] font-medium">{label}</span>
        <span>{size} / {weight}</span>
        <span>{family}</span>
      </div>
      <div className={`lg:col-span-9 ${className} text-[#F8FAFC] truncate md:whitespace-normal`}>
        {sample}
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: any) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${active ? 'bg-[#1A1D24] text-[#F8FAFC]' : 'text-[#94A3B8] hover:bg-[#111318] hover:text-[#F8FAFC]'}`}>
      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#6366F1]' : 'text-[#475569] group-hover:text-[#94A3B8]'}`} />
      <span className="text-sm font-medium hidden md:block">{label}</span>
    </button>
  );
}

function AppIconPreview({ size, radius, color, bg, border }: any) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div 
        className="flex items-center justify-center overflow-hidden shadow-lg"
        style={{ 
          width: size, 
          height: size, 
          borderRadius: radius, 
          backgroundColor: bg,
          border: `1px solid ${border}`
        }}
      >
        <LogoMark className="w-1/2 h-1/2" color={color} />
      </div>
      <span className="font-['JetBrains_Mono'] text-[#94A3B8] text-[10px]">{size}px</span>
    </div>
  );
}
