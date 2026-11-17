import { screen, render, cleanup } from '@testing-library/react'
import { expect, it, describe, vi, beforeEach } from 'vitest'

import { CreatePost } from './CreatePost'
import { useLanguajeContext } from '../../context/languaje/LanguajeContext'
import { useCreatePost } from "../../cutomHooks/useCreatePost/useCreatePost";

vi.mock("../../cutomhooks/useCreatePost/useCreatePost", () => ({

}))

vi.mock("../../context/languaje/LanguajeContext", () => ({

}))

describe("CreatePost", () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.clearAllTimers()
    })

    it("", () => {
        
    })
})