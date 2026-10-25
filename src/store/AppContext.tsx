import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AIMessage } from '../types';

interface AppState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  aiMessages: AIMessage[];
  addAiMessage: (msg: AIMessage) => void;
  notifications: string[];
  addNotification: (msg: string) => void;
  clearNotification: (index: number) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    { id: '1', role: 'assistant', content: 'Здравствуйте! Я AI-помощник MEAT AI OS. Могу помочь с вопросами по остаткам, себестоимости, потерям, закупкам, финансам и производству. Что вас интересует?', timestamp: new Date().toISOString() }
  ]);
  const [notifications, setNotifications] = useState<string[]>([
    '⚠️ Партия Б-2026-006 (Говядина) просрочена!',
    '📦 Заявка ЗК-003 ожидает подтверждения',
    '🏭 Производственное задание ПО-002 в работе',
    '💰 Дебиторская задолженность: 431 000 ₽',
    '📊 Потери снизились на 25% — тренд положительный',
  ]);

  const addAiMessage = (msg: AIMessage) => {
    setAiMessages(prev => [...prev, msg]);
  };

  const addNotification = (msg: string) => {
    setNotifications(prev => [...prev, msg]);
  };

  const clearNotification = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen, aiMessages, addAiMessage, notifications, addNotification, clearNotification }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
