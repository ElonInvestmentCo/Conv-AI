import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight, ArrowDownLeft, Plus, Eye, EyeOff,
  Send, Download, ArrowLeftRight, Wallet as WalletIcon,
  TrendingUp, Shield, Clock, CheckCircle2
} from 'lucide-react';

const accounts = [
  { name: 'Primary Checking', bank: 'Bank of America', balance: 24500, number: '****4821', color: 'from-blue-600 to-indigo-700', type: 'Checking' },
  { name: 'High-Yield Savings', bank: 'Marcus by Goldman', balance: 58200, number: '****3390', color: 'from-emerald-500 to-teal-600', type: 'Savings' },
  { name: 'Investment Account', bank: 'Fidelity', balance: 142500, number: '****7712', color: 'from-purple-600 to-pink-600', type: 'Investment' },
];

const recentActivity = [
  { name: 'Transfer to Savings', amount: -2000, date: 'Today, 9:41 AM', status: 'completed', icon: '→' },
  { name: 'Direct Deposit', amount: +8200, date: 'Today, 8:00 AM', status: 'completed', icon: '↓' },
  { name: 'Zelle to Sarah', amount: -350, date: 'Yesterday, 3:12 PM', status: 'completed', icon: '→' },
  { name: 'ATM Withdrawal', amount: -200, date: 'Jul 20, 11:30 AM', status: 'completed', icon: '↓' },
  { name: 'Interest Credit', amount: +48.20, date: 'Jul 19, 12:00 PM', status: 'completed', icon: '↓' },
];

const quickActions = [
  { label: 'Send', icon: Send, color: 'bg-blue-50 text-blue-600' },
  { label: 'Receive', icon: Download, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Transfer', icon: ArrowLeftRight, color: 'bg-purple-50 text-purple-600' },
  { label: 'Top Up', icon: Plus, color: 'bg-orange-50 text-orange-600' },
];

export default function Wallet() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeCard, setActiveCard] = useState(0);
  const total = accounts.reduce((s, a) => s + a.balance, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Wallet</h1>
          <p className="text-slate-500 mt-0.5">Manage your accounts and transfers</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm shadow-blue-500/20">
          <Plus size={16} /> Add Account
        </button>
      </div>

      {/* Total Balance Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-medium">Total Balance</p>
            <button onClick={() => setShowBalance(!showBalance)} className="text-slate-400 hover:text-white transition-colors">
              {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-6">
            {showBalance ? `$${total.toLocaleString()}` : '••••••••'}
          </h2>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-slate-400 text-xs mb-1">Income this month</p>
              <p className="text-emerald-400 font-semibold flex items-center gap-1"><ArrowDownLeft size={14} /> $18,400</p>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <p className="text-slate-400 text-xs mb-1">Spent this month</p>
              <p className="text-red-400 font-semibold flex items-center gap-1"><ArrowUpRight size={14} /> $9,200</p>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <p className="text-slate-400 text-xs mb-1">Net savings</p>
              <p className="text-blue-400 font-semibold flex items-center gap-1"><TrendingUp size={14} /> $9,200</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((a) => {
          const Icon = a.icon;
          return (
            <button key={a.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col items-center gap-3 group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${a.color} group-hover:scale-110 transition-transform`}>
                <Icon size={22} />
              </div>
              <span className="text-sm font-semibold text-slate-700">{a.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Cards */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900">Your Accounts</h3>
          {accounts.map((acc, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01 }}
              onClick={() => setActiveCard(i)}
              className={`bg-gradient-to-br ${acc.color} rounded-2xl p-5 text-white cursor-pointer shadow-md transition-all ${activeCard === i ? 'ring-2 ring-offset-2 ring-blue-400' : ''}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-white/70 text-xs font-medium">{acc.type}</p>
                  <p className="font-bold text-lg mt-0.5">{acc.name}</p>
                </div>
                <WalletIcon size={22} className="text-white/60" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/60 text-xs mb-1">{acc.bank} · {acc.number}</p>
                  <p className="text-2xl font-bold">${acc.balance.toLocaleString()}</p>
                </div>
                <Shield size={18} className="text-white/50" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">See all</button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((tx, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${tx.amount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{tx.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock size={11} /> {tx.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </p>
                  <p className="text-xs text-emerald-500 flex items-center gap-0.5 justify-end mt-0.5">
                    <CheckCircle2 size={11} /> {tx.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
