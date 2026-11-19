import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SuccessMessage } from "./SuccesMessage";

const mockShowModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
});

const mockClose = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute("open");
});

const originalShowModal = Object.getOwnPropertyDescriptor(
    HTMLDialogElement.prototype,
    "showModal"
);

const originalClose = Object.getOwnPropertyDescriptor(
    HTMLDialogElement.prototype,
    "close"
);

describe("Component SuccessMessage", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
            configurable: true,
            writable: true,
            value: mockShowModal,
        });

        Object.defineProperty(HTMLDialogElement.prototype, "close", {
            configurable: true,
            writable: true,
            value: mockClose,
        });
    });

    afterEach(() => {
        cleanup();

        if (originalShowModal) {
            Object.defineProperty(
                HTMLDialogElement.prototype,
                "showModal",
                originalShowModal
            );
        } else {
            Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
        }

        if (originalClose) {
            Object.defineProperty(
                HTMLDialogElement.prototype,
                "close",
                originalClose
            );
        } else {
            Reflect.deleteProperty(HTMLDialogElement.prototype, "close");
        }
    });

    it("should render the children received as props", () => {
        render(
            <SuccessMessage open={false}>
                Successfully registered
            </SuccessMessage>
        );

        expect(screen.getByText("Successfully registered"))
            .toBeInTheDocument();
    });

    it("should open the dialog when open is true", () => {
        render(
            <SuccessMessage open={true}>
                Successfully registered
            </SuccessMessage>
        );

        expect(mockShowModal).toHaveBeenCalledTimes(1);
    });

    it("should not open the dialog when open is false", () => {
        render(
            <SuccessMessage open={false}>
                Successfully registered
            </SuccessMessage>
        );

        expect(mockShowModal).not.toHaveBeenCalled();
    });

    it("should close the dialog when clicking the close button", async () => {
        const user = userEvent.setup();

        render(
            <SuccessMessage open={true}>
                Successfully registered
            </SuccessMessage>
        );

        await user.click(
            screen.getByRole("button", { name: "Cerrar" })
        );

        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it("should close the dialog when open changes to false", () => {
        const { rerender } = render(
            <SuccessMessage open={true}>
                Successfully registered
            </SuccessMessage>
        );

        expect(mockShowModal).toHaveBeenCalledTimes(1);

        rerender(
            <SuccessMessage open={false}>
                Successfully registered
            </SuccessMessage>
        );

        expect(mockClose).toHaveBeenCalledTimes(1);
    });
});