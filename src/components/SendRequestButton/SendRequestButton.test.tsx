import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SendRequestButton } from "./SendRequestButton";
import { useSendRequest } from "../../cutomHooks/useSendRequest/useSendRequest";

vi.mock("../../customHooks/useSendRequest/useSendRequest", () => ({
    useSendRequest: vi.fn(),
}));

const mockUseSendRequest = vi.mocked(useSendRequest);
const mockSendRequest = vi.fn();

const requestId = "request-123";

describe("Component SendRequestButton", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        mockUseSendRequest.mockReturnValue({
            error: undefined,
            loading: false,
            sendRequest: mockSendRequest,
        });
    });

    afterEach(cleanup);

    it("should render the send request button", () => {
        render(<SendRequestButton id={requestId} />);

        expect(
            screen.getByRole("button", { name: "send request" })
        ).toBeInTheDocument();
    });

    it("should call sendRequest with the correct ID when clicking the button", async () => {
        const user = userEvent.setup();

        render(<SendRequestButton id={requestId} />);

        await user.click(
            screen.getByRole("button", { name: "send request" })
        );

        expect(mockSendRequest).toHaveBeenCalledTimes(1);
        expect(mockSendRequest).toHaveBeenCalledWith(requestId);
    });

    it("should display loading when the request is loading", () => {
        mockUseSendRequest.mockReturnValue({
            error: undefined,
            loading: true,
            sendRequest: mockSendRequest,
        });

        render(<SendRequestButton id={requestId} />);

        expect(screen.getByRole("status")).toHaveTextContent("loading");
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("should display error when the request fails", () => {
        mockUseSendRequest.mockReturnValue({
            error: new Error("Request failed"),
            loading: false,
            sendRequest: mockSendRequest,
        });

        render(<SendRequestButton id={requestId} />);

        expect(screen.getByRole("alert")).toHaveTextContent("error");
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
});