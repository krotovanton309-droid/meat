import React, { useState } from 'react';
import { ShoppingCart, Plus, Truck, Package, Star, TrendingUp, AlertTriangle } from 'lucide-react';
import { suppliers, purchaseOrders, products, formatWeight, formatMoney, getProductById, getSupplierById } from '../data/mockData';
import { PurchaseStatus } from '../types';

type Tab = 'suppliers' | 'orders' | 'forecast';

const statusConfig: Record<PurchaseStatus, { label: string; color: string }> = {
  planned: { label: 'Планируется', color: 'bg-slate-100 text-slate-700' },
  ordered: { label: 'Заказано', color: 'bg-blue-100 text-blue-700' },
  delivered: { label: 'Доставлено', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Отменено', color: 'bg-red-100 text-red-700' },
};

export default function Procurement() {
  const [tab, setTab] = useState<Tab>('orders');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Закупки</h1>
          <p className="text-sm text-slate-500">Поставщики, заявки и прогноз потребности</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-sm font-medium text-sm">
          <Plus className="w-4 h-4" />
          Новая заявка
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-slate-100 w-fit">
        {[
          { id: 'orders' as Tab, label: 'Заявки на закупку', count: purchaseOrders.length },
          { id: 'suppliers' as Tab, label: 'Поставщики', count: suppliers.length },
          { id: 'forecast' as Tab, label: 'Прогноз потребности', count: 0 },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-red-50 text-red-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.label} {t.count > 0 && <span className="ml-1 text-xs opacity-70">({t.count})</span>}
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">№ Документа</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Поставщик</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Товары</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Сумма</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата создания</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ожидается</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map(po => {
                  const supplier = getSupplierById(po.supplierId);
                  return (
                    <tr key={po.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-mono text-slate-500">{po.documentNumber}</td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-800">{supplier?.name}</td>
                      <td className="px-5 py-3">
                        <div className="space-y-0.5">
                          {po.items.map((item, i) => {
                            const p = getProductById(item.productId);
                            return (
                              <p key={i} className="text-sm text-slate-600">
                                {p?.name} — {formatWeight(item.quantity)}
                              </p>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm font-bold text-slate-800">{formatMoney(po.totalAmount)}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{po.createdDate}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{po.expectedDate}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[po.status].color}`}>
                          {statusConfig[po.status].label}
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

      {tab === 'suppliers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suppliers.map(s => (
            <div key={s.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-800">{s.name}</h3>
                  <p className="text-sm text-slate-500">{s.contact}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-medium text-amber-700">{s.rating}</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600">📞 {s.phone}</p>
                <p className="text-slate-600">📧 {s.email}</p>
                <p className="text-slate-600">📍 {s.address}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.specialties.map((sp, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs">{sp}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'forecast' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Прогноз потребности на основе плана производства
            </h3>
            <p className="text-sm text-slate-500 mb-4">Рассчитано на основе активных производственных заданий и текущих остатков</p>
            
            <div className="space-y-3">
              {[
                { product: 'Говядина (лопатка)', needed: 120000, inStock: 85000, deficit: 35000, urgency: 'high' },
                { product: 'Свинина (окорок)', needed: 80000, inStock: 62000, deficit: 18000, urgency: 'medium' },
                { product: 'Куриное филе', needed: 50000, inStock: 45000, deficit: 5000, urgency: 'low' },
                { product: 'Шпик', needed: 40000, inStock: 30000, deficit: 10000, urgency: 'medium' },
                { product: 'Оболочка колбасная', needed: 200, inStock: 800, deficit: 0, urgency: 'none' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{item.product}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-slate-500">Потребность: {formatWeight(item.needed)}</span>
                      <span className="text-xs text-slate-500">На складе: {formatWeight(item.inStock)}</span>
                    </div>
                  </div>
                  <div className="w-32">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.urgency === 'high' ? 'bg-red-500' : item.urgency === 'medium' ? 'bg-amber-500' : item.urgency === 'low' ? 'bg-blue-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(100, (item.inStock / item.needed) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1 text-right">
                      {Math.round((item.inStock / item.needed) * 100)}% покрытия
                    </p>
                  </div>
                  {item.deficit > 0 && (
                    <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${item.urgency === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      Дефицит: {formatWeight(item.deficit)}
                    </div>
                  )}
                  {item.deficit === 0 && (
                    <div className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700">
                      Достаточно
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
