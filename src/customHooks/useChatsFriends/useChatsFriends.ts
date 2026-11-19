import { useEffect, useState } from "react";
import { apiClient } from "../api.client";

interface Response {
  name: string;
  id: string;
}

export const useChatsFriends = () => {
  const [data, setData] = useState<null | Response[]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)

  const chatFriends = async () => {
    setLoading(true)
    setError(false)
    setSuccess(false)
    setData(null)
    try {
      const request = await apiClient.get("friends", { withCredentials: true })
      setData(request.data.result)
      setSuccess(true)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    chatFriends()
  }, [])

  return { data, loading, error, success }
}