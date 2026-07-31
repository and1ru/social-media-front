import { useState } from "react";
import { apiClient } from "./api.client";
import axios from "axios";

export const useRegister = <T>() => {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)

  const register = async (body:any) => {
    setLoading(true);
    try {
      const request = await apiClient.post("register", body,);
      setData(request.data);
      setSuccess(true)
    } catch (error) {
        if(axios.isAxiosError(error)){
          console.log(error.response?.status);
          console.log(error.response?.data);
          console.log(error.response?.data.message);
        }
      setError(true);
      setSuccess(false)
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, success, register };
};