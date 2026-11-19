import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    MemoryRouter,
    Routes,
    Route,
    useLocation,
    useNavigate
} from "react-router-dom";

import { UserPage } from "./UserPage";
import { usePostUser } from "../../cutomHooks/usePostUser/usePostUser";

// Mocks
vi.mock("../../cutomHooks/usePostUser/usePostUser", () => ({
    usePostUser: vi.fn()
}));

vi.mock("../../components/Header/Header", () => ({
    Header: () => <header>Header</header>
}));

vi.mock("../../components/PostCard/PostCard", () => ({
    PostCard: ({
        contenido,
        fecha,
        id,
        name,
        userId
    }: {
        contenido: string;
        fecha: string;
        id: string;
        name: string;
        userId: string;
    }) => (
        <article
            data-testid="post-card"
            data-post-id={id}
            data-user-id={userId}
            data-date={fecha}
        >
            <h2>{name}</h2>
            <p>{contenido}</p>
        </article>
    )
}));

const mockedUsePostUser = vi.mocked(usePostUser);

// Router helper
const LocationDisplay = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <p data-testid="current-path">{location.pathname}</p>
            <button onClick={() => navigate(-1)}>History back</button>
        </>
    );
};

const renderUserPage = (entries: string[] = ["/users/user-123"]) => {
    return render(
        <MemoryRouter initialEntries={entries} initialIndex={entries.length - 1}>
            <Routes>
                <Route path="/users/:id" element={<UserPage />} />
                <Route path="/private/error" element={<LocationDisplay />} />
                <Route path="/home" element={<LocationDisplay />} />
            </Routes>
        </MemoryRouter>
    );
};

// Test data
const posts = [
    {
        _id: "post-1",
        content: "First post",
        fecha: "2026-11-19",
        name: "Andres",
        userId: "user-123"
    },
    {
        _id: "post-2",
        content: "Second post",
        fecha: "2026-11-18",
        name: "Andres",
        userId: "user-123"
    }
];

describe("Page UserPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockedUsePostUser.mockReturnValue({
            data: [],
            loading: false,
            error: null
        } as ReturnType<typeof usePostUser>);
    });

    it("should render loading state", () => {
        mockedUsePostUser.mockReturnValue({
            data: [],
            loading: true,
            error: null
        } as ReturnType<typeof usePostUser>);

        renderUserPage();

        expect(screen.getByText("loading")).toBeInTheDocument();

        expect(screen.queryByText("Header")).not.toBeInTheDocument();
        expect(screen.queryByTestId("post-card")).not.toBeInTheDocument();
    });

    it("should redirect to private error when an error occurs", async () => {
        const user = userEvent.setup();

        mockedUsePostUser.mockReturnValue({
            data: [],
            loading: false,
            error: "Something went wrong"
        } as ReturnType<typeof usePostUser>);

        renderUserPage(["/home", "/users/user-123"]);

        expect(await screen.findByTestId("current-path"))
            .toHaveTextContent("/private/error");

        // Verify that navigation used replace
        await user.click(screen.getByRole("button", { name: "History back" }));

        await waitFor(() => {
            expect(screen.getByTestId("current-path"))
                .toHaveTextContent("/home");
        });
    });

    it("should render user information and all their posts", () => {
        mockedUsePostUser.mockReturnValue({
            data: posts,
            loading: false,
            error: null
        } as ReturnType<typeof usePostUser>);

        renderUserPage();

        expect(screen.getByText("Header")).toBeInTheDocument();

        expect(
            screen.getByRole("heading", { level: 1, name: "Andres" })
        ).toBeInTheDocument();

        const cards = screen.getAllByTestId("post-card");

        expect(cards).toHaveLength(2);

        expect(cards[0]).toHaveTextContent("First post");
        expect(cards[0]).toHaveAttribute("data-post-id", "post-1");
        expect(cards[0]).toHaveAttribute("data-user-id", "user-123");

        expect(cards[1]).toHaveTextContent("Second post");
        expect(cards[1]).toHaveAttribute("data-post-id", "post-2");
        expect(cards[1]).toHaveAttribute("data-user-id", "user-123");
    });

    it("should call usePostUser with the id from URL params", () => {
        renderUserPage(["/users/user-456"]);

        expect(mockedUsePostUser).toHaveBeenCalledWith("user-456");
    });
});