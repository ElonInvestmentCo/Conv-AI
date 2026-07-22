import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Chat from './pages/Chat';
import Conversations from './pages/Conversations';
import Builder from './pages/Builder';
import Agents from './pages/Agents';
import Models from './pages/Models';
import Voice from './pages/Voice';
import Images from './pages/Images';
import Video from './pages/Video';
import Documents from './pages/Documents';
import Automations from './pages/Automations';
import KnowledgeBase from './pages/KnowledgeBase';
import Files from './pages/Files';
import Integrations from './pages/Integrations';
import APIKeys from './pages/APIKeys';
import Usage from './pages/Usage';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import Account from './pages/Account';
import Settings from './pages/Settings';
import Help from './pages/Help';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/chat" replace />} />
          <Route path="chat" element={<Chat />} />
          <Route path="history" element={<Conversations />} />
          <Route path="builder" element={<Builder />} />
          <Route path="agents" element={<Agents />} />
          <Route path="models" element={<Models />} />
          <Route path="voice" element={<Voice />} />
          <Route path="images" element={<Images />} />
          <Route path="video" element={<Video />} />
          <Route path="documents" element={<Documents />} />
          <Route path="automations" element={<Automations />} />
          <Route path="knowledge" element={<KnowledgeBase />} />
          <Route path="files" element={<Files />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="api-keys" element={<APIKeys />} />
          <Route path="usage" element={<Usage />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
