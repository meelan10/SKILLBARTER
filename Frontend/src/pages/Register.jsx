import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";

const initialForm = {
  name: "",
  email: "",
  password: "",
  university: "",
  department: "",
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Join the exchange"
      title="Create your account"
      footer={
        <>
          Already trading?{" "}
          <Link to="/login" className="font-semibold text-ink underline underline-offset-2">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p className="rounded-md border border-clay bg-clay-light px-3.5 py-2.5 font-body text-sm text-clay">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="name" className="field-label">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="field-input"
            placeholder="Aarav Sharma"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            University email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field-input"
            placeholder="you@university.edu"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            className="field-input"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="university" className="field-label">
              University
            </label>
            <input
              id="university"
              name="university"
              type="text"
              required
              className="field-input"
              placeholder="Demo University"
              value={form.university}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="department" className="field-label">
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              required
              className="field-input"
              placeholder="Computer Science"
              value={form.department}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full">
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
