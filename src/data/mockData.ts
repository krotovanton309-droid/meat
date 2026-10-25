import { Product, Batch, Warehouse, StockMovement, TechCard, ProductionOrder, Supplier, PurchaseOrder, Client, SalesOrder, FinanceRecord } from '../types';

// ===== WAREHOUSES =====
export const warehouses: Warehouse[] = [
  { id: 'w1', name: 'Склад сырья', type: 'raw', location: 'Корпус А' },
  { id: 'w2', name: 'Холодильник полуфабрикатов', type: 'cold', location: 'Корпус А' },
  { id: 'w3', name: 'Склад готовой продукции', type: 'finished', location: 'Корпус Б' },
  { id: 'w4', name: 'Склад упаковки', type: 'packaging', location: 'Корпус В' },
];

// ===== PRODUCTS =====
export const products: Product[] = [
  { id: 'p1', name: 'Говядина (лопатка)', type: 'raw', unit: 'kg', category: 'Мясо', sku: 'RAW-001', minStock: 50000, shelfLifeDays: 5, purchasePricePerKg: 52000, supplierId: 's1' },
  { id: 'p2', name: 'Свинина (окорок)', type: 'raw', unit: 'kg', category: 'Мясо', sku: 'RAW-002', minStock: 40000, shelfLifeDays: 5, purchasePricePerKg: 38000, supplierId: 's1' },
  { id: 'p3', name: 'Куриное филе', type: 'raw', unit: 'kg', category: 'Мясо', sku: 'RAW-003', minStock: 30000, shelfLifeDays: 4, purchasePricePerKg: 28000, supplierId: 's2' },
  { id: 'p4', name: 'Шпик', type: 'raw', unit: 'kg', category: 'Мясо', sku: 'RAW-004', minStock: 20000, shelfLifeDays: 7, purchasePricePerKg: 18000, supplierId: 's1' },
  { id: 'p5', name: 'Соль', type: 'raw', unit: 'kg', category: 'Специи', sku: 'RAW-005', minStock: 10000, shelfLifeDays: 365, purchasePricePerKg: 1500, supplierId: 's3' },
  { id: 'p6', name: 'Перец чёрный', type: 'raw', unit: 'kg', category: 'Специи', sku: 'RAW-006', minStock: 2000, shelfLifeDays: 365, purchasePricePerKg: 45000, supplierId: 's3' },
  { id: 'p7', name: 'Чеснок', type: 'raw', unit: 'kg', category: 'Специи', sku: 'RAW-007', minStock: 3000, shelfLifeDays: 30, purchasePricePerKg: 25000, supplierId: 's3' },
  { id: 'p8', name: 'Фарш говяжий', type: 'semi', unit: 'kg', category: 'Полуфабрикаты', sku: 'SEM-001', minStock: 20000, shelfLifeDays: 2, sellingPricePerKg: 65000 },
  { id: 'p9', name: 'Фарш домашний', type: 'semi', unit: 'kg', category: 'Полуфабрикаты', sku: 'SEM-002', minStock: 15000, shelfLifeDays: 2, sellingPricePerKg: 55000 },
  { id: 'p10', name: 'Колбаса варёная "Докторская"', type: 'finished', unit: 'kg', category: 'Колбасы', sku: 'FIN-001', minStock: 10000, shelfLifeDays: 15, sellingPricePerKg: 48000 },
  { id: 'p11', name: 'Колбаса копчёная "Краковская"', type: 'finished', unit: 'kg', category: 'Колбасы', sku: 'FIN-002', minStock: 8000, shelfLifeDays: 20, sellingPricePerKg: 62000 },
  { id: 'p12', name: 'Сосиски "Молочные"', type: 'finished', unit: 'kg', category: 'Сосиски', sku: 'FIN-003', minStock: 12000, shelfLifeDays: 10, sellingPricePerKg: 42000 },
  { id: 'p13', name: 'Оболочка колбасная', type: 'packaging', unit: 'm', category: 'Упаковка', sku: 'PKG-001', minStock: 500, shelfLifeDays: 730, purchasePricePerKg: 8000, supplierId: 's4' },
  { id: 'p14', name: 'Лоток пластиковый', type: 'packaging', unit: 'pcs', category: 'Упаковка', sku: 'PKG-002', minStock: 2000, shelfLifeDays: 730, purchasePricePerKg: 500, supplierId: 's4' },
];

// ===== BATCHES =====
export const batches: Batch[] = [
  { id: 'b1', productId: 'p1', warehouseId: 'w1', quantity: 85000, receivedDate: '2026-01-10', expiryDate: '2026-01-15', supplierId: 's1', costPerKg: 52000, batchNumber: 'Б-2026-001' },
  { id: 'b2', productId: 'p2', warehouseId: 'w1', quantity: 62000, receivedDate: '2026-01-11', expiryDate: '2026-01-16', supplierId: 's1', costPerKg: 38000, batchNumber: 'Б-2026-002' },
  { id: 'b3', productId: 'p3', warehouseId: 'w1', quantity: 45000, receivedDate: '2026-01-12', expiryDate: '2026-01-16', supplierId: 's2', costPerKg: 28000, batchNumber: 'Б-2026-003' },
  { id: 'b4', productId: 'p4', warehouseId: 'w1', quantity: 30000, receivedDate: '2026-01-09', expiryDate: '2026-01-16', supplierId: 's1', costPerKg: 18000, batchNumber: 'Б-2026-004' },
  { id: 'b5', productId: 'p5', warehouseId: 'w1', quantity: 25000, receivedDate: '2025-12-01', expiryDate: '2026-12-01', supplierId: 's3', costPerKg: 1500, batchNumber: 'Б-2025-045' },
  { id: 'b6', productId: 'p6', warehouseId: 'w1', quantity: 5000, receivedDate: '2025-11-15', expiryDate: '2026-11-15', supplierId: 's3', costPerKg: 45000, batchNumber: 'Б-2025-040' },
  { id: 'b7', productId: 'p7', warehouseId: 'w1', quantity: 8000, receivedDate: '2026-01-05', expiryDate: '2026-02-04', supplierId: 's3', costPerKg: 25000, batchNumber: 'Б-2026-005' },
  { id: 'b8', productId: 'p8', warehouseId: 'w2', quantity: 18000, receivedDate: '2026-01-13', expiryDate: '2026-01-15', costPerKg: 48000, batchNumber: 'ПФ-2026-001' },
  { id: 'b9', productId: 'p9', warehouseId: 'w2', quantity: 12000, receivedDate: '2026-01-13', expiryDate: '2026-01-15', costPerKg: 42000, batchNumber: 'ПФ-2026-002' },
  { id: 'b10', productId: 'p10', warehouseId: 'w3', quantity: 25000, receivedDate: '2026-01-12', expiryDate: '2026-01-27', costPerKg: 35000, batchNumber: 'ГП-2026-001' },
  { id: 'b11', productId: 'p11', warehouseId: 'w3', quantity: 15000, receivedDate: '2026-01-10', expiryDate: '2026-01-30', costPerKg: 45000, batchNumber: 'ГП-2026-002' },
  { id: 'b12', productId: 'p12', warehouseId: 'w3', quantity: 20000, receivedDate: '2026-01-11', expiryDate: '2026-01-21', costPerKg: 30000, batchNumber: 'ГП-2026-003' },
  { id: 'b13', productId: 'p1', warehouseId: 'w1', quantity: 15000, receivedDate: '2026-01-05', expiryDate: '2026-01-10', supplierId: 's1', costPerKg: 52000, batchNumber: 'Б-2026-006' },
  { id: 'b14', productId: 'p13', warehouseId: 'w4', quantity: 800, receivedDate: '2025-12-20', expiryDate: '2027-12-20', supplierId: 's4', costPerKg: 8000, batchNumber: 'УП-2025-010' },
  { id: 'b15', productId: 'p14', warehouseId: 'w4', quantity: 5000, receivedDate: '2025-12-20', expiryDate: '2027-12-20', supplierId: 's4', costPerKg: 500, batchNumber: 'УП-2025-011' },
];

// ===== STOCK MOVEMENTS =====
export const stockMovements: StockMovement[] = [
  { id: 'sm1', type: 'in', productId: 'p1', warehouseId: 'w1', quantity: 85000, date: '2026-01-10', reason: 'Приёмка от поставщика', batchId: 'b1', documentNumber: 'ПН-001' },
  { id: 'sm2', type: 'in', productId: 'p2', warehouseId: 'w1', quantity: 62000, date: '2026-01-11', reason: 'Приёмка от поставщика', batchId: 'b2', documentNumber: 'ПН-002' },
  { id: 'sm3', type: 'out', productId: 'p1', warehouseId: 'w1', quantity: 30000, date: '2026-01-13', reason: 'Передача в производство', batchId: 'b1', documentNumber: 'РН-001' },
  { id: 'sm4', type: 'out', productId: 'p4', warehouseId: 'w1', quantity: 10000, date: '2026-01-13', reason: 'Передача в производство', batchId: 'b4', documentNumber: 'РН-002' },
  { id: 'sm5', type: 'in', productId: 'p8', warehouseId: 'w2', quantity: 18000, date: '2026-01-13', reason: 'Выпуск из производства', batchId: 'b8', documentNumber: 'ВН-001' },
  { id: 'sm6', type: 'out', productId: 'p10', warehouseId: 'w3', quantity: 5000, date: '2026-01-13', reason: 'Отгрузка клиенту', batchId: 'b10', documentNumber: 'ТН-001' },
  { id: 'sm7', type: 'out', productId: 'p12', warehouseId: 'w3', quantity: 8000, date: '2026-01-14', reason: 'Отгрузка клиенту', batchId: 'b12', documentNumber: 'ТН-002' },
  { id: 'sm8', type: 'in', productId: 'p3', warehouseId: 'w1', quantity: 45000, date: '2026-01-12', reason: 'Приёмка от поставщика', batchId: 'b3', documentNumber: 'ПН-003' },
  { id: 'sm9', type: 'in', productId: 'p4', warehouseId: 'w1', quantity: 30000, date: '2026-01-09', reason: 'Приёмка от поставщика', batchId: 'b4', documentNumber: 'ПН-004' },
  { id: 'sm10', type: 'transfer', productId: 'p8', warehouseId: 'w2', toWarehouseId: 'w3', quantity: 5000, date: '2026-01-14', reason: 'Перемещение на склад ГП', batchId: 'b8', documentNumber: 'ПП-001' },
];

// ===== TECH CARDS =====
export const techCards: TechCard[] = [
  {
    id: 'tc1', productId: 'p10', name: 'Колбаса варёная "Докторская"',
    ingredients: [
      { productId: 'p1', quantity: 700, percentage: 70 },
      { productId: 'p4', quantity: 150, percentage: 15 },
      { productId: 'p5', quantity: 20, percentage: 2 },
      { productId: 'p6', quantity: 3, percentage: 0.3 },
      { productId: 'p7', quantity: 10, percentage: 1 },
    ],
    plannedOutput: 883, plannedLoss: 11.7, version: 2, createdAt: '2025-11-01'
  },
  {
    id: 'tc2', productId: 'p11', name: 'Колбаса копчёная "Краковская"',
    ingredients: [
      { productId: 'p1', quantity: 500, percentage: 50 },
      { productId: 'p2', quantity: 350, percentage: 35 },
      { productId: 'p4', quantity: 100, percentage: 10 },
      { productId: 'p5', quantity: 22, percentage: 2.2 },
      { productId: 'p6', quantity: 5, percentage: 0.5 },
      { productId: 'p7', quantity: 15, percentage: 1.5 },
    ],
    plannedOutput: 992, plannedLoss: 0.8, version: 1, createdAt: '2025-10-15'
  },
  {
    id: 'tc3', productId: 'p12', name: 'Сосиски "Молочные"',
    ingredients: [
      { productId: 'p3', quantity: 500, percentage: 50 },
      { productId: 'p2', quantity: 300, percentage: 30 },
      { productId: 'p4', quantity: 150, percentage: 15 },
      { productId: 'p5', quantity: 18, percentage: 1.8 },
      { productId: 'p7', quantity: 8, percentage: 0.8 },
    ],
    plannedOutput: 976, plannedLoss: 2.4, version: 1, createdAt: '2025-12-01'
  },
  {
    id: 'tc4', productId: 'p8', name: 'Фарш говяжий',
    ingredients: [
      { productId: 'p1', quantity: 950, percentage: 95 },
      { productId: 'p5', quantity: 15, percentage: 1.5 },
      { productId: 'p6', quantity: 5, percentage: 0.5 },
    ],
    plannedOutput: 970, plannedLoss: 3, version: 1, createdAt: '2025-09-20'
  },
];

// ===== PRODUCTION ORDERS =====
export const productionOrders: ProductionOrder[] = [
  { id: 'po1', techCardId: 'tc1', productId: 'p10', plannedQuantity: 50000, actualQuantity: 48500, status: 'completed', plannedDate: '2026-01-12', completedDate: '2026-01-12', notes: 'Небольшое отклонение по выходу' },
  { id: 'po2', techCardId: 'tc3', productId: 'p12', plannedQuantity: 30000, status: 'in_progress', plannedDate: '2026-01-14' },
  { id: 'po3', techCardId: 'tc2', productId: 'p11', plannedQuantity: 20000, status: 'planned', plannedDate: '2026-01-15' },
  { id: 'po4', techCardId: 'tc4', productId: 'p8', plannedQuantity: 25000, status: 'planned', plannedDate: '2026-01-15' },
];

// ===== SUPPLIERS =====
export const suppliers: Supplier[] = [
  { id: 's1', name: 'МясоТорг ООО', contact: 'Иванов Пётр', phone: '+7 (495) 123-45-67', email: 'ivanov@myasotorg.ru', address: 'г. Москва, ул. Мясная, 12', rating: 4.5, specialties: ['Говядина', 'Свинина', 'Шпик'] },
  { id: 's2', name: 'ПтицеФерма АО', contact: 'Сидорова Анна', phone: '+7 (495) 234-56-78', email: 'sidorova@pticeferma.ru', address: 'г. Тула, ул. Фермерская, 5', rating: 4.8, specialties: ['Курица', 'Индейка'] },
  { id: 's3', name: 'СпецииОпт', contact: 'Козлов Дмитрий', phone: '+7 (495) 345-67-89', email: 'kozlov@speciopt.ru', address: 'г. Москва, ул. Торговая, 8', rating: 4.2, specialties: ['Специи', 'Приправы', 'Добавки'] },
  { id: 's4', name: 'УпакСервис', contact: 'Морозова Елена', phone: '+7 (495) 456-78-90', email: 'morozova@upakservis.ru', address: 'г. Москва, ул. Промышленная, 22', rating: 4.0, specialties: ['Оболочки', 'Лотки', 'Этикетки'] },
];

// ===== PURCHASE ORDERS =====
export const purchaseOrders: PurchaseOrder[] = [
  { id: 'pur1', supplierId: 's1', items: [{ productId: 'p1', quantity: 100000, pricePerKg: 52000, amount: 5200000 }], status: 'delivered', createdDate: '2026-01-08', expectedDate: '2026-01-10', totalAmount: 5200000, documentNumber: 'ЗК-001' },
  { id: 'pur2', supplierId: 's2', items: [{ productId: 'p3', quantity: 50000, pricePerKg: 28000, amount: 1400000 }], status: 'delivered', createdDate: '2026-01-10', expectedDate: '2026-01-12', totalAmount: 1400000, documentNumber: 'ЗК-002' },
  { id: 'pur3', supplierId: 's1', items: [{ productId: 'p2', quantity: 80000, pricePerKg: 38000, amount: 3040000 }], status: 'ordered', createdDate: '2026-01-13', expectedDate: '2026-01-16', totalAmount: 3040000, documentNumber: 'ЗК-003' },
  { id: 'pur4', supplierId: 's3', items: [{ productId: 'p5', quantity: 20000, pricePerKg: 1500, amount: 30000 }, { productId: 'p6', quantity: 3000, pricePerKg: 45000, amount: 135000 }], status: 'planned', createdDate: '2026-01-14', expectedDate: '2026-01-18', totalAmount: 165000, documentNumber: 'ЗК-004' },
];

// ===== CLIENTS =====
export const clients: Client[] = [
  { id: 'c1', name: 'Супермаркет "Продукты"', type: 'chain', contact: 'Петров А.В.', phone: '+7 (495) 555-11-22', email: 'petrov@produkty.ru', address: 'г. Москва, пр. Ленина, 45', discount: 8, balance: 156000 },
  { id: 'c2', name: 'Ресторан "Мясной двор"', type: 'restaurant', contact: 'Кузнецов И.С.', phone: '+7 (495) 555-33-44', email: 'info@meatdvor.ru', address: 'г. Москва, ул. Центральная, 10', discount: 5, balance: 0 },
  { id: 'c3', name: 'Магазин "У дома"', type: 'retail', contact: 'Смирнова О.Н.', phone: '+7 (495) 555-55-66', email: 'smirnova@udoma.ru', address: 'г. Москва, ул. Квартальная, 3', discount: 3, balance: 45000 },
  { id: 'c4', name: 'Оптовая база №7', type: 'wholesale', contact: 'Волков Д.М.', phone: '+7 (495) 555-77-88', email: 'volkov@opt7.ru', address: 'г. Москва, ул. Складская, 7', discount: 12, balance: 230000 },
];

// ===== SALES ORDERS =====
export const salesOrders: SalesOrder[] = [
  { id: 'so1', clientId: 'c1', items: [{ productId: 'p10', quantity: 20000, pricePerKg: 48000, amount: 960000 }, { productId: 'p12', quantity: 15000, pricePerKg: 42000, amount: 630000 }], status: 'completed', createdDate: '2026-01-12', deliveryDate: '2026-01-13', totalAmount: 1590000, discount: 8, documentNumber: 'СЧ-001', paymentStatus: 'paid' },
  { id: 'so2', clientId: 'c2', items: [{ productId: 'p11', quantity: 10000, pricePerKg: 62000, amount: 620000 }], status: 'completed', createdDate: '2026-01-13', deliveryDate: '2026-01-14', totalAmount: 620000, discount: 5, documentNumber: 'СЧ-002', paymentStatus: 'paid' },
  { id: 'so3', clientId: 'c3', items: [{ productId: 'p10', quantity: 5000, pricePerKg: 48000, amount: 240000 }, { productId: 'p12', quantity: 8000, pricePerKg: 42000, amount: 336000 }], status: 'in_progress', createdDate: '2026-01-14', deliveryDate: '2026-01-15', totalAmount: 576000, discount: 3, documentNumber: 'СЧ-003', paymentStatus: 'pending' },
  { id: 'so4', clientId: 'c4', items: [{ productId: 'p11', quantity: 30000, pricePerKg: 62000, amount: 1860000 }, { productId: 'p10', quantity: 25000, pricePerKg: 48000, amount: 1200000 }], status: 'confirmed', createdDate: '2026-01-14', deliveryDate: '2026-01-16', totalAmount: 3060000, discount: 12, documentNumber: 'СЧ-004', paymentStatus: 'pending' },
];

// ===== FINANCE RECORDS =====
export const financeRecords: FinanceRecord[] = [
  { id: 'f1', type: 'income', category: 'Продажи', amount: 1590000, date: '2026-01-13', description: 'Оплата по счёту СЧ-001', documentRef: 'СЧ-001' },
  { id: 'f2', type: 'income', category: 'Продажи', amount: 620000, date: '2026-01-14', description: 'Оплата по счёту СЧ-002', documentRef: 'СЧ-002' },
  { id: 'f3', type: 'expense', category: 'Закупки', amount: 5200000, date: '2026-01-10', description: 'Оплата закупки говядины', documentRef: 'ЗК-001' },
  { id: 'f4', type: 'expense', category: 'Закупки', amount: 1400000, date: '2026-01-12', description: 'Оплата закупки курицы', documentRef: 'ЗК-002' },
  { id: 'f5', type: 'expense', category: 'Зарплата', amount: 850000, date: '2026-01-10', description: 'Зарплата за первую половину января' },
  { id: 'f6', type: 'expense', category: 'Коммунальные', amount: 180000, date: '2026-01-05', description: 'Электричество и водоснабжение' },
  { id: 'f7', type: 'expense', category: 'Аренда', amount: 350000, date: '2026-01-01', description: 'Аренда помещений за январь' },
  { id: 'f8', type: 'expense', category: 'Логистика', amount: 95000, date: '2026-01-13', description: 'Доставка продукции клиентам' },
  { id: 'f9', type: 'income', category: 'Продажи', amount: 450000, date: '2026-01-11', description: 'Оплата по счёту СЧ-005 (пред. период)' },
  { id: 'f10', type: 'expense', category: 'Обслуживание', amount: 65000, date: '2026-01-08', description: 'ТО холодильного оборудования' },
];

// ===== HELPER FUNCTIONS =====
export function formatWeight(grams: number): string {
  if (grams >= 1000) return `${(grams / 1000).toFixed(1)} кг`;
  return `${grams} г`;
}

export function formatMoney(kopecks: number): string {
  const rubles = kopecks / 100;
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(rubles);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getWarehouseById(id: string): Warehouse | undefined {
  return warehouses.find(w => w.id === id);
}

export function getSupplierById(id: string): Supplier | undefined {
  return suppliers.find(s => s.id === id);
}

export function getClientById(id: string): Client | undefined {
  return clients.find(c => c.id === id);
}

export function getTechCardById(id: string): TechCard | undefined {
  return techCards.find(t => t.id === id);
}

// Calculate product cost from tech card
export function calculateProductCost(productId: string): number {
  const tc = techCards.find(t => t.productId === productId);
  if (!tc) {
    const batch = batches.find(b => b.productId === productId);
    return batch?.costPerKg || 0;
  }
  let cost = 0;
  for (const ing of tc.ingredients) {
    const p = products.find(pr => pr.id === ing.productId);
    cost += (ing.quantity / 1000) * (p?.purchasePricePerKg || 0);
  }
  // Adjust for output ratio
  const totalInput = tc.ingredients.reduce((s, i) => s + i.quantity, 0);
  return cost * (totalInput / tc.plannedOutput);
}
