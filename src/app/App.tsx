import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Wallet from './pages/Wallet';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Analytics from './pages/Analytics';
import Investments from './pages/Investments';
import Crypto from './pages/Crypto';
import Cards from './pages/Cards';
import Accounts from './pages/Accounts';
import Reports from './pages/Reports';
import Insights from './pages/Insights';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/chat" replace />} />
          <Route path="chat" element={<Chat />} />
          <Route path="history" element={<Chat />} />
          <Route path="home" element={<Home />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budget" element={<Budget />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="investments" element={<Investments />} />
          <Route path="crypto" element={<Crypto />} />
          <Route path="cards" element={<Cards />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="insights" element={<Insights />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
