import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Plus, TrendingDown, AlertTriangle, CheckCircle2, Target } from 'lucide-react';

const budgets = [
  { category: 'Housing', budgeted: 3000, spent: 2800, icon: '🏠', color: '#3B82F6' },
  { category: 'Food & Dining', budgeted: 800, spent: 920, icon: '🍽️', color: '#F59E0B' },
  { category: 'Transport', budgeted: 400, spent: 285, icon: '🚗', color: '#10B981' },
  { category: 'Shopping', budgeted: 600, spent: 748, icon: '🛍️', color: '#8B5CF6' },
  { category: 'Subscriptions', budgeted: 150, spent: 94, icon: '📱', color: '#EC4899' },
  { category: 'Health', budgeted: 300, spent: 180, icon: '❤️', color: '#EF4444' },
  { category: 'Travel', budgeted: 500, spent: 960, icon: '✈️', color: '#06B6D4' },
  { category: 'Entertainment', budgeted: 200, spent: 134, icon: '🎭', color: '#F97316' },
];

const pieData = budgets.map(b => ({ name: b.category, value: b.spent, color: b.color }));

export default function Budget() {
  const totalBudgeted = budgets.reduce((s, b) => s + b.budgeted, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const overBudget = budgets.filter(b => b.spent > b.budgeted);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Budget</h1>
          <p className="text-slate-500 mt-0.5">Track and manage your spending limits</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm shadow-blue-500/20">
          <Plus size={16} /> New Category
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-blue-500" />
            <p className="text-xs text-slate-500 font-medium">Total Budget</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">${totalBudgeted.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-1">Monthly limit</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={16} className="text-emerald-500" />
            <p className="text-xs text-slate-500 font-medium">Total Spent</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">${totalSpent.toLocaleString()}</p>
          <p className={`text-xs mt-1 font-medium ${totalSpent > totalBudgeted ? 'text-red-500' : 'text-emerald-500'}`}>
            {totalSpent > totalBudgeted ? `$${(totalSpent - totalBudgeted).toFixed(0)} over budget` : `$${(totalBudgeted - totalSpent).toFixed(0)} remaining`}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-amber-500" />
            <p className="text-xs text-slate-500 font-medium">Over Budget</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{overBudget.length}</p>
          <p className="text-xs text-slate-400 mt-1">Categories exceeded</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie chart */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Spending Breakdown</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`$${v}`, '']} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {budgets.slice(0, 4).map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }} />
                <span className="text-xs text-slate-600 flex-1">{b.category}</span>
                <span className="text-xs font-semibold text-slate-900">${b.spent}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget bars */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5">Category Breakdown</h3>
          <div className="space-y-5">
            {budgets.map((b, i) => {
              const pct = Math.min((b.spent / b.budgeted) * 100, 100);
              const over = b.spent > b.budgeted;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{b.icon}</span>
                      <span className="text-sm font-semibold text-slate-900">{b.category}</span>
                      {over
                        ? <span className="text-[10px] font-bold bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full">Over</span>
                        : pct > 80 ? <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full">Near limit</span>
                        : <CheckCircle2 size={13} className="text-emerald-500" />}
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${over ? 'text-red-600' : 'text-slate-900'}`}>${b.spent}</span>
                      <span className="text-xs text-slate-400"> / ${b.budgeted}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: over ? '#EF4444' : pct > 80 ? '#F59E0B' : b.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
