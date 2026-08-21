import { Star } from "lucide-react";
import Avatar from "../components/ui/Avatar";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { currentUser } from "../utils/mockData";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">{currentUser.name}</h1>
      <p className="text-muted mt-1">
        {currentUser.university} • {currentUser.department} •{" "}
        {currentUser.year}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-5 flex gap-5">
            <Avatar name={currentUser.name} size={72} />
            <div>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <p className="text-[11px] tracking-wide text-muted font-semibold">
                    RATING
                  </p>
                  <p className="flex items-center gap-1 font-bold text-text">
                    <Star size={14} className="text-amber fill-amber" />
                    {currentUser.rating}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] tracking-wide text-muted font-semibold">
                    RELIABLE
                  </p>
                  <p className="font-bold text-teal">
                    {currentUser.reliability}%
                  </p>
                </div>
                <div>
                  <p className="text-[11px] tracking-wide text-muted font-semibold">
                    VERIFIED SESSIONS
                  </p>
                  <p className="font-bold text-text">
                    {currentUser.verifiedSessions}
                  </p>
                </div>
              </div>
              <p className="text-sm text-text mt-3">{currentUser.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-xs font-semibold tracking-wide text-muted mb-3">
                CAN TEACH
              </p>
              <div className="space-y-2">
                {currentUser.teachSkills.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 text-sm text-text">
                      <span className="w-2 h-2 rounded-full bg-teal" />
                      {s.name}
                    </span>
                    <Badge color="teal">{s.level}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-xs font-semibold tracking-wide text-muted mb-3">
                WANTS TO LEARN
              </p>
              <div className="space-y-2">
                {currentUser.learnSkills.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 text-sm text-text">
                      <span className="w-2 h-2 rounded-full bg-brand" />
                      {s.name}
                    </span>
                    <Badge color="brand">{s.level}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-xs font-semibold tracking-wide text-muted mb-3">
              AVAILABILITY
            </p>
            {currentUser.availability.map((a) => (
              <div
                key={a.day}
                className="flex items-center justify-between text-sm py-1"
              >
                <span className="text-brand">{a.day}</span>
                <span className="text-text">{a.time}</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm mt-3 pt-3 border-t border-border">
              <span className="text-brand">Format</span>
              <span className="text-text">{currentUser.format}</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-2 space-y-2">
            <Button className="w-full">Propose Exchange</Button>
            <Button variant="secondary" className="w-full">
              Message
            </Button>
          </div>

          <div className="flex items-center gap-4 px-1 text-sm text-muted">
            <button className="hover:text-text">Report</button>
            <button className="hover:text-text">Block</button>
            <button onClick={handleLogout} className="hover:text-red ml-auto">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
