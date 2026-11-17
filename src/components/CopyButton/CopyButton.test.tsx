import { describe, it, expect, vi, afterEach } from 'vitest'
import { screen, render, cleanup, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CopyButton } from './CopyButton'
import { en, es } from '../../laguaje'
import { useLanguajeContext } from '../../context/languaje/LanguajeContext'

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: vi.fn()
}))

const mockWriteText = vi.fn()
const postId = "123456789"

describe("CopyButton", () => {
    afterEach(() => {
        cleanup()
        // elimina todos los temporizadores
        vi.clearAllTimers()
        // restaura a los temporizadores reales
        vi.useRealTimers()
        // limpia el historial de mocks
        vi.clearAllMocks()
    })

    it("should render button in english", () => {
        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "en" } as ReturnType<typeof useLanguajeContext>
        )

        render(<CopyButton id={postId} />)
        const button = screen.getByRole("button", { name: `📤 ${en.buttonCopy}` })
        expect(button).toBeInTheDocument()
    })

    it("should render button in spanish", () => {
        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "es" } as ReturnType<typeof useLanguajeContext>
        )

        render(<CopyButton id={postId} />)
        const button = screen.getByRole("button", { name: `📤 ${es.buttonCopy}` })
        expect(button).toBeInTheDocument()
    })

    it("should copy the post URL when clicking the button", async () => {
        const user = userEvent.setup()

        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "es" } as ReturnType<typeof useLanguajeContext>
        )

        Object.defineProperty(navigator, "clipboard", {
            value: {
                writeText: mockWriteText
            },
            configurable: true
        });

        mockWriteText.mockResolvedValue(undefined)

        render(<CopyButton id={postId} />)

        const button = screen.getByRole("button", { name: `📤 ${es.buttonCopy}` })
        await user.click(button)

        expect(mockWriteText).toHaveBeenCalledOnce()
        expect(mockWriteText).toHaveBeenCalledWith(`http://localhost:5173/private/post/${postId}`)
    })

    it("should display the confirmation message after copying in english", async () => {
        const user = userEvent.setup()

        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "en" } as ReturnType<typeof useLanguajeContext>
        )

        render(<CopyButton id={postId} />)

        const button = screen.getByRole("button", { name: `📤 ${en.buttonCopy}` })

        await user.click(button)

        const article = screen.getByText("Just copied the post")

        expect(article).toBeInTheDocument()
    })

    it("should display the confirmation message after copying in spanish", async () => {
        const user = userEvent.setup()

        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "es" } as ReturnType<typeof useLanguajeContext>
        )

        render(<CopyButton id={postId} />)

        const button = screen.getByRole("button", { name: `📤 ${es.buttonCopy}` })

        await user.click(button)

        const article = screen.getByText("Se copio el post")

        expect(article).toBeInTheDocument()
    })

    it("should hide the confirmation message after 2 seconds", async () => {
        // dice que va a usar timmer falsos
        vi.useFakeTimers();

        vi.mocked(useLanguajeContext).mockReturnValue({
            languaje: "en"
        } as ReturnType<typeof useLanguajeContext>);

        render(<CopyButton id={postId} />);

        const button = screen.getByRole("button");

        // act: Piensa en act como una forma de decirle a React: «Espera a que termines de actualizar la pantalla antes de continuar con mi test».
        // Cuando haces algo que provoca que React actualice el estado o la interfaz, y necesitas asegurarte de que esa actualización de estado se haya hecho
        await act(async () => {
            // fireEvent sirve para simular acciones en del navegador/componente como hacer click, escribir en un input o enviar un formulario
            // fireEvent vs userEvent: por ejemplo en fireEvent no usa timers internos otro ejemplo es que cuando se escribe en un input fireEvent hace que aparezca todo el texto pero userEvent simula que escribe letra por letra, userEvent necesita de await 
            fireEvent.click(button);
        });

        expect(screen.getByText("Just copied the post")).toBeInTheDocument();

        // act(): se asegura de que React procese las actualizaciones de estado y refleje los cambios en la interfaz.
        await act(async () => {
            // avanza 2 segundos en el reloj simulado y ejecuta los temporizadores pendientes.
            await vi.advanceTimersByTimeAsync(2000);
        });

        expect(
            screen.queryByText("Just copied the post")
        ).not.toBeInTheDocument();
    });
})