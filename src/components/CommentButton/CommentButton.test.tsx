import { screen, render, cleanup, waitFor } from "@testing-library/react";
import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import userEvent from '@testing-library/user-event'

import { CommentButton } from "./CommentButton";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from "../../laguaje";

const { useCommentMock, useGetCommentMock, refetchMock, commentMock } = vi.hoisted(() => ({
    useCommentMock: vi.fn(),
    useGetCommentMock: vi.fn(),
    refetchMock: vi.fn(),
    commentMock: vi.fn()
}))

vi.mock("../../customHooks/useGetComment/useGetComment", () => ({
    useGetComment: useGetCommentMock
}))

vi.mock("../../customHooks/useComment/useComment", () => ({
    useComment: useCommentMock
}))

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: vi.fn()
}))

describe("CommentButton", () => {
    const user = userEvent.setup()

    beforeEach(() => {
        vi.clearAllMocks()

        useGetCommentMock.mockReturnValue({
            data: {
                result: {
                    commentCount: 0,
                    comments: []
                }
            },
            loading: false,
            error: null,
            refetch: refetchMock
        })

        useCommentMock.mockReturnValue({
            comment: commentMock
        })

        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "en" } as ReturnType<typeof useLanguajeContext>
        )

        HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
            this.setAttribute("open", "")
        })

        HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
            this.removeAttribute("open")
        })
    })

    afterEach(() => {
        cleanup()
    })

    it("should render the comment count", () => {
        render(<CommentButton postId="123456789" />)

        const button = screen.getByRole("button", { name: "💬 0" })

        expect(button).toBeInTheDocument()
    })

    it("should render the dialog closed initially", () => {
        render(<CommentButton postId="123456789" />)

        const dialog = screen.getByRole("dialog", { hidden: true })

        expect(dialog).toBeInTheDocument()
        expect(dialog).not.toHaveAttribute("open")
    })

    it("should open the dialog when clicking the button", async () => {
        render(<CommentButton postId="123456789" />)

        const button = screen.getByRole("button", { name: "💬 0" })

        await user.click(button)

        const dialog = screen.getByRole("dialog")

        expect(dialog).toHaveAttribute("open")
    })

    it("should close the dialog when clicking X", async () => {
        render(<CommentButton postId="123456789" />)

        const buttonOpen = screen.getByRole("button", { name: "💬 0" })

        await user.click(buttonOpen)

        const buttonClose = screen.getByRole("button", { name: "✕" })

        await user.click(buttonClose)

        const dialog = screen.getByRole("dialog", { hidden: true })

        expect(dialog).not.toHaveAttribute("open")
    })

    it("should display comments title in english", async () => {
        render(<CommentButton postId="123456789" />);

        // Abrimos el diálogo
        await user.click(screen.getByRole("button", { name: /💬 0/ }));

        // Comprobamos el título
        expect(
            screen.getByRole("heading", { name: en.comments })
        ).toBeInTheDocument();
    });

    it("should display comments title in spanish", async () => {
        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "es" } as ReturnType<typeof useLanguajeContext>
        );

        render(<CommentButton postId="123456789" />);

        // Abrimos el diálogo
        await user.click(screen.getByRole("button", { name: "💬 0" }));

        // Comprobamos el título
        expect(
            screen.getByRole("heading", { name: es.comments })
        ).toBeInTheDocument();
    });

    it("should display loading message in english", async () => {
        useGetCommentMock.mockReturnValue({
            data: undefined,
            loading: true,
            error: null,
            refetch: vi.fn()
        })

        render(<CommentButton postId="123456789" />)

        const loading = screen.getByText("loading...")
        expect(loading).toBeInTheDocument()
    })

    it("should display loading message in spanish", () => {
        useGetCommentMock.mockReturnValue({
            data: undefined,
            loading: true,
            error: null,
            refetch: vi.fn()
        })

        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "es" } as ReturnType<typeof useLanguajeContext>
        )

        render(<CommentButton postId="123456789" />)

        const loading = screen.getByText("cargando...")
        expect(loading).toBeInTheDocument()
    })

    it("should display error message in english", () => {
        useGetCommentMock.mockReturnValue({
            data: undefined,
            loading: false,
            error: true,
            refetch: vi.fn()
        })

        render(<CommentButton postId="123456789" />)

        const error = screen.getByText("ops something went wrong")
        expect(error).toBeInTheDocument()
    })

    it("should display error message in spanish", () => {
        useGetCommentMock.mockReturnValue({
            data: undefined,
            loading: false,
            error: true,
            refetch: vi.fn()
        })

        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "es" } as ReturnType<typeof useLanguajeContext>
        )

        render(<CommentButton postId="123456789" />)

        const error = screen.getByText("ops algo salio mal")
        expect(error).toBeInTheDocument()
    })

    it("should display message when there is not comments in english", () => {
        useGetCommentMock.mockReturnValue({
            data: {
                result: {
                    commentCount: 0,
                comments: []
                }
            },
            loading: false,
            error: false,
            refetch: vi.fn()
        })

        render(<CommentButton postId="123456789" />)

        const noComments = screen.getByText("there is not comments yet")

        expect(noComments).toBeInTheDocument()
    })

    it("should display message when there is not comments in spanish", () => {
        useGetCommentMock.mockReturnValue({
            data: {
                result: {
                    commentCount: 0,
                comments: []
                }
            },
            loading: false,
            error: false,
            refetch: vi.fn()
        })

        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "es" } as ReturnType<typeof useLanguajeContext>
        )

        render(<CommentButton postId="123456789" />)

        const noComments = screen.getByText("no hay comentarios aun")

        expect(noComments).toBeInTheDocument()
    })

    it("should render comments correctly", async () => {
        useGetCommentMock.mockReturnValue({
            data: {
                result: {
                    commentCount: 2,
                comments: [
                    {
                        _id: "1",
                        userName: "andres",
                        comment: "Hello everyone"
                    },
                    {
                        _id: "2",
                        userName: "maria",
                        comment: "Nice post!"
                    }
                ]
                }
            },
            loading: false,
            error: null,
            refetch: vi.fn()
        });

        render(<CommentButton postId="123456789" />);

        await user.click(screen.getByRole("button", { name: "💬 2" }));

        expect(screen.getByText("andres")).toBeInTheDocument();
        expect(screen.getByText("Hello everyone")).toBeInTheDocument();
        expect(screen.getByText("A")).toBeInTheDocument();

        expect(screen.getByText("maria")).toBeInTheDocument();
        expect(screen.getByText("Nice post!")).toBeInTheDocument();
        expect(screen.getByText("M")).toBeInTheDocument();
    });

    it("should update input value when typing", async () => {
        render(<CommentButton postId="123456789" />);

        // Abrimos el diálogo
        const button = screen.getByRole("button", { name: "💬 0" })
        await user.click(button);

        // Obtenemos el input
        const input = screen.getByPlaceholderText("write a comment");

        // Escribimos
        await user.type(input, "Hello everyone");

        // Comprobamos el valor
        expect(input).toHaveValue("Hello everyone");
    })

    it("should not submit an empty comment in english", async () => {
        render(<CommentButton postId="123456789" />);

        const buttonOpen = screen.getByRole("button", { name: "💬 0" })
        await user.click(buttonOpen);

        // Intentamos enviar sin escribir
        const buttonSend = screen.getByRole("button", { name: "send" })
        await user.click(buttonSend);

        expect(commentMock).not.toHaveBeenCalled();
        expect(refetchMock).not.toHaveBeenCalled();
    });

    it("should not submit an empty comment in spanish", async () => {
        vi.mocked(useLanguajeContext).mockReturnValue(
            { languaje: "es" } as ReturnType<typeof useLanguajeContext>
        )

        render(<CommentButton postId="123456789" />);

        const buttonOpen = screen.getByRole("button", { name: "💬 0" })
        await user.click(buttonOpen);

        // Intentamos enviar sin escribir
        const buttonSend = screen.getByRole("button", { name: "enviar" })
        await user.click(buttonSend);

        expect(commentMock).not.toHaveBeenCalled();
        expect(refetchMock).not.toHaveBeenCalled();
    });

    it("should not submit a comment containing only spaces", async () => {
        render(<CommentButton postId="123456789" />);

        // Abrimos el diálogo
        await user.click(screen.getByRole("button", { name: "💬 0" }));

        // Escribimos únicamente espacios
        const input = screen.getByPlaceholderText("write a comment");
        await user.type(input, "   ");

        // Intentamos enviar
        await user.click(screen.getByRole("button", { name: "send" }));

        expect(commentMock).not.toHaveBeenCalled();
        expect(refetchMock).not.toHaveBeenCalled();
    })

    it("should submit comment with correct data", async () => {
        render(<CommentButton postId="123456789" />);

        // Abrimos el diálogo
        const buttonOpen = screen.getByRole("button", { name: "💬 0" })
        await user.click(buttonOpen);

        // Escribimos el comentario
        const input = screen.getByPlaceholderText("write a comment");

        await user.type(input, "Hello everyone");

        // Enviamos
        const buttonSend = screen.getByRole("button", { name: "send" })
        await user.click(buttonSend);

        // Comprobamos los datos enviados
        await waitFor(() => {
            expect(commentMock).toHaveBeenCalledWith({
                comment: "Hello everyone",
                postId: "123456789"
            });
        });

        // Esperamos a que refetch se ejecute
        await waitFor(() => {
            expect(refetchMock).toHaveBeenCalledTimes(1);
        });

        // mock.invocationCallOrder: Permite conocer el orden en que se ejecutaron los mocks.
        // commentMock.mock.invocationCallOrder[0] // 1
        // refetchMock.mock.invocationCallOrder[0] // 2

        expect(commentMock.mock.invocationCallOrder[0])
            .toBeLessThan(refetchMock.mock.invocationCallOrder[0]);

        await waitFor(() => {
            expect(input).toHaveValue("")
        })
    });

    it("should delete spaces when submit comment", async () => {
        render(<CommentButton postId="123456789" />);

        // Abrimos el diálogo
        const buttonOpen = screen.getByRole("button", { name: "💬 0" })
        await user.click(buttonOpen);

        // Escribimos el comentario
        const input = screen.getByPlaceholderText("write a comment");

        await user.type(input, "  Hello everyone  ");

        // Enviamos
        const buttonSend = screen.getByRole("button", { name: "send" })
        await user.click(buttonSend);

        // Comprobamos los datos enviados
        await waitFor(() => {
            expect(commentMock).toHaveBeenCalledWith({
                comment: "Hello everyone",
                postId: "123456789"
            });
        });
    });

    it("should disable send button while loading", async () => {
        useGetCommentMock.mockReturnValue({
            data: {
                result: {
                commentCount: 0,
                comments: []
            }
            },
            loading: true,
            error: null,
            refetch: vi.fn()
        });

        render(<CommentButton postId="123456789" />);

        // Abrimos el diálogo
        await user.click(screen.getByRole("button", { name: "💬 0" }));

        // Buscamos el botón
        const buttonSend = screen.getByRole("button", { name: "enviando..." });

        expect(buttonSend).toBeDisabled();
    });
})