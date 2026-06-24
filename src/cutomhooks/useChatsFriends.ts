import { useEffect, useState } from "react";
import { apiClient } from "./api.client";
import axios from "axios";

export const useChatsFriends = <T>() => {
  const [data, setData] = useState<null | T[]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)

  const chatFriends = async () => {
    setLoading(true)
    try {
      console.log("inicio el intento de obtener a los amigos")
        const request = await apiClient.get("friends", {withCredentials:true})
        // no pasa de aqui
        console.log("obtiene los amigos")
        console.log(request.data)
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
    chatFriends()
  },[])

  return {data, loading, error, success}
}