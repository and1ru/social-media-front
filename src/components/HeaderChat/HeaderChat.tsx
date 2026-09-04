import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStatus } from "../../cutomhooks/useStatus/useStatus";
import { socket } from "../../cutomhooks/api.socket";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'

export const HeaderChat = () => {
    const { id } = useParams()
    if(!id) return
    const { data } = useStatus(id)
    const { languaje } = useLanguajeContext()

    const [status, setStatus] = useState(false)

    useEffect(()=> {
        if(data){
            setStatus(data.result)
        }
    },[data])

    useEffect(() => {
        socket.on("user_status", (data) => {
            if(id === data.userId){
                setStatus(data.connected)
            }

            console.log(data)
        })

        return () => {
            socket.off("user_status")
        }
    }, [])

    const name = localStorage.getItem("chat-name")
    if(!name) return

    return (
        <section className="flex items-center gap-4 p-4 dark:bg-gray-800 dark:border-y-1 dark:border-white transition duration-400 ease-in-out">
            <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-lg font-semibold text-white dark:bg-white dark:text-black">
                {name[0].toUpperCase()}
            </div>
            <div>
                <h1 className="font-semibold text-gray-900 dark:text-white">
                    {name}
                </h1>
                
                {status ? <p className="text-green-500 font-bold">{ languaje === "en" ? en.userConnected : es.userConnected}</p> : <p className="text-red-500 font-bold">{ languaje === "en" ? en.userDesconnected : es.userDesconnected}</p>}
            </div>
        </section>
    );
};
