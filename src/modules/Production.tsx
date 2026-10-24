import React, { useState } from 'react';
import { Factory, Plus, Play, CheckCircle, Clock, AlertCircle, Eye, Calculator } from 'lucide-react';
import { techCards, productionOrders, products, formatWeight, formatMoney } from '../data/mockData';
import { ProductionStatus } from '../types';

type Tab = 'techcards' | 'orders';

const statusConfig: Record<ProductionStatus, { label: string; color: string; icon: React.ReactNode }> = {
  planned: { label: 'Запланировано', color: 'bg-slate-100 text-slate-700', icon: <Clock className="w-3.5 h-3.5" /> },
  in_progress: { label: 'В работе', color: 'bg-blue-100 text-blue-700', icon: <Play className="w-3.5 h-3.5" /> },
  completed: { label: 'Выполнено', color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  cancelled: { label: 'Отменено', color: 'bg-red-100 text-red-700', icon: <AlertCircle className="w-3.5 h-3.5" /> },
};

export default function Production() {
  const [tab, setTab] = useState<Tab>('techcards');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Производство</h1>
          <p className="text-sm text-slate-500">Технологические карты, рецептуры и производственные задания</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-sm font-medium text-sm">
          <Plus className="w-4 h-4" />
          Новое задание
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-slate-100 w-fit">
        {[
          { id: 'techcards' as Tab, label: 'Технологические карты', count: techCards.length },
          { id: 'orders' as Tab, label: 'Производственные задания', count: productionOrders.length },
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

      {tab === 'techcards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techCards.map(tc => {
            const product = products.find(p => p.id === tc.productId);
            return (
              <div key={tc.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800">{tc.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Версия {tc.version} • {tc.createdAt}</p>
                  </div>
                  <button onClick={() => setSelectedCard(tc.id)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                    <p className="text-xs text-slate-500">Выход</p>
                    <p className="text-sm font-bold text-slate-800">{formatWeight(tc.plannedOutput)}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                    <p className="text-xs text-slate-500">Потери</p>
                    <p className="text-sm font-bold text-amber-600">{tc.plannedLoss}%</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                    <p className="text-xs text-slate-500">Ингредиентов</p>
                    <p className="text-sm font-bold text-slate-800">{tc.ingredients.length}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Состав (на 1 кг):</p>
                  {tc.ingredients.slice(0, 4).map((ing, i) => {
                    const ingProduct = products.find(p => p.id === ing.productId);
                    return (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{ingProduct?.name}</span>
                        <span className="text-slate-800 font-medium">{ing.quantity}г ({ing.percentage}%)</span>
                      </div>
                    );
                  })}
                  {tc.ingredients.length > 4 && (
                    <p className="text-xs text-slate-400">+ ещё {tc.ingredients.length - 4} ингредиентов</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'orders' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Задание</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Продукт</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Тех. карта</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">План</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Факт</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Отклонение</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
                </tr>
              </thead>
              <tbody>
                {productionOrders.map(o => {
                  const product = products.find(p => p.id === o.productId);
                  const tc = techCards.find(t => t.id === o.techCardId);
                  const deviation = o.actualQuantity ? ((o.actualQuantity - o.plannedQuantity) / o.plannedQuantity * 100) : null;
                  return (
                    <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-mono text-slate-500">{o.id.toUpperCase()}</td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-800">{product?.name}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{tc?.name}</td>
                      <td className="px-5 py-3 text-sm text-slate-800 font-medium">{formatWeight(o.plannedQuantity)}</td>
                      <td className="px-5 py-3 text-sm text-slate-800">{o.actualQuantity ? formatWeight(o.actualQuantity) : '—'}</td>
                      <td className="px-5 py-3">
                        {deviation !== null ? (
                          <span className={`text-sm font-medium ${deviation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {deviation >= 0 ? '+' : ''}{deviation.toFixed(1)}%
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-600">{o.plannedDate}</td>
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

      {/* Tech Card Detail Modal */}
      {selectedCard && <TechCardDetail cardId={selectedCard} onClose={() => setSelectedCard(null)} />}
    </div>
  );
}

function TechCardDetail({ cardId, onClose }: { cardId: string; onClose: () => void }) {
  const tc = techCards.find(t => t.id === cardId);
  if (!tc) return null;

  const totalIngredients = tc.ingredients.reduce((s, i) => s + i.quantity, 0);
  const costPerKg = tc.ingredients.reduce((s, ing) => {
    const p = products.find(pr => pr.id === ing.productId);
    return s + (ing.quantity / 1000) * (p?.purchasePricePerKg || 0);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{tc.name}</h3>
            <p className="text-sm text-slate-500">Технологическая карта • Версия {tc.version}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-xl text-slate-400">×</button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 font-medium">Плановый выход</p>
            <p className="text-xl font-bold text-green-800 mt-1">{formatWeight(tc.plannedOutput)}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <p className="text-xs text-amber-600 font-medium">Потери</p>
            <p className="text-xl font-bold text-amber-800 mt-1">{tc.plannedLoss}%</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 font-medium">Себестоимость</p>
            <p className="text-xl font-bold text-blue-800 mt-1">{formatMoney(costPerKg)}/кг</p>
          </div>
        </div>

        <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Рецептура (на {totalIngredients}г сырья)
        </h4>
        <div className="space-y-2">
          {tc.ingredients.map((ing, i) => {
            const p = products.find(pr => pr.id === ing.productId);
            return (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600">{i + 1}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{p?.name}</p>
                  <p className="text-xs text-slate-500">{p?.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">{ing.quantity}г</p>
                  <p className="text-xs text-slate-500">{ing.percentage}%</p>
                </div>
                <div className="w-24 bg-slate-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${ing.percentage}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
