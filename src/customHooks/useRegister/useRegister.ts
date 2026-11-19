import { useState } from "react";
import { apiClient } from "../api.client";
import type { registerType } from "../../schemas/register-schema";

interface Response {
  message: string
  success: boolean
}

export const useRegister = () => {
  const [data, setData] = useState<Response>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)

  const register = async (body:registerType) => {
    setLoading(true);
    setError(false)
    setSuccess(false)
    try {
      const request = await apiClient.post("register", body);
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