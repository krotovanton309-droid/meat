import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import {
  Package, AlertTriangle, ShoppingCart, DollarSign, TrendingUp, TrendingDown,
  ArrowUpRight, ArrowDownRight, Factory, Clock, Bot, Zap, Target, Activity
} from 'lucide-react';
import { products, batches, productionOrders, salesOrders, financeRecords, formatWeight, formatMoney } from '../data/mockData';

const COLORS = ['#dc2626', '#f59e0b', '#16a34a', '#2563eb', '#7c3aed', '#0891b2'];

export default function Dashboard() {
  // Calculate stats
  const totalStockValue = batches.reduce((sum, b) => {
    return sum + (b.quantity / 1000) * b.costPerKg;
  }, 0);

  const today = new Date('2026-01-14');
  const expiredBatches = batches.filter(b => new Date(b.expiryDate) < today);
  const expiringBatches = batches.filter(b => {
    const exp = new Date(b.expiryDate);
    const diff = (exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 2;
  });

  const activeOrders = productionOrders.filter(o => o.status === 'in_progress' || o.status === 'planned').length;
  const activeSalesOrders = salesOrders.filter(o => o.status === 'confirmed' || o.status === 'in_progress').length;

  const monthlyRevenue = salesOrders.filter(o => o.status === 'completed').reduce((s, o) => s + o.totalAmount, 0);
  const monthlyCost = salesOrders.filter(o => o.status === 'completed').reduce((s, o) => {
    return s + o.items.reduce((is, item) => {
      const batch = batches.find(b => b.productId === item.productId);
      return is + (item.quantity / 1000) * (batch?.costPerKg || 0);
    }, 0);
  }, 0);
  const margin = monthlyRevenue - monthlyCost;

  const totalIncome = financeRecords.filter(f => f.type === 'income').reduce((s, f) => s + f.amount, 0);
  const totalExpense = financeRecords.filter(f => f.type === 'expense').reduce((s, f) => s + f.amount, 0);

  // Chart data
  const stockByCategory = [
    { name: 'Сырьё', value: batches.filter(b => { const p = products.find(pr => pr.id === b.productId); return p?.type === 'raw'; }).reduce((s, b) => s + b.quantity, 0) },
    { name: 'Полуфабрикаты', value: batches.filter(b => { const p = products.find(pr => pr.id === b.productId); return p?.type === 'semi'; }).reduce((s, b) => s + b.quantity, 0) },
    { name: 'Готовая продукция', value: batches.filter(b => { const p = products.find(pr => pr.id === b.productId); return p?.type === 'finished'; }).reduce((s, b) => s + b.quantity, 0) },
    { name: 'Упаковка', value: batches.filter(b => { const p = products.find(pr => pr.id === b.productId); return p?.type === 'packaging'; }).reduce((s, b) => s + b.quantity, 0) },
  ];

  const revenueData = [
    { day: '08.01', revenue: 450000, cost: 320000 },
    { day: '09.01', revenue: 380000, cost: 270000 },
    { day: '10.01', revenue: 520000, cost: 380000 },
    { day: '11.01', revenue: 610000, cost: 420000 },
    { day: '12.01', revenue: 780000, cost: 540000 },
    { day: '13.01', revenue: 690000, cost: 480000 },
    { day: '14.01', revenue: 550000, cost: 390000 },
  ];

  const topProducts = [
    { name: 'Колбаса "Докторская"', sales: 45000, revenue: 2160000 },
    { name: 'Сосиски "Молочные"', sales: 38000, revenue: 1596000 },
    { name: 'Колбаса "Краковская"', sales: 25000, revenue: 1550000 },
    { name: 'Фарш говяжий', sales: 18000, revenue: 1170000 },
    { name: 'Фарш домашний', sales: 12000, revenue: 660000 },
  ];

  const lossesData = [
    { week: 'Нед 1', loss: 3.2 },
    { week: 'Нед 2', loss: 2.8 },
    { week: 'Нед 3', loss: 4.1 },
    { week: 'Нед 4', loss: 2.5 },
    { week: 'Текущая', loss: 1.9 },
  ];

  // AI Insights
  const aiInsights = [
    { type: 'warning', text: 'Говядина заканчивается — остаток на 2.4 дня при текущем расходе', icon: AlertTriangle },
    { type: 'success', text: 'Потери снизились на 25% за последнюю неделю — тренд положительный', icon: TrendingUp },
    { type: 'info', text: 'Рекомендуем увеличить выпуск "Докторской" — спрос вырос на 12%', icon: Target },
  ];

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Дашборд</h1>
          <p className="text-sm text-slate-500">Обзор производства на 14 января 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            Обновлено: сегодня, 09:30
          </div>
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Bot className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI-инсайты</h3>
            <p className="text-xs text-slate-400">Автоматический анализ данных</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 rounded-full">
            <Zap className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Активно</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {aiInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 bg-white/5 rounded-xl border border-white/10">
              <insight.icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                insight.type === 'warning' ? 'text-amber-400' : insight.type === 'success' ? 'text-green-400' : 'text-blue-400'
              }`} />
              <p className="text-xs text-slate-300 leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Стоимость остатков"
          value={formatMoney(totalStockValue)}
          icon={<Package className="w-5 h-5" />}
          color="blue"
          trend={{ value: '+5.2%', up: true }}
        />
        <StatCard
          title="Просрочено / Скоро"
          value={`${expiredBatches.length} / ${expiringBatches.length}`}
          subtitle="партий"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="red"
          trend={{ value: 'Требует внимания', up: false }}
        />
        <StatCard
          title="Заказы в работе"
          value={`${activeOrders + activeSalesOrders}`}
          subtitle={`${activeOrders} произв. / ${activeSalesOrders} продаж`}
          icon={<ShoppingCart className="w-5 h-5" />}
          color="amber"
          trend={{ value: '+2 за день', up: true }}
        />
        <StatCard
          title="Маржа за месяц"
          value={formatMoney(margin)}
          subtitle={`Выручка: ${formatMoney(monthlyRevenue)}`}
          icon={<DollarSign className="w-5 h-5" />}
          color="green"
          trend={{ value: `${((margin / monthlyRevenue) * 100).toFixed(1)}%`, up: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Выручка и себестоимость</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `${(v/1000).toFixed(0)}к`} />
              <Tooltip formatter={(v: number) => formatMoney(v)} />
              <Area type="monotone" dataKey="revenue" stroke="#16a34a" fill="url(#colorRevenue)" name="Выручка" />
              <Area type="monotone" dataKey="cost" stroke="#dc2626" fill="url(#colorCost)" name="Себестоимость" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stock by Category */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Остатки по категориям</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={stockByCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {stockByCategory.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => formatWeight(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {stockByCategory.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{item.name}</p>
                    <p className="text-xs text-slate-400">{formatWeight(item.value)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Топ-продукты</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}кг`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
              <Tooltip formatter={(v: number) => formatWeight(v)} />
              <Bar dataKey="sales" fill="#dc2626" radius={[0, 4, 4, 0]} name="Продажи" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Losses */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Потери по неделям (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lossesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" unit="%" />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Line type="monotone" dataKey="loss" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} name="Потери" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Внимание</h3>
          <div className="space-y-3 max-h-[220px] overflow-y-auto">
            {expiredBatches.map(b => {
              const p = products.find(pr => pr.id === b.productId);
              return (
                <div key={b.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">{p?.name}</p>
                    <p className="text-xs text-red-600">Партия {b.batchNumber} — просрочена {b.expiryDate}</p>
                  </div>
                </div>
              );
            })}
            {expiringBatches.map(b => {
              const p = products.find(pr => pr.id === b.productId);
              return (
                <div key={b.id} className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                  <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">{p?.name}</p>
                    <p className="text-xs text-amber-600">Партия {b.batchNumber} — срок {b.expiryDate}</p>
                  </div>
                </div>
              );
            })}
            {productionOrders.filter(o => o.status === 'in_progress').map(o => {
              const p = products.find(pr => pr.id === o.productId);
              return (
                <div key={o.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <Factory className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">{p?.name}</p>
                    <p className="text-xs text-blue-600">Производство в процессе — план {formatWeight(o.plannedQuantity)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Финансовый итог</h3>
            <Activity className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <span className="text-sm text-green-700 font-medium">Доходы</span>
              <span className="text-sm font-bold text-green-800">{formatMoney(totalIncome)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
              <span className="text-sm text-red-700 font-medium">Расходы</span>
              <span className="text-sm font-bold text-red-800">{formatMoney(totalExpense)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl border-2 border-slate-200">
              <span className="text-sm text-slate-700 font-bold">Результат</span>
              <span className={`text-sm font-bold ${totalIncome - totalExpense >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {formatMoney(totalIncome - totalExpense)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Быстрые действия</h3>
            <Zap className="w-5 h-5 text-slate-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-red-50 hover:bg-red-100 rounded-xl text-left transition-colors">
              <p className="text-sm font-medium text-red-700">Новый приход</p>
              <p className="text-xs text-red-500 mt-0.5">Оформить приёмку</p>
            </button>
            <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl text-left transition-colors">
              <p className="text-sm font-medium text-blue-700">Задание</p>
              <p className="text-xs text-blue-500 mt-0.5">Создать произв.</p>
            </button>
            <button className="p-3 bg-green-50 hover:bg-green-100 rounded-xl text-left transition-colors">
              <p className="text-sm font-medium text-green-700">Закупка</p>
              <p className="text-xs text-green-500 mt-0.5">Новая заявка</p>
            </button>
            <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-xl text-left transition-colors">
              <p className="text-sm font-medium text-purple-700">AI-анализ</p>
              <p className="text-xs text-purple-500 mt-0.5">Спросить помощника</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, subtitle, icon, color, trend }: {
  title: string; value: string; subtitle?: string; icon: React.ReactNode;
  color: 'blue' | 'red' | 'amber' | 'green';
  trend: { value: string; up: boolean };
}) {
  const iconColors = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    amber: 'bg-amber-100 text-amber-600',
    green: 'bg-green-100 text-green-600',
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${iconColors[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trend.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trend.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend.value}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-sm text-slate-500 mt-1">{title}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
