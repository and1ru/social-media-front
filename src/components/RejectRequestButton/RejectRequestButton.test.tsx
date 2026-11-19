import { useState } from "react";
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

import {
    cleanup,
    render,
    screen,
    waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { RejectRequestButton } from "./RejectRequestButton";
import { useRejectRequest } from "../../cutomHooks/useRejectRequest/useRejectRequest";
import { useGetRequest } from "../../cutomHooks/useGetRequest/useGetRequest";

vi.mock("../../customHooks/useRejectRequest/useRejectRequest", () => ({
    useRejectRequest: vi.fn(),
}));

vi.mock("../../customHooks/useGetRequest/useGetRequest", () => ({
    useGetRequest: vi.fn(),
}));

const mockUseRejectRequest = vi.mocked(useRejectRequest);
const mockUseGetRequest = vi.mocked(useGetRequest);

const mockRejectRequest = vi.fn();
const mockRefetch = vi.fn();

const requestId = "request-123";

describe("Component RejectRequestButton", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        mockRejectRequest.mockResolvedValue(undefined);

        mockUseRejectRequest.mockReturnValue({
            error: undefined,
            loading: false,
            rejectRequest: mockRejectRequest,
            success: false,
        } );

        mockUseGetRequest.mockReturnValue({
            refetch: mockRefetch,
        });
    });

    afterEach(cleanup);

    it("should render the reject button", () => {
        render(<RejectRequestButton id={requestId} />);

        expect(
            screen.getByRole("button", { name: "reject request" })
        ).toBeInTheDocument();
    });

    it("should call rejectRequest with the correct ID", async () => {
        const user = userEvent.setup();

        render(<RejectRequestButton id={requestId} />);

        await user.click(
            screen.getByRole("button", { name: "reject request" })
        );

        expect(mockRejectRequest).toHaveBeenCalledTimes(1);
        expect(mockRejectRequest).toHaveBeenCalledWith(requestId);

        expect(mockRefetch).not.toHaveBeenCalled();
    });

    it("should display loading when the request is loading", () => {
        mockUseRejectRequest.mockReturnValue({
            error: undefined,
            loading: true,
            rejectRequest: mockRejectRequest,
            success: false,
        });

        render(<RejectRequestButton id={requestId} />);

        expect(screen.getByText("loading")).toBeInTheDocument();

        expect(
            screen.queryByRole("button")
        ).not.toBeInTheDocument();
    });

    it("should display error when the request fails", () => {
        mockUseRejectRequest.mockReturnValue({
            error: new Error("Request failed"),
            loading: false,
            rejectRequest: mockRejectRequest,
            success: false,
        });

        render(<RejectRequestButton id={requestId} />);

        expect(screen.getByText("error")).toBeInTheDocument();

        expect(
            screen.queryByRole("button")
        ).not.toBeInTheDocument();
    });

    it("should refetch requests after successfully rejecting", async () => {
        const user = userEvent.setup();

        mockUseRejectRequest.mockImplementation(() => {
            const [success, setSuccess] = useState(false);

            return {
                error: undefined,
                loading: false,
                success,
                rejectRequest: async (id: string) => {
                    mockRejectRequest(id);
                    setSuccess(true);
                },
            };
        });

        render(<RejectRequestButton id={requestId} />);

        await user.click(
            screen.getByRole("button", { name: "reject request" })
        );

        expect(mockRejectRequest).toHaveBeenCalledWith(requestId);

        await waitFor(() => {
            expect(mockRefetch).toHaveBeenCalledTimes(1);
        });
    });
});