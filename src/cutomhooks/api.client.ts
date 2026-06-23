import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 10000 // tiene que responder antes de 10 segundos
})