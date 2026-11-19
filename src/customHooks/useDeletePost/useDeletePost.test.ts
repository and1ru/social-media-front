import { describe, it, beforeEach, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { apiClient } from '../api.client';
import { useDeletePost } from './useDeletePost';

vi.mock("../api.client", () => ({
    apiClient: {
        delete: vi.fn(),
    },
}));

const mockPost = vi.mocked(apiClient.delete);

describe("useDeletePost", () => {

    const postId = "123456789"

    beforeEach(() => {
        vi.clearAllMocks()
    })

     // comprobamos el estado inicial
    it("should return the initial state", async () => {
        const { result } = renderHook(() => useDeletePost());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.success).toBe(false)

        expect(mockPost).not.toHaveBeenCalled();
    });

    // comprobamos el loading
    it("should set loading to true while the request is pending", async () => {
        const { promise, resolve } = Promise.withResolvers<{
            message:string,
            success:boolean
        }>();

        mockPost.mockReturnValue(promise);

        const { result } = renderHook(() => useDeletePost());

        let requestPromise: Promise<void>;

        act(() => {
            requestPromise = result.current.deletePost(postId);
        });

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(false);
        expect(result.current.success).toBe(false);

        expect(mockPost).toHaveBeenCalledWith(`post/${postId}`);

        await act(async () => {
            resolve({message: "Post was deleted", success:true});

            await requestPromise;
        });

        expect(result.current.loading).toBe(false);
    })

    // comprobamos que salio bien
    it("should return a successfully response", async () => {
        const response = {
            message: "Post was deleted",
            success: true,
        };

        mockPost.mockResolvedValue({
            data: response,
        });

        const { result } = renderHook(() => useDeletePost());

        await act(async () => {
            await result.current.deletePost(postId);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.success).toBe(true);

        expect(mockPost).toHaveBeenCalledWith(`post/${postId}`);
    });

    // comprobamos que salio mal
    it("should handle an error", async () => {
        mockPost.mockRejectedValue(new Error("Request failed"));

        const { result } = renderHook(() => useDeletePost());

        await act(async () => {
            await result.current.deletePost(postId);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(true);

        expect(mockPost).toHaveBeenCalledWith(`post/${postId}`);
    });
})