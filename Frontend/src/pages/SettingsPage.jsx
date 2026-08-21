import { useState } from "react";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { currentUser } from "../utils/mockData";

function ToggleRow({ label, description, defaultChecked = true }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-text">{label}</p>
        {description && <p className="text-xs text-muted mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
          on ? "bg-teal-dark" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { logout } = useAuth();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-text">Settings</h1>
      <p className="text-muted mt-1">Manage your account and preferences.</p>

      <div className="bg-white border border-border rounded-2xl p-5 mt-6">
        <p className="text-xs font-semibold tracking-wide text-muted mb-3">ACCOUNT</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted">Name</label>
            <input
              defaultValue={currentUser.name}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-dark/20"
            />
          </div>
          <div>
            <label className="text-xs text-muted">University</label>
            <input
              defaultValue={currentUser.university}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-dark/20"
            />
          </div>
        </div>
        <Button className="mt-4">Save changes</Button>
      </div>

      <div className="bg-white border border-border rounded-2xl p-5 mt-5">
        <p className="text-xs font-semibold tracking-wide text-muted mb-1">NOTIFICATIONS</p>
        <div className="divide-y divide-border">
          <ToggleRow label="New matches" description="Get notified about reciprocal matches" />
          <ToggleRow label="Exchange requests" description="Get notified when someone proposes a swap" />
          <ToggleRow label="Messages" description="Get notified about new chat messages" />
          <ToggleRow label="Session reminders" defaultChecked />
        </div>
      </div>

      <div className="bg-white border border-border rounded-2xl p-5 mt-5">
        <p className="text-xs font-semibold tracking-wide text-muted mb-1">PRIVACY</p>
        <div className="divide-y divide-border">
          <ToggleRow label="Show profile to campus" defaultChecked />
          <ToggleRow label="Show availability publicly" defaultChecked />
        </div>
      </div>

      <Button variant="danger" className="mt-6" onClick={logout}>
        Log out
      </Button>
    </div>
  );
}
