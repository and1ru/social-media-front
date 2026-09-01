import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStatus } from "../../cutomhooks/useStatus/useStatus";
import { socket } from "../../cutomhooks/api.socket";

export const HeaderChat = () => {
    const { id } = useParams()
    if(!id) return
    const { data } = useStatus(id)

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
        <section className="flex items-center gap-4 p-4">
            <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-lg font-semibold text-white">
                {name[0].toUpperCase()}
            </div>
            <div>
                <h1 className="font-semibold text-gray-900">
                    {name}
                </h1>
                
                {status ? <p className="text-green-500 font-bold">connected</p> : <p className="text-red-500 font-bold">disconnected</p>}
            </div>
        </section>
    );
};
