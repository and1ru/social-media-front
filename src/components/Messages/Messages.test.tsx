import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import {
    MemoryRouter,
    Route,
    Routes,
    useNavigationType,
} from "react-router-dom";

import { Messages } from "./Messages";
import { useGetMessages } from "../../customHooks/useGetMessages/useGetMessages";
import { useNewMessages } from "../../customHooks/useNewMessages/useNewMessages";

vi.mock("../../customHooks/useGetMessages/useGetMessages", () => ({
    useGetMessages: vi.fn(),
}));

vi.mock("../../customHooks/useNewMessages/useNewMessages", () => ({
    useNewMessages: vi.fn(),
}));

vi.mock("../Message/Message", () => ({
    Message: ({
        senderId,
        message,
        createAt,
    }: {
        senderId: string;
        message: string;
        createAt: string;
    }) => (
        <article data-testid="message">
            <span>{senderId}</span>
            <span>{message}</span>
            <time>{createAt}</time>
        </article>
    ),
}));

type MessageT = {
    _id: string;
    senderId: string;
    message: string;
    createAt: string;
};

const mockGetMessages = vi.mocked(useGetMessages);
const mockNewMessages = vi.mocked(useNewMessages);

const scrollIntoViewMock = vi.fn();

let queryData: { result: MessageT[] } | undefined;
let socketMessages: MessageT[];

const ErrorPage = () => {
    const navigationType = useNavigationType();

    return <p data-testid="navigation-type">{navigationType}</p>;
};

const TestApp = ({ revision = 0 }: { revision?: number }) => (
    <MemoryRouter initialEntries={["/messages/chat-123"]}>
        <Routes>
            <Route path="/messages/:id" element={<Messages />} />
            <Route path="/private/error" element={<ErrorPage />} />
        </Routes>

        <span>{revision}</span>
    </MemoryRouter>
);

describe("Component Messages", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        queryData = { result: [] };
        socketMessages = [];

        Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
            configurable: true,
            value: scrollIntoViewMock,
        });

        mockGetMessages.mockImplementation(() => ({
            data: queryData,
            error: undefined,
        }));

        mockNewMessages.mockImplementation(() => ({
            newMessages: socketMessages,
        }) as ReturnType<typeof useNewMessages>);
    });

    afterEach(cleanup);

    it("should render fetched messages and new messages", () => {
        const fetchedMessage: MessageT = {
            _id: "1",
            senderId: "user-1",
            message: "Fetched message",
            createAt: "2026-11-19",
        };

        const newMessage: MessageT = {
            _id: "2",
            senderId: "user-2",
            message: "New socket message",
            createAt: "2026-11-19",
        };

        queryData = { result: [fetchedMessage] };
        socketMessages = [newMessage];

        render(<TestApp />);

        expect(screen.getAllByTestId("message")).toHaveLength(2);

        expect(screen.getByText("Fetched message")).toBeInTheDocument();
        expect(screen.getByText("New socket message")).toBeInTheDocument();

        expect(mockGetMessages).toHaveBeenCalledWith("chat-123");
        expect(mockNewMessages).toHaveBeenCalledWith("chat-123");
    });

    it("should redirect to error page when an error occurs", () => {
        mockGetMessages.mockReturnValue({
            data: undefined,
            error: new Error("Failed to fetch messages"),
        });

        render(<TestApp />);

        expect(screen.getByTestId("navigation-type")).toHaveTextContent("REPLACE");
    });

    it("should scroll to the bottom when messages change", () => {
        queryData = {
            result: [
                {
                    _id: "1",
                    senderId: "user-1",
                    message: "First message",
                    createAt: "2026-11-19",
                },
            ],
        };

        const { rerender } = render(<TestApp />);

        expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
        expect(scrollIntoViewMock).toHaveBeenCalledWith({
            behavior: "smooth",
        });

        queryData = {
            result: [
                {
                    _id: "1",
                    senderId: "user-1",
                    message: "First message",
                    createAt: "2026-11-19",
                },
                {
                    _id: "2",
                    senderId: "user-2",
                    message: "Second message",
                    createAt: "2026-11-19",
                },
            ],
        };

        socketMessages = [
            {
                _id: "3",
                senderId: "user-3",
                message: "Third message",
                createAt: "2026-11-19",
            },
        ];

        rerender(<TestApp revision={1} />);

        expect(scrollIntoViewMock).toHaveBeenCalledTimes(2);
    });
});