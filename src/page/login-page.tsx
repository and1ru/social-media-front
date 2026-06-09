import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputComponent } from "../components/Input-component";
import { loginSchema, type loginType } from "../schemas/login-schema";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<loginType>({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onBlur",
        resolver: zodResolver(loginSchema)
    })

    const handleForm: SubmitHandler<loginType> = (data) => {
        console.log(data)
    }

    const navegar = useNavigate()

    function onClickNavigate(url: string) {
        navegar(url, { replace: true })
    }

    return (
        <main className="py-10 px-10">
            <section className="border rounded-lg py-10">
                <h1 className="text-center text-2xl font-bold">LOGIN</h1>
                <form
                    className="flex flex-col p-10 gap-5"
                    onSubmit={handleSubmit(handleForm)}>
                    <InputComponent control={control} name="email" label="email" type="email" error={errors.email} />
                    <InputComponent control={control} name="password" label="password" type="password" error={errors.password} />
                    <button
                        onClick={() => onClickNavigate("/private/chats")}
                        className="bg-gray-800 p-2 rounded-lg text-white">Enviar</button>
                </form>
                <p
                    onClick={() => onClickNavigate("/register")}
                    className="text-blue-400 cursor-pointer text-center">don't you have account? register</p>
            </section>
        </main>
    );
};
