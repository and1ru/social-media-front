import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./Home";

describe("Page HomePage", () => {
    it("should render the main sections", () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("heading", {
                level: 1,
                name: /Chat with your friends in real time/i
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: "Everything you can do"
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: "Ready to get started?"
            })
        ).toBeInTheDocument();
    });

    it("should render all application features", () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: /Real-time chat/ })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Friend requests/ })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Search people/ })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Private conversations/ })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Security/ })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Fast interface/ })).toBeInTheDocument();
    });

    it("should render navigation links with correct destinations", () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: "Log in" }))
            .toHaveAttribute("href", "/login");

        expect(screen.getByRole("link", { name: "Sign up" }))
            .toHaveAttribute("href", "/register");

        expect(screen.getByRole("link", { name: "Create an account" }))
            .toHaveAttribute("href", "/register");
    });
});