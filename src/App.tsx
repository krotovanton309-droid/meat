import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Layout from './components/Layout';
import Dashboard from './modules/Dashboard';
import Warehouse from './modules/Warehouse';
import Production from './modules/Production';
import Procurement from './modules/Procurement';
import Sales from './modules/Sales';
import Finance from './modules/Finance';
import AIAssistant from './modules/AIAssistant';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/production" element={<Production />} />
            <Route path="/procurement" element={<Procurement />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/ai" element={<AIAssistant />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
