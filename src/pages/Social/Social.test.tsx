import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { SocialPage } from "./Social";
import { useGetPosts } from "../../customHooks/useGetPost/useGetPost";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from "../../laguaje";

// Mocks
vi.mock("../../cutomHooks/useGetPost/useGetPost", () => ({
    useGetPosts: vi.fn()
}));

vi.mock("../../context/languaje/LanguajeContext", () => ({
    useLanguajeContext: vi.fn()
}));

vi.mock("../../components/Header/Header", () => ({
    Header: () => <header>Header Component</header>
}));

vi.mock("../../components/CreatePost/CreatePost", () => ({
    CreatePost: () => <div>CreatePost Component</div>
}));

vi.mock("../../components/Posts/Posts", () => ({
    Posts: () => <div>Posts Component</div>
}));

const mockedUseGetPosts = vi.mocked(useGetPosts);
const mockedUseLanguage = vi.mocked(useLanguajeContext);

describe("Page SocialPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockedUseGetPosts.mockReturnValue({
            error: null,
            loading: false
        } );

        mockedUseLanguage.mockReturnValue({
            languaje: "en"
        } as ReturnType<typeof useLanguajeContext>);
    });

    it("should render all main components", () => {
        render(<SocialPage />);

        expect(screen.getByText("Header Component")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Social" })).toBeInTheDocument();
        expect(screen.getByText("CreatePost Component")).toBeInTheDocument();
        expect(screen.getByText("Posts Component")).toBeInTheDocument();
    });

    it("should render social message in english", () => {
        render(<SocialPage />);

        expect(screen.getByText(en.socialMessage)).toBeInTheDocument();
    });

    it("should render social message in spanish", () => {
        mockedUseLanguage.mockReturnValue({
            languaje: "es"
        } as ReturnType<typeof useLanguajeContext>);

        render(<SocialPage />);

        expect(screen.getByText(es.socialMessage)).toBeInTheDocument();
    });

    it("should render loading and error states", () => {
        mockedUseGetPosts.mockReturnValue({
            error: "Something went wrong",
            loading: true
        } );

        render(<SocialPage />);

        expect(screen.getByText("Loading posts...")).toBeInTheDocument();
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
});