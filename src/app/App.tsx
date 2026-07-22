import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Chat from './pages/Chat';
import Images from './pages/Images';
import Library from './pages/Library';
import Projects from './pages/Projects';
import Builder from './pages/Builder';
import TextToSpeech from './pages/TextToSpeech';
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
          <Route path="images" element={<Images />} />
          <Route path="library" element={<Library />} />
          <Route path="projects" element={<Projects />} />
          <Route path="builder" element={<Builder />} />
          <Route path="tts" element={<TextToSpeech />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
