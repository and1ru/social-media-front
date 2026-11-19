import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Theme } from "./Theme";
import { useThemContext } from "../../context/theme/ThemeContext";

vi.mock("../../context/theme/ThemeContext", () => ({
    useThemContext: vi.fn(),
}));

const mockUseThemContext = vi.mocked(useThemContext);
const mockSetTheme = vi.fn();

describe("Component Theme", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        document.documentElement.classList.remove("dark");
    });

    afterEach(() => {
        cleanup();
        document.documentElement.classList.remove("dark");
    });

    it("should enable dark mode when the current theme is light", async () => {
        const user = userEvent.setup();

        mockUseThemContext.mockReturnValue({
            theme: false,
            setTheme: mockSetTheme,
        } as ReturnType<typeof useThemContext>);

        render(<Theme />);

        expect(screen.getByText("Light")).toBeInTheDocument();

        const button = screen.getByRole("button", {
            name: "Cambiar a modo oscuro",
        });

        await user.click(button);

        expect(mockSetTheme).toHaveBeenCalledOnce();
        expect(mockSetTheme).toHaveBeenCalledWith(true);

        expect(document.documentElement).toHaveClass("dark");
    });

    it("should disable dark mode when the current theme is dark", async () => {
        const user = userEvent.setup();

        document.documentElement.classList.add("dark");

        mockUseThemContext.mockReturnValue({
            theme: true,
            setTheme: mockSetTheme,
        } as ReturnType<typeof useThemContext>);

        render(<Theme />);

        expect(screen.getByText("Dark")).toBeInTheDocument();

        const button = screen.getByRole("button", {
            name: "Cambiar a modo claro",
        });

        await user.click(button);

        expect(mockSetTheme).toHaveBeenCalledOnce();
        expect(mockSetTheme).toHaveBeenCalledWith(false);

        expect(document.documentElement).not.toHaveClass("dark");
    });
});