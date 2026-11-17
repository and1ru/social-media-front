import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NotFound } from './NotFound'

describe("Not Found Page", () => {
    it("should render all page", () => {
        render(<NotFound />)
        
        const title = screen.getByRole("heading", {name: "404"} )

        expect(title).toBeInTheDocument()
    })
})