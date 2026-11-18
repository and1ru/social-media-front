import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLanguajeContext } from "./LanguajeContext";
import { LanguajeProvider } from "./LanguajeProvider";

const TestComponent = () => {
    const { languaje, setLanguaje } = useLanguajeContext();

    const handleClick = () => {
        if (languaje === "en") {
            setLanguaje("es")
        } else if (languaje === "es") {
            setLanguaje("en")
        }
    }

    return (
        <>
            <p>{languaje}</p>
            <button onClick={handleClick}>languaje</button>
        </>
    );
};

describe("ThemeContext", () => {

    beforeEach(() => {
        cleanup()
    })

    // comprobamos el estado inicial
    it("should return the initial state", () => {
        render(
            <LanguajeProvider>
                <TestComponent />
            </LanguajeProvider>
        );

        const paragraph = screen.getByText("en")

        expect(paragraph).toBeInTheDocument();
    });

    it("should update the languaje", async () => {
        const user = userEvent.setup()

        render(
            <LanguajeProvider>
                <TestComponent />
            </LanguajeProvider>
        );

        const button = screen.getByRole("button", { name: "languaje" })

        await user.click(button);

        const paragraph = screen.getByText("es")

        expect(paragraph).toBeInTheDocument();
    });

    it("should toggle the languaje back to en", async () => {
        const user = userEvent.setup()

        render(
            <LanguajeProvider>
                <TestComponent />
            </LanguajeProvider>
        );

        const button = screen.getByRole("button", { name: "languaje" })

        await user.click(button)
        await user.click(button)

        const paragraph = screen.getByText("en")

        expect(paragraph).toBeInTheDocument();
    });
});