import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
} from "vitest";

import {
    render,
    screen,
    act,
    waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { LikeButton } from "./LikeButton";

const mocks = vi.hoisted(() => ({
    useLikes: vi.fn(),
    useGetLikes: vi.fn(),
    like: vi.fn(),
    refetch: vi.fn(),
}));

vi.mock("../../customHooks/useLikes/useLikes", () => ({
    useLikes: mocks.useLikes,
}));

vi.mock("../../customHooks/useGetLikes/useGetLikes", () => ({
    useGetLikes: mocks.useGetLikes,
}));

beforeEach(() => {
    vi.clearAllMocks();

    mocks.like.mockResolvedValue(undefined);
    mocks.refetch.mockResolvedValue(undefined);

    mocks.useLikes.mockReturnValue({
        like: mocks.like,
    });

    mocks.useGetLikes.mockReturnValue({
        data: {
            result: {
                liked: false,
                likes: 0,
            },
        },
        refetch: mocks.refetch,
    });
});

describe("Component LikeButton", () => {

    it.each([
        {
            liked: true,
            likes: 10,
            icon: "❤️",
        },
        {
            liked: false,
            likes: 5,
            icon: "🤍",
        },
    ])(
        "should render the correct like state",
        ({ liked, likes, icon }) => {
            const postId = "post-123";

            mocks.useGetLikes.mockReturnValue({
                data: {
                    result: {
                        liked,
                        likes,
                    },
                },
                refetch: mocks.refetch,
            });

            render(<LikeButton id={postId} />);

            const button = screen.getByRole("button");

            expect(button).toHaveTextContent(icon);
            expect(button).toHaveTextContent(String(likes));

            expect(mocks.useLikes).toHaveBeenCalledWith(postId);
            expect(mocks.useGetLikes).toHaveBeenCalledWith(postId);
        }
    );

    it("should call like and then refetch after clicking", async () => {
        const user = userEvent.setup();

        let resolveLike!: () => void;

        mocks.like.mockImplementation(
            () => new Promise<void>((resolve) => {
                resolveLike = resolve;
            })
        );

        render(<LikeButton id="post-123" />);

        await user.click(screen.getByRole("button"));

        expect(mocks.like).toHaveBeenCalledTimes(1);

        // refetch must wait until like finishes.
        expect(mocks.refetch).not.toHaveBeenCalled();

        await act(async () => {
            resolveLike();
        });

        await waitFor(() => {
            expect(mocks.refetch).toHaveBeenCalledTimes(1);
        });

        expect(
            mocks.like.mock.invocationCallOrder[0]
        ).toBeLessThan(
            mocks.refetch.mock.invocationCallOrder[0]
        );
    });
});