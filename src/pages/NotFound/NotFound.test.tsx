import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { NotFound } from "./NotFound";

// Helper para comprobar la navegación
const LocationDisplay = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <p data-testid="current-path">{location.pathname}</p>
            <button onClick={() => navigate(-1)}>History back</button>
        </>
    );
};

describe("Page NotFound", () => {
    it("should render the 404 page correctly", () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: "404" }))
            .toBeInTheDocument();

        expect(
            screen.getByText("We're sorry, the page you are looking for does not exist")
        ).toBeInTheDocument();

        expect(screen.getByRole("button", { name: "come back" }))
            .toBeInTheDocument();
    });

    it("should navigate to private chats replacing the current history entry", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter
                initialEntries={["/home", "/not-found"]}
                initialIndex={1}
            >
                <Routes>
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="/private/chats" element={<LocationDisplay />} />
                    <Route path="/home" element={<LocationDisplay />} />
                </Routes>
            </MemoryRouter>
        );

        await user.click(screen.getByRole("button", { name: "come back" }));

        expect(screen.getByTestId("current-path"))
            .toHaveTextContent("/private/chats");

        // Verify that the navigation replaced the previous history entry
        await user.click(screen.getByRole("button", { name: "History back" }));

        expect(screen.getByTestId("current-path"))
            .toHaveTextContent("/home");
    });
});