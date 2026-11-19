import {describe,it,expect,vi,beforeEach,afterEach} from "vitest";

import {
    render,
    screen,
    cleanup,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { ErrorMessage } from "./ErrorMessage";

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

describe("Component ErrorMessage", () => {

    it("should render the children and open the dialog when open is true", () => {
        render(
            <ErrorMessage open={true}>
                Something went wrong
            </ErrorMessage>
        );

        expect(
            screen.getByText("Something went wrong")
        ).toBeInTheDocument();

        expect(showModalMock).toHaveBeenCalledTimes(1);

        expect(
            screen.getByRole("dialog")
        ).toHaveAttribute("open");
    });

    it("should not open the dialog when open is false", () => {
        render(
            <ErrorMessage open={false}>
                Something went wrong
            </ErrorMessage>
        );

        expect(showModalMock).not.toHaveBeenCalled();
    });

    it("should close the dialog when clicking Close", async () => {
        const user = userEvent.setup();

        render(
            <ErrorMessage open={true}>
                Something went wrong
            </ErrorMessage>
        );

        const dialog = screen.getByRole("dialog");

        await user.click(
            screen.getByRole("button", { name: "Close" })
        );

        expect(closeMock).toHaveBeenCalledTimes(1);
        expect(dialog).not.toHaveAttribute("open");
    });

});