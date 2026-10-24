import React, { useState } from 'react';
import { TrendingUp, Plus, Users, FileText, Truck, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { clients, salesOrders, products, formatWeight, formatMoney, getProductById, getClientById } from '../data/mockData';
import { OrderStatus } from '../types';

type Tab = 'orders' | 'clients' | 'shipments';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  draft: { label: 'Черновик', color: 'bg-slate-100 text-slate-700', icon: <FileText className="w-3.5 h-3.5" /> },
  confirmed: { label: 'Подтверждён', color: 'bg-blue-100 text-blue-700', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  in_progress: { label: 'В работе', color: 'bg-amber-100 text-amber-700', icon: <Clock className="w-3.5 h-3.5" /> },
  completed: { label: 'Выполнен', color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  cancelled: { label: 'Отменён', color: 'bg-red-100 text-red-700', icon: <AlertCircle className="w-3.5 h-3.5" /> },
};

const clientTypeLabels: Record<string, string> = {
  retail: 'Розница',
  wholesale: 'Опт',
  restaurant: 'Ресторан',
  chain: 'Сеть',
};

export default function Sales() {
  const [tab, setTab] = useState<Tab>('orders');

  const totalDebt = clients.reduce((s, c) => s + c.balance, 0);
  const totalRevenue = salesOrders.filter(o => o.status === 'completed').reduce((s, o) => s + o.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Продажи</h1>
          <p className="text-sm text-slate-500">Клиенты, заказы и отгрузки</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-sm font-medium text-sm">
          <Plus className="w-4 h-4" />
          Новый заказ
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
            <div>
              <p className="text-xs text-slate-500">Выручка (мес.)</p>
              <p className="text-lg font-bold text-slate-800">{formatMoney(totalRevenue)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg"><AlertCircle className="w-5 h-5 text-red-600" /></div>
            <div>
              <p className="text-xs text-slate-500">Дебиторка</p>
              <p className="text-lg font-bold text-red-600">{formatMoney(totalDebt)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg"><FileText className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-xs text-slate-500">Заказов в работе</p>
              <p className="text-lg font-bold text-slate-800">{salesOrders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg"><Users className="w-5 h-5 text-purple-600" /></div>
            <div>
              <p className="text-xs text-slate-500">Клиентов</p>
              <p className="text-lg font-bold text-slate-800">{clients.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-slate-100 w-fit">
        {[
          { id: 'orders' as Tab, label: 'Заказы', count: salesOrders.length },
          { id: 'clients' as Tab, label: 'Клиенты', count: clients.length },
          { id: 'shipments' as Tab, label: 'Отгрузки', count: salesOrders.filter(o => o.status === 'completed').length },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-red-50 text-red-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.label} <span className="ml-1 text-xs opacity-70">({t.count})</span>
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">№ Счёта</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Клиент</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Товары</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Сумма</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Скидка</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Доставка</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
                </tr>
              </thead>
              <tbody>
                {salesOrders.map(o => {
                  const client = getClientById(o.clientId);
                  return (
                    <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-mono text-slate-500">{o.documentNumber}</td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-800">{client?.name}</td>
                      <td className="px-5 py-3">
                        <div className="space-y-0.5">
                          {o.items.map((item, i) => {
                            const p = getProductById(item.productId);
                            return (
                              <p key={i} className="text-sm text-slate-600">
                                {p?.name} — {formatWeight(item.quantity)}
                              </p>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm font-bold text-slate-800">{formatMoney(o.totalAmount)}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{o.discount}%</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{o.createdDate}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{o.deliveryDate}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[o.status].color}`}>
                          {statusConfig[o.status].icon}
                          {statusConfig[o.status].label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'clients' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map(c => (
            <div key={c.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-800">{c.name}</h3>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs">{clientTypeLabels[c.type]}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Скидка</p>
                  <p className="text-lg font-bold text-green-600">{c.discount}%</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm text-slate-600">
                <p>👤 {c.contact}</p>
                <p>📞 {c.phone}</p>
                <p>📧 {c.email}</p>
                <p>📍 {c.address}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Дебиторская задолженность:</span>
                <span className={`text-sm font-bold ${c.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {c.balance > 0 ? formatMoney(c.balance) : 'Нет'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'shipments' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">№ Накладной</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Клиент</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Товары</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Сумма</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата отгрузки</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
                </tr>
              </thead>
              <tbody>
                {salesOrders.filter(o => o.status === 'completed').map(o => {
                  const client = getClientById(o.clientId);
                  return (
                    <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-mono text-slate-500">{o.documentNumber}</td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-800">{client?.name}</td>
                      <td className="px-5 py-3">
                        {o.items.map((item, i) => {
                          const p = getProductById(item.productId);
                          return <p key={i} className="text-sm text-slate-600">{p?.name} — {formatWeight(item.quantity)}</p>;
                        })}
                      </td>
                      <td className="px-5 py-3 text-sm font-bold text-slate-800">{formatMoney(o.totalAmount)}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{o.deliveryDate}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <Truck className="w-3.5 h-3.5" />
                          Отгружено
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
