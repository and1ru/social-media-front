
import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach,
} from "vitest";

import {
    render,
    screen,
    cleanup,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { LogOutButton } from "./LogOutButton";
import { es, en } from "../../laguaje";

const mocks = vi.hoisted(() => ({
    useLanguajeContext: vi.fn(),
    useLogOut: vi.fn(),
    navigate: vi.fn(),
    logOut: vi.fn(),
}));

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: mocks.useLanguajeContext,
}));

vi.mock("../../customHooks/useLogOut/useLogOut", () => ({
    useLogOut: mocks.useLogOut,
}));

vi.mock("react-router-dom", () => ({
    useNavigate: () => mocks.navigate,
}));

beforeEach(() => {
    vi.clearAllMocks();

    mocks.useLanguajeContext.mockReturnValue({
        languaje: "es",
    });

    mocks.useLogOut.mockReturnValue({
        success: false,
        logOut: mocks.logOut,
    });
});

afterEach(() => {
    cleanup();
});

describe("Component LogOutButton", () => {

    it.each([
        {
            language: "es",
            button: es.buttonLogOut,
        },
        {
            language: "en",
            button: en.buttonLogOut,
        },
    ])(
        "should render the correct language: $language",
        ({ language, button }) => {
            mocks.useLanguajeContext.mockReturnValue({
                languaje: language,
            });

            render(<LogOutButton />);

            expect(
                screen.getByRole("button", { name: button })
            ).toBeInTheDocument();
        }
    );

    it("should call logOut when clicking the button", async () => {
        const user = userEvent.setup();

        render(<LogOutButton />);

        await user.click(
            screen.getByRole("button", {
                name: es.buttonLogOut,
            })
        );

        expect(mocks.logOut).toHaveBeenCalledTimes(1);
    });

    it("should navigate to login when logout succeeds", () => {
        const { rerender } = render(<LogOutButton />);

        // Mientras success sea false, no debe navegar.
        expect(mocks.navigate).not.toHaveBeenCalled();

        // Simulamos que el hook actualiza su estado.
        mocks.useLogOut.mockReturnValue({
            success: true,
            logOut: mocks.logOut,
        });

        rerender(<LogOutButton />);

        expect(mocks.navigate).toHaveBeenCalledTimes(1);

        expect(mocks.navigate).toHaveBeenCalledWith(
            "/login",
            { replace: true }
        );
    });
});