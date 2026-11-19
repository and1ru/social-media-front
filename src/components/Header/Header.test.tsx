import {describe,it,expect,vi,beforeEach,afterEach,} from "vitest";
import {render,screen,within,cleanup,} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import { es, en } from "../../laguaje";

const mocks = vi.hoisted(() => ({
    useLanguajeContext: vi.fn(),
}));

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: mocks.useLanguajeContext,
}));

// Los componentes hijos tienen sus propios tests.
// Los aislamos para probar únicamente las responsabilidades de Header.
vi.mock("../LogOutButton/LogOutButton", () => ({
    LogOutButton: () => null,
}));

vi.mock("../Theme/Theme", () => ({
    Theme: () => null,
}));

vi.mock("../Languaje/Languaje", () => ({
    Languaje: () => null,
}));

beforeEach(() => {
    vi.clearAllMocks();

    mocks.useLanguajeContext.mockReturnValue({
        languaje: "es",
    });
});

afterEach(() => {
    cleanup();
});

describe("Component Header", () => {

    it.each([
        {
            language: "es",
            friends: es.headerFriends,
        },
        {
            language: "en",
            friends: en.headerFriends,
        },
    ])(
        "should render the navigation links correctly in $language",
        ({ language, friends }) => {
            mocks.useLanguajeContext.mockReturnValue({
                languaje: language,
            });

            render(
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            );

            const chatLinks = screen.getAllByRole("link", {
                name: "Chat",
            });

            const socialLinks = screen.getAllByRole("link", {
                name: "Social",
            });

            const friendsLinks = screen.getAllByRole("link", {
                name: friends,
            });

            // Cada enlace aparece en la navegación principal
            // y en el menú móvil.
            expect(chatLinks).toHaveLength(2);
            expect(socialLinks).toHaveLength(2);
            expect(friendsLinks).toHaveLength(2);

            chatLinks.forEach(link => {
                expect(link).toHaveAttribute(
                    "href",
                    "/private/chats"
                );
            });

            socialLinks.forEach(link => {
                expect(link).toHaveAttribute(
                    "href",
                    "/private/social"
                );
            });

            friendsLinks.forEach(link => {
                expect(link).toHaveAttribute(
                    "href",
                    "/private/friends"
                );
            });
        }
    );

    it("should open and close the mobile menu", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const toggleButton = screen.getByRole("button", {
            name: "Toggle mobile menu",
        });

        const menu = screen.getByRole("complementary", {
            name: "Mobile menu",
            hidden: true,
        });

        // Estado inicial
        expect(toggleButton).toHaveAttribute(
            "aria-expanded",
            "false"
        );

        expect(menu).toHaveAttribute("aria-hidden", "true");

        // Abrir menú
        await user.click(toggleButton);

        expect(toggleButton).toHaveAttribute(
            "aria-expanded",
            "true"
        );

        expect(menu).toHaveAttribute("aria-hidden", "false");

        // Cerrar menú
        await user.click(
            screen.getByRole("button", {
                name: "Close mobile menu",
            })
        );

        expect(toggleButton).toHaveAttribute(
            "aria-expanded",
            "false"
        );

        expect(menu).toHaveAttribute("aria-hidden", "true");
    });
});