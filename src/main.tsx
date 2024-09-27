import React from 'react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import IntroPage from './pages/IntroPage/IntroPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import KnowledgePage from './pages/KnowledgePage/KnowledgePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import VideoLecturesPage from './pages/VideoLecturesPage/VideoLecturesPage';
import VideoLecturePage from './pages/VideoLecturePage/VideoLecturePage';
import DiagnosticsPage from './pages/DiagnosticsPage/DiagnosticsPage';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import ArticleDetailsPage from './pages/ArticleDetailsPage/ArticleDetailsPage';
import ScrollToTop from './hooks/ScrollToTop/ScrollToTop';
import App from './app/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={ruRU}>
    <React.StrictMode>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route path="*" element={<ErrorPage />} />

          <Route path="registration" element={<RegistrationPage />} />

          <Route path="login" element={<LoginPage />} />

          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="/introduction" element={<IntroPage />} />

            <Route path="/knowledge" element={<KnowledgePage />} />

            <Route path="/video-lectures" element={<VideoLecturesPage />} />

            <Route path="/video-lectures/:id" element={<VideoLecturePage />} />

            <Route path="/diagnostics" element={<DiagnosticsPage />} />

            <Route path="/articles" element={<ArticlePage />} />

            <Route path="/articles/:id" element={<ArticleDetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </ConfigProvider>
);
