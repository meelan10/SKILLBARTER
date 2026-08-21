import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/shared/Logo";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const { register } = useAuth();
  const { handleSuccess, handleError, loading: googleLoading, error: googleError } = useGoogleAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
    setFormError("");
    setSubmitting(true);
    try {
      await register({ name, email, password });
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

        <form id="register-form" onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={2}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal/30"
            required
          />
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
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal/30"
            required
          />
          {formError && <p className="text-sm text-red">{formError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-teal-soft text-teal font-medium text-sm rounded-lg py-2.5 hover:brightness-95 transition disabled:opacity-50"
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <span className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted">or continue with</span>
          <span className="flex-1 h-px bg-border" />
        </div>

        {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} text="signup_with" useOneTap={false} />
        ) : null}
        <button
          type="submit"
          form="register-form"
          disabled={submitting}
          className="w-full border border-border rounded-lg py-2.5 text-sm font-medium text-text bg-page hover:bg-border/40 transition disabled:opacity-50"
        >
          Sign up with email
        </button>
        {googleLoading && <p className="text-center text-xs text-muted mt-2">Signing up with Google...</p>}
        {googleError && <p className="text-center text-xs text-red mt-2">{googleError}</p>}

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
