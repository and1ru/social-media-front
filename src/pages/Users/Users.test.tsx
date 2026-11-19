import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { UsersPage } from "./UsersPage";
import { useFindUsers } from "../../cutomHooks/useFindUsers/useFindUsers";
import { useSendRequest } from "../../cutomHooks/useSendRequest/useSendRequest";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es } from "../../laguaje";

// Mocks
vi.mock("../../cutomHooks/useFindUsers/useFindUsers", () => ({
    useFindUsers: vi.fn()
}));

vi.mock("../../cutomHooks/useSendRequest/useSendRequest", () => ({
    useSendRequest: vi.fn()
}));

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: vi.fn()
}));

vi.mock("../../components/Header/Header", () => ({
    Header: () => <header>Header</header>
}));

vi.mock("../../components/UserCard/UserCard", () => ({
    UserCard: ({
        id,
        name,
        relation,
        onClick
    }: {
        id: string;
        name: string;
        relation: string;
        onClick: (id: string) => Promise<void>;
    }) => (
        <article
            data-testid="user-card"
            data-user-id={id}
            data-relation={relation}
        >
            <p>{name}</p>
            <button onClick={() => void onClick(id)}>
                Send request
            </button>
        </article>
    )
}));

const mockedUseFindUsers = vi.mocked(useFindUsers);
const mockedUseSendRequest = vi.mocked(useSendRequest);
const mockedUseLanguage = vi.mocked(useLanguajeContext);

const mockSendRequest = vi.fn().mockResolvedValue(undefined);
const mockRefetch = vi.fn();

const users = [
    {
        id: "user-1",
        name: "Carlos",
        relation: "none"
    },
    {
        id: "user-2",
        name: "Maria",
        relation: "friend"
    }
];

// Router helper
const renderPage = (initialEntry = "/users?name=Andres") => {
    return render(
        <MemoryRouter initialEntries={[initialEntry]}>
            <Routes>
                <Route path="/users" element={<UsersPage />} />
            </Routes>
        </MemoryRouter>
    );
};

describe("Page UsersPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockedUseFindUsers.mockReturnValue({
            data: [],
            error: null,
            loading: false,
            refetch: mockRefetch
        } as ReturnType<typeof useFindUsers>);

        mockedUseSendRequest.mockReturnValue({
            sendRequest: mockSendRequest,
            success: false
        } as ReturnType<typeof useSendRequest>);

        mockedUseLanguage.mockReturnValue({
            languaje: "en"
        } as ReturnType<typeof useLanguajeContext>);
    });

    it("should render missing name message when query param is absent", () => {
        renderPage("/users");

        expect(screen.getByText("name is missing"))
            .toBeInTheDocument();

        expect(mockedUseFindUsers).not.toHaveBeenCalled();
    });

    it("should render loading state", () => {
        mockedUseFindUsers.mockReturnValue({
            data: [],
            error: null,
            loading: true,
            refetch: mockRefetch
        } as ReturnType<typeof useFindUsers>);

        renderPage();

        expect(screen.getByText("searching users"))
            .toBeInTheDocument();

        expect(screen.queryByTestId("user-card"))
            .not.toBeInTheDocument();
    });

    it("should render error message", () => {
        mockedUseFindUsers.mockReturnValue({
            data: [],
            error: "Something went wrong",
            loading: false,
            refetch: mockRefetch
        } as ReturnType<typeof useFindUsers>);

        mockedUseLanguage.mockReturnValue({
            languaje: "es"
        } as ReturnType<typeof useLanguajeContext>);

        renderPage();

        expect(
            screen.getByText("Ocurrió un error al realizar la búsqueda.")
        ).toBeInTheDocument();

        expect(screen.queryByTestId("user-card"))
            .not.toBeInTheDocument();
    });

    it("should render all users with their corresponding props", () => {
        mockedUseFindUsers.mockReturnValue({
            data: users,
            error: null,
            loading: false,
            refetch: mockRefetch
        } as ReturnType<typeof useFindUsers>);

        renderPage();

        expect(screen.getByText("Header")).toBeInTheDocument();

        expect(screen.getByRole("heading", { name: "Search users" }))
            .toBeInTheDocument();

        expect(screen.getByText('"Andres"')).toBeInTheDocument();

        expect(mockedUseFindUsers).toHaveBeenCalledWith("Andres");

        const cards = screen.getAllByTestId("user-card");

        expect(cards).toHaveLength(2);

        expect(cards[0]).toHaveTextContent("Carlos");
        expect(cards[0]).toHaveAttribute("data-user-id", "user-1");
        expect(cards[0]).toHaveAttribute("data-relation", "none");

        expect(cards[1]).toHaveTextContent("Maria");
        expect(cards[1]).toHaveAttribute("data-user-id", "user-2");
        expect(cards[1]).toHaveAttribute("data-relation", "friend");
    });

    it("should render empty state when no users are found", () => {
        mockedUseFindUsers.mockReturnValue({
            data: [],
            error: null,
            loading: false,
            refetch: mockRefetch
        } as ReturnType<typeof useFindUsers>);

        mockedUseLanguage.mockReturnValue({
            languaje: "es"
        } as ReturnType<typeof useLanguajeContext>);

        renderPage();

        expect(screen.getByText(es.notFoundUsers))
            .toBeInTheDocument();

        expect(screen.queryByTestId("user-card"))
            .not.toBeInTheDocument();
    });

    it("should call sendRequest with the selected user id", async () => {
        const user = userEvent.setup();

        mockedUseFindUsers.mockReturnValue({
            data: users,
            error: null,
            loading: false,
            refetch: mockRefetch
        } as ReturnType<typeof useFindUsers>);

        renderPage();

        const buttons = screen.getAllByRole("button", {
            name: "Send request"
        });

        await user.click(buttons[0]);

        expect(mockSendRequest).toHaveBeenCalledTimes(1);
        expect(mockSendRequest).toHaveBeenCalledWith("user-1");
    });

    it("should refetch users when sending a request succeeds", async () => {
        const page = (
            <MemoryRouter initialEntries={["/users?name=Andres"]}>
                <Routes>
                    <Route path="/users" element={<UsersPage />} />
                </Routes>
            </MemoryRouter>
        );

        const { rerender } = render(page);

        expect(mockRefetch).not.toHaveBeenCalled();

        mockedUseSendRequest.mockReturnValue({
            sendRequest: mockSendRequest,
            success: true
        } as ReturnType<typeof useSendRequest>);

        rerender(page);

        await waitFor(() => {
            expect(mockRefetch).toHaveBeenCalledTimes(1);
        });
    });
});