import { useState } from "react";
import { apiClient } from "./api.client";

export const useLoging = <T>() => {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, seterror] = useState<boolean>(false);

  const login = async (body:any) => {
    setLoading(true)
    try {
      const request = await apiClient.post("login", body);
      console.log(request);
      setData(request.data);
    } catch (error) {
        seterror(true)
    } finally{
        setLoading(false)
    }
  };

  return { data, loading, error, login };
};