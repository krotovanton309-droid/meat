// ===== ENUMS =====
export type ProductType = 'raw' | 'semi' | 'finished' | 'packaging';
export type UnitType = 'kg' | 'g' | 'l' | 'ml' | 'pcs' | 'pack' | 'm';
export type WarehouseType = 'raw' | 'semi' | 'finished' | 'packaging' | 'cold';
export type OrderStatus = 'draft' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type PurchaseStatus = 'planned' | 'ordered' | 'delivered' | 'cancelled';
export type ProductionStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';

// ===== CORE ENTITIES =====
export interface Product {
  id: string;
  name: string;
  type: ProductType;
  unit: UnitType;
  category: string;
  sku: string;
  minStock: number; // in base unit (grams)
  shelfLifeDays: number;
  purchasePricePerKg?: number; // in kopecks
  sellingPricePerKg?: number; // in kopecks
  supplierId?: string;
}

export interface Batch {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number; // grams
  receivedDate: string;
  expiryDate: string;
  supplierId?: string;
  costPerKg: number; // kopecks
  batchNumber: string;
}

export interface Warehouse {
  id: string;
  name: string;
  type: WarehouseType;
  location: string;
}

export interface StockMovement {
  id: string;
  type: 'in' | 'out' | 'transfer' | 'adjustment';
  productId: string;
  warehouseId: string;
  toWarehouseId?: string;
  quantity: number;
  date: string;
  reason: string;
  batchId?: string;
  documentNumber: string;
}

// ===== PRODUCTION =====
export interface TechCard {
  id: string;
  productId: string;
  name: string;
  ingredients: TechCardIngredient[];
  plannedOutput: number; // grams
  plannedLoss: number; // percentage
  version: number;
  createdAt: string;
}

export interface TechCardIngredient {
  productId: string;
  quantity: number; // grams
  percentage: number;
}

export interface ProductionOrder {
  id: string;
  techCardId: string;
  productId: string;
  plannedQuantity: number; // grams
  actualQuantity?: number;
  status: ProductionStatus;
  plannedDate: string;
  completedDate?: string;
  notes?: string;
}

// ===== PROCUREMENT =====
export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  specialties: string[];
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  items: PurchaseOrderItem[];
  status: PurchaseStatus;
  createdDate: string;
  expectedDate: string;
  totalAmount: number; // kopecks
  documentNumber: string;
}

export interface PurchaseOrderItem {
  productId: string;
  quantity: number;
  pricePerKg: number;
  amount: number;
}

// ===== SALES =====
export interface Client {
  id: string;
  name: string;
  type: 'retail' | 'wholesale' | 'restaurant' | 'chain';
  contact: string;
  phone: string;
  email: string;
  address: string;
  discount: number; // percentage
  balance: number; // kopecks (debt)
}

export interface SalesOrder {
  id: string;
  clientId: string;
  items: SalesOrderItem[];
  status: OrderStatus;
  createdDate: string;
  deliveryDate: string;
  totalAmount: number;
  discount: number;
  documentNumber: string;
}

export interface SalesOrderItem {
  productId: string;
  quantity: number;
  pricePerKg: number;
  amount: number;
}

// ===== DASHBOARD =====
export interface DashboardStats {
  totalStockValue: number;
  expiredProducts: number;
  activeOrders: number;
  monthlyRevenue: number;
  monthlyMargin: number;
  lossesThisMonth: number;
}

// ===== AI =====
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
