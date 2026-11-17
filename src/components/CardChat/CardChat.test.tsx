import { screen, render, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from 'vitest'
import { CardChat } from "./CardChat";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext"
import { useNavigate } from "react-router-dom";
import { en, es } from "../../laguaje";
import userEvent from "@testing-library/user-event";

// vi.hoisted() Permite crear variables antes de que Vitest ejecute los mocks que eleva (hoisting). En nuestro caso, creamos navigateMock para que esté disponible cuando se configure el mock.
const { navigateMock } = vi.hoisted(() => ({
    navigateMock: vi.fn()
}))

// lo hacemos porque useNavigate retorna una funcion y hacemos que esa funcion que retorna sea la funcion que acabamos de crear
vi.mock("react-router-dom", () => ({
    useNavigate: () => navigateMock
}))

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: vi.fn()
}))

describe("CardChat", () => {
    afterEach(() => {
        cleanup()
        localStorage.clear()
    })

    it("should show the name and letter", () => {
        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "es" } as ReturnType<typeof useLanguajeContext>
        )
        render(<CardChat id="1" name="Andres" key={1} />)

        const title = screen.getByRole("heading", { name: "Andres" })
        const letter = screen.getByText("A")

        expect(title).toBeInTheDocument()
        expect(letter).toBeInTheDocument()
    })

    it("should show the paragraph in english", () => {
        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "en" } as ReturnType<typeof useLanguajeContext>
        )
        render(<CardChat id="1" name="Andres" key={1} />)

        const paragraph = screen.getByText(en.chat)
        expect(paragraph).toBeInTheDocument()
    })

    it("should show the paragraph in spanish", () => {
        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "es" } as ReturnType<typeof useLanguajeContext>
        )
        render(<CardChat id="1" name="Andres" key={1} />)
        const paragraph = screen.getByText(es.chat)
        expect(paragraph).toBeInTheDocument()
    })

    it("should navigate to the chat and save its name in localStorage", async () => {
        const user = userEvent.setup();

        render(<CardChat id="1" name="Andres" />);

        const article = screen.getByRole("article");

        await user.click(article);

        expect(navigateMock).toHaveBeenCalledOnce();

        expect(navigateMock).toHaveBeenCalledWith(
            "/private/chat/1",
            { replace: true }
        );

        expect(localStorage.getItem("chat-name")).toBe("Andres");
    });
})