import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    MemoryRouter,
    Route,
    Routes,
    useLocation,
    useNavigationType,
} from "react-router-dom";

import { PostCard } from "./PostCard";
import { useAuthContext } from "../../context/auth/AuthContext";

vi.mock("../../context/auth/AuthContext", () => ({
    useAuthContext: vi.fn(),
}));

vi.mock("../DeletePost/DeletePost", () => ({
    DeletePost: ({ postId }: { postId: string }) => (
        <button data-testid="delete-post" data-post-id={postId}>
            Delete
        </button>
    ),
}));

vi.mock("../LikeButton/LikeButton", () => ({
    LikeButton: ({ id }: { id: string }) => (
        <button data-testid="like-button" data-id={id}>
            Like
        </button>
    ),
}));

vi.mock("../CommentButton/CommentButton", () => ({
    CommentButton: ({ postId }: { postId: string }) => (
        <button data-testid="comment-button" data-post-id={postId}>
            Comment
        </button>
    ),
}));

vi.mock("../CopyButton/CopyButton", () => ({
    CopyButton: ({ id }: { id: string }) => (
        <button data-testid="copy-button" data-id={id}>
            Copy
        </button>
    ),
}));

const mockUseAuthContext = vi.mocked(useAuthContext);

const postProps = {
    id: "post-123",
    contenido: "Este es el contenido de mi publicación",
    fecha: "19/11/2026",
    name: "Andres",
    userId: "user-123",
};

const ProfilePage = () => {
    const location = useLocation();
    const navigationType = useNavigationType();

    return (
        <>
            <p data-testid="pathname">{location.pathname}</p>
            <p data-testid="navigation-type">{navigationType}</p>
        </>
    );
};

const TestApp = () => (
    <MemoryRouter initialEntries={["/private/feed"]}>
        <Routes>
            <Route
                path="/private/feed"
                element={<PostCard {...postProps} />}
            />
            <Route
                path="/private/user/:userId"
                element={<ProfilePage />}
            />
        </Routes>
    </MemoryRouter>
);

const renderComponent = (authId: string) => {
    mockUseAuthContext.mockReturnValue({
        auth: { id: authId },
    } as ReturnType<typeof useAuthContext>);

    return render(<TestApp />);
};

describe("Component PostCard", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(cleanup);

    it("should render post information and pass the correct ID to child components", () => {
        renderComponent("user-123");

        expect(screen.getByText(postProps.contenido)).toBeInTheDocument();
        expect(screen.getByText(postProps.name)).toBeInTheDocument();
        expect(screen.getByText(postProps.fecha)).toBeInTheDocument();

        expect(screen.getByTestId("like-button"))
            .toHaveAttribute("data-id", postProps.id);

        expect(screen.getByTestId("comment-button"))
            .toHaveAttribute("data-post-id", postProps.id);

        expect(screen.getByTestId("copy-button"))
            .toHaveAttribute("data-id", postProps.id);
    });

    it("should render DeletePost when the authenticated user owns the post", () => {
        renderComponent("user-123");

        expect(screen.getByTestId("delete-post"))
            .toHaveAttribute("data-post-id", postProps.id);
    });

    it("should not render DeletePost when the authenticated user does not own the post", () => {
        renderComponent("user-456");

        expect(screen.queryByTestId("delete-post")).not.toBeInTheDocument();
    });

    it("should navigate to the author's profile when clicking the avatar", async () => {
        const user = userEvent.setup();

        renderComponent("user-456");

        await user.click(screen.getByText("A"));

        expect(screen.getByTestId("pathname"))
            .toHaveTextContent("/private/user/user-123");

        expect(screen.getByTestId("navigation-type"))
            .toHaveTextContent("REPLACE");
    });
});