import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, Search, ArrowLeftRight, FileText, Calendar,
  MessageSquare, Bell, Settings, ChevronRight,
} from "lucide-react";
import Logo from "./Logo";
import Avatar from "../ui/Avatar";
import { useAuth } from "../../context/AuthContext";

const mainNav = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/discover", label: "Discover", icon: Search },
  { to: "/matches", label: "Matches", icon: ArrowLeftRight },
  { to: "/requests", label: "Requests", icon: FileText, badge: 2 },
  { to: "/sessions", label: "Sessions", icon: Calendar },
  { to: "/chat/1", label: "Messages", icon: MessageSquare, badge: 1 },
];

const secondaryNav = [
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isActive = (to) =>
    to === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(to.split("/:")[0].replace(/\/1$/, "").replace(/\/\d+$/, ""));

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-white h-screen sticky top-0 flex flex-col justify-between py-6 px-4">
      <div>
        <div className="px-2">
          <Logo size={30} textSize="text-xl" />
          <p className="text-xs text-muted mt-1 ml-0.5">
            Trade skills. Grow together.
          </p>
        </div>

        <nav className="mt-8 space-y-1">
          {mainNav.map(({ to, label, icon: Icon, badge }) => {
            const active = isActive(to);
            return (
              <Link
                key={label}
                to={to}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-teal-active-bg text-teal-dark"
                    : "text-muted hover:bg-page hover:text-text"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  {label}
                </span>
                {badge && (
                  <span className="w-5 h-5 rounded-full bg-red text-white text-[11px] font-semibold flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="h-px bg-border my-5" />

        <nav className="space-y-1">
          {secondaryNav.map(({ to, label, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:bg-page hover:text-text transition-colors"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-page transition-colors"
      >
        <Avatar name={user?.name || "Aarav Sharma"} size={38} />
        <div className="text-left">
          <p className="text-sm font-semibold text-text leading-tight">
            {user?.name || "Aarav Sharma"}
          </p>
          <p className="text-xs text-muted">View Profile</p>
        </div>
        <ChevronRight size={16} className="text-muted ml-auto" />
      </button>
    </aside>
  );
}
