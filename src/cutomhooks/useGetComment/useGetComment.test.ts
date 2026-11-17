import { describe, it, beforeEach, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { apiClient } from '../api.client'
import { useGetComment } from './useGetComment';

vi.mock("../api.client", () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

const mockGet = vi.mocked(apiClient.get);

describe("useGetComment", () => {

    const postId = "123456789"

    const response = {
        result: {
            commentCount: 0,
            comments: []
        },
        success: true,
        message: "test message"
    };

    beforeEach(() => {
        vi.resetAllMocks()
    });

    // comprobamos el estado inicial y la petición automática
    it("should return the initial state and fetch users on mount", async () => {

        const { promise, resolve } = Promise.withResolvers();

        mockGet.mockReturnValue(promise);

        const { result } = renderHook(() => useGetComment(postId));

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toEqual(undefined);

        expect(mockGet).toHaveBeenCalledOnce();
        expect(mockGet).toHaveBeenCalledWith(`comments/${postId}`);

        await act(async () => {
            resolve({
                data: response
            });

            await promise;
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
    });

    // comprobamos que salio bien
    it("should return a successfully response", async () => {
        mockGet.mockResolvedValue({
            data: response
        });

        const { result } = renderHook(() => useGetComment(postId));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toEqual(response);

        expect(mockGet).toHaveBeenCalledOnce();
        expect(mockGet).toHaveBeenCalledWith(`comments/${postId}`);
    });

    // comprobamos que salio mal
    it("should handle an error", async () => {

        mockGet.mockRejectedValue(new Error("Request failed"));

        const { result } = renderHook(() => useGetComment(postId));

        await waitFor(() => {
            expect(result.current.error).toBe(true);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual(undefined);

        expect(mockGet).toHaveBeenCalledOnce();
        expect(mockGet).toHaveBeenCalledWith(`comments/${postId}`);
    });
});