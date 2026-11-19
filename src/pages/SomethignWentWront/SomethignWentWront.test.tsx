import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    MemoryRouter,
    Routes,
    Route,
    useLocation,
    useNavigate
} from "react-router-dom";

import { SomethingWentWrong } from "./SomethingWentWrong";

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

describe("Page SomethingWentWrong", () => {
    it("should render the error page correctly", () => {
        render(
            <MemoryRouter>
                <SomethingWentWrong />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("heading", { name: "Something went wrong" })
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                /We couldn't complete your request/
            )
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "Go to chats" })
        ).toBeInTheDocument();
    });

    it("should navigate to private chats replacing the current history entry", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter
                initialEntries={["/home", "/error"]}
                initialIndex={1}
            >
                <Routes>
                    <Route path="/error" element={<SomethingWentWrong />} />
                    <Route path="/private/chats" element={<LocationDisplay />} />
                    <Route path="/home" element={<LocationDisplay />} />
                </Routes>
            </MemoryRouter>
        );

        await user.click(
            screen.getByRole("button", { name: "Go to chats" })
        );

        expect(screen.getByTestId("current-path"))
            .toHaveTextContent("/private/chats");

        // Comprueba que la navegación utilizó replace
        await user.click(screen.getByRole("button", { name: "History back" }));

        expect(screen.getByTestId("current-path"))
            .toHaveTextContent("/home");
    });
});