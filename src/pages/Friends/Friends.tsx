import { FindUserForm } from "../../components/FindUsersForm/FindUsersForm";
import { FriendCard } from "../../components/FriendCard/FriendCard";
import { Header } from "../../components/Header/Header";
import { useGetRequest } from "../../cutomhooks/useGetRequest/useGetRequest";
import { type requestType } from "../../schemas/request-schema";

export const FriendsPage = () => {
    const { data, error, loading } = useGetRequest<requestType>();

    return (
        <>
            <Header />
            <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
                <section className="mx-auto max-w-3xl">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Friends
                        </h1>
                        <p className="mt-2 text-gray-500">
                            Administra tus solicitudes y encuentra nuevos amigos.
                        </p>
                    </header>
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
                    
                    <div className="mb-8">
                        <FindUserForm />
                    </div>
                    <section className="flex flex-col gap-5">
                        {data.length > 0 ? (
                            data.map((request) => (
                                <FriendCard
                                    key={request._id}
                                    id={request._id}
                                />
                            ))
                        ) : (
                            !loading && (
                                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                                    No tienes solicitudes pendientes.
                                </div>
                            )
                        )}
                    </section>
                </section>
            </main>
        </>
    );
};