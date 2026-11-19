import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatsPage } from "./Chats";
import { useChatsFriends } from "../../customHooks/useChatsFriends/useChatsFriends";

// Mocks
vi.mock("../../customHooks/useChatsFriends/useChatsFriends", () => ({
    useChatsFriends: vi.fn()
}));

vi.mock("../../components/Header/Header", () => ({
    Header: () => <header>Header</header>
}));

vi.mock("../../components/CardChat/CardChat", () => ({
    CardChat: ({ id, name }: { id: string; name: string }) => (
        <div data-testid="card-chat" data-chat-id={id}>
            {name}
        </div>
    )
}));

const mockedUseChatsFriends = vi.mocked(useChatsFriends);

describe("Page ChatsPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockedUseChatsFriends.mockReturnValue({
            data: [],
            error: false,
            loading: false
        });
    });

    it("should render the main structure", () => {
        render(<ChatsPage />);

        expect(screen.getByText("Header")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Chats" })).toBeInTheDocument();
    });

    it("should render loading state", () => {
        mockedUseChatsFriends.mockReturnValue({
            data: [],
            error: null,
            loading: true
        });

        render(<ChatsPage />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render error message", () => {
        mockedUseChatsFriends.mockReturnValue({
            data: [],
            error: "Something went wrong",
            loading: false
        });

        render(<ChatsPage />);

        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it("should render all chats with their corresponding props", () => {
        mockedUseChatsFriends.mockReturnValue({
            data: [
                { id: "1", name: "Andres" },
                { id: "2", name: "Carlos" }
            ],
            error: null,
            loading: false
        });

        render(<ChatsPage />);

        const cards = screen.getAllByTestId("card-chat");

        expect(cards).toHaveLength(2);

        expect(cards[0]).toHaveTextContent("Andres");
        expect(cards[0]).toHaveAttribute("data-chat-id", "1");

        expect(cards[1]).toHaveTextContent("Carlos");
        expect(cards[1]).toHaveAttribute("data-chat-id", "2");
    });
});