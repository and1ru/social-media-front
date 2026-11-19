import { describe, it, beforeEach, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { apiClient } from '../api.client'
import { useGetMessages } from './useGetMessages';

vi.mock("../api.client", () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

const mockGet = vi.mocked(apiClient.get);

describe("useGetMessages", () => {

    const friendId = "123456789"

    const response = {
        message:"got messages",
        success: true,
        result: []
    }

    beforeEach(() => {
        vi.resetAllMocks()
    });

    // comprobamos el estado inicial y la petición automática
    it("should return the initial state and fetch users on mount", async () => {

        const { promise, resolve } = Promise.withResolvers();

        mockGet.mockReturnValue(promise);

        const { result } = renderHook(() => useGetMessages(friendId));

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toBeUndefined();

        expect(mockGet).toHaveBeenCalledOnce();
        expect(mockGet).toHaveBeenCalledWith(`get-messages/${friendId}`);

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

        const { result } = renderHook(() => useGetMessages(friendId));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toEqual(response);

        expect(mockGet).toHaveBeenCalledOnce();
        expect(mockGet).toHaveBeenCalledWith(`get-messages/${friendId}`);
    });

    // comprobamos que salio mal
    it("should handle an error", async () => {

        mockGet.mockRejectedValue(new Error("Request failed"));

        const { result } = renderHook(() => useGetMessages(friendId));

        await waitFor(() => {
            expect(result.current.error).toBe(true);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toBeUndefined();

        expect(mockGet).toHaveBeenCalledOnce();
        expect(mockGet).toHaveBeenCalledWith(`get-messages/${friendId}`);
    });
});