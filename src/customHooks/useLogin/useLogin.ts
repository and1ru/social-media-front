import { useState } from "react";
import { apiClient } from "../api.client";
import type { loginType } from "../../schemas/login-schema";

interface Response {
  message: string
  success: boolean
}

export const useLogin = () => {
  const [data, setData] = useState<Response>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, seterror] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)

  const login = async (body: loginType) => {
    setLoading(true)
    seterror(false)
    setSuccess(false)

    try {
      const request = await apiClient.post("login", body);
      localStorage.setItem("name", request.data.name)
      localStorage.setItem("userId", request.data.userId)
      setData(request.data);
      setSuccess(true)
    } catch (error) {
      seterror(true)
    } finally {
      setLoading(false)
    }
  };

  return { data, loading, error, success, login };
};