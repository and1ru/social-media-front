import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema, type registerType } from "../schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputComponent } from "../components/Input-component";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../cutomhooks/useRegister";

export const RegisterPage = () => {
    const {error, loading, register} = useRegister()
    const { handleSubmit, control, formState: { errors } } = useForm<registerType>({
        defaultValues: {
            confirmPassword: "",
            email: "",
            name: "",
            password: ""
        },
        mode: "onBlur",
        resolver: zodResolver(registerSchema)
    })

    const handleForm: SubmitHandler<registerType> = async (data) => {
        await register(data)
        console.log(data)
    }

    const navegar = useNavigate()

    function onClickNavigate(url: string) {
        navegar(url, { replace: true })
    }

    if(error) return  <p>error</p>
    if(loading) return <p>loading</p>
    
    return (
        <main className="py-10 px-10">
            <section className="border rounded-lg py-10">
                <h1 className="text-center text-2xl font-bold">REGISTER</h1>
                <form
                    className="flex flex-col p-10 gap-5"
                    onSubmit={handleSubmit(handleForm)}>
                    <InputComponent control={control} name="name" label="name" type="text" error={errors.name} />
                    <InputComponent control={control} name="email" label="email" type="email" error={errors.email} />
                    <InputComponent control={control} name="password" label="password" type="password" error={errors.password} />
                    <InputComponent control={control} name="confirmPassword" label="confirm password" type="password" error={errors.confirmPassword} />
                    <button
                        onClick={() => onClickNavigate("/private/chats")}
                        className="bg-gray-800 p-2 rounded-lg text-white">Enviar</button>
                </form>
                <p
                    onClick={() => onClickNavigate("/login")}
                    className="text-blue-400 cursor-pointer text-center">do you have account? login</p>
            </section>
        </main>
    );
};
