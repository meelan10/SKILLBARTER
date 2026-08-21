import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/", label: "Matches", end: true },
  { to: "/exchanges", label: "Exchanges" },
  { to: "/sessions", label: "Sessions" },
  { to: "/profile", label: "Profile" },
];

export default function AppShell() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-gold">
              ⇄
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              SkillBarter
            </span>
          </div>

          <nav className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-md px-3.5 py-2 font-body text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-sage-light text-sage"
                      : "text-slate hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden font-body text-sm text-slate sm:inline">
              {user?.name}
            </span>
            <button onClick={logout} className="btn-secondary !py-2 !px-3.5 text-xs">
              Log out
            </button>
          </div>
        </div>

        {/* mobile nav */}
        <nav className="flex items-center gap-1 overflow-x-auto border-t border-line px-4 py-2 sm:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-1.5 font-body text-sm font-medium ${
                  isActive ? "bg-sage-light text-sage" : "text-slate"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
