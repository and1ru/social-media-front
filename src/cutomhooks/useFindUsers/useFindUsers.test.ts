import { describe, it, beforeEach, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { apiClient } from '../api.client'
import { useFindUsers } from './useFindUsers'
import type { userType } from '../../schemas/user-schema'

vi.mock("../api.client", () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

const mockGet = vi.mocked(apiClient.get);

describe("useFindUsers", () => {

    const name = "123456789";

    const users: userType[] = [
        {
            id: "123456789",
            name: "test name",
            relation: "test relation"
        }
    ];

    beforeEach(() => {
        vi.resetAllMocks()
    });

    // comprobamos el estado inicial y la petición automática
    it("should return the initial state and fetch users on mount", async () => {

        const { promise, resolve } = Promise.withResolvers();

        mockGet.mockReturnValue(promise);

        const { result } = renderHook(() => useFindUsers(name));

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(false);
        expect(result.current.success).toBe(false);
        expect(result.current.data).toEqual([]);

        expect(mockGet).toHaveBeenCalledOnce();
        expect(mockGet).toHaveBeenCalledWith(`find-users/${name}`);

        await act(async () => {
            resolve({
                data: {
                    result: users
                }
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
            data: {
                result: users
            }
        });

        const { result } = renderHook(() => useFindUsers(name));

        await waitFor(() => {
            expect(result.current.success).toBe(true);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toEqual(users);

        expect(mockGet).toHaveBeenCalledOnce();
        expect(mockGet).toHaveBeenCalledWith(`find-users/${name}`);
    });

    // comprobamos que salio mal
    it("should handle an error", async () => {

        mockGet.mockRejectedValue(new Error("Request failed"));

        const { result } = renderHook(() => useFindUsers(name));

        await waitFor(() => {
            expect(result.current.error).toBe(true);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.success).toBe(false);
        expect(result.current.data).toEqual([]);

        expect(mockGet).toHaveBeenCalledOnce();
        expect(mockGet).toHaveBeenCalledWith(`find-users/${name}`);
    });
});