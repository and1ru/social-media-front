import { ChatTargetComponent } from "../components/chat-target-component";

export const ChatsPage = () => {
  return (
    <>
        <h1 className="text-center text-2xl font-bold mb-5">CHATS</h1>
        <section className="flex flex-col gap-5">
        <ChatTargetComponent/>
        <ChatTargetComponent/>
        <ChatTargetComponent/>
        </section>
    </>
  );
};
