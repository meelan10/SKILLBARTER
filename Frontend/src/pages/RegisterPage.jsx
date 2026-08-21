import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/shared/Logo";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await register({ name: email.split("@")[0], email, password });
      navigate("/onboarding");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <Logo />

      <div className="w-full max-w-sm mt-14">
        <h1 className="text-xl font-bold text-text text-center">
          Create an account
        </h1>
        <p className="text-sm text-muted text-center mt-1">
          Enter your email to sign up for this app
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal/30"
            required
          />
          <input
            type="password"
            placeholder="Create a password (6+ characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal/30"
            required
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-teal-soft text-teal font-medium text-sm rounded-lg py-2.5 hover:brightness-95 transition disabled:opacity-50"
          >
            {submitting ? "Signing up..." : "Sign up with email"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <span className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted">or continue with</span>
          <span className="flex-1 h-px bg-border" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-border rounded-lg py-2.5 text-sm font-medium text-text bg-page hover:bg-border/40 transition"
        >
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.6 5.5 29.6 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5 44.5 35.3 44.5 24c0-1.2-.1-2.4-.3-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.6 5.5 29.6 3.5 24 3.5c-7.7 0-14.3 4.3-17.7 10.6z"
            />
            <path
              fill="#4CAF50"
              d="M24 44.5c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.5 35.6 26.9 36.5 24 36.5c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.6 40.1 16.3 44.5 24 44.5z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.6 5.4C41.5 36.1 44.5 30.7 44.5 24c0-1.2-.1-2.4-.3-3.5z"
            />
          </svg>
          Google
        </button>

        <p className="text-xs text-muted text-center mt-5">
          By clicking continue, you agree to our{" "}
          <span className="text-text font-medium underline">
            Terms of Service
          </span>{" "}
          and <span className="text-text font-medium underline">Privacy Policy</span>
        </p>

        <p className="text-sm text-muted text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-teal font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
