import { useSendRequest } from "../cutomhooks/useSendRequest";

interface Props {
  name: string;
  id: string;
}

export const UserCard = ({ name, id }: Props) => {
  const { loading, error, sendRequest } = useSendRequest();

  return (
    <article className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 font-semibold text-white"
        >
          {name[0].toUpperCase()}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">{name}</h2>

          <p className="text-sm text-gray-500">Usuario</p>
        </div>
      </div>
      <button
        onClick={() => sendRequest(id)}
        disabled={loading}
        className="rounded-xl bg-gray-900 px-5 py-2 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Agregar"}
      </button>
      {error && <p className="text-sm text-red-500">Error</p>}
    </article>
  );
};
