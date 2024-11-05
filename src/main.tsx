import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import ruRU from "antd/es/locale/ru_RU";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage/HomePage";
import IntroPage from "pages/IntroPage/IntroPage";
import RegistrationPage from "pages/RegistrationPage/RegistrationPage";
import KnowledgePage from "pages/KnowledgePage/KnowledgePage";
import LoginPage from "pages/LoginPage/LoginPage";
import ErrorPage from "pages/ErrorPage/ErrorPage";
import VideoLecturesPage from "pages/VideoLecturesPage/VideoLecturesPage";
import VideoLecturePage from "pages/VideoLecturePage/VideoLecturePage";
import TermsPage from "pages/TermsPage/TermsPage";
import ArticlePage from "pages/ArticlePage/ArticlePage";
import ArticleDetailsPage from "pages/ArticleDetailsPage/ArticleDetailsPage";
import ConfirmationPage from "pages/ConfirmationPage/ConfirmationPage";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import EquipmentPage from "pages/EquipmentPage/EquipmentPage";
import EquipmentDetailsPage from "pages/EquipmentDetailsPage/EquipmentDetailsPage";
import PodcastsPage from "pages/PodcastsPage/PodcastsPage";
import PracticumPage from "pages/PracticumPage/PracticumPage";
import PracticumDetailsPage from "pages/PracticumDetailsPage/PracticumDetailsPage";
import QuestsPage from "pages/QuestsPage/QuestsPage";
import QuestsDetailsPage from "pages/QuestsDetailsPage/QuestsDetailsPage";
import QuestDetailsPage from "pages/QuestDetailsPage/QuestDetailsPage";
import TasksPage from "pages/TasksPage/TasksPage";
import ScrollToTop from "hooks/ScrollToTop";
import { AuthProvider } from "hooks/AuthProvider";
import App from "app/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider locale={ruRU}>
      <React.StrictMode>
        <AuthProvider>
          <Router>
            <ScrollToTop />

            <Routes>
              <Route path="*" element={<ErrorPage />} />

              <Route path="registration" element={<RegistrationPage />} />

              <Route
                path="registration/confirmation/:token"
                element={<ConfirmationPage />}
              />

              <Route path="login" element={<LoginPage />} />

              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />

                <Route path="/profile" element={<ProfilePage />} />

                {/* Введение в медицинскую физику */}

                <Route path="/introduction" element={<IntroPage />} />

                <Route path="/video-lectures" element={<VideoLecturesPage />} />

                <Route
                  path="/video-lectures/:id"
                  element={<VideoLecturePage />}
                />

                <Route path="/podcasts" element={<PodcastsPage />} />

                <Route path="/articles" element={<ArticlePage />} />

                <Route path="/articles/:id" element={<ArticleDetailsPage />} />

                <Route path="/equipment" element={<EquipmentPage />} />

                <Route
                  path="/equipment/:id"
                  element={<EquipmentDetailsPage />}
                />

                {/* База знаний */}

                <Route path="/knowledge" element={<KnowledgePage />} />

                <Route path="/knowledge/:type" element={<TermsPage />} />

                <Route path="/knowledge/:type/tasks" element={<TasksPage />} />

                {/* Практикум */}

                <Route path="/practicum" element={<PracticumPage />} />

                <Route
                  path="/practicum/:id"
                  element={<PracticumDetailsPage />}
                />

                {/* Квесты */}

                <Route path="/quests" element={<QuestsPage />} />

                <Route path="/quests/:name" element={<QuestsDetailsPage />} />

                <Route
                  path="/quests/:name/:id"
                  element={<QuestDetailsPage />}
                />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </React.StrictMode>
    </ConfigProvider>
  </QueryClientProvider>,
);
