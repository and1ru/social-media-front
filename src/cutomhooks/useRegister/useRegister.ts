import { useState } from "react";
import { apiClient } from "../api.client";

export const useRegister = <T>() => {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)

  const register = async (body:any) => {
    setLoading(true);
    setError(false)
    setSuccess(false)
    try {
      const request = await apiClient.post("register", body,);
      setData(request.data);
      setSuccess(true)
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, success, register };
};