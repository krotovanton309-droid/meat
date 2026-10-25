import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import {
  DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Wallet, CreditCard, PiggyBank, Receipt
} from 'lucide-react';
import { financeRecords, salesOrders, purchaseOrders, formatMoney } from '../data/mockData';

type Tab = 'overview' | 'transactions' | 'analytics';

export default function Finance() {
  const [tab, setTab] = useState<Tab>('overview');

  // Calculate financials
  const totalIncome = financeRecords.filter(f => f.type === 'income').reduce((s, f) => s + f.amount, 0);
  const totalExpense = financeRecords.filter(f => f.type === 'expense').reduce((s, f) => s + f.amount, 0);
  const netProfit = totalIncome - totalExpense;
  const profitMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100) : 0;

  const accountsReceivable = salesOrders
    .filter(o => o.status !== 'completed' || o.paymentStatus !== 'paid')
    .reduce((s, o) => s + o.totalAmount, 0);

  const accountsPayable = purchaseOrders
    .filter(o => o.status !== 'delivered')
    .reduce((s, o) => s + o.totalAmount, 0);

  // Chart data
  const cashFlowData = [
    { day: '01.01', income: 0, expense: 350000 },
    { day: '05.01', income: 0, expense: 180000 },
    { day: '08.01', income: 0, expense: 65000 },
    { day: '10.01', income: 450000, expense: 5200000 },
    { day: '11.01', income: 0, expense: 0 },
    { day: '12.01', income: 0, expense: 1400000 },
    { day: '13.01', income: 1590000, expense: 95000 },
    { day: '14.01', income: 620000, expense: 0 },
  ];

  const expenseByCategory = [
    { name: 'Закупки', value: 6600000, color: '#dc2626' },
    { name: 'Зарплата', value: 850000, color: '#f59e0b' },
    { name: 'Аренда', value: 350000, color: '#2563eb' },
    { name: 'Коммунальные', value: 180000, color: '#7c3aed' },
    { name: 'Логистика', value: 95000, color: '#0891b2' },
    { name: 'Обслуживание', value: 65000, color: '#16a34a' },
  ];

  const marginData = [
    { product: 'Докторская', revenue: 48000, cost: 35000, margin: 27 },
    { product: 'Краковская', revenue: 62000, cost: 45000, margin: 27 },
    { product: 'Молочные', revenue: 42000, cost: 30000, margin: 29 },
    { product: 'Фарш гов.', revenue: 65000, cost: 48000, margin: 26 },
    { product: 'Фарш дом.', revenue: 55000, cost: 42000, margin: 24 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Финансы</h1>
          <p className="text-sm text-slate-500">Доходы, расходы, маржинальность и движение денег</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">
            <Receipt className="w-4 h-4" />
            Экспорт
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-slate-100 w-fit">
        {[
          { id: 'overview' as Tab, label: 'Обзор' },
          { id: 'transactions' as Tab, label: 'Операции' },
          { id: 'analytics' as Tab, label: 'Аналитика' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-red-50 text-red-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-green-100 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600">
                  <ArrowUpRight className="w-3 h-3" />
                  +12%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-slate-800">{formatMoney(totalIncome)}</p>
                <p className="text-sm text-slate-500 mt-1">Доходы за месяц</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-red-100 text-red-600">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-red-50 text-red-600">
                  <ArrowDownRight className="w-3 h-3" />
                  +8%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-slate-800">{formatMoney(totalExpense)}</p>
                <p className="text-sm text-slate-500 mt-1">Расходы за месяц</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
                  <PiggyBank className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                  {profitMargin.toFixed(1)}%
                </div>
              </div>
              <div className="mt-4">
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {formatMoney(Math.abs(netProfit))}
                </p>
                <p className="text-sm text-slate-500 mt-1">{netProfit >= 0 ? 'Чистая прибыль' : 'Убыток'}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600">
                  <Wallet className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-slate-800">{formatMoney(accountsReceivable)}</p>
                <p className="text-sm text-slate-500 mt-1">Дебиторская задолженность</p>
                <p className="text-xs text-amber-600 mt-1">К оплате: {formatMoney(accountsPayable)}</p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4">Движение денежных средств</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `${(v / 100000).toFixed(0)}00к`} />
                  <Tooltip formatter={(v: number) => formatMoney(v)} />
                  <Legend />
                  <Bar dataKey="income" fill="#16a34a" name="Доходы" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="#dc2626" name="Расходы" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4">Структура расходов</h3>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="50%" height={220}>
                  <PieChart>
                    <Pie data={expenseByCategory} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value">
                      {expenseByCategory.map((item, i) => <Cell key={i} fill={item.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatMoney(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2.5">
                  {expenseByCategory.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{item.name}</p>
                        <p className="text-xs text-slate-400">{formatMoney(item.value)}</p>
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        {((item.value / totalExpense) * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Margin Analysis */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Маржинальность по продуктам</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="product" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `${(v / 100).toFixed(0)}₽`} />
                <Tooltip formatter={(v: number) => formatMoney(v)} />
                <Legend />
                <Bar dataKey="revenue" fill="#16a34a" name="Цена продажи" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" fill="#dc2626" name="Себестоимость" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {tab === 'transactions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Тип</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Категория</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Описание</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Документ</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {financeRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(f => (
                  <tr key={f.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3 text-sm text-slate-600">{f.date}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${f.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {f.type === 'income' ? 'Доход' : 'Расход'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-600">{f.category}</td>
                    <td className="px-5 py-3 text-sm text-slate-800">{f.description}</td>
                    <td className="px-5 py-3 text-sm font-mono text-slate-500">{f.documentRef || '—'}</td>
                    <td className={`px-5 py-3 text-sm font-bold text-right ${f.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {f.type === 'income' ? '+' : '−'}{formatMoney(f.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200 bg-slate-50">
                  <td colSpan={5} className="px-5 py-3 text-sm font-semibold text-slate-700 text-right">Итого:</td>
                  <td className={`px-5 py-3 text-sm font-bold text-right ${netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {formatMoney(netProfit)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {tab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h4 className="text-sm font-medium text-slate-500 mb-2">Средний чек</h4>
              <p className="text-2xl font-bold text-slate-800">{formatMoney(702500)}</p>
              <p className="text-xs text-green-600 mt-1">+5.3% к прошл. месяцу</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h4 className="text-sm font-medium text-slate-500 mb-2">Рентабельность</h4>
              <p className="text-2xl font-bold text-slate-800">{profitMargin.toFixed(1)}%</p>
              <p className="text-xs text-green-600 mt-1">В пределах нормы</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h4 className="text-sm font-medium text-slate-500 mb-2">Оборачиваемость</h4>
              <p className="text-2xl font-bold text-slate-800">12.4 дн.</p>
              <p className="text-xs text-amber-600 mt-1">Целевой: 10 дн.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Тренд прибыли (помесячно)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={[
                { month: 'Авг', profit: 280000 },
                { month: 'Сен', profit: 350000 },
                { month: 'Окт', profit: 310000 },
                { month: 'Ноя', profit: 420000 },
                { month: 'Дек', profit: 580000 },
                { month: 'Янв', profit: netProfit > 0 ? netProfit : 350000 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `${(v / 1000).toFixed(0)}к`} />
                <Tooltip formatter={(v: number) => formatMoney(v)} />
                <Line type="monotone" dataKey="profit" stroke="#16a34a" strokeWidth={3} dot={{ fill: '#16a34a', r: 5 }} name="Прибыль" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Рекомендации AI
            </h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• Закупки составляют 81% расходов — рассмотрите долгосрочные контракты с фиксацией цен</p>
              <p>• Маржа по «Фаршу домашнему» (24%) ниже средней — пересмотрите рецептуру или цену</p>
              <p>• Дебиторская задолженность растёт — усильте работу по взысканию с «Оптовой базы №7»</p>
              <p>• Коммунальные расходы можно снизить на 15% при переходе на энергосберегающее оборудование</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
