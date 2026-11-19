
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
    waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { FriendRequests } from "./FriendRequests";
import { es, en } from "../../laguaje";

const mocks = vi.hoisted(() => ({
    useLanguajeContext: vi.fn(),
    useGetRequest: vi.fn(),
    useRejectRequest: vi.fn(),
    useAcceptRequest: vi.fn(),

    acceptRequest: vi.fn(),
    rejectRequest: vi.fn(),
    refetch: vi.fn(),
}));

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: mocks.useLanguajeContext,
}));

vi.mock("../../customHooks/useGetRequest/useGetRequest", () => ({
    useGetRequest: mocks.useGetRequest,
}));

vi.mock("../../customHooks/useRejectRequest/useRejectRequest", () => ({
    useRejectRequest: mocks.useRejectRequest,
}));

vi.mock("../../customHooks/useAcceptRequest/useAcceptRequest", () => ({
    useAcceptRequest: mocks.useAcceptRequest,
}));

beforeEach(() => {
    vi.clearAllMocks();

    mocks.useLanguajeContext.mockReturnValue({
        languaje: "es",
    });

    mocks.useGetRequest.mockReturnValue({
        data: [],
        error: false,
        loading: false,
        refetch: mocks.refetch,
    });

    mocks.useRejectRequest.mockReturnValue({
        rejectRequest: mocks.rejectRequest,
        successReject: false,
    });

    mocks.useAcceptRequest.mockReturnValue({
        acceptRequest: mocks.acceptRequest,
        successAccept: false,
    });
});

afterEach(() => {
    cleanup();
});

describe("Component FriendRequests", () => {

    it("should display the loading message", () => {
        mocks.useGetRequest.mockReturnValue({
            data: [],
            error: false,
            loading: true,
            refetch: mocks.refetch,
        });

        render(<FriendRequests />);

        expect(
            screen.getByText("Cargando solicitudes...")
        ).toBeInTheDocument();

        expect(
            screen.queryByText(es.friendRequest)
        ).not.toBeInTheDocument();
    });

    it("should display the error message without displaying the empty state", () => {
        mocks.useGetRequest.mockReturnValue({
            data: [],
            error: true,
            loading: false,
            refetch: mocks.refetch,
        });

        render(<FriendRequests />);

        expect(
            screen.getByText("Ocurrió un error al obtener las solicitudes.")
        ).toBeInTheDocument();

        expect(
            screen.queryByText(es.friendRequest)
        ).not.toBeInTheDocument();
    });

    it.each([
        {
            language: "es",
            message: es.friendRequest,
        },
        {
            language: "en",
            message: en.friendRequest,
        },
    ])(
        "should display the empty state in $language",
        ({ language, message }) => {
            mocks.useLanguajeContext.mockReturnValue({
                languaje: language,
            });

            render(<FriendRequests />);

            expect(
                screen.getByText(message)
            ).toBeInTheDocument();
        }
    );

    it("should render requests and execute the corresponding callbacks with the correct IDs", async () => {
        const user = userEvent.setup();

        mocks.useGetRequest.mockReturnValue({
            data: [
                {
                    _id: "request-1",
                    userName: "Andres",
                },
                {
                    _id: "request-2",
                    userName: "Carlos",
                },
            ],
            error: false,
            loading: false,
            refetch: mocks.refetch,
        });

        render(<FriendRequests />);

        expect(screen.getByText("Andres")).toBeInTheDocument();
        expect(screen.getByText("Carlos")).toBeInTheDocument();

        const acceptButtons = screen.getAllByRole("button", {
            name: "accept",
        });

        const rejectButtons = screen.getAllByRole("button", {
            name: "reject",
        });

        await user.click(acceptButtons[0]);
        await user.click(rejectButtons[1]);

        expect(mocks.acceptRequest).toHaveBeenCalledTimes(1);
        expect(mocks.acceptRequest).toHaveBeenCalledWith("request-1");

        expect(mocks.rejectRequest).toHaveBeenCalledTimes(1);
        expect(mocks.rejectRequest).toHaveBeenCalledWith("request-2");
    });

    it("should refetch requests after successfully accepting a request", async () => {
        mocks.useAcceptRequest.mockReturnValue({
            acceptRequest: mocks.acceptRequest,
            successAccept: false,
        });

        const { rerender } = render(<FriendRequests />);

        expect(mocks.refetch).not.toHaveBeenCalled();

        mocks.useAcceptRequest.mockReturnValue({
            acceptRequest: mocks.acceptRequest,
            successAccept: true,
        });

        rerender(<FriendRequests />);

        await waitFor(() => {
            expect(mocks.refetch).toHaveBeenCalledTimes(1);
        });
    });

    it("should refetch requests after successfully rejecting a request", async () => {
        mocks.useRejectRequest.mockReturnValue({
            rejectRequest: mocks.rejectRequest,
            successReject: false,
        });

        const { rerender } = render(<FriendRequests />);

        expect(mocks.refetch).not.toHaveBeenCalled();

        mocks.useRejectRequest.mockReturnValue({
            rejectRequest: mocks.rejectRequest,
            successReject: true,
        });

        rerender(<FriendRequests />);

        await waitFor(() => {
            expect(mocks.refetch).toHaveBeenCalledTimes(1);
        });
    });

});