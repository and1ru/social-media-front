import { useState } from "react";
import { apiClient } from "./api.client";

export const useRegister = <T>() => {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const register = async (body:any) => {
    setLoading(true);
    try {
      const request = await apiClient.post("register", body,);
      console.log(request);
      setData(request.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, register };
};