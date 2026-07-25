import { ChatTargetComponent } from "../components/chat-target-component";
import { HeaderComponent } from "../components/header-component";
import { useChatsFriends } from "../cutomhooks/useChatsFriends";

interface DataType {
    name: string;
    id: string;
}

export const ChatsPage = () => {
    const { data, error, loading } = useChatsFriends<DataType>();

    return (
        <>
            <HeaderComponent />

            <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-10 px-4">
                <section className="mx-auto max-w-3xl">

                    <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
                        Chats
                    </h1>

                    {loading && (
                        <p className="rounded-lg bg-blue-100 p-3 text-center text-blue-700">
                            Loading...
                        </p>
                    )}

                    {error && (
                        <p className="rounded-lg bg-red-100 p-3 text-center text-red-700">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col gap-4">
                        {data?.map(chat => (
                            <ChatTargetComponent
                                key={chat.id}
                                id={chat.id}
                                name={chat.name}
                            />
                        ))}
                    </div>

                </section>
            </main>
        </>
    );
};