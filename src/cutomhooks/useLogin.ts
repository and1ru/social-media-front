import { useState } from "react";
import { apiClient } from "./api.client";
import axios from "axios";

export const useLoging = <T>() => {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, seterror] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)

  const login = async (body: any) => {
    setLoading(true)
    try {
      const request = await apiClient.post("login", body, {withCredentials:true});
      console.log(`este es el resultado: ${request.data}`);
      setData(request.data);
      setSuccess(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status);
        console.log(error.response?.data);
        console.log(error.response?.data.message);
      }
      seterror(true)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  };

  return { data, loading, error, success, login };
};