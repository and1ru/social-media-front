import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { SendMessage } from "./SendMessage";
import { socket } from "../../customHooks/api.socket";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from "../../laguaje";

vi.mock("../../customHooks/api.socket", () => ({
    socket: {
        emit: vi.fn(),
    },
}));

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: vi.fn(),
}));

const mockEmit = vi.mocked(socket.emit);
const mockUseLanguajeContext = vi.mocked(useLanguajeContext);

const friendId = "friend-123";

const TestApp = ({ path = `/chat/${friendId}` }: { path?: string }) => (
    <MemoryRouter initialEntries={[path]}>
        <Routes>
            <Route path="/chat" element={<SendMessage />} />
            <Route path="/chat/:id" element={<SendMessage />} />
        </Routes>
    </MemoryRouter>
);

describe("Component SendMessage", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        mockUseLanguajeContext.mockReturnValue({
            languaje: "es",
        } as ReturnType<typeof useLanguajeContext>);
    });

    afterEach(cleanup);

    it("should render the input and button according to the selected language", () => {
        const { rerender } = render(<TestApp />);

        expect(screen.getByPlaceholderText(es.inputChat)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: es.buttonSend })).toBeInTheDocument();

        mockUseLanguajeContext.mockReturnValue({
            languaje: "en",
        } as ReturnType<typeof useLanguajeContext>);

        rerender(<TestApp />);

        expect(screen.getByPlaceholderText(en.inputChat)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: en.buttonSend })).toBeInTheDocument();
    });

    it("should emit the message when clicking the send button and clear the input", async () => {
        const user = userEvent.setup();

        render(<TestApp />);

        const input = screen.getByPlaceholderText(es.inputChat);

        await user.type(input, "Hola, ¿cómo estás?");

        await user.click(
            screen.getByRole("button", { name: es.buttonSend })
        );

        expect(mockEmit).toHaveBeenCalledTimes(1);

        expect(mockEmit).toHaveBeenCalledWith("send-message", {
            message: "Hola, ¿cómo estás?",
            friendId,
        });

        expect(input).toHaveValue("");
    });

    it("should emit the message when submitting the form and clear the input", async () => {
        const user = userEvent.setup();

        render(<TestApp />);

        const input = screen.getByPlaceholderText(es.inputChat);

        await user.type(input, "Hello");

        const form = input.closest("form");

        expect(form).not.toBeNull();

        fireEvent.submit(form!);

        expect(mockEmit).toHaveBeenCalledTimes(1);

        expect(mockEmit).toHaveBeenCalledWith("send-message", {
            message: "Hello",
            friendId,
        });

        expect(input).toHaveValue("");
    });

    it("should not emit a message when the input contains only whitespace", async () => {
        const user = userEvent.setup();

        render(<TestApp />);

        const input = screen.getByPlaceholderText(es.inputChat);

        await user.type(input, "   ");

        await user.click(
            screen.getByRole("button", { name: es.buttonSend })
        );

        expect(mockEmit).not.toHaveBeenCalled();

        const form = input.closest("form");

        fireEvent.submit(form!);

        expect(mockEmit).not.toHaveBeenCalled();
    });

    it("should not render the form when there is no friend ID", () => {
        const { container } = render(<TestApp path="/chat" />);

        expect(container.firstChild).toBeNull();
    });
});