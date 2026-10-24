import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Package, Factory, TrendingUp, ShoppingCart, Lightbulb } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { products, batches, productionOrders, salesOrders, purchaseOrders, formatWeight, formatMoney } from '../data/mockData';

const quickQuestions = [
  { icon: Package, text: 'Какие остатки на складе?', color: 'text-blue-600 bg-blue-50' },
  { icon: Factory, text: 'Есть ли отклонения план/факт?', color: 'text-purple-600 bg-purple-50' },
  { icon: TrendingUp, text: 'Какая себестоимость продукции?', color: 'text-green-600 bg-green-50' },
  { icon: ShoppingCart, text: 'Что нужно закупить?', color: 'text-amber-600 bg-amber-50' },
];

function generateResponse(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes('остатк') || q.includes('склад')) {
    const totalValue = batches.reduce((s, b) => s + (b.quantity / 1000) * b.costPerKg, 0);
    const rawStock = batches.filter(b => { const p = products.find(pr => pr.id === b.productId); return p?.type === 'raw'; }).reduce((s, b) => s + b.quantity, 0);
    const semiStock = batches.filter(b => { const p = products.find(pr => pr.id === b.productId); return p?.type === 'semi'; }).reduce((s, b) => s + b.quantity, 0);
    const finStock = batches.filter(b => { const p = products.find(pr => pr.id === b.productId); return p?.type === 'finished'; }).reduce((s, b) => s + b.quantity, 0);
    
    return `📊 **Текущие остатки на складах:**\n\n• Сырьё: ${formatWeight(rawStock)}\n• Полуфабрикаты: ${formatWeight(semiStock)}\n• Готовая продукция: ${formatWeight(finStock)}\n• Общая стоимость: ${formatMoney(totalValue)}\n\n⚠️ **Внимание:**\n• 1 партия просрочена (Говядина, Б-2026-006)\n• 2 партии с истекающим сроком годности\n\n💡 Рекомендую провести реализацию просроченных партий и усилить контроль сроков годности.`;
  }
  
  if (q.includes('план') || q.includes('факт') || q.includes('отклонен')) {
    const completed = productionOrders.filter(o => o.status === 'completed' && o.actualQuantity);
    const deviations = completed.map(o => {
      const p = products.find(pr => pr.id === o.productId);
      const dev = ((o.actualQuantity! - o.plannedQuantity) / o.plannedQuantity * 100);
      return { name: p?.name, planned: o.plannedQuantity, actual: o.actualQuantity!, deviation: dev };
    });
    
    return `🏭 **Анализ план/факт по производству:**\n\n${deviations.map(d => `• ${d.name}: план ${formatWeight(d.planned)}, факт ${formatWeight(d.actual)} (отклонение ${d.deviation >= 0 ? '+' : ''}${d.deviation.toFixed(1)}%)`).join('\n')}\n\n📋 **Активные задания:**\n• 1 в работе (Сосиски "Молочные" — 30 кг)\n• 2 запланированы\n\n💡 Отклонение по "Докторской" (-3%) в пределах нормы. Рекомендую проверить настройки оборудования для минимизации потерь.`;
  }
  
  if (q.includes('себестоим') || q.includes('марж') || q.includes('стоимость')) {
    return `💰 **Себестоимость и маржа:**\n\n**Топ продукты по себестоимости:**\n• Колбаса "Докторская": 350 ₽/кг → продажа 480 ₽/кг (маржа 27%)\n• Колбаса "Краковская": 450 ₽/кг → продажа 620 ₽/кг (маржа 27%)\n• Сосиски "Молочные": 300 ₽/кг → продажа 420 ₽/кг (маржа 29%)\n• Фарш говяжий: 480 ₽/кг → продажа 650 ₽/кг (маржа 26%)\n\n📈 **За месяц:**\n• Выручка: ${formatMoney(salesOrders.filter(o => o.status === 'completed').reduce((s, o) => s + o.totalAmount, 0))}\n• Средняя маржа: 27.3%\n\n💡 Маржа стабильная. Можно оптимизировать закупки говядины — снижение цены на 5% увеличит маржу на ~2 п.п.`;
  }
  
  if (q.includes('закуп') || q.includes('нужно') || q.includes('дефицит')) {
    return `🛒 **Прогноз потребности в закупках:**\n\n**Срочно (дефицит > 20%):**\n• Говядина (лопатка): нужно 120 кг, на складе 85 кг → **дефицит 35 кг**\n\n**Внимание (дефицит 10-20%):**\n• Свинина (окорок): нужно 80 кг, на складе 62 кг → **дефицит 18 кг**\n• Шпик: нужно 40 кг, на складе 30 кг → **дефицит 10 кг**\n\n**Достаточно:**\n• Куриное филе: покрытие 90%\n• Оболочка колбасная: покрытие 400%\n\n💡 Рекомендую срочно разместить заказ у "МясоТорг ООО" на говядину и свинину. Ориентировочная сумма: ~247 000 ₽.\n\n📋 Активная заявка ЗК-003 (свинина 80 кг) уже в статусе "Заказано" — ожидается 16.01.`;
  }
  
  if (q.includes('потер') || q.includes('брак')) {
    return `📉 **Анализ потерь:**\n\n**Потери по неделям:**\n• Неделя 1: 3.2%\n• Неделя 2: 2.8%\n• Неделя 3: 4.1% ← пик\n• Неделя 4: 2.5%\n• Текущая: 1.9% ← улучшение!\n\n**Основные источники потерь:**\n• Обрезка сырья: 60% потерь\n• Усушка при копчении: 25%\n• Брак упаковки: 15%\n\n💡 Тренд положительный — потери снижаются. Рекомендую:\n1. Проверить настройки фаршесмесителя (неделя 3 была аномальной)\n2. Оптимизировать режимы сушки\n3. Рассмотреть замену поставщика оболочки`;
  }
  
  if (q.includes('технолог') || q.includes('рецептур') || q.includes('карт')) {
    return `📋 **Технологические карты:**\n\nВсего активных тех. карт: 4\n\n1. **Колбаса "Докторская"** (v2)\n   - Говядина 70%, Шпик 15%, Специи 3.3%\n   - Выход: 883г, Потери: 11.7%\n\n2. **Колбаса "Краковская"** (v1)\n   - Говядина 50%, Свинина 35%, Шпик 10%\n   - Выход: 992г, Потери: 0.8%\n\n3. **Сосиски "Молочные"** (v1)\n   - Курица 50%, Свинина 30%, Шпик 15%\n   - Выход: 976г, Потери: 2.4%\n\n4. **Фарш говяжий** (v1)\n   - Говядина 95%, Специи 2%\n   - Выход: 970г, Потери: 3%\n\n💡 Могу сгенерировать черновик новой тех. карты. Опишите желаемый продукт!`;
  }
  
  return `🤖 Я могу помочь вам с:\n\n• **Остатки и склад** — текущие запасы, сроки годности\n• **Производство** — план/факт, отклонения, задания\n• **Себестоимость** — расчёт маржи, анализ затрат\n• **Закупки** — прогноз потребности, дефицит\n• **Потери** — анализ и рекомендации по снижению\n• **Технологические карты** — просмотр и генерация\n\nЗадайте конкретный вопрос, и я проанализирую данные!`;
}

export default function AIAssistant() {
  const { aiMessages, addAiMessage } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  const handleSend = (text?: string) => {
    const message = text || input;
    if (!message.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message,
      timestamp: new Date().toISOString(),
    };
    addAiMessage(userMsg);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(message);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: response,
        timestamp: new Date().toISOString(),
      };
      addAiMessage(aiMsg);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-red-500 to-red-700 rounded-xl">
              <Bot className="w-6 h-6 text-white" />
            </div>
            AI-помощник
          </h1>
          <p className="text-sm text-slate-500 mt-1">Анализ данных, подсказки и прогнозы для вашего производства</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-green-700">Онлайн</span>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q.text)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${q.color} hover:opacity-80 transition-opacity`}
          >
            <q.icon className="w-4 h-4" />
            {q.text}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {aiMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">MEAT AI</span>
                  </div>
                )}
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-red-600 text-white rounded-br-md'
                    : 'bg-slate-50 text-slate-700 rounded-bl-md border border-slate-100'
                }`}>
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i} className={`${i > 0 ? 'mt-1.5' : ''} ${line.startsWith('**') ? 'font-semibold' : ''}`}>
                      {line.replace(/\*\*/g, '')}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Задайте вопрос по производству, остаткам, закупкам..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 pr-12"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Lightbulb className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            AI анализирует данные системы и даёт рекомендации на основе текущего состояния
          </p>
        </div>
      </div>
    </div>
  );
}
