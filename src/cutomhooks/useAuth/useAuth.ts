import { useEffect, useState } from "react"
import { apiClient } from "../api.client"
import axios from "axios"

interface Result {
    name:string;
    userId:string;
}

interface Response {
    message:string;
    success:boolean
    result:Result
}

const response = {message:"", result:{name:"", userId:""}, success:false}

export const useAuth = () => {
    const [data, setData] = useState<Response>(response)
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const auth = async () => {
        try {
            const request = await apiClient.get("me", { withCredentials: true })
            setAuthenticated(request.data.success)
            setData(request.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.status);
                console.log(error.response?.data);
                console.log(error.response?.data.message);
            }
            setAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        auth()
    }, [])

    return { loading, authenticated, data }
}