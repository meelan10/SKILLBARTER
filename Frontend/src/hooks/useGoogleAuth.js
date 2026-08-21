import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function useGoogleAuth() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuccess = async ({ credential }) => {
    if (!credential) {
      setError("Google did not return a sign-in credential.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle(credential);
      navigate("/onboarding");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => setError("Google sign-up was cancelled or failed.");

  return { handleSuccess, handleError, loading, error };
}
