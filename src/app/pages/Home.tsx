import React from 'react';
import { NavLink } from 'react-router';
import { motion } from 'motion/react';
import {
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft,
  Sparkles, CreditCard, Wallet, PieChart, BarChart3,
  ArrowRight, Shield, Zap, Bell, DollarSign
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const portfolioData = [
  { month: 'Jan', value: 980000 },
  { month: 'Feb', value: 1020000 },
  { month: 'Mar', value: 995000 },
  { month: 'Apr', value: 1080000 },
  { month: 'May', value: 1150000 },
  { month: 'Jun', value: 1245600 },
];

const spendingData = [
  { day: 'Mon', amount: 340 },
  { day: 'Tue', amount: 180 },
  { day: 'Wed', amount: 520 },
  { day: 'Thu', amount: 290 },
  { day: 'Fri', amount: 670 },
  { day: 'Sat', amount: 420 },
  { day: 'Sun', amount: 150 },
];

const recentTransactions = [
  { name: 'Netflix', category: 'Subscriptions', amount: -15.99, icon: '🎬', color: 'bg-red-50', time: '2 min ago' },
  { name: 'Whole Foods', category: 'Groceries', amount: -127.40, icon: '🛒', color: 'bg-green-50', time: '1 hr ago' },
  { name: 'Salary Deposit', category: 'Income', amount: +8200.00, icon: '💰', color: 'bg-blue-50', time: '8 hrs ago' },
  { name: 'Uber', category: 'Transport', amount: -24.50, icon: '🚗', color: 'bg-purple-50', time: 'Yesterday' },
  { name: 'Apple Store', category: 'Shopping', amount: -299.00, icon: '🍎', color: 'bg-slate-50', time: 'Yesterday' },
];

const quickActions = [
  { label: 'Send Money', icon: ArrowUpRight, color: 'text-blue-600 bg-blue-50', path: '/wallet' },
  { label: 'Pay Bills', icon: CreditCard, color: 'text-purple-600 bg-purple-50', path: '/cards' },
  { label: 'Invest', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50', path: '/investments' },
  { label: 'Budget', icon: PieChart, color: 'text-orange-600 bg-orange-50', path: '/budget' },
];

const StatCard = ({ title, value, change, positive, icon, gradient }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${gradient}`}>
        {icon}
      </div>
      <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${positive ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
        {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {change}
      </span>
    </div>
    <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
    <p className="text-sm text-slate-500 mt-1">{title}</p>
  </motion.div>
);

export default function Home() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good morning, Alex 👋</h1>
          <p className="text-slate-500 mt-1">Here's your financial overview for today.</p>
        </div>
        <NavLink
          to="/chat"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md shadow-blue-500/25"
        >
          <Sparkles size={16} />
          Ask Snow AI
        </NavLink>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Net Worth"
          value="$1,245,600"
          change="+8.4%"
          positive={true}
          icon={<DollarSign size={20} className="text-blue-600" />}
          gradient="bg-blue-50"
        />
        <StatCard
          title="Monthly Income"
          value="$18,400"
          change="+14.2%"
          positive={true}
          icon={<ArrowDownLeft size={20} className="text-emerald-600" />}
          gradient="bg-emerald-50"
        />
        <StatCard
          title="Monthly Spend"
          value="$9,200"
          change="+12.1%"
          positive={false}
          icon={<ArrowUpRight size={20} className="text-red-500" />}
          gradient="bg-red-50"
        />
        <StatCard
          title="Savings Rate"
          value="50.0%"
          change="+2.3%"
          positive={true}
          icon={<Shield size={20} className="text-purple-600" />}
          gradient="bg-purple-50"
        />
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Net Worth Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Net Worth Growth</h3>
              <p className="text-sm text-slate-500 mt-0.5">Last 6 months</p>
            </div>
            <NavLink to="/reports" className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              View Report <ArrowRight size={14} />
            </NavLink>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="netWorthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} tickFormatter={v => `$${(v/1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, 'Net Worth']}
                />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2.5} fill="url(#netWorthGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Spending */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Weekly Spending</h3>
              <p className="text-sm text-slate-500 mt-0.5">This week</p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} tickFormatter={v => `$${v}`} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(v: number) => [`$${v}`, 'Spent']}
                />
                <Bar dataKey="amount" fill="#818CF8" radius={[6, 6, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions + Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <NavLink
                  key={action.label}
                  to={action.path}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-medium text-slate-700 text-center">{action.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* AI Banner */}
          <NavLink
            to="/chat"
            className="mt-4 flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-blue-900">Ask Snow AI</p>
              <p className="text-xs text-blue-600 truncate">Get instant financial insights</p>
            </div>
            <Zap size={16} className="text-blue-500 group-hover:text-blue-700" />
          </NavLink>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Recent Transactions</h3>
            <NavLink to="/transactions" className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              See all <ArrowRight size={14} />
            </NavLink>
          </div>
          <div className="space-y-2">
            {recentTransactions.map((tx, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className={`w-10 h-10 rounded-xl ${tx.color} flex items-center justify-center text-lg flex-shrink-0`}>
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{tx.name}</p>
                  <p className="text-xs text-slate-400">{tx.category} · {tx.time}</p>
                </div>
                <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Alert */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
          <Bell size={20} className="text-amber-600" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-amber-900">Snow AI Alert: Subscription Spike</p>
          <p className="text-sm text-amber-700 mt-0.5">Your "CloudServices Inc" charge increased by 45% this month ($29 → $42). This may be worth reviewing.</p>
        </div>
        <NavLink to="/chat" className="text-sm font-semibold text-amber-700 hover:text-amber-900 whitespace-nowrap flex items-center gap-1">
          Investigate <ArrowRight size={14} />
        </NavLink>
      </div>
    </div>
  );
}
