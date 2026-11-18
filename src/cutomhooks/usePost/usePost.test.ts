import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePost } from "./usePost";

import { apiClient } from "../api.client"
import { act } from "react";

vi.mock("../api.client", () => ({
    apiClient: {
        get: vi.fn()
    }
}))

const mockGet = vi.mocked(apiClient.get)

describe("usePost", () => {

    const postId = "123456789"

    const response = {
        message: "",
        success: true
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    // comprobamos el estado inicial
    it("should return the initial state", () => {
        const { result } = renderHook(() => usePost(postId));

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toBeUndefined();
        // comprueba que sea una funcion
        expect(result.current.login).toBeInstanceOf(Function);
    })

    // comprobamos que la peticion salio bien
    it("should accept the request successfully", async () => {
        // mockResolvedValue() simula que la petición HTTP se completó correctamente.
        mockGet.mockResolvedValue({ data: response })

        const { result } = renderHook(() => usePost(postId))

        // act() permite que React procese las actualizaciones de estado provocadas por la operación
        await act(async () => {
            await result.current.login(body)
        })

        expect(mockGet).toHaveBeenCalledOnce()

        // toHaveBeenCalledWith() comprueba que enviamos el endpoint y el identificador correctos.
        expect(mockGet).toHaveBeenCalledWith(`login`, body)

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toEqual(response);
    })

    // comprobamos que la peticion salio mal
    it("should handle an error when accepting the request", async () => {
        mockGet.mockRejectedValue(new Error("Request failed"));

        const { result } = renderHook(() => usePost(postId));

        await act(async () => {
            await result.current.login();
        });

        expect(mockGet).toHaveBeenCalledOnce()

        expect(mockGet).toHaveBeenCalledWith(`login`);

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(true);
        expect(result.current.data).toBeUndefined();
    });

    // comprobamos el loading de la peticion 
    it("should set loading to true while the request is pending", async () => {
        // creamos la promesa
        const { promise, resolve } = Promise.withResolvers();

        // decimos que la peticion retornara la promesa que acabamos de crear
        mockGet.mockReturnValue(promise);

        // obtenemos el resultado de la peticion
        const { result } = renderHook(() => usePost(postId));

        // creamos una variable que sea una promesa
        let requestPromise: Promise<void>;

        // decimos que la variable promesa sera igual al resultado de la peticion
        act(() => {
            requestPromise = result.current.login(body);
        });

        // La petición todavía está pendiente.
        expect(result.current.loading).toBe(true);

        // Resolvemos manualmente la petición.
        await act(async () => {
            resolve({
                data: response,
            });

            // esperamos que la promesa se resuelva
            await requestPromise;
        });

        // La petición terminó.
        expect(result.current.loading).toBe(false);
    });
})