import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

export default function DashboardPage() {
  const { user } = useAuth();
  return <div>
    <p className="text-sm font-semibold text-teal-dark">WELCOME BACK</p>
    <h1 className="mt-1 text-3xl font-bold text-text">Good to see you, {user?.name?.split(" ")[0] || "there"}.</h1>
    <p className="mt-2 text-muted">Trade what you know for what you want to learn.</p>
    <div className="mt-8 grid gap-5 md:grid-cols-3">
      <Link to="/matches" className="bg-white border border-border rounded-2xl p-5 hover:border-teal transition"><p className="text-sm text-muted">Find partners</p><p className="mt-2 text-lg font-bold text-text">Discover skill matches</p></Link>
      <Link to="/exchanges" className="bg-white border border-border rounded-2xl p-5 hover:border-teal transition"><p className="text-sm text-muted">Your activity</p><p className="mt-2 text-lg font-bold text-text">Manage exchanges</p></Link>
      <Link to="/sessions" className="bg-white border border-border rounded-2xl p-5 hover:border-teal transition"><p className="text-sm text-muted">Next step</p><p className="mt-2 text-lg font-bold text-text">View sessions</p></Link>
    </div>
    <div className="mt-8 bg-teal-dark rounded-2xl p-6 text-white"><h2 className="text-xl font-bold">Make your profile discoverable</h2><p className="mt-2 text-white/75">Add skills you teach and want to learn to get better reciprocal matches.</p><Link to="/onboarding"><Button className="mt-5 bg-white !text-teal-dark">Update skills</Button></Link></div>
  </div>;
}
