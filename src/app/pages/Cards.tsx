import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Eye, EyeOff, Lock, Unlock, Plus, ArrowUpRight, Shield, Zap } from 'lucide-react';

const cards = [
  {
    name: 'Chase Sapphire Reserve',
    number: '4821',
    holder: 'ALEX REED',
    expiry: '09/28',
    balance: 4230,
    limit: 20000,
    color: 'from-slate-800 to-slate-900',
    accent: 'from-blue-600/30',
    type: 'Visa',
    rewards: '3x Travel',
    frozen: false,
  },
  {
    name: 'Amex Platinum',
    number: '3390',
    holder: 'ALEX REED',
    expiry: '04/27',
    balance: 1840,
    limit: 50000,
    color: 'from-amber-700 to-yellow-800',
    accent: 'from-yellow-400/20',
    type: 'Amex',
    rewards: '5x Flights',
    frozen: false,
  },
  {
    name: 'Apple Card',
    number: '7712',
    holder: 'ALEX REED',
    expiry: '11/26',
    balance: 620,
    limit: 8000,
    color: 'from-zinc-400 to-zinc-600',
    accent: 'from-white/10',
    type: 'Mastercard',
    rewards: '2% Cash Back',
    frozen: true,
  },
];

const recentSpend = [
  { name: 'Delta Airlines', amount: -640, card: '4821', icon: '✈️' },
  { name: 'Whole Foods', amount: -127, card: '4821', icon: '🛒' },
  { name: 'Apple Store', amount: -299, card: '3390', icon: '🍎' },
  { name: 'Netflix', amount: -16, card: '7712', icon: '🎬' },
];

export default function Cards() {
  const [showDetails, setShowDetails] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [frozenState, setFrozenState] = useState(cards.map(c => c.frozen));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cards</h1>
          <p className="text-slate-500 mt-0.5">Manage your payment cards</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm shadow-blue-500/20">
          <Plus size={16} /> Add Card
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Cards display */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setActiveCard(i)}
                className={`flex-shrink-0 w-72 bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white cursor-pointer shadow-xl relative overflow-hidden transition-all ${activeCard === i ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
              >
                <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${card.accent} to-transparent`} />
                <div className="relative">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-white/60 text-xs">{card.type}</p>
                      <p className="font-bold text-sm mt-0.5">{card.name}</p>
                    </div>
                    <CreditCard size={22} className="text-white/50" />
                  </div>
                  <p className="font-mono text-lg tracking-widest mb-4">
                    •••• •••• •••• {card.number}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-wider">Card Holder</p>
                      <p className="text-sm font-semibold mt-0.5">{card.holder}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/50 text-[10px] uppercase tracking-wider">Expires</p>
                      <p className="text-sm font-semibold mt-0.5">{card.expiry}</p>
                    </div>
                  </div>
                </div>
                {frozenState[i] && (
                  <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Lock size={28} />
                      <p className="text-sm font-bold">Card Frozen</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Card Controls */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">{cards[activeCard].name}</h3>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${frozenState[activeCard] ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
                {frozenState[activeCard] ? 'Frozen' : 'Active'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Balance</p>
                <p className="text-lg font-bold text-slate-900">${cards[activeCard].balance.toLocaleString()}</p>
                <p className="text-xs text-slate-400">of ${cards[activeCard].limit.toLocaleString()} limit</p>
                <div className="h-1.5 bg-slate-200 rounded-full mt-2">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(cards[activeCard].balance / cards[activeCard].limit) * 100}%` }} />
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Rewards</p>
                <p className="text-lg font-bold text-slate-900">{cards[activeCard].rewards}</p>
                <p className="text-xs text-emerald-600 font-medium mt-0.5">1,240 pts earned</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { const s = [...frozenState]; s[activeCard] = !s[activeCard]; setFrozenState(s); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${frozenState[activeCard] ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
              >
                {frozenState[activeCard] ? <Unlock size={15} /> : <Lock size={15} />}
                {frozenState[activeCard] ? 'Unfreeze Card' : 'Freeze Card'}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-semibold transition-all">
                <Shield size={15} /> Security
              </button>
            </div>
          </div>
        </div>

        {/* Spending summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Recent Transactions</h3>
            <div className="space-y-2">
              {recentSpend.map((tx, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-base">{tx.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{tx.name}</p>
                    <p className="text-xs text-slate-400">••{tx.card}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900">${Math.abs(tx.amount)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-blue-600" />
              <p className="font-semibold text-blue-900 text-sm">AI Tip</p>
            </div>
            <p className="text-sm text-blue-800">Use your Chase Sapphire for travel bookings to earn 3x points. You could earn ~$240 extra in rewards this quarter.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
