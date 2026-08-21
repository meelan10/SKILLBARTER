import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";
import Logo from "./Logo";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/matches", label: "Find Matches" },
  { to: "/skills", label: "Skills" },
  { to: "/exchanges", label: "Exchanges" },
  { to: "/sessions", label: "Sessions" },
];

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <Link to="/dashboard">
  <Logo size={24} textSize="text-lg" />
</Link>
        <div className="flex items-center gap-7">
          {links.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={
                  active
                    ? "text-sm font-semibold text-text"
                    : "text-sm text-muted hover:text-text transition-colors"
                }
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
      <Link to="/profile">
        <Avatar name={user?.name || "User"} size={36} />
      </Link>
    </nav>
  );
}
