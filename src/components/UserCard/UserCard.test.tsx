import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserCard } from "./UserCard";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from "../../laguaje";

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: vi.fn(),
}));

const mockUseLanguajeContext = vi.mocked(useLanguajeContext);

const userProps = {
    name: "Andres",
    id: "user-123",
    relation: "friend",
};

const relationCases = [
    {
        relation: "friend",
        spanish: es.relationFriend,
        english: en.relationFriend,
    },
    {
        relation: "pendding_sent",
        spanish: es.relationWatting,
        english: en.relationWatting,
    },
    {
        relation: "pendding_received",
        spanish: es.relationRecive,
        english: en.relationRecive,
    },
] as const;

describe("Component UserCard", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        mockUseLanguajeContext.mockReturnValue({
            languaje: "es",
        } as ReturnType<typeof useLanguajeContext>);
    });

    afterEach(cleanup);

    it.each(relationCases)(
        "should display the Spanish relation for $relation",
        ({ relation, spanish }) => {
            render(
                <UserCard
                    {...userProps}
                    relation={relation}
                    onClick={vi.fn()}
                />
            );

            expect(screen.getByText(spanish)).toBeInTheDocument();
            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        }
    );

    it.each(relationCases)(
        "should display the English relation for $relation",
        ({ relation, english }) => {
            mockUseLanguajeContext.mockReturnValue({
                languaje: "en",
            } as ReturnType<typeof useLanguajeContext>);

            render(
                <UserCard
                    {...userProps}
                    relation={relation}
                    onClick={vi.fn()}
                />
            );

            expect(screen.getByText(english)).toBeInTheDocument();
            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        }
    );

    it("should render the user's name and initial", () => {
        render(
            <UserCard
                {...userProps}
                onClick={vi.fn()}
            />
        );

        expect(screen.getByRole("heading", { name: "Andres" }))
            .toBeInTheDocument();

        expect(screen.getByText("A")).toBeInTheDocument();
    });

    it("should call onClick with the user ID when relation is none", async () => {
        const user = userEvent.setup();
        const mockOnClick = vi.fn().mockResolvedValue(undefined);

        render(
            <UserCard
                {...userProps}
                relation="none"
                onClick={mockOnClick}
            />
        );

        await user.click(screen.getByRole("button"));

        expect(mockOnClick).toHaveBeenCalledTimes(1);
        expect(mockOnClick).toHaveBeenCalledWith(userProps.id);
    });
});