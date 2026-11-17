import { screen, render, cleanup } from "@testing-library/react";
import { expect, it, describe, vi, afterEach } from "vitest";
import { useNavigate } from "react-router-dom";

import { PostCard } from "./PostCard";

const { navigateMock } = vi.hoisted(() => ({
    navigateMock: vi.fn()
}))

vi.mock("react-router-dom", () => ({
    useNavigate: () => navigateMock
}))

describe("PostCard", () => {
    afterEach(() => {
        cleanup()
    })

    it("")
})