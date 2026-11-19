import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRegister } from "./useRegister";

import { apiClient } from "../api.client"
import { act } from "react";

vi.mock("../api.client", () => ({
    apiClient: {
        post: vi.fn()
    }
}))

const mockPost = vi.mocked(apiClient.post)

describe("useRegister", () => {

    const body = {
        name: "test",
        email: "test@gmail.com",
        password: "123456789",
        confirmPassword: "123456789"
    }

    const response = {
        message: "",
        success: true
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    // comprobamos el estado inicial
    it("should return the initial state", () => {
        const { result } = renderHook(() => useRegister());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toBeUndefined();
        // comprueba que sea una funcion
        expect(result.current.register).toBeInstanceOf(Function);
    })

    // comprobamos que la peticion salio bien
    it("should accept the request successfully", async () => {
        // mockResolvedValue() simula que la petición HTTP se completó correctamente.
        mockPost.mockResolvedValue({ data: response })

        const { result } = renderHook(() => useRegister())

        // act() permite que React procese las actualizaciones de estado provocadas por la operación
        await act(async () => {
            await result.current.register(body)
        })

        expect(mockPost).toHaveBeenCalledOnce()

        // toHaveBeenCalledWith() comprueba que enviamos el endpoint y el identificador correctos.
        expect(mockPost).toHaveBeenCalledWith(`register`, body)

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toEqual(response);
    })

    // comprobamos que la peticion salio mal
    it("should handle an error when accepting the request", async () => {
        mockPost.mockRejectedValue(new Error("Request failed"));

        const { result } = renderHook(() => useRegister());

        await act(async () => {
            await result.current.register(body);
        });

        expect(mockPost).toHaveBeenCalledOnce()

        expect(mockPost).toHaveBeenCalledWith(`register`, body);

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(true);
        expect(result.current.data).toBeUndefined();
    });

    // comprobamos el loading de la peticion 
    it("should set loading to true while the request is pending", async () => {
        // creamos la promesa
        const { promise, resolve } = Promise.withResolvers();

        // decimos que la peticion retornara la promesa que acabamos de crear
        mockPost.mockReturnValue(promise);

        // obtenemos el resultado de la peticion
        const { result } = renderHook(() => useRegister());

        // creamos una variable que sea una promesa
        let requestPromise: Promise<void>;

        // decimos que la variable promesa sera igual al resultado de la peticion
        act(() => {
            requestPromise = result.current.register(body);
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