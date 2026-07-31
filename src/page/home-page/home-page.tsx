import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
          Chatea con tus amigos en{" "}
          <span className="text-sky-500">tiempo real</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          Conecta con personas, envía solicitudes de amistad, crea
          conversaciones privadas y disfruta de una experiencia rápida,
          moderna y segura.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600">
            <Link to={"/login"}>Iniciar sesión</Link>
          </button>
          <button className="rounded-lg border border-slate-700 px-8 py-3 font-semibold transition hover:border-slate-500 hover:bg-slate-900">
            <Link to={"/register"}>Registrarse</Link>
          </button>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Todo lo que puedes hacer
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              💬 Chat en tiempo real
            </h3>
            <p className="text-slate-400">
              Envía y recibe mensajes instantáneamente sin necesidad de
              recargar la página.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              👥 Solicitudes de amistad
            </h3>
            <p className="text-slate-400">
              Busca usuarios y envía solicitudes para comenzar nuevas
              conversaciones.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              🔍 Buscar personas
            </h3>
            <p className="text-slate-400">
              Encuentra rápidamente amigos mediante el buscador integrado.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              📱 Conversaciones privadas
            </h3>
            <p className="text-slate-400">
              Mantén conversaciones individuales de forma organizada y segura.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              🔒 Seguridad
            </h3>
            <p className="text-slate-400">
              Tus datos y sesiones están protegidos mediante autenticación.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              ⚡ Interfaz rápida
            </h3>
            <p className="text-slate-400">
              Una experiencia moderna y fluida para que solo te preocupes por
              conversar.
            </p>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">
            ¿Listo para empezar?
          </h2>
          <p className="mt-4 max-w-xl text-slate-400">
            Únete ahora y comienza a conversar con tus amigos en segundos.
          </p>
          <button className="mt-8 rounded-lg bg-sky-500 px-10 py-4 text-lg font-semibold transition hover:bg-sky-600">
            <Link to={"/register"}>Crear una cuenta</Link>
          </button>
        </div>
      </section>
    </main>
  );
};