import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { useGetRequest } from "../../cutomhooks/useGetRequest/useGetRequest";
import type { requestType } from "../../schemas/request-schema";
import { FriendCard } from "../FriendCard/FriendCard";
import { es, en } from '../../laguaje'

export const FriendRequests = () => {
    const { languaje } = useLanguajeContext()
    const { data, error, loading } = useGetRequest<requestType>();

    return (
        <>
            {loading && (
                <div className="mb-6 rounded-xl bg-blue-50 p-4 text-center text-blue-700">
                    Cargando solicitudes...
                </div>
            )}
            {error && (
                <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-700">
                    Ocurrió un error al obtener las solicitudes.
                </div>
            )}
            <section className="flex flex-col gap-5">
                {data.length > 0 ? (
                    data.map((request) => (
                        <FriendCard
                            name={request.userName}
                            key={request._id}
                            id={request._id}
                        />
                    ))
                ) : (
                    !loading && (
                        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                            {languaje === "en" ? en.friendRequest : es.friendRequest}
                        </div>
                    )
                )}
            </section>
        </>
    )
}