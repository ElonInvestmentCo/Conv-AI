import React, { useState } from 'react';
import { 
  MessageSquare, History, Folder, Settings, User, 
  Search, Bell, Mic, Paperclip, Send, Plus, 
  ChevronDown, LayoutPanelLeft, Sparkles, 
  TrendingUp, BarChart3, PieChart, CreditCard,
  ArrowRight, Shield, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, Cell
} from 'recharts';

// --- Shared Components ---

const GlassPanel = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)] ${className}`}>
    {children}
  </div>
);

const IconButton = ({ icon, onClick, active, className = '' }: { icon: React.ReactNode, onClick?: () => void, active?: boolean, className?: string }) => (
  <button 
    onClick={onClick}
    className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center
      ${active 
        ? 'bg-blue-50 text-blue-600 shadow-sm' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'} 
      ${className}`}
  >
    {icon}
  </button>
);

// --- Mock Data ---

const cashFlowData = [
  { month: 'Jan', income: 14500, expenses: 8200 },
  { month: 'Feb', income: 15200, expenses: 7900 },
  { month: 'Mar', income: 14800, expenses: 8500 },
  { month: 'Apr', income: 16100, expenses: 8100 },
  { month: 'May', income: 15900, expenses: 7600 },
  { month: 'Jun', income: 18400, expenses: 9200 },
];

const portfolioData = [
  { name: 'Jan', value: 120000 },
  { name: 'Feb', value: 124000 },
  { name: 'Mar', value: 122500 },
  { name: 'Apr', value: 131000 },
  { name: 'May', value: 136000 },
  { name: 'Jun', value: 142500 },
];

// --- Main Application ---

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chatStarted, setChatStarted] = useState(true); // Set to true to show chat state for demo

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- Left Sidebar --- */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="h-full border-r border-slate-200 bg-white flex flex-col flex-shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.01)]"
          >
            {/* Sidebar Header */}
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="font-semibold text-lg tracking-tight">Snow AI</span>
              </div>
            </div>

            {/* Sidebar Actions */}
            <div className="p-4">
              <button className="w-full flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm active:scale-[0.98]">
                <Plus size={18} />
                New Conversation
              </button>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
              <div>
                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Workspace</p>
                <div className="space-y-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                    <MessageSquare size={18} />
                    Current Chat
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg text-sm font-medium transition-colors">
                    <History size={18} />
                    Chat History
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg text-sm font-medium transition-colors">
                    <Folder size={18} />
                    Knowledge Base
                  </button>
                </div>
              </div>

              <div>
                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Recent</p>
                <div className="space-y-1">
                  {['Q2 Portfolio Analysis', 'Tax Deductions 2024', 'Mortgage Rate Comparison'].map((item, i) => (
                    <button key={i} className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg text-sm transition-colors text-left truncate">
                      <MessageSquare size={16} className="shrink-0 opacity-50" />
                      <span className="truncate">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-slate-100">
              <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                    <User size={18} className="text-slate-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-900">Alex Reed</p>
                    <p className="text-xs text-slate-500">Premium Plan</p>
                  </div>
                </div>
                <Settings size={18} className="text-slate-400" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col h-full min-w-0 relative">
        
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-slate-200/80 bg-white/50 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <IconButton 
              icon={<LayoutPanelLeft size={20} />} 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={sidebarOpen ? 'bg-slate-100 text-slate-900' : ''}
            />
            <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block"></div>
            
            {/* Model Selector */}
            <button className="hidden sm:flex items-center gap-2 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors group">
              <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Snow Pro</span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">GPT-4</span>
              <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <IconButton icon={<Search size={20} />} />
            <IconButton icon={<Bell size={20} />} />
            <div className="h-4 w-px bg-slate-300 mx-2"></div>
            <button 
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${rightPanelOpen ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <BarChart3 size={18} />
              <span className="hidden md:inline">Insights</span>
            </button>
          </div>
        </header>

        {/* Chat Workspace */}
        <div className="flex-1 overflow-y-auto relative scroll-smooth">
          
          {!chatStarted ? (
            /* Welcome / Empty State */
            <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-full">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                <Sparkles size={32} className="text-blue-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 text-center tracking-tight">
                Good morning, Alex
              </h1>
              <p className="text-lg text-slate-500 mb-12 text-center max-w-xl">
                I'm your intelligent financial assistant. How can we optimize your wealth today?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                {[
                  { title: 'Analyze Cash Flow', desc: 'Review this month\'s income vs expenses', icon: <TrendingUp size={20} className="text-emerald-500"/> },
                  { title: 'Portfolio Review', desc: 'Assess asset allocation and performance', icon: <PieChart size={20} className="text-blue-500"/> },
                  { title: 'Tax Optimization', desc: 'Identify potential deductions for 2024', icon: <Shield size={20} className="text-indigo-500"/> },
                  { title: 'Market Summary', desc: 'Get a brief on today\'s financial news', icon: <Search size={20} className="text-orange-500"/> },
                ].map((card, i) => (
                  <button 
                    key={i}
                    onClick={() => setChatStarted(true)}
                    className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all text-left group flex items-start gap-4"
                  >
                    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{card.title}</h3>
                      <p className="text-sm text-slate-500">{card.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Active Chat Thread */
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-32 space-y-8">
              
              {/* User Message */}
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-slate-900 text-white px-5 py-4 rounded-3xl rounded-tr-sm shadow-sm">
                  <p className="text-[15px] leading-relaxed">
                    Can you analyze my cash flow for the first half of the year? I feel like my expenses are creeping up.
                  </p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center shadow-sm mt-1">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div className="max-w-[85%] space-y-4">
                  <div className="bg-white border border-slate-200 px-5 py-4 rounded-3xl rounded-tl-sm shadow-sm text-slate-800 text-[15px] leading-relaxed">
                    <p className="mb-4">
                      Certainly, Alex. I've analyzed your connected accounts for H1. You're right to notice a trend; while your income remains strong, your expenses have increased by approximately <strong>12%</strong> since January.
                    </p>
                    
                    {/* Inline Rich Financial Widget */}
                    <div className="my-5 border border-slate-100 rounded-2xl p-5 bg-slate-50/50 shadow-inner">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 text-base">H1 Cash Flow Analysis</h4>
                          <p className="text-xs text-slate-500">Income vs. Expenses (Jan - Jun)</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium">
                          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Income</div>
                          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"></div> Expenses</div>
                        </div>
                      </div>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={cashFlowData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(val) => `$${val/1000}k`} />
                            <RechartsTooltip 
                              cursor={{fill: '#F1F5F9'}} 
                              contentStyle={{borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                            />
                            <Bar dataKey="income" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            <Bar dataKey="expenses" fill="#CBD5E1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <p className="mb-2"><strong>Key Insights:</strong></p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700">
                      <li>The spike in June expenses ($9,200) was primarily driven by the <strong>Travel & Entertainment</strong> category (summer vacation bookings).</li>
                      <li>Your baseline recurring expenses (housing, utilities, subscriptions) have remained stable.</li>
                      <li>Despite the increase in spending, you maintained a positive net cash flow of <strong>+$41,800</strong> over these 6 months.</li>
                    </ul>
                  </div>

                  {/* Contextual Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                      <Search size={16} /> Drill down into June
                    </button>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                      <PieChart size={16} /> Show category breakdown
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Input Area (Sticky Bottom) */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent pt-10 pb-6 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <GlassPanel className="rounded-2xl p-2 flex flex-col gap-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all shadow-lg">
              
              <textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Snow AI to analyze data, make a transfer, or forecast trends..."
                className="w-full max-h-48 min-h-[56px] resize-none bg-transparent border-none focus:outline-none px-4 pt-4 pb-2 text-[15px] text-slate-900 placeholder:text-slate-400"
                rows={1}
              />
              
              <div className="flex items-center justify-between px-2 pb-1">
                <div className="flex items-center gap-1">
                  <IconButton icon={<Paperclip size={18} />} className="hover:bg-slate-100" />
                  <IconButton icon={<Mic size={18} />} className="hover:bg-slate-100" />
                  <div className="h-4 w-px bg-slate-200 mx-1"></div>
                  <button className="text-xs font-medium text-slate-500 hover:text-slate-900 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors flex items-center gap-1">
                    <Zap size={14} className="text-blue-500" />
                    Deep Analysis
                  </button>
                </div>
                
                <button 
                  className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                    inputValue.length > 0 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={18} className={inputValue.length > 0 ? "ml-0.5" : ""} />
                </button>
              </div>
            </GlassPanel>
            <div className="text-center mt-3">
              <p className="text-[11px] text-slate-400 font-medium">
                Snow AI can make mistakes. Consider verifying important financial information.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* --- Right Contextual Panel --- */}
      <AnimatePresence>
        {rightPanelOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="h-full border-l border-slate-200 bg-white flex flex-col flex-shrink-0 z-20 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] hidden md:flex"
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Live Insights</h3>
              <button onClick={() => setRightPanelOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <ChevronDown size={20} className="rotate-90" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Mini Dashboard Widget */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900 mb-1">Total Net Worth</h4>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold tracking-tight">$1,245,600</span>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                    <TrendingUp size={12} className="mr-0.5" /> 8.4%
                  </span>
                </div>
                
                <div className="h-24 w-full -ml-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioData}>
                      <defs>
                        <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorNetWorth)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Connected Accounts */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-semibold text-slate-900">Accounts</h4>
                  <button className="text-xs font-medium text-blue-600 hover:text-blue-700">Manage</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Chase Sapphire', type: 'Credit Card', bal: '$4,230', icon: <CreditCard size={16}/> },
                    { name: 'Vanguard 401k', type: 'Investment', bal: '$842,000', icon: <Briefcase size={16}/> },
                    { name: 'BoA Checking', type: 'Cash', bal: '$24,500', icon: <ArrowRight size={16}/> },
                  ].map((acc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                          {acc.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 leading-tight">{acc.name}</p>
                          <p className="text-xs text-slate-500">{acc.type}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-slate-900">{acc.bal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Alerts */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-4">Smart Alerts</h4>
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3">
                  <div className="mt-0.5">
                    <Bell size={16} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-900 mb-1">Unusual Subscription</p>
                    <p className="text-xs text-orange-800 leading-relaxed">
                      Your "CloudServices Inc" charge increased by 45% this month. Want me to investigate?
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.aside>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple icon placeholder for the briefcase
const Briefcase = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)
