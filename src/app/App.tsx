import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import { ConversationsProvider } from './context/ConversationsContext';
import MainLayout from './layouts/MainLayout';

// ── Lazy-loaded page chunks ────────────────────────────────────────────────────
// Each import() becomes its own JS chunk: browser downloads + parses only the
// active page, not the entire app. Second visit to the same route is instant
// because the chunk is already cached.
const Chat          = lazy(() => import('./pages/Chat'));
const Images        = lazy(() => import('./pages/Images'));
const Library       = lazy(() => import('./pages/Library'));
const Projects      = lazy(() => import('./pages/Projects'));
const Builder       = lazy(() => import('./pages/Builder'));
const TextToSpeech  = lazy(() => import('./pages/TextToSpeech'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Account       = lazy(() => import('./pages/Account'));
const Settings      = lazy(() => import('./pages/Settings'));
const Help          = lazy(() => import('./pages/Help'));

// ── Skeleton fallback ──────────────────────────────────────────────────────────
// Shown only while the chunk downloads (first visit). Matches the dark brand so
// there's no colour flash. Uses CSS animation so no JS animation lib is needed.
function PageSkeleton() {
  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0C10',
      }}
    >
      <div style={{ display: 'flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#2E3440',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Suspense wrapper ───────────────────────────────────────────────────────────
// One wrapper keeps the route elements terse. Each route gets its own Suspense
// boundary so a slow chunk on /settings never blocks /chat.
function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>;
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <ConversationsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/chat" replace />} />

              {/* Each page is an independent lazy chunk */}
              <Route path="chat/:id?" element={<Lazy><Chat /></Lazy>} />
              <Route path="images"     element={<Lazy><Images /></Lazy>} />
              <Route path="library"    element={<Lazy><Library /></Lazy>} />
              <Route path="projects"   element={<Lazy><Projects /></Lazy>} />
              <Route path="builder"    element={<Lazy><Builder /></Lazy>} />
              <Route path="tts"        element={<Lazy><TextToSpeech /></Lazy>} />
              <Route path="notifications" element={<Lazy><Notifications /></Lazy>} />
              <Route path="account"    element={<Lazy><Account /></Lazy>} />
              <Route path="settings"   element={<Lazy><Settings /></Lazy>} />
              <Route path="help"       element={<Lazy><Help /></Lazy>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConversationsProvider>
    </ThemeProvider>
  );
}
