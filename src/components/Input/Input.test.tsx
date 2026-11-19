import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, type FieldError } from "react-hook-form";

import { Input } from "./Input";

interface FormValues {
    email: string;
}

interface TestFormProps {
    onSubmit: (data: FormValues) => void;
    error?: FieldError;
}

const TestForm = ({ onSubmit, error }: TestFormProps) => {
    const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            email: "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input<FormValues>
                name="email"
                control={control}
                type="email"
                label="Email"
                error={error}
            />

            <button type="submit">Submit</button>
        </form>
    );
};

describe("Component Input", () => {

    it("should render the input with the correct label and type", () => {
        render(<TestForm onSubmit={vi.fn()} />);

        const input = screen.getByRole("textbox", {
            name: "Email",
        });

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "email");
        expect(input).toHaveValue("");

        expect(
            screen.queryByText("Email is required")
        ).not.toBeInTheDocument();
    });

    it("should update the form value when typing", async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(<TestForm onSubmit={onSubmit} />);

        const input = screen.getByRole("textbox", {
            name: "Email",
        });

        await user.type(input, "andres@example.com");

        await user.click(
            screen.getByRole("button", { name: "Submit" })
        );

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
            email: "andres@example.com",
        });
    });

    it("should display the error message when an error is provided", () => {
        const error: FieldError = {
            type: "required",
            message: "Email is required",
        };

        render(
            <TestForm
                onSubmit={vi.fn()}
                error={error}
            />
        );

        expect(
            screen.getByText("Email is required")
        ).toBeInTheDocument();
    });
});