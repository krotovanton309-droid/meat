import React, { useState } from 'react';
import { Package, Search, Filter, Download, Plus, AlertTriangle, ArrowRight, Eye } from 'lucide-react';
import { products, batches, warehouses, stockMovements, formatWeight, formatMoney, getProductById, getWarehouseById, getSupplierById } from '../data/mockData';
import { ProductType, UnitType } from '../types';

type Tab = 'nomenclature' | 'batches' | 'movements';

const typeLabels: Record<ProductType, string> = { raw: 'Сырьё', semi: 'Полуфабрикат', finished: 'Готовая продукция', packaging: 'Упаковка' };
const typeColors: Record<ProductType, string> = { raw: 'bg-blue-100 text-blue-700', semi: 'bg-purple-100 text-purple-700', finished: 'bg-green-100 text-green-700', packaging: 'bg-slate-100 text-slate-700' };

export default function Warehouse() {
  const [tab, setTab] = useState<Tab>('nomenclature');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<ProductType | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const filteredProducts = products.filter(p => {
    if (filterType !== 'all' && p.type !== filterType) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const today = new Date('2026-01-14');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Склад</h1>
          <p className="text-sm text-slate-500">Номенклатура, партии и движение товаров</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-sm font-medium text-sm">
          <Plus className="w-4 h-4" />
          Добавить
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-slate-100 w-fit">
        {[
          { id: 'nomenclature' as Tab, label: 'Номенклатура', count: products.length },
          { id: 'batches' as Tab, label: 'Партии и остатки', count: batches.length },
          { id: 'movements' as Tab, label: 'Движение', count: stockMovements.length },
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

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по названию или артикулу..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400"
          />
        </div>
        {tab === 'nomenclature' && (
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value as ProductType | 'all')}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            <option value="all">Все типы</option>
            <option value="raw">Сырьё</option>
            <option value="semi">Полуфабрикаты</option>
            <option value="finished">Готовая продукция</option>
            <option value="packaging">Упаковка</option>
          </select>
        )}
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">
          <Download className="w-4 h-4" />
          Экспорт
        </button>
      </div>

      {/* Content */}
      {tab === 'nomenclature' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Артикул</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Наименование</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Тип</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Категория</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ед.</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Срок год.</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Мин. остаток</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Цена закуп.</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => {
                  const totalStock = batches.filter(b => b.productId === p.id).reduce((s, b) => s + b.quantity, 0);
                  const isLow = totalStock < p.minStock;
                  return (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-mono text-slate-500">{p.sku}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-800">{p.name}</span>
                          {isLow && <span title="Низкий остаток!"><AlertTriangle className="w-4 h-4 text-amber-500" /></span>}
                        </div>
                      </td>
                      <td className="px-5 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[p.type]}`}>{typeLabels[p.type]}</span></td>
                      <td className="px-5 py-3 text-sm text-slate-600">{p.category}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{p.unit}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{p.shelfLifeDays} дн.</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{formatWeight(p.minStock)}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{p.purchasePricePerKg ? formatMoney(p.purchasePricePerKg) + '/кг' : '—'}</td>
                      <td className="px-5 py-3">
                        <button onClick={() => setSelectedProduct(p.id)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'batches' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">№ Партии</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Продукт</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Склад</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Остаток</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата приёмки</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Срок годности</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Себестоимость</th>
                </tr>
              </thead>
              <tbody>
                {batches.map(b => {
                  const product = getProductById(b.productId);
                  const warehouse = getWarehouseById(b.warehouseId);
                  const expiry = new Date(b.expiryDate);
                  const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  const isExpired = daysLeft < 0;
                  const isExpiring = daysLeft >= 0 && daysLeft <= 2;
                  return (
                    <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-mono text-slate-500">{b.batchNumber}</td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-800">{product?.name}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{warehouse?.name}</td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-800">{formatWeight(b.quantity)}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{b.receivedDate}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{b.expiryDate}</td>
                      <td className="px-5 py-3">
                        {isExpired ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Просрочено</span>
                        ) : isExpiring ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">{daysLeft} дн.</span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{daysLeft} дн.</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-600">{formatMoney(b.costPerKg)}/кг</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'movements' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Документ</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Тип</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Продукт</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Количество</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Склад</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Причина</th>
                </tr>
              </thead>
              <tbody>
                {stockMovements.map(m => {
                  const product = getProductById(m.productId);
                  const warehouse = getWarehouseById(m.warehouseId);
                  const typeConfig = {
                    in: { label: 'Приход', color: 'bg-green-100 text-green-700' },
                    out: { label: 'Расход', color: 'bg-red-100 text-red-700' },
                    transfer: { label: 'Перемещение', color: 'bg-blue-100 text-blue-700' },
                    adjustment: { label: 'Корректировка', color: 'bg-amber-100 text-amber-700' },
                  };
                  return (
                    <tr key={m.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-mono text-slate-500">{m.documentNumber}</td>
                      <td className="px-5 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeConfig[m.type].color}`}>{typeConfig[m.type].label}</span></td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-800">{product?.name}</td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-800">{formatWeight(m.quantity)}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{warehouse?.name}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{m.date}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{m.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal productId={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

function ProductDetailModal({ productId, onClose }: { productId: string; onClose: () => void }) {
  const product = getProductById(productId);
  const productBatches = batches.filter(b => b.productId === productId);
  const totalStock = productBatches.reduce((s, b) => s + b.quantity, 0);
  const stockValue = productBatches.reduce((s, b) => s + (b.quantity / 1000) * b.costPerKg, 0);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{product.name}</h3>
            <p className="text-sm text-slate-500">{product.sku} • {typeLabels[product.type]}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
            <span className="text-slate-400 text-xl">×</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-500">Общий остаток</p>
            <p className="text-lg font-bold text-slate-800">{formatWeight(totalStock)}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-500">Стоимость остатка</p>
            <p className="text-lg font-bold text-slate-800">{formatMoney(stockValue)}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-500">Кол-во партий</p>
            <p className="text-lg font-bold text-slate-800">{productBatches.length}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-500">Мин. остаток</p>
            <p className="text-lg font-bold text-slate-800">{formatWeight(product.minStock)}</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Партии на складе:</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {productBatches.map(b => (
              <div key={b.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-700">{b.batchNumber}</p>
                  <p className="text-xs text-slate-500">{getWarehouseById(b.warehouseId)?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-800">{formatWeight(b.quantity)}</p>
                  <p className="text-xs text-slate-500">до {b.expiryDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
