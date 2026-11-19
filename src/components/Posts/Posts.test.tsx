import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Posts } from "./Posts";
import { useGetPosts } from "../../customHooks/useGetPost/useGetPost";

vi.mock("../../customHooks/useGetPost/useGetPost", () => ({
    useGetPosts: vi.fn(),
}));

vi.mock("../PostCard/PostCard", () => ({
    PostCard: ({
        id,
        name,
        contenido,
        fecha,
        userId,
    }: {
        id: string;
        name: string;
        contenido: string;
        fecha: string;
        userId: string;
    }) => (
        <article
            data-testid="post-card"
            data-id={id}
            data-name={name}
            data-contenido={contenido}
            data-fecha={fecha}
            data-user-id={userId}
        />
    ),
}));

const mockUseGetPosts = vi.mocked(useGetPosts);

describe("Component Posts", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        mockUseGetPosts.mockReturnValue({
            data: { result: [] },
        });
    });

    afterEach(cleanup);

    it("should render posts with the correct props and order", () => {
        mockUseGetPosts.mockReturnValue({
            data: {
                result: [
                    {
                        _id: "post-1",
                        name: "Andres",
                        content: "First post",
                        fecha: "2026-11-19",
                        userId: "user-1",
                    },
                    {
                        _id: "post-2",
                        name: "Carlos",
                        content: "Second post",
                        fecha: "2026-11-18",
                        userId: "user-2",
                    },
                ],
            },
        } as ReturnType<typeof useGetPosts>);

        render(<Posts />);

        const posts = screen.getAllByTestId("post-card");

        expect(posts).toHaveLength(2);

        expect(posts[0]).toHaveAttribute("data-id", "post-1");
        expect(posts[0]).toHaveAttribute("data-name", "Andres");
        expect(posts[0]).toHaveAttribute("data-contenido", "First post");
        expect(posts[0]).toHaveAttribute("data-fecha", "2026-11-19");
        expect(posts[0]).toHaveAttribute("data-user-id", "user-1");

        expect(posts[1]).toHaveAttribute("data-id", "post-2");
        expect(posts[1]).toHaveAttribute("data-name", "Carlos");
        expect(posts[1]).toHaveAttribute("data-contenido", "Second post");
        expect(posts[1]).toHaveAttribute("data-fecha", "2026-11-18");
        expect(posts[1]).toHaveAttribute("data-user-id", "user-2");
    });

    it("should not render posts when data is undefined or the result is empty", () => {
        mockUseGetPosts.mockReturnValue({
            data: undefined,
        } as ReturnType<typeof useGetPosts>);

        const { rerender } = render(<Posts />);

        expect(screen.queryByTestId("post-card")).not.toBeInTheDocument();

        mockUseGetPosts.mockReturnValue({
            data: { result: [] },
        } as ReturnType<typeof useGetPosts>);

        rerender(<Posts />);

        expect(screen.queryByTestId("post-card")).not.toBeInTheDocument();
    });
});