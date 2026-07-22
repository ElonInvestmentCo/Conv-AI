import React from 'react';
import { Building2, Plus, TrendingUp, TrendingDown, ArrowRight, CheckCircle2, Link } from 'lucide-react';

const accounts = [
  { name: 'BoA Checking', type: 'Checking', bank: 'Bank of America', balance: 24500, change: +1200, icon: '🏦', status: 'connected', color: 'bg-red-50' },
  { name: 'Marcus Savings', type: 'High-Yield Savings', bank: 'Goldman Sachs', balance: 58200, change: +48.20, icon: '💰', status: 'connected', color: 'bg-emerald-50' },
  { name: 'Fidelity 401(k)', type: 'Retirement', bank: 'Fidelity Investments', balance: 842000, change: +6800, icon: '📈', status: 'connected', color: 'bg-blue-50' },
  { name: 'Vanguard Brokerage', type: 'Investment', bank: 'Vanguard', balance: 200500, change: +3200, icon: '📊', status: 'connected', color: 'bg-purple-50' },
  { name: 'HSA Account', type: 'Health Savings', bank: 'Optum Bank', balance: 4800, change: +150, icon: '❤️', status: 'connected', color: 'bg-pink-50' },
  { name: 'PayPal Balance', type: 'Digital Wallet', bank: 'PayPal', balance: 340, change: -80, icon: '💳', status: 'connected', color: 'bg-sky-50' },
];

const banks = ['Chase', 'Wells Fargo', 'Citibank', 'US Bank', 'TD Bank', 'Capital One'];

export default function Accounts() {
  const total = accounts.reduce((s, a) => s + a.balance, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Accounts</h1>
          <p className="text-slate-500 mt-0.5">All your connected financial accounts</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm shadow-blue-500/20">
          <Plus size={16} /> Link Account
        </button>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-1">Total Across All Accounts</p>
          <p className="text-4xl font-bold">${total.toLocaleString()}</p>
          <p className="text-emerald-400 text-sm font-medium mt-1 flex items-center gap-1">
            <TrendingUp size={14} /> +$11,318.20 this month
          </p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm mb-1">Accounts Connected</p>
          <p className="text-3xl font-bold">{accounts.length}</p>
          <p className="text-slate-400 text-xs mt-1">All synced</p>
        </div>
      </div>

      {/* Account cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {accounts.map((acc, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl ${acc.color} flex items-center justify-center text-xl flex-shrink-0`}>
                {acc.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{acc.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{acc.bank} · {acc.type}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={10} /> Synced
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xl font-bold text-slate-900">${acc.balance.toLocaleString()}</p>
                  <span className={`flex items-center gap-1 text-sm font-semibold ${acc.change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {acc.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {acc.change >= 0 ? '+' : ''}{acc.change.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add more banks */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Connect More Banks</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">View all <ArrowRight size={14} /></button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {banks.map(bank => (
            <button key={bank} className="flex flex-col items-center gap-2 p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-100">
                <Building2 size={18} className="text-slate-500 group-hover:text-blue-600" />
              </div>
              <span className="text-xs font-medium text-slate-600 group-hover:text-blue-700 text-center">{bank}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <Link size={12} />
          Powered by Plaid · Bank-level 256-bit encryption · Read-only access
        </div>
      </div>
    </div>
  );
}
