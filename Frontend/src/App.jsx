import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./layouts/AppLayout";
import WelcomePage from "./pages/WelcomePage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import SkillsPage from "./pages/SkillsPage";
import MatchesPage from "./pages/MatchesPage";
import ExchangesPage from "./pages/ExchangesPage";
import ExchangeDetailPage from "./pages/ExchangeDetailPage";
import ChatPage from "./pages/ChatPage";
import SessionsPage from "./pages/SessionsPage";
import SessionDetailPage from "./pages/SessionDetailPage";
import AddSkillPage from "./pages/AddSkillPage";
import RequestsPage from "./pages/RequestsPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/discover" element={<SkillsPage />} />
          <Route path="/skills/add" element={<AddSkillPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/exchanges" element={<ExchangesPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/exchanges/:id" element={<ExchangeDetailPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/sessions/:id" element={<SessionDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const routes = <AppRoutes />;

  return (
    <AuthProvider>
      {googleClientId ? (
        <GoogleOAuthProvider clientId={googleClientId}>{routes}</GoogleOAuthProvider>
      ) : routes}
    </AuthProvider>
  );
}
