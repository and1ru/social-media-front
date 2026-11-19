
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FriendCard } from "./FriendCard";

describe("Component FriendCard", () => {

    it("should render the friend's name", () => {
        render(
            <FriendCard
                id="123"
                name="Andres"
                onAccept={vi.fn()}
                onReject={vi.fn()}
            />
        );

        expect(screen.getByText("Andres")).toBeInTheDocument();
    });

    it("should call onAccept with the correct id when accepting", async () => {
        const user = userEvent.setup();

        const onAccept = vi.fn();
        const onReject = vi.fn();

        render(
            <FriendCard
                id="123"
                name="Andres"
                onAccept={onAccept}
                onReject={onReject}
            />
        );

        await user.click(
            screen.getByRole("button", { name: "accept" })
        );

        expect(onAccept).toHaveBeenCalledTimes(1);
        expect(onAccept).toHaveBeenCalledWith("123");
        expect(onReject).not.toHaveBeenCalled();
    });

    it("should call onReject with the correct id when rejecting", async () => {
        const user = userEvent.setup();

        const onAccept = vi.fn();
        const onReject = vi.fn();

        render(
            <FriendCard
                id="123"
                name="Andres"
                onAccept={onAccept}
                onReject={onReject}
            />
        );

        await user.click(
            screen.getByRole("button", { name: "reject" })
        );

        expect(onReject).toHaveBeenCalledTimes(1);
        expect(onReject).toHaveBeenCalledWith("123");
        expect(onAccept).not.toHaveBeenCalled();
    });
});