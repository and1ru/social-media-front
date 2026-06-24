import { ChatTargetComponent } from "../components/chat-target-component";
import { HeaderComponent } from "../components/header-component";
import { useChatsFriends } from "../cutomhooks/useChatsFriends";

export const ChatsPage = () => {
  const { data, error,  loading } = useChatsFriends()

  {error && <p>error</p>}
  {loading && <p>loading</p>}

  return (
    <>
      <HeaderComponent/>
        <h1 className="text-center text-2xl font-bold mb-5">CHATS</h1>
        <section className="flex flex-col gap-5">
        {data?.map((chat) => <ChatTargetComponent/>)}
        </section>
    </>
  );
};
