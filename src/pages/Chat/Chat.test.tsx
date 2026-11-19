import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Chat } from "./Chat";
../../cutomHooks/useChatsFriends/useChatsFriends
vi.mock("../../components/Header/Header", () => ({
  Header: () => <header>Header</header>,
}));

vi.mock("../../components/HeaderChat/HeaderChat", () => ({
  HeaderChat: () => <div>Header Chat</div>,
}));

vi.mock("../../components/Messages/Messages", () => ({
  Messages: () => <div>Messages</div>,
}));

vi.mock("../../components/SendMessage/SendMessage", () => ({
  SendMessage: () => <div>Send Message</div>,
}));

describe("Page Chat", () => {
  it("should render all main components", () => {
    render(<Chat />);

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Header Chat")).toBeInTheDocument();
    expect(screen.getByText("Messages")).toBeInTheDocument();
    expect(screen.getByText("Send Message")).toBeInTheDocument();
  });
});