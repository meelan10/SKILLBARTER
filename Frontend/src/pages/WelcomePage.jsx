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
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text">
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

          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85"
              alt="Friends learning together around a table"
              className="h-64 w-full object-cover sm:h-80 lg:h-72"
            />
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-dark">
                Learn with a friend
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
                Skills stick when you share the journey.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
                Find a study partner, trade what you know, and make every session feel more human.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-teal-dark">
                <span className="rounded-full bg-teal-soft px-3 py-1.5">Peer learning</span>
                <span className="rounded-full bg-brand-soft px-3 py-1.5">Real connections</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
