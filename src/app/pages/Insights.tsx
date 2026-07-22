import React from 'react';
import { NavLink } from 'react-router';
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, ArrowRight, Sparkles, Zap, Target, Shield } from 'lucide-react';

const insights = [
  {
    type: 'opportunity',
    icon: <TrendingUp size={18} className="text-emerald-600" />,
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    badge: 'Opportunity',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    title: 'Boost savings rate by 8%',
    body: 'Your subscriptions total $94/mo but your budget allows $150. Redirecting the $56 surplus to your high-yield savings account would add ~$672/year at current APY.',
    action: 'Set up auto-transfer',
    path: '/wallet',
  },
  {
    type: 'alert',
    icon: <AlertTriangle size={18} className="text-amber-600" />,
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    badge: 'Alert',
    badgeColor: 'bg-amber-100 text-amber-700',
    title: 'Travel & Entertainment budget exceeded',
    body: "You've spent $960 on Travel this month against a $500 budget — 92% over. Summer bookings drove most of this. Consider adjusting the budget or deferring discretionary travel.",
    action: 'Adjust budget',
    path: '/budget',
  },
  {
    type: 'tip',
    icon: <Shield size={18} className="text-blue-600" />,
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    badge: 'Tax Tip',
    badgeColor: 'bg-blue-100 text-blue-700',
    title: 'Max out your 401(k) to save ~$5,500 in taxes',
    body: "You've contributed $14,200 of your $23,500 annual limit. Increasing contributions by $450/mo through December would fully max out your 401(k) and reduce your 2026 taxable income.",
    action: 'Review contributions',
    path: '/investments',
  },
  {
    type: 'win',
    icon: <CheckCircle2 size={18} className="text-purple-600" />,
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    badge: 'Win',
    badgeColor: 'bg-purple-100 text-purple-700',
    title: 'Net worth crossed $1.25M milestone',
    body: 'Your portfolio grew 28.7% YTD, outperforming the S&P 500 by 6.2pp. NVIDIA and your Vanguard S&P 500 ETF were the top contributors this quarter.',
    action: 'View portfolio',
    path: '/investments',
  },
  {
    type: 'opportunity',
    icon: <Target size={18} className="text-indigo-600" />,
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    badge: 'Opportunity',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    title: 'Refinance could save $340/month',
    body: 'Current 30-yr fixed rates have dropped 0.6% since your mortgage was originated. Refinancing your $420k balance could save ~$340/month and reduce total interest by $87,000.',
    action: 'Explore refinancing',
    path: '/reports',
  },
  {
    type: 'tip',
    icon: <Zap size={18} className="text-orange-600" />,
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    badge: 'AI Tip',
    badgeColor: 'bg-orange-100 text-orange-700',
    title: 'Use Chase Sapphire for Delta bookings',
    body: "Your upcoming travel could earn 3x points on Chase Sapphire instead of 1x on your Apple Card. Based on your spending pattern, you'd earn ~$240 more in rewards per quarter.",
    action: 'View cards',
    path: '/cards',
  },
];

const metrics = [
  { label: 'Insights Generated', value: '24', sub: 'This month', icon: <Lightbulb size={18} className="text-yellow-500" /> },
  { label: 'Potential Savings', value: '$1,620', sub: 'Identified', icon: <Target size={18} className="text-emerald-500" /> },
  { label: 'Alerts Active', value: '3', sub: 'Need attention', icon: <AlertTriangle size={18} className="text-amber-500" /> },
  { label: 'AI Score', value: '87/100', sub: 'Financial health', icon: <Sparkles size={18} className="text-blue-500" /> },
];

export default function Insights() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Insights</h1>
          <p className="text-slate-500 mt-0.5">Personalized recommendations powered by Snow AI</p>
        </div>
        <NavLink to="/chat" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm shadow-blue-500/20">
          <Sparkles size={16} /> Ask Snow AI
        </NavLink>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              {m.icon}
              <p className="text-xs text-slate-500 font-medium">{m.label}</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{m.value}</p>
            <p className="text-xs text-slate-400 mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Insights list */}
      <div className="space-y-4">
        {insights.map((insight, i) => (
          <div key={i} className={`${insight.bg} border ${insight.border} rounded-2xl p-5`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl ${insight.bg} border ${insight.border} flex items-center justify-center flex-shrink-0 bg-white/80`}>
                {insight.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${insight.badgeColor}`}>{insight.badge}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{insight.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{insight.body}</p>
                <NavLink
                  to={insight.path}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:opacity-70 transition-opacity"
                >
                  {insight.action} <ArrowRight size={14} />
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
