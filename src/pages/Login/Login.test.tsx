import { describe, it, expect, vi, beforeEach, waitFor } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

import { LoginPage } from "./Login";
import { useLogin } from "../../customHooks/useLogin/useLogin";

// Mock authentication hook
vi.mock("../../cutomHooks/useLogin/useLogin", () => ({
    useLogin: vi.fn()
}));

// Mock Input, preserving React Hook Form integration
vi.mock("../../components/Input/Input", async () => {
    const { useController } = await import("react-hook-form");

    return {
        Input: ({ control, name, label, type, error }: any) => {
            const { field } = useController({ control, name });

            return (
                <label>
                    {label}
                    <input
                        {...field}
                        type={type}
                        aria-label={label}
                        aria-invalid={Boolean(error)}
                    />
                </label>
            );
        }
    };
});

// Mock ErrorMessage
vi.mock("../../components/ErrorMessage/ErrorMessage", () => ({
    ErrorMessage: ({ open, children }: { open: boolean; children: ReactNode }) =>
        open ? <div role="alert">{children}</div> : null
}));

const mockLogin = vi.fn();
const mockedUseLogin = vi.mocked(useLogin);

// Router helper to verify navigation
const CurrentPath = () => {
    const location = useLocation();

    return <output data-testid="current-path">{location.pathname}</output>;
};

const TestRouter = () => (
    <MemoryRouter initialEntries={["/login"]}>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<CurrentPath />} />
        </Routes>
    </MemoryRouter>
);

describe("Page LoginPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockedUseLogin.mockReturnValue({
            error: null,
            success: false,
            login: mockLogin
        });
    });

    it("should render the login form", () => {
        render(<TestRouter />);

        expect(screen.getByRole("heading", { name: "Welcome" }))
            .toBeInTheDocument();

        expect(screen.getByLabelText("Email"))
            .toBeInTheDocument();

        expect(screen.getByLabelText("Password"))
            .toHaveAttribute("type", "password");

        expect(screen.getByRole("button", { name: "Login" }))
            .toBeInTheDocument();

        expect(screen.getByText("Register"))
            .toBeInTheDocument();

        expect(screen.queryByRole("alert"))
            .not.toBeInTheDocument();
    });

    it("should call login with valid form data", async () => {
        const user = userEvent.setup();

        render(<TestRouter />);

        await user.type(
            screen.getByLabelText("Email"),
            "andres@example.com"
        );

        await user.type(
            screen.getByLabelText("Password"),
            "Password123!"
        );

        await user.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email: "andres@example.com",
                password: "Password123!"
            });
        });
    });

    it("should not call login with invalid email", async () => {
        const user = userEvent.setup();

        render(<TestRouter />);

        await user.type(
            screen.getByLabelText("Email"),
            "invalid-email"
        );

        await user.type(
            screen.getByLabelText("Password"),
            "Password123!"
        );

        await user.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(screen.getByLabelText("Email"))
                .toHaveAttribute("aria-invalid", "true");
        });

        expect(mockLogin).not.toHaveBeenCalled();
    });

    it("should display error message when login fails", async () => {
        mockedUseLogin.mockReturnValue({
            error: "Invalid credentials",
            success: false,
            login: mockLogin
        });

        render(<TestRouter />);

        expect(await screen.findByRole("alert"))
            .toHaveTextContent("Error trying to log in");
    });

    it("should navigate to register page when clicking Register", async () => {
        const user = userEvent.setup();

        render(<TestRouter />);

        await user.click(screen.getByText("Register"));

        expect(screen.getByTestId("current-path"))
            .toHaveTextContent("/register");
    });

    it("should navigate to private chats when login succeeds", async () => {
        const { rerender } = render(<TestRouter />);

        mockedUseLogin.mockReturnValue({
            error: null,
            success: true,
            login: mockLogin
        });

        rerender(<TestRouter />);

        expect(await screen.findByTestId("current-path"))
            .toHaveTextContent("/private/chats");
    });
});