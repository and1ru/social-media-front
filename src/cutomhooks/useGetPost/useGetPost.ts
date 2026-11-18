import { useEffect, useState } from "react";
import { apiClient } from "../api.client";
import type { postsType } from "../../schemas/posts-schema";

interface Response {
  message: string;
  success: boolean
  result: postsType[]
}

export const useGetPosts = () => {
  const [data, setData] = useState<Response>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)

  const getPosts = async () => {
    setLoading(true)
    setError(false)
    setSuccess(false)
    try {
      const request = await apiClient.get("get-posts")
      setData(request.data)
      setSuccess(true)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return { data, loading, error, success }
}