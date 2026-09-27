import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { TutorialsPage } from './pages/TutorialsPage';
import { TopicPage } from './pages/TopicPage';
import { ContactPage } from './pages/ContactPage';
import { TutorialDetailPage } from './pages/TutorialDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

/** Scroll to top on route change (search params excluded so typing doesn't jump). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <Header />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/topics/:topicKey" element={<TopicPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Deep links from the Owner app: /:tutorialKey (e.g. /tenant_add) and /tutorials/:tutorialKey */}
            <Route path="/tutorials/:tutorialKey" element={<TutorialDetailPage />} />
            <Route path="/:tutorialKey" element={<TutorialDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
