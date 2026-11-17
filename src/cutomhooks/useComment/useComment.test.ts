import { describe, it, beforeEach, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { apiClient } from '../api.client';
import { useComment } from './useComment';

vi.mock("../api.client", () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

const mockPost = vi.mocked(apiClient.post);

describe("useComment", () => {

    const body = {
        postId: "123456789",
        comment: "test"
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

     // comprobamos el estado inicial
    it("should return the initial state", async () => {
        const { result } = renderHook(() => useComment());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toBeUndefined();

        expect(mockPost).not.toHaveBeenCalled();
    });

    // comprobamos el loading
    it("should set loading to true while the request is pending", async () => {
        const { promise, resolve } = Promise.withResolvers<{
            data: {
                message: string;
                success: boolean;
            };
        }>();

        mockPost.mockReturnValue(promise);

        const { result } = renderHook(() => useComment());

        let requestPromise: Promise<void>;

        act(() => {
            requestPromise = result.current.comment(body);
        });

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toBeUndefined();

        expect(mockPost).toHaveBeenCalledWith("comment", body);

        await act(async () => {
            resolve({
                data: {
                    message: "Comment created",
                    success: true,
                },
            });

            await requestPromise;
        });

        expect(result.current.loading).toBe(false);
    })

    // comprobamos que salio bien
    it("should return a successfully response", async () => {
        const response = {
            message: "Comment created",
            success: true,
        };

        mockPost.mockResolvedValue({
            data: response,
        });

        const { result } = renderHook(() => useComment());

        await act(async () => {
            await result.current.comment(body);
        });

        expect(result.current.data).toEqual(response);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);

        expect(mockPost).toHaveBeenCalledWith("comment", body);
    });

    // comprobamos que salio mal
    it("should handle an error", async () => {
        mockPost.mockRejectedValue(new Error("Request failed"));

        const { result } = renderHook(() => useComment());

        await act(async () => {
            await result.current.comment(body);
        });

        expect(result.current.data).toBeUndefined();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(true);

        expect(mockPost).toHaveBeenCalledWith("comment", body);
    });
})