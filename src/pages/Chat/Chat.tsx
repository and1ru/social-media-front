import { Header } from "../../components/Header/Header";
import { HeaderChat } from "../../components/HeaderChat/HeaderChat";
import { Messages } from "../../components/Messages/Messages";
import { SendMessage } from "../../components/SendMessage/SendMessage";

export const Chat = () => {
  return (
<>
    <Header />
    <main className="flex h-[calc(100vh-64px)] flex-col bg-gray-50">
        <HeaderChat/>
        <Messages />
        <SendMessage/>
    </main>
</>
  );
};
