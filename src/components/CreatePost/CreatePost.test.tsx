import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor,act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreatePost } from "./CreatePost";
import { es, en } from "../../laguaje";

const mocks = vi.hoisted(() => ({
    createPost: vi.fn(),
    useCreatePost: vi.fn(),
    useLanguajeContext: vi.fn(),
}));

vi.mock("../../customHooks/useCreatePost/useCreatePost", () => ({
    useCreatePost: mocks.useCreatePost,
}));

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: mocks.useLanguajeContext,
}));

let showModalMock: ReturnType<typeof vi.fn>;
let closeMock: ReturnType<typeof vi.fn>;

let originalShowModal: PropertyDescriptor | undefined;
let originalClose: PropertyDescriptor | undefined;

const mockHook = (overrides = {}) => {
    mocks.useCreatePost.mockReturnValue({
        createPost: mocks.createPost,
        error: null,
        loading: false,
        success: false,
        ...overrides,
    });
};

beforeEach(() => {
    originalShowModal = Object.getOwnPropertyDescriptor(
        HTMLDialogElement.prototype,
        "showModal"
    );

    originalClose = Object.getOwnPropertyDescriptor(
        HTMLDialogElement.prototype,
        "close"
    );

    showModalMock = vi.fn(function (this: HTMLDialogElement) {
        this.setAttribute("open", "");
    });

    closeMock = vi.fn(function (this: HTMLDialogElement) {
        this.removeAttribute("open");
    });

    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
        configurable: true,
        writable: true,
        value: showModalMock,
    });

    Object.defineProperty(HTMLDialogElement.prototype, "close", {
        configurable: true,
        writable: true,
        value: closeMock,
    });

    mocks.createPost.mockResolvedValue(undefined);

    mocks.useLanguajeContext.mockReturnValue({
        languaje: "es",
    });

    mockHook();
});

afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();

    const prototype = HTMLDialogElement.prototype;

    if (originalShowModal) {
        Object.defineProperty(prototype, "showModal", originalShowModal);
    } else {
        Reflect.deleteProperty(prototype, "showModal");
    }

    if (originalClose) {
        Object.defineProperty(prototype, "close", originalClose);
    } else {
        Reflect.deleteProperty(prototype, "close");
    }
});

describe("Component CreatePost", () => {

    it.each([
        {
            language: "es",
            button: es.buttonCreatePost,
            placeholder: es.inputPost,
        },
        {
            language: "en",
            button: en.buttonCreatePost,
            placeholder: en.inputPost,
        },
    ])(
        "should render the correct language: $language",
        async ({ language, button, placeholder }) => {
            const user = userEvent.setup();

            mocks.useLanguajeContext.mockReturnValue({
                languaje: language,
            });

            render(<CreatePost />);

            await user.click(
                screen.getByRole("button", { name: button })
            );

            expect(showModalMock).toHaveBeenCalledTimes(1);

            expect(
                screen.getByPlaceholderText(placeholder)
            ).toBeInTheDocument();
        }
    );

    it("should not create a post with only whitespace", async () => {
        const user = userEvent.setup();

        render(<CreatePost />);

        await user.click(
            screen.getByRole("button", {
                name: es.buttonCreatePost,
            })
        );

        const textarea = screen.getByPlaceholderText(es.inputPost);

        await user.type(textarea, "   ");

        await user.click(
            screen.getByRole("button", {
                name: es.buttonPost,
            })
        );

        expect(mocks.createPost).not.toHaveBeenCalled();
        expect(closeMock).not.toHaveBeenCalled();
    });

    it("should create a post and close the modal", async () => {
        const user = userEvent.setup();

        render(<CreatePost />);

        await user.click(
            screen.getByRole("button", {
                name: es.buttonCreatePost,
            })
        );

        const textarea = screen.getByPlaceholderText(es.inputPost);
        const content = "My first post";

        await user.type(textarea, content);

        await user.click(
            screen.getByRole("button", {
                name: es.buttonPost,
            })
        );

        expect(mocks.createPost).toHaveBeenCalledWith(content);

        await waitFor(() => {
            expect(closeMock).toHaveBeenCalledTimes(1);
        });

        expect(textarea).toHaveValue("");
    });

    it("should close the modal and clear the textarea when canceling", async () => {
        const user = userEvent.setup();

        render(<CreatePost />);

        await user.click(
            screen.getByRole("button", {
                name: es.buttonCreatePost,
            })
        );

        const textarea = screen.getByPlaceholderText(es.inputPost);

        await user.type(textarea, "Draft post");

        await user.click(
            screen.getByRole("button", {
                name: es.buttonCancel,
            })
        );

        expect(closeMock).toHaveBeenCalledTimes(1);
        expect(textarea).toHaveValue("");
    });

    it("should disable the submit button while loading", async () => {
        const user = userEvent.setup();

        mockHook({ loading: true });

        render(<CreatePost />);

        await user.click(
            screen.getByRole("button", {
                name: es.buttonCreatePost,
            })
        );

        const submitButton = screen.getByRole("button", {
            name: "Publicando...",
        });

        expect(submitButton).toBeDisabled();
    });

    it("should keep the success message visible for 3 seconds after success", () => {
        vi.useFakeTimers();

        mockHook({ success: false });

        const { rerender } = render(<CreatePost />);

        expect(
            screen.queryByText("se creo el post correctamente")
        ).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(2500);
        });

        mockHook({ success: true });

        rerender(<CreatePost />);

        expect(
            screen.getByText("se creo el post correctamente")
        ).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(
            screen.getByText("se creo el post correctamente")
        ).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(2500);
        });

        expect(
            screen.queryByText("se creo el post correctamente")
        ).not.toBeInTheDocument();
    });

});