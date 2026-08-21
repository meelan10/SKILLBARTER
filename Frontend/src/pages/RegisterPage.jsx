import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    university: "",
    department: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(form);
      navigate("/onboarding");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-1">Create account</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join your campus skill network
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
          <Input label="University" name="university" value={form.university} onChange={handleChange} />
          <Input label="Department" name="department" value={form.department} onChange={handleChange} />
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Creating..." : "Create account"}
          </Button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link
  to="/login"
  className="bg-[#E1F5EE] text-[#0F6E56] font-medium px-3 py-1 rounded-md"
>
  Login
</Link>
        </p>
      </Card>
    </div>
  );
}