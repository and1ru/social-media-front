import { describe, it, beforeEach, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { apiClient } from '../api.client';
import { useCreatePost } from './useCreatePost';

vi.mock("../api.client", () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

const mockPost = vi.mocked(apiClient.post);

describe("useCreatePost", () => {

    const body = "test"

    beforeEach(() => {
        vi.clearAllMocks()
    })

     // comprobamos el estado inicial
    it("should return the initial state", async () => {
        const { result } = renderHook(() => useCreatePost());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);

        expect(mockPost).not.toHaveBeenCalled();
    });

    // comprobamos el loading
    it("should set loading to true while the request is pending", async () => {
        const { promise, resolve } = Promise.withResolvers<{
            message:string,
            success:boolean
        }>();

        mockPost.mockReturnValue(promise);

        const { result } = renderHook(() => useCreatePost());

        let requestPromise: Promise<void>;

        act(() => {
            requestPromise = result.current.createPost(body);
        });

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(false);

        expect(mockPost).toHaveBeenCalledWith("create-post", { content: body });

        await act(async () => {
            resolve({message: "Post was created", success:true});

            await requestPromise;
        });

        expect(result.current.loading).toBe(false);
    })

    // comprobamos que salio bien
    it("should return a successfully response", async () => {
        const response = {
            message: "Post was created",
            success: true,
        };

        mockPost.mockResolvedValue({
            data: response,
        });

        const { result } = renderHook(() => useCreatePost());

        await act(async () => {
            await result.current.createPost(body);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);

        expect(mockPost).toHaveBeenCalledWith("create-post", { content: body });
    });

    // comprobamos que salio mal
    it("should handle an error", async () => {
        mockPost.mockRejectedValue(new Error("Request failed"));

        const { result } = renderHook(() => useCreatePost());

        await act(async () => {
            await result.current.createPost(body);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(true);

        expect(mockPost).toHaveBeenCalledWith("create-post", { content: body });
    });
})