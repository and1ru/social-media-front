import { HeaderComponent } from "../components/header-component";
import { HeaderChatComponent } from "../components/headerChatComponent";
import { MessageComponent } from "../../components/messages-component/messages-component";
import { SendMessageComponent } from "../components/sendMessageComponent";

export const ChatPage = () => {
  return (
<>
    <HeaderComponent />
    <main className="flex h-[calc(100vh-64px)] flex-col bg-gray-50">
        <HeaderChatComponent/>
        <MessageComponent />
        <SendMessageComponent/>
    </main>
</>
  );
};
