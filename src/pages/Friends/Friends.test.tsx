import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FriendsPage } from "./Friends"; 
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from "../../laguaje";

// Mocks
vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: vi.fn()
}));

vi.mock("../../components/Header/Header", () => ({
    Header: () => <header>Header</header>
}));

vi.mock("../../components/FindUsersForm/FindUsersForm", () => ({
    FindUserForm: () => <div>Find User Form</div>
}));

vi.mock("../../components/FriendRequests/FriendRequests", () => ({
    FriendRequests: () => <div>Friend Requests</div>
}));

const mockedUseLanguage = vi.mocked(useLanguajeContext);

describe("Page FriendsPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockedUseLanguage.mockReturnValue({
            languaje: "en"
        } as ReturnType<typeof useLanguajeContext>);
    });

    it("should render all main components", () => {
        render(<FriendsPage />);

        expect(screen.getByText("Header")).toBeInTheDocument();
        expect(screen.getByText("Find User Form")).toBeInTheDocument();
        expect(screen.getByText("Friend Requests")).toBeInTheDocument();
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render friends heading in english", () => {
        render(<FriendsPage />);

        expect(
            screen.getByRole("heading", { name: en.headerFriends })
        ).toBeInTheDocument();
    });

    it("should render friends heading in spanish", () => {
        mockedUseLanguage.mockReturnValue({
            languaje: "es"
        } as ReturnType<typeof useLanguajeContext>);

        render(<FriendsPage />);

        expect(
            screen.getByRole("heading", { name: es.headerFriends })
        ).toBeInTheDocument();
    });
});