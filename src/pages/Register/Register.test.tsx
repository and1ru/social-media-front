import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    MemoryRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";
import type { ReactNode } from "react";

import { RegisterPage } from "./Register";
import { useRegister } from "../../customHooks/useRegister/useRegister";

// Mocks
vi.mock("../../cutomHooks/useRegister/useRegister", () => ({
    useRegister: vi.fn()
}));

vi.mock("../../components/Input/Input", async () => {
    const { Controller } = await import("react-hook-form");

    return {
        Input: ({ control, name, label, type, error }: any) => (
            <label>
                {label}
                <Controller
                    control={control}
                    name={name}
                    render={({ field }: any) => (
                        <input
                            {...field}
                            type={type}
                            aria-label={label}
                            aria-invalid={Boolean(error)}
                        />
                    )}
                />
            </label>
        )
    };
});

vi.mock("../../components/ErrorMessage/ErrorMessage", () => ({
    ErrorMessage: ({
        open,
        children
    }: {
        open: boolean;
        children: ReactNode;
    }) => open ? <div role="alert">{children}</div> : null
}));

vi.mock("../../components/SuccesMessage/SuccesMessage", () => ({
    SuccessMessage: ({
        open,
        children
    }: {
        open: boolean;
        children: ReactNode;
    }) => open ? <div role="status">{children}</div> : null
}));

const mockRegister = vi.fn();
const mockedUseRegister = vi.mocked(useRegister);

// Router helper
const CurrentPath = () => {
    const location = useLocation();

    return <p data-testid="current-path">{location.pathname}</p>;
};

const TestRouter = () => (
    <MemoryRouter initialEntries={["/register"]}>
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<CurrentPath />} />
        </Routes>
    </MemoryRouter>
);

const validUser = {
    name: "Andres",
    email: "andres@example.com",
    password: "Password123!",
    confirmPassword: "Password123!"
};

describe("Page RegisterPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockedUseRegister.mockReturnValue({
            error: null,
            success: false,
            register: mockRegister
        } );
    });

    it("should render the register form", () => {
        render(<TestRouter />);

        expect(screen.getByRole("heading", { name: "REGISTER" }))
            .toBeInTheDocument();

        expect(screen.getByLabelText("Name"))
            .toBeInTheDocument();

        expect(screen.getByLabelText("Email"))
            .toBeInTheDocument();

        expect(screen.getByLabelText("Password"))
            .toHaveAttribute("type", "password");

        expect(screen.getByLabelText("Confirm Password"))
            .toHaveAttribute("type", "password");

        expect(screen.getByRole("button", { name: "Send" }))
            .toBeInTheDocument();

        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("should call register with valid form data", async () => {
        const user = userEvent.setup();

        render(<TestRouter />);

        await user.type(screen.getByLabelText("Name"), validUser.name);
        await user.type(screen.getByLabelText("Email"), validUser.email);
        await user.type(screen.getByLabelText("Password"), validUser.password);
        await user.type(
            screen.getByLabelText("Confirm Password"),
            validUser.confirmPassword
        );

        await user.click(screen.getByRole("button", { name: "Send" }));

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith(validUser);
        });
    });

    it("should not call register when form data is invalid", async () => {
        const user = userEvent.setup();

        render(<TestRouter />);

        await user.click(screen.getByRole("button", { name: "Send" }));

        await waitFor(() => {
            expect(screen.getByLabelText("Name"))
                .toHaveAttribute("aria-invalid", "true");
        });

        expect(mockRegister).not.toHaveBeenCalled();
    });

    it("should display error message when registration fails", () => {
        mockedUseRegister.mockReturnValue({
            error: "Registration failed",
            success: false,
            register: mockRegister
        } );

        render(<TestRouter />);

        expect(screen.getByRole("alert"))
            .toHaveTextContent("Opss, something went wrong");

        expect(screen.getByRole("alert"))
            .toHaveTextContent("Try it again");
    });

    it("should display success message and reset form after registration", async () => {
        const user = userEvent.setup();

        const { rerender } = render(<TestRouter />);

        await user.type(screen.getByLabelText("Name"), validUser.name);
        await user.type(screen.getByLabelText("Email"), validUser.email);
        await user.type(screen.getByLabelText("Password"), validUser.password);
        await user.type(
            screen.getByLabelText("Confirm Password"),
            validUser.confirmPassword
        );

        expect(screen.getByLabelText("Name"))
            .toHaveValue(validUser.name);

        // Simulate successful registration response
        mockedUseRegister.mockReturnValue({
            error: null,
            success: true,
            register: mockRegister
        } );

        rerender(<TestRouter />);

        expect(await screen.findByRole("status"))
            .toHaveTextContent("Account was created");

        await waitFor(() => {
            expect(screen.getByLabelText("Name")).toHaveValue("");
            expect(screen.getByLabelText("Email")).toHaveValue("");
            expect(screen.getByLabelText("Password")).toHaveValue("");
            expect(screen.getByLabelText("Confirm Password")).toHaveValue("");
        });
    });

    it("should navigate to login when clicking login", async () => {
        const user = userEvent.setup();

        render(<TestRouter />);

        await user.click(screen.getByText("login"));

        expect(screen.getByTestId("current-path"))
            .toHaveTextContent("/login");
    });
});