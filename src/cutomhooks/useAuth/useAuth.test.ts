import { describe, it, beforeEach, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useAuth } from './useAuth';
import { apiClient } from '../api.client';

vi.mock("../api.client", () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

const mockGet = vi.mocked(apiClient.get);

describe("useAuth", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("should return the initial state while the request is pending", async () => {
        const { promise, resolve } = Promise.withResolvers<{
            data: {
                message: string;
                success: boolean;
                result: {
                    name: string;
                    userId: string;
                };
            };
        }>();

        mockGet.mockReturnValue(promise);

        const { result } = renderHook(() => useAuth());

        expect(result.current.loading).toBe(true);
        expect(result.current.authenticated).toBe(false);

        expect(result.current.data).toEqual({
            message: "",
            result: {
                name: "",
                userId: "",
            },
            success: false,
        });

        expect(mockGet).toHaveBeenCalledWith("me", {
            withCredentials: true,
        });

        // Resolvemos la petición para que no quede pendiente.
        await act(async () => {
            resolve({
                data: {
                    message: "Authenticated",
                    success: true,
                    result: {
                        name: "Andres",
                        userId: "123",
                    },
                },
            });

            await promise;
        });
    })

    it("should authenticate the user successfully", async () => {
        const response = {
            message: "Authenticated",
            success: true,
            result: {
                name: "Andres",
                userId: "123",
            },
        };

        mockGet.mockResolvedValue({
            data: response,
        } as never);

        const { result } = renderHook(() => useAuth());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.authenticated).toBe(true);
        expect(result.current.data).toEqual(response);

        expect(mockGet).toHaveBeenCalledWith("me", {
            withCredentials: true,
        });
    });

    it("should not authenticate the user when the response success is false", async () => {
        const response = {
            message: "Not authenticated",
            success: false,
            result: {
                name: "",
                userId: "",
            },
        };

        mockGet.mockResolvedValue({
            data: response,
        });

        const { result } = renderHook(() => useAuth());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.authenticated).toBe(false);
        expect(result.current.data).toEqual(response);
    });

    it("should handle an error when the authentication request fails", async () => {
        mockGet.mockRejectedValue(new Error("Request failed"));

        const { result } = renderHook(() => useAuth());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.authenticated).toBe(false);

        expect(result.current.data).toEqual({
            message: "",
            success: false,
            result: {
                name: "",
                userId: "",
            },
        });
    });
})