import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { RootPage } from "./RootPage";
import { useAuth } from "../../cutomHooks/useAuth/useAuth";
import { useAuthContext } from "../../context/auth/AuthContext";

// Mocks
vi.mock("../../cutomHooks/useAuth/useAuth", () => ({
    useAuth: vi.fn()
}));

vi.mock("../../context/auth/AuthContext", () => ({
    useAuthContext: vi.fn()
}));

const mockSetAuth = vi.fn();

const mockedUseAuth = vi.mocked(useAuth);
const mockedUseAuthContext = vi.mocked(useAuthContext);

// Router helper
const renderRootPage = () => {
    return render(
        <MemoryRouter initialEntries={["/private"]}>
            <Routes>
                <Route path="/login" element={<p>Login Page</p>} />

                <Route path="/private" element={<RootPage />}>
                    <Route index element={<p>Private Content</p>} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
};

const authenticatedData = {
    result: {
        userId: "user-123",
        name: "Andres"
    }
};

describe("Page RootPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockedUseAuth.mockReturnValue({
            authenticated: false,
            loading: false,
            data: null
        } as ReturnType<typeof useAuth>);

        mockedUseAuthContext.mockReturnValue({
            setAuth: mockSetAuth
        } as ReturnType<typeof useAuthContext>);
    });

    it("should render loading state", () => {
        mockedUseAuth.mockReturnValue({
            authenticated: false,
            loading: true,
            data: null
        } as ReturnType<typeof useAuth>);

        renderRootPage();

        expect(screen.getByText("cargando")).toBeInTheDocument();

        expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
        expect(screen.queryByText("Private Content")).not.toBeInTheDocument();
    });

    it("should redirect to login when user is not authenticated", () => {
        renderRootPage();

        expect(screen.getByText("Login Page")).toBeInTheDocument();
        expect(screen.queryByText("Private Content")).not.toBeInTheDocument();
    });

    it("should render Outlet when user is authenticated", () => {
        mockedUseAuth.mockReturnValue({
            authenticated: true,
            loading: false,
            data: authenticatedData
        } as ReturnType<typeof useAuth>);

        renderRootPage();

        expect(screen.getByText("Private Content")).toBeInTheDocument();
        expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
    });

    it("should update auth context with authenticated user data", async () => {
        mockedUseAuth.mockReturnValue({
            authenticated: true,
            loading: false,
            data: authenticatedData
        } as ReturnType<typeof useAuth>);

        renderRootPage();

        await waitFor(() => {
            expect(mockSetAuth).toHaveBeenCalledWith({
                id: "user-123",
                name: "Andres"
            });
        });
    });
});