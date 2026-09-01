import type { ReactNode } from "react"

interface Props{
    children:ReactNode
}
export const SuccessMessage = ({children}:Props) => {
    return(
        <article className="bg-green-500 left-[42%] top-5 fixed p-4 rounded-lg">
            {children}
        </article>
    )
}