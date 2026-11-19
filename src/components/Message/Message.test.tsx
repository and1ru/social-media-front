import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { Message } from "./Message";

const renderMessage = (routeId: string, senderId: string) => {
    return render(
        <MemoryRouter initialEntries={[`/chats/${routeId}`]}>
            <Routes>
                <Route
                    path="/chats/:id"
                    element={
                        <Message
                            message="Hello, how are you?"
                            createAt="10:30 AM"
                            senderId={senderId}
                        />
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};

describe("Component Message", () => {

    it("should render the message and its creation date", () => {
        renderMessage("user-123", "user-123");

        expect(
            screen.getByText("Hello, how are you?")
        ).toBeInTheDocument();

        expect(
            screen.getByText("10:30 AM")
        ).toBeInTheDocument();
    });

    it.each([
        {
            routeId: "user-123",
            senderId: "user-123",
            alignment: "justify-start",
            bubbleClasses: ["bg-gray-900", "text-white", "rounded-br-md"],
        },
        {
            routeId: "user-123",
            senderId: "user-456",
            alignment: "justify-end",
            bubbleClasses: ["bg-white", "text-gray-900", "rounded-bl-md"],
        },
    ])(
        "should apply the correct appearance depending on the sender",
        ({ routeId, senderId, alignment, bubbleClasses }) => {
            renderMessage(routeId, senderId);

            const article = screen
                .getByText("Hello, how are you?")
                .closest("article");

            expect(article).not.toBeNull();

            expect(article?.parentElement).toHaveClass(alignment);
            expect(article).toHaveClass(...bubbleClasses);
        }
    );
});