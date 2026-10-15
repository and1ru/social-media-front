import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
          Chat with your friends in{" "}
          <span className="text-sky-500">real time</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          Connect with people, send friend requests, create private
          conversations, and enjoy a fast, modern, and secure experience.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition hover:bg-sky-600">
            <Link to={"/login"}>Log in</Link>
          </button>
          <button className="rounded-lg border border-slate-700 px-8 py-3 font-semibold transition hover:border-slate-500 hover:bg-slate-900">
            <Link to={"/register"}>Sign up</Link>
          </button>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Everything you can do
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              💬 Real-time chat
            </h3>
            <p className="text-slate-400">
              Send and receive messages instantly without needing to reload the
              page.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              👥 Friend requests
            </h3>
            <p className="text-slate-400">
              Search for users and send requests to start new conversations.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              🔍 Search people
            </h3>
            <p className="text-slate-400">
              Quickly find friends using the integrated search feature.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              📱 Private conversations
            </h3>
            <p className="text-slate-400">
              Keep one-on-one conversations organized and secure.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              🔒 Security
            </h3>
            <p className="text-slate-400">
              Your data and sessions are protected through authentication.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500">
            <h3 className="mb-3 text-xl font-semibold">
              ⚡ Fast interface
            </h3>
            <p className="text-slate-400">
              A modern and smooth experience so you only have to worry about
              chatting.
            </p>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">
            Ready to get started?
          </h2>
          <p className="mt-4 max-w-xl text-slate-400">
            Join now and start chatting with your friends in seconds.
          </p>
          <button className="mt-8 rounded-lg bg-sky-500 px-10 py-4 text-lg font-semibold transition hover:bg-sky-600">
            <Link to={"/register"}>Create an account</Link>
          </button>
        </div>
      </section>
    </main>
  );
};