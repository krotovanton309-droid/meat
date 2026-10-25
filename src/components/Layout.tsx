import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import {
  LayoutDashboard, Warehouse, Factory, ShoppingCart, TrendingUp,
  Bot, Menu, X, Bell, ChevronDown, Beef, DollarSign
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Дашборд', icon: LayoutDashboard },
  { path: '/warehouse', label: 'Склад', icon: Warehouse },
  { path: '/production', label: 'Производство', icon: Factory },
  { path: '/procurement', label: 'Закупки', icon: ShoppingCart },
  { path: '/sales', label: 'Продажи', icon: TrendingUp },
  { path: '/finance', label: 'Финансы', icon: DollarSign },
  { path: '/ai', label: 'AI-помощник', icon: Bot },
];

export default function Layout() {
  const { sidebarOpen, setSidebarOpen, notifications, clearNotification } = useApp();
  const [showNotif, setShowNotif] = React.useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
              <Beef className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-slate-800 text-lg leading-tight">MEAT AI</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Operating System</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-red-50 text-red-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        {sidebarOpen && (
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-slate-600">АД</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">Админ</p>
                <p className="text-xs text-slate-400">Владелец</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              {sidebarOpen ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-slate-600" />}
            </button>
            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-slate-800">MEAT AI OS</h2>
              <p className="text-xs text-slate-400">Система управления мясным производством</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                  <div className="p-3 border-b border-slate-100 font-semibold text-sm text-slate-700">Уведомления</div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n, i) => (
                      <div key={i} className="px-3 py-2.5 text-sm text-slate-600 border-b border-slate-50 hover:bg-slate-50 flex items-start gap-2">
                        <span className="flex-1">{n}</span>
                        <button onClick={() => clearNotification(i)} className="text-slate-400 hover:text-red-500 flex-shrink-0">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
