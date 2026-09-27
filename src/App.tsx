import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { TutorialDetailPage } from './pages/TutorialDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tutorials" element={<HomePage />} />
            {/* Direct tutorial_key routes (e.g. /tenant_add, /how-to-add-tenant) */}
            <Route path="/:tutorialKey" element={<TutorialDetailPage />} />
            <Route path="/tutorials/:tutorialKey" element={<TutorialDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
