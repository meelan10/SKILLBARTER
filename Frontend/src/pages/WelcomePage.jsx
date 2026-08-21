import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Logo from "../components/shared/Logo";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eef0ff,_#f7f8fb_45%,_#ffffff_100%)] px-6 py-12">
      <div className="mx-auto max-w-5xl">
     <header className="flex items-center justify-between">
  <Logo size={26} textSize="text-xl" />
  <div className="flex items-center gap-2">
    <Link to="/login">
      <Button variant="ghost" className="text-sm">Log in</Button>
    </Link>
    <Link to="/register">
      <Button className="text-sm">Sign up</Button>
    </Link>
  </div>
</header>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              Learn • Teach • Grow
            </p>
            <h1 className="text-5xl font-black tracking-tight text-text">
              Trade skills with people who learn the same way you do.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Match with students on campus, exchange knowledge, and build your network through practical peer-to-peer skill swaps.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register">
                <Button className="px-6 py-3 text-base">Get started</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="px-6 py-3 text-base">
                  Log in
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <div className="rounded-2xl bg-page p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Match profile</p>
                  <h2 className="mt-2 text-2xl font-bold text-text">96% compatible</h2>
                </div>
                <div className="rounded-full bg-teal-soft px-3 py-1 text-sm font-semibold text-teal">
                  Active
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-text">Skill fit</span>
                    <span className="font-semibold text-brand">40/40</span>
                  </div>
                  <div className="h-2 rounded-full bg-border">
                    <div className="h-2 w-[100%] rounded-full bg-brand" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl bg-card border border-border p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Teach</p>
                    <p className="mt-2 font-semibold text-text">Python</p>
                  </div>
                  <div className="rounded-2xl bg-card border border-border p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Learn</p>
                    <p className="mt-2 font-semibold text-text">Guitar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
