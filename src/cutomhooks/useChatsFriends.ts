import { useEffect, useState } from "react";
import { apiClient } from "./api.client";

export const useChatsFriends = <T>() => {
  const [data, setData] = useState<null | T[]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)

  const chatFriends = async () => {
    setLoading(true)
    try {
        const request = await apiClient.get("friends")
        console.log(request.data)
        setData(request.data)
        setSuccess(true)
    } catch (error) {
        setError(true)
    } finally {
        setLoading(false)
    }
  }

  useEffect(()=> {
    chatFriends()
  },[])

  return {data, loading, error, success}
}