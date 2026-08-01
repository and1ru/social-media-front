import { useSearchParams } from "react-router-dom";
import { HeaderComponent } from "../components/header-component";
import { UserTarget } from "../components/user-target";
import { useFindUsers } from "../../cutomhooks/useFindUsers/useFindUsers";
import type { userType } from "../../schemas/user-schema";

export const UsersPage = () => {
    const [search] = useSearchParams();

    const name = search.get("name");

    if (!name) return;

    const { data, error, loading } = useFindUsers<userType>(name);

    return (
        <>
            <HeaderComponent />
            <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
                <section className="mx-auto max-w-3xl">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Buscar usuarios
                        </h1>
                        <p className="mt-2 text-gray-500">
                            Resultados para <span className="font-semibold">"{name}"</span>
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
                                    <UserTarget
                                        key={user._id}
                                        id={user._id}
                                        name={user.name}
                                    />
                                ))
                            ) : (
                                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                                    No se encontraron usuarios.
                                </div>
                            )}

                        </section>
                    )}
                </section>
            </main>
        </>
    );
};