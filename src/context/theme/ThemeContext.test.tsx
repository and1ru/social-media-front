import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ThemeProvider } from "./ThemeProvider";
import { useThemContext } from "./ThemeContext";
import userEvent from "@testing-library/user-event";

const TestComponent = () => {
    const { theme, setTheme } = useThemContext();

    const handleClick = () => {
        setTheme(!theme)
    }

    return (
        <>
            <p>{theme === false ? "light" : "dark"}</p>
            <button onClick={handleClick}>Toggle theme</button>
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
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const paragraph = screen.getByText("light")

        expect(paragraph).toBeInTheDocument();
    });

    it("should update the theme", async () => {
        const user = userEvent.setup()

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const button = screen.getByRole("button", { name: "Toggle theme" })

        await user.click(button);

        const paragraph = screen.getByText("dark")

        expect(paragraph).toBeInTheDocument();
    });

    it("should toggle the theme back to light", async () => {
        const user = userEvent.setup()

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const button = screen.getByRole("button", { name: "Toggle theme" })

        await user.click(button)
        await user.click(button)

        const paragraph = screen.getByText("light")

        expect(paragraph).toBeInTheDocument();
    });
});