import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Plus, Bitcoin, ArrowRight } from 'lucide-react';

const btcHistory = [
  { t: '8AM', v: 43200 }, { t: '10AM', v: 44100 }, { t: '12PM', v: 43500 },
  { t: '2PM', v: 45200 }, { t: '4PM', v: 44800 }, { t: '6PM', v: 46100 }, { t: 'Now', v: 45830 },
];

const coins = [
  { name: 'Bitcoin', symbol: 'BTC', amount: 0.842, price: 45830, change: +3.24, value: 38589, color: '#F59E0B', icon: '₿' },
  { name: 'Ethereum', symbol: 'ETH', amount: 4.5, price: 2840, change: +1.87, value: 12780, color: '#6366F1', icon: 'Ξ' },
  { name: 'Solana', symbol: 'SOL', amount: 32, price: 162, change: +6.41, value: 5184, color: '#10B981', icon: '◎' },
  { name: 'Chainlink', symbol: 'LINK', amount: 120, price: 14.20, change: -2.10, value: 1704, color: '#3B82F6', icon: '⬡' },
  { name: 'Polygon', symbol: 'MATIC', amount: 2400, price: 0.58, change: -1.35, value: 1392, color: '#8B5CF6', icon: '⬟' },
];

const totalValue = coins.reduce((s, c) => s + c.value, 0);

export default function Crypto() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Crypto</h1>
          <p className="text-slate-500 mt-0.5">Your digital asset portfolio</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm shadow-orange-500/20">
          <Plus size={16} /> Buy Crypto
        </button>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative">
          <p className="text-white/80 text-sm font-medium mb-1">Total Crypto Value</p>
          <h2 className="text-5xl font-bold mb-2">${totalValue.toLocaleString()}</h2>
          <p className="text-white/80 flex items-center gap-1.5 text-sm font-medium">
            <TrendingUp size={16} /> +$1,842 (3.1%) today
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-slate-900">{coins[selected].name} ({coins[selected].symbol})</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-slate-900">${coins[selected].price.toLocaleString()}</span>
                <span className={`text-sm font-semibold flex items-center gap-0.5 ${coins[selected].change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {coins[selected].change >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {coins[selected].change >= 0 ? '+' : ''}{coins[selected].change}%
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              {['1D', '1W', '1M', '1Y'].map(t => (
                <button key={t} className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors">{t}</button>
              ))}
            </div>
          </div>
          <div className="h-52 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={btcHistory}>
                <defs>
                  <linearGradient id="cryptoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={coins[selected].color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={coins[selected].color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v: number) => [`$${v.toLocaleString()}`, coins[selected].symbol]} />
                <Area type="monotone" dataKey="v" stroke={coins[selected].color} strokeWidth={2.5} fill="url(#cryptoGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Holdings */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">My Holdings</h3>
          <div className="space-y-2">
            {coins.map((coin, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${selected === i ? 'bg-slate-50 ring-1 ring-slate-200' : 'hover:bg-slate-50'}`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-white flex-shrink-0" style={{ backgroundColor: coin.color }}>
                  {coin.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900">{coin.symbol}</p>
                  <p className="text-xs text-slate-400">{coin.amount} {coin.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">${coin.value.toLocaleString()}</p>
                  <p className={`text-xs font-semibold ${coin.change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {coin.change >= 0 ? '+' : ''}{coin.change}%
                  </p>
                </div>
              </button>
            ))}
          </div>
          <button className="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
            Add Asset <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
