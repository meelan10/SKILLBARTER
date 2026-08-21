import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main className="max-w-7xl mx-auto px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
