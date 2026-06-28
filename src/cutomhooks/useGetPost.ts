import { useEffect, useState } from "react";
import { apiClient } from "./api.client";
import axios from "axios";

export const useGetPosts = <T>() => {
  const [data, setData] = useState<null | T[]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)

  const getPosts = async () => {
    setLoading(true)
    try {
        const request = await apiClient.get("get-posts", {withCredentials:true})
        setData(request.data.result)
        console.log(request.data.result)
        setSuccess(true)
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.response?.status)
        console.log(error.response?.data)
        console.log(error.response?.data.message)
      }
        setError(true)
    } finally {
        setLoading(false)
    }
  }

  useEffect(()=> {
    getPosts()
  },[])

  return {data, loading, error, success}
}