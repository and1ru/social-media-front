import { useSearchParams } from "react-router-dom";
import { useFindUsers } from "../../cutomhooks/useFindUsers/useFindUsers";
import type { userType } from "../../schemas/user-schema";
import { Header } from "../../components/Header/Header";
import { UserCard } from "../../components/UserCard/UserCard";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'
import { useSendRequest } from "../../cutomhooks/useSendRequest/useSendRequest";
import { useEffect } from "react";

export const UsersPage = () => {
    const [search] = useSearchParams();
    const { languaje } = useLanguajeContext()

    const name = search.get("name");

    if (!name) return <p>name is missing</p>;

    const { data, error, loading, refetch,  } = useFindUsers<userType>(name);
    const { sendRequest,success } = useSendRequest();

    useEffect(()=> {
        if(success){
            refetch()
        }
    },[success])

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 py-8 px-4 dark:bg-gray-700">
                <section className="mx-auto max-w-3xl">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            { languaje === "en" ? en.searchUser : es.searchUser }
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-white">
                            { languaje === "en" ? en.resultSearch : es.resultSearch } <span className="font-semibold">"{name}"</span>
                        </p>
                    </header>
                    {loading && (
                        <div className="rounded-xl bg-blue-50 p-4 text-center text-blue-700">
                            Buscando usuarios...
                        </div>
                    )}
                    {error && (
                        <div className="rounded-xl bg-red-50 p-4 text-center text-red-700">
                            Ocurrió un error al realizar la búsqueda.
                        </div>
                    )}
                    {!loading && !error && (
                        <section className="flex flex-col gap-5">

                            {data.length > 0 ? (
                                data.map((user) => (
                                    <UserCard
                                    onClick={sendRequest}
                                        key={user.id}
                                        id={user.id}
                                        name={user.name}
                                        relation={user.relation}
                                    />
                                ))
                            ) : (
                                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                                    { languaje === "en" ? en.notFoundUsers : es.notFoundUsers }
                                </div>
                            )}

                        </section>
                    )}
                </section>
            </main>
        </>
    );
};