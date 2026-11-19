import { describe,it,expect,vi,beforeEach,afterEach} from "vitest";
import {render,screen,within,cleanup} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeletePost } from "./DeletePost";

const mocks = vi.hoisted(() => ({
    deletePost: vi.fn(),
    useDeletePost: vi.fn(),
    useLanguajeContext: vi.fn(),
}));

vi.mock("../../customHooks/useDeletePost/useDeletePost", () => ({
    useDeletePost: mocks.useDeletePost,
}));

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: mocks.useLanguajeContext,
}));

const originalShowModal = Object.getOwnPropertyDescriptor(
    HTMLDialogElement.prototype,
    "showModal"
);

const originalClose = Object.getOwnPropertyDescriptor(
    HTMLDialogElement.prototype,
    "close"
);

let showModalMock: ReturnType<typeof vi.fn>;
let closeMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
    showModalMock = vi.fn(function (this: HTMLDialogElement) {
        this.setAttribute("open", "");
    });

    closeMock = vi.fn(function (this: HTMLDialogElement) {
        this.removeAttribute("open");
    });

    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
        configurable: true,
        value: showModalMock,
    });

    Object.defineProperty(HTMLDialogElement.prototype, "close", {
        configurable: true,
        value: closeMock,
    });

    mocks.deletePost.mockReset();

    mocks.useDeletePost.mockReturnValue({
        deletePost: mocks.deletePost,
    });

    mocks.useLanguajeContext.mockReturnValue({
        languaje: "es",
    });
});

afterEach(() => {
    cleanup();
    vi.clearAllMocks();

    if (originalShowModal) {
        Object.defineProperty(
            HTMLDialogElement.prototype,
            "showModal",
            originalShowModal
        );
    } else {
        Reflect.deleteProperty(
            HTMLDialogElement.prototype,
            "showModal"
        );
    }

    if (originalClose) {
        Object.defineProperty(
            HTMLDialogElement.prototype,
            "close",
            originalClose
        );
    } else {
        Reflect.deleteProperty(
            HTMLDialogElement.prototype,
            "close"
        );
    }
});

describe("Component DeletePost", () => {

    it.each([
        {
            language: "es",
            button: "Eliminar",
            heading: "Eliminar publicación",
            description: "Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este post?",
            cancel: "Cancelar",
            confirm: "Confirmar",
        },
        {
            language: "en",
            button: "Delete",
            heading: "Delete Post",
            description: "This action does not can be removed, Are you sure you want to delete the post?",
            cancel: "Cancel",
            confirm: "Confirm",
        },
    ])(
        "should open the dialog and render the correct language: $language",
        async ({ language, button, heading, description, cancel, confirm }) => {
            const user = userEvent.setup();

            mocks.useLanguajeContext.mockReturnValue({
                languaje: language,
            });

            render(<DeletePost postId="123" />);

            await user.click(
                screen.getByRole("button", { name: button })
            );

            const dialog = screen.getByRole("dialog");

            expect(showModalMock).toHaveBeenCalledTimes(1);

            expect(
                within(dialog).getByRole("heading", { name: heading })
            ).toBeInTheDocument();

            expect(
                within(dialog).getByText(description)
            ).toBeInTheDocument();

            expect(
                within(dialog).getByRole("button", { name: cancel })
            ).toBeInTheDocument();

            expect(
                within(dialog).getByRole("button", { name: confirm })
            ).toBeInTheDocument();
        }
    );

    it("should close the dialog without deleting the post when canceling", async () => {
        const user = userEvent.setup();

        render(<DeletePost postId="123" />);

        await user.click(
            screen.getByRole("button", { name: "Eliminar" })
        );

        await user.click(
            screen.getByRole("button", { name: "Cancelar" })
        );

        expect(closeMock).toHaveBeenCalledTimes(1);
        expect(mocks.deletePost).not.toHaveBeenCalled();
    });

    it("should delete the post and close the dialog when confirming", async () => {
        const user = userEvent.setup();
        const postId = "123456789";

        render(<DeletePost postId={postId} />);

        await user.click(
            screen.getByRole("button", { name: "Eliminar" })
        );

        await user.click(
            screen.getByRole("button", { name: "Confirmar" })
        );

        expect(mocks.deletePost).toHaveBeenCalledTimes(1);
        expect(mocks.deletePost).toHaveBeenCalledWith(postId);
        expect(closeMock).toHaveBeenCalledTimes(1);
    });

});