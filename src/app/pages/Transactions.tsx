import React, { useState } from 'react';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, ChevronDown } from 'lucide-react';

const categories = ['All', 'Income', 'Shopping', 'Food', 'Transport', 'Subscriptions', 'Health', 'Travel'];

const transactions = [
  { name: 'Salary Deposit', category: 'Income', amount: +8200, date: 'Jul 22, 2026', icon: '💰', color: 'bg-emerald-50', merchant: 'Employer Inc.' },
  { name: 'Netflix', category: 'Subscriptions', amount: -15.99, date: 'Jul 22, 2026', icon: '🎬', color: 'bg-red-50', merchant: 'Netflix LLC' },
  { name: 'Whole Foods', category: 'Food', amount: -127.40, date: 'Jul 22, 2026', icon: '🛒', color: 'bg-green-50', merchant: 'Whole Foods Market' },
  { name: 'Uber', category: 'Transport', amount: -24.50, date: 'Jul 21, 2026', icon: '🚗', color: 'bg-purple-50', merchant: 'Uber Technologies' },
  { name: 'Apple Store', category: 'Shopping', amount: -299.00, date: 'Jul 21, 2026', icon: '🍎', color: 'bg-slate-50', merchant: 'Apple Inc.' },
  { name: 'Spotify', category: 'Subscriptions', amount: -9.99, date: 'Jul 20, 2026', icon: '🎵', color: 'bg-green-50', merchant: 'Spotify AB' },
  { name: 'CVS Pharmacy', category: 'Health', amount: -43.20, date: 'Jul 20, 2026', icon: '💊', color: 'bg-blue-50', merchant: 'CVS Health' },
  { name: 'Delta Airlines', category: 'Travel', amount: -640.00, date: 'Jul 19, 2026', icon: '✈️', color: 'bg-sky-50', merchant: 'Delta Air Lines' },
  { name: 'Amazon', category: 'Shopping', amount: -89.97, date: 'Jul 18, 2026', icon: '📦', color: 'bg-yellow-50', merchant: 'Amazon.com' },
  { name: 'Freelance Payment', category: 'Income', amount: +1500.00, date: 'Jul 17, 2026', icon: '💸', color: 'bg-emerald-50', merchant: 'Client Corp' },
  { name: 'Gym Membership', category: 'Health', amount: -45.00, date: 'Jul 16, 2026', icon: '🏋️', color: 'bg-orange-50', merchant: 'Equinox Fitness' },
  { name: 'Starbucks', category: 'Food', amount: -7.45, date: 'Jul 16, 2026', icon: '☕', color: 'bg-green-50', merchant: 'Starbucks Corp' },
  { name: 'Google One', category: 'Subscriptions', amount: -2.99, date: 'Jul 15, 2026', icon: '☁️', color: 'bg-blue-50', merchant: 'Google LLC' },
  { name: 'Airbnb', category: 'Travel', amount: -320.00, date: 'Jul 14, 2026', icon: '🏠', color: 'bg-rose-50', merchant: 'Airbnb Inc.' },
  { name: 'Dividend Income', category: 'Income', amount: +248.50, date: 'Jul 12, 2026', icon: '📈', color: 'bg-emerald-50', merchant: 'Fidelity Investments' },
];

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = transactions.filter(tx => {
    const matchesSearch = tx.name.toLowerCase().includes(search.toLowerCase()) || tx.merchant.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tx.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const totalIn = filtered.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalOut = filtered.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-500 mt-0.5">All your financial activity in one place</p>
        </div>
        <button className="flex items-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-all bg-white shadow-sm">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-2">Total In</p>
          <p className="text-2xl font-bold text-emerald-600">+${totalIn.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-slate-400 mt-1">{filtered.filter(t => t.amount > 0).length} transactions</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-2">Total Out</p>
          <p className="text-2xl font-bold text-red-500">-${totalOut.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-slate-400 mt-1">{filtered.filter(t => t.amount < 0).length} transactions</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-2">Net Cash Flow</p>
          <p className={`text-2xl font-bold ${totalIn - totalOut > 0 ? 'text-blue-600' : 'text-red-500'}`}>
            {totalIn - totalOut > 0 ? '+' : ''}${(totalIn - totalOut).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-400 mt-1">{filtered.length} total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:border-slate-300 transition-all">
            <Filter size={15} /> Filter <ChevronDown size={14} />
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 grid grid-cols-[1fr_auto_auto] gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Transaction</span>
          <span>Date</span>
          <span className="text-right">Amount</span>
        </div>
        <div className="divide-y divide-slate-50">
          {filtered.map((tx, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className={`w-10 h-10 rounded-xl ${tx.color} flex items-center justify-center text-lg flex-shrink-0`}>
                {tx.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{tx.name}</p>
                <p className="text-xs text-slate-400">{tx.merchant} · {tx.category}</p>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">{tx.date}</span>
              <div className="flex items-center gap-1.5 min-w-[90px] justify-end">
                {tx.amount > 0
                  ? <ArrowDownLeft size={14} className="text-emerald-500" />
                  : <ArrowUpRight size={14} className="text-red-400" />}
                <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
