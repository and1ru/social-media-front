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

import { Languaje } from "./Languaje";

const mocks = vi.hoisted(() => ({
    useLanguajeContext: vi.fn(),
    setLanguaje: vi.fn(),
}));

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: mocks.useLanguajeContext,
}));

const originalDocumentLang = document.documentElement.lang;

beforeEach(() => {
    vi.clearAllMocks();

    mocks.useLanguajeContext.mockReturnValue({
        languaje: "es",
        setLanguaje: mocks.setLanguaje,
    });
});

afterEach(() => {
    cleanup();
    document.documentElement.lang = originalDocumentLang;
});

describe("Component Languaje", () => {

    it.each([
        {
            language: "es",
            options: ["es", "en"],
        },
        {
            language: "en",
            options: ["en", "es"],
        },
    ])(
        "should render the correct language options: $language",
        ({ language, options }) => {
            mocks.useLanguajeContext.mockReturnValue({
                languaje: language,
                setLanguaje: mocks.setLanguaje,
            });

            render(<Languaje />);

            const select = screen.getByRole("combobox");

            expect(select).toHaveValue(language);

            expect(
                Array.from(
                    (select as HTMLSelectElement).options
                ).map(option => option.value)
            ).toEqual(options);
        }
    );

    it.each([
        {
            currentLanguage: "es",
            selectedLanguage: "en",
        },
        {
            currentLanguage: "en",
            selectedLanguage: "es",
        },
    ])(
        "should change the language from $currentLanguage to $selectedLanguage",
        async ({ currentLanguage, selectedLanguage }) => {
            const user = userEvent.setup();

            mocks.useLanguajeContext.mockReturnValue({
                languaje: currentLanguage,
                setLanguaje: mocks.setLanguaje,
            });

            render(<Languaje />);

            const select = screen.getByRole("combobox");

            await user.selectOptions(select, selectedLanguage);

            expect(mocks.setLanguaje).toHaveBeenCalledTimes(1);

            expect(mocks.setLanguaje).toHaveBeenCalledWith(
                selectedLanguage
            );

            expect(document.documentElement.lang).toBe(
                selectedLanguage
            );
        }
    );
});