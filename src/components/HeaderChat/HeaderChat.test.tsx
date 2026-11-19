
import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach,
} from "vitest";

import {
    render,
    screen,
    cleanup,
    act,
} from "@testing-library/react";

import { MemoryRouter, Route, Routes } from "react-router-dom";

import { HeaderChat } from "./HeaderChat";
import { es, en } from "../../laguaje";

const mocks = vi.hoisted(() => ({
    useStatus: vi.fn(),
    useLanguajeContext: vi.fn(),
    socketOn: vi.fn(),
    socketOff: vi.fn(),
}));

vi.mock("../../customHooks/useStatus/useStatus", () => ({
    useStatus: mocks.useStatus,
}));

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: mocks.useLanguajeContext,
}));

vi.mock("../../customHooks/api.socket", () => ({
    socket: {
        on: mocks.socketOn,
        off: mocks.socketOff,
    },
}));

const renderHeaderChat = (path = "/chats/user-123") => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="/chats/:id" element={<HeaderChat />} />
                <Route path="/chats" element={<HeaderChat />} />
            </Routes>
        </MemoryRouter>
    );
};

const getStatusHandler = () => {
    const handler = mocks.socketOn.mock.calls[0]?.[1];

    if (!handler) {
        throw new Error("Socket listener was not registered");
    }

    return handler as (data: {
        userId: string;
        connected: boolean;
    }) => void;
};

beforeEach(() => {
    localStorage.clear();

    mocks.useStatus.mockReturnValue({
        data: {
            result: true,
        },
    });

    mocks.useLanguajeContext.mockReturnValue({
        languaje: "es",
    });

    mocks.socketOn.mockReset();
    mocks.socketOff.mockReset();
});

afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.clearAllMocks();
});

describe("Component HeaderChat", () => {

    it.each([
        {
            connected: true,
            language: "es",
            message: es.userConnected,
        },
        {
            connected: false,
            language: "es",
            message: es.userDesconnected,
        },
        {
            connected: true,
            language: "en",
            message: en.userConnected,
        },
        {
            connected: false,
            language: "en",
            message: en.userDesconnected,
        },
    ])(
        "should render the user's information and status correctly",
        ({ connected, language, message }) => {
            localStorage.setItem("chat-name", "andres");

            mocks.useStatus.mockReturnValue({
                data: {
                    result: connected,
                },
            });

            mocks.useLanguajeContext.mockReturnValue({
                languaje: language,
            });

            renderHeaderChat();

            expect(
                screen.getByRole("heading", { name: "andres" })
            ).toBeInTheDocument();

            expect(
                screen.getByText("A", { exact: true })
            ).toBeInTheDocument();

            expect(
                screen.getByText(message)
            ).toBeInTheDocument();

            expect(mocks.useStatus).toHaveBeenCalledWith("user-123");
        }
    );

    it("should update the status only when receiving an event from the current user", () => {
        localStorage.setItem("chat-name", "andres");

        mocks.useStatus.mockReturnValue({
            data: {
                result: true,
            },
        });

        renderHeaderChat();

        const handler = getStatusHandler();

        expect(
            screen.getByText(es.userConnected)
        ).toBeInTheDocument();

        // Evento de otro usuario: no debe modificar el estado.
        act(() => {
            handler({
                userId: "another-user",
                connected: false,
            });
        });

        expect(
            screen.getByText(es.userConnected)
        ).toBeInTheDocument();

        // Evento del usuario actual: debe actualizar el estado.
        act(() => {
            handler({
                userId: "user-123",
                connected: false,
            });
        });

        expect(
            screen.getByText(es.userDesconnected)
        ).toBeInTheDocument();
    });

    it("should remove its socket listener when unmounting", () => {
        localStorage.setItem("chat-name", "andres");

        renderHeaderChat();

        const handler = getStatusHandler();

        cleanup();

        expect(mocks.socketOff).toHaveBeenCalledWith(
            "user_status",
            handler
        );
    });

    it("should render nothing when the route has no user ID", () => {
        localStorage.setItem("chat-name", "andres");

        const { container } = renderHeaderChat("/chats");

        expect(container.firstChild).toBeNull();
        expect(mocks.useStatus).not.toHaveBeenCalled();
    });

    it("should render nothing when the chat name is missing", () => {
        const { container } = renderHeaderChat();

        expect(container.firstChild).toBeNull();
    });

});