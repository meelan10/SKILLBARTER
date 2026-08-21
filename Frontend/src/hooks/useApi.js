import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../api";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const request = useCallback(async (path, options) => {
    setLoading(true);
    setError("");
    try {
      return await apiRequest(path, options);
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
}

export function useResource(path, key) {
  const [data, setData] = useState(null);
  const { request, loading, error } = useApi();

  useEffect(() => {
    let active = true;
    request(path)
      .then((result) => {
        if (active) setData(key ? result[key] : result);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [path, key, request]);

  return { data, loading, error };
}
