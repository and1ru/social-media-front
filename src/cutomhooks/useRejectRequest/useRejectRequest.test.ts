import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRejectRequest } from "./useRejectRequest";

import { apiClient } from "../api.client"
import { act } from "react";

vi.mock("../api.client", () => ({
    apiClient: {
        put: vi.fn()
    }
}))

const mockPut = vi.mocked(apiClient.put)

describe("useRejectRequest", () => {

    const requestId = "123456789"

    beforeEach(() => {
        vi.clearAllMocks()
    })

    // comprobamos el estado inicial
    it("should return the initial state", () => {
        const { result } = renderHook(() => useRejectRequest());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        // comprueba que sea una funcion
        expect(result.current.rejectRequest).toBeInstanceOf(Function);
    })

    // comprobamos que la peticion salio bien
    it("should accept the request successfully", async () => {
        // mockResolvedValue() simula que la petición HTTP se completó correctamente.
        mockPut.mockResolvedValue(undefined)

        const { result } = renderHook(() => useRejectRequest())

        // act() permite que React procese las actualizaciones de estado provocadas por la operación
        await act(async () => {
            await result.current.rejectRequest(requestId)
        })

        expect(mockPut).toHaveBeenCalledOnce()

        // toHaveBeenCalledWith() comprueba que enviamos el endpoint y el identificador correctos.
        expect(mockPut).toHaveBeenCalledWith(`reject-request`, { id: requestId } )

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
    })

    // comprobamos que la peticion salio mal
    it("should handle an error when accepting the request", async () => {
        mockPut.mockRejectedValue(new Error("Request failed"));

        const { result } = renderHook(() => useRejectRequest());

        await act(async () => {
            await result.current.rejectRequest(requestId);
        });

        expect(mockPut).toHaveBeenCalledOnce()

        expect(mockPut).toHaveBeenCalledWith(`reject-request`, { id: requestId });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(true);
    });

    // comprobamos el loading de la peticion 
    it("should set loading to true while the request is pending", async () => {
        // creamos la promesa
        const { promise, resolve } = Promise.withResolvers();

        // decimos que la peticion retornara la promesa que acabamos de crear
        mockPut.mockReturnValue(promise);

        // obtenemos el resultado de la peticion
        const { result } = renderHook(() => useRejectRequest());

        // creamos una variable que sea una promesa
        let requestPromise: Promise<void>;

        // decimos que la variable promesa sera igual al resultado de la peticion
        act(() => {
            requestPromise = result.current.rejectRequest(requestId);
        });

        // La petición todavía está pendiente.
        expect(result.current.loading).toBe(true);

        // Resolvemos manualmente la petición.
        await act(async () => {
            resolve({
                data: undefined,
            });

            // esperamos que la promesa se resuelva
            await requestPromise;
        });

        // La petición terminó.
        expect(result.current.loading).toBe(false);
    });
})