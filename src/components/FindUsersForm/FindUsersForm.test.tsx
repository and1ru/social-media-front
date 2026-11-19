import {describe,it,expect,vi,beforeEach} from "vitest";
import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FindUserForm } from "./FindUsersForm";
import { es, en } from "../../laguaje";

const mocks = vi.hoisted(() => ({
    navigate: vi.fn(),
    useLanguajeContext: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
    useNavigate: () => mocks.navigate,
}));

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: mocks.useLanguajeContext,
}));

beforeEach(() => {
    mocks.navigate.mockReset();

    mocks.useLanguajeContext.mockReturnValue({
        languaje: "es",
    });
});

describe("Component FindUserForm", () => {

    it.each([
        {
            language: "es",
            placeholder: es.inputFriends,
            button: es.buttonFriends,
        },
        {
            language: "en",
            placeholder: en.inputFriends,
            button: en.buttonFriends,
        },
    ])(
        "should render the correct language: $language",
        ({ language, placeholder, button }) => {
            mocks.useLanguajeContext.mockReturnValue({
                languaje: language,
            });

            render(<FindUserForm />);

            expect(
                screen.getByPlaceholderText(placeholder)
            ).toBeInTheDocument();

            expect(
                screen.getByRole("button", { name: button })
            ).toBeInTheDocument();
        }
    );

    it.each(["", "   "])(
        "should not navigate when the name is empty or contains only spaces: '%s'",
        async (value) => {
            const user = userEvent.setup();

            render(<FindUserForm />);

            const input = screen.getByPlaceholderText(es.inputFriends);

            if (value) {
                await user.type(input, value);
            }

            await user.click(
                screen.getByRole("button", {
                    name: es.buttonFriends,
                })
            );

            expect(mocks.navigate).not.toHaveBeenCalled();
        }
    );

    it("should navigate to the users page with the entered name", async () => {
        const user = userEvent.setup();

        render(<FindUserForm />);

        const name = "Andres";

        await user.type(
            screen.getByPlaceholderText(es.inputFriends),
            name
        );

        await user.click(
            screen.getByRole("button", {
                name: es.buttonFriends,
            })
        );

        expect(mocks.navigate).toHaveBeenCalledTimes(1);

        expect(mocks.navigate).toHaveBeenCalledWith(
            `/private/users?name=${name}`
        );
    });
});