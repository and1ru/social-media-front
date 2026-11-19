import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { PostPage } from "./PostPage";
import { usePost } from "../../customHooks/usePost/usePost";

// Mocks
vi.mock("../../customHooks/usePost/usePost", () => ({
    usePost: vi.fn()
}));

vi.mock("../../components/Header/Header", () => ({
    Header: () => <header>Header</header>
}));

vi.mock("../../components/PostCard/PostCard", () => ({
    PostCard: (props: Record<string, unknown>) => (
        <article
            data-testid="post-card"
            data-post-id={String(props.id)}
            data-user-id={String(props.userId)}
            data-date={String(props.fecha)}
        >
            <h2>{String(props.name)}</h2>
            <p>{String(props.contenido)}</p>
        </article>
    )
}));

const mockedUsePost = vi.mocked(usePost);

const post = {
    _id: "post-123",
    content: "Hello world",
    fecha: "2026-11-19",
    name: "Andres",
    userId: "user-123"
};

const renderPage = (path = "/posts/post-123") => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="/posts/:id" element={<PostPage />} />
            </Routes>
        </MemoryRouter>
    );
};

describe("Page PostPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockedUsePost.mockReturnValue({
            data: null,
            loading: false
        } as ReturnType<typeof usePost>);
    });

    it("should render loading state", () => {
        mockedUsePost.mockReturnValue({
            data: null,
            loading: true
        } as ReturnType<typeof usePost>);

        renderPage();

        expect(screen.getByText("cargando")).toBeInTheDocument();
        expect(screen.queryByTestId("post-card")).not.toBeInTheDocument();
    });

    it("should render not found message when post does not exist", () => {
        renderPage();

        expect(screen.getByText("no se encontro el post"))
            .toBeInTheDocument();

        expect(screen.queryByTestId("post-card")).not.toBeInTheDocument();
    });

    it("should render post with correct information", () => {
        mockedUsePost.mockReturnValue({
            data: post,
            loading: false
        } as ReturnType<typeof usePost>);

        renderPage();

        expect(screen.getByText("Header")).toBeInTheDocument();

        expect(screen.getByTestId("post-card")).toBeInTheDocument();

        expect(screen.getByText("Hello world")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Andres" }))
            .toBeInTheDocument();

        expect(screen.getByTestId("post-card"))
            .toHaveAttribute("data-post-id", "post-123");

        expect(screen.getByTestId("post-card"))
            .toHaveAttribute("data-user-id", "user-123");

        expect(screen.getByTestId("post-card"))
            .toHaveAttribute("data-date", "2026-11-19");
    });

    it("should call usePost with the id from URL params", () => {
        renderPage("/posts/post-456");

        expect(mockedUsePost).toHaveBeenCalledWith("post-456");
    });
});