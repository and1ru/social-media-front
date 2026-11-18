import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "./AuthProvider";
import { useAuthContext } from "./AuthContext";

const TestComponent = () => {
    const { auth, setAuth } = useAuthContext();

    const handleClick = () => {
        setAuth({
            id: "1", 
            name: "test"
        })
    }

    return (
        <>
            <p>id: {auth.id}</p>
            <p>name: {auth.name}</p>
            <button onClick={handleClick}>change</button>
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
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const name = screen.getByText("name:")
        const id = screen.getByText("id:")

        expect(name).toBeInTheDocument();
        expect(id).toBeInTheDocument();
    });

    it("should update the Auth", async () => {
        const user = userEvent.setup()

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const button = screen.getByRole("button", { name: "change" })

        await user.click(button);

        const name = screen.getByText("name: test")
        const id = screen.getByText("id: 1")

        expect(name).toBeInTheDocument();
        expect(id).toBeInTheDocument();
    });
});