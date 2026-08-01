import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema, type registerType } from "../../schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../cutomhooks/useRegister/useRegister";
import { Input } from "../../components/Input/Input";

export const RegisterPage = () => {
    const navegar = useNavigate()
    const {error, loading, register, success} = useRegister()
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
        if(success){
            navegar("/login", { replace: true })
        }
    }

    function onClickNavigate(url: string) {
        navegar(url, { replace: true })
    }
    
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            { error && <p>error</p>}
            { loading && <p>loading</p>}
            <section className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">
                <h1 className="text-center text-2xl font-bold">REGISTER</h1>
                <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit(handleForm)}>
                    <Input control={control} name="name" label="name" type="text" error={errors.name} />
                    <Input control={control} name="email" label="email" type="email" error={errors.email} />
                    <Input control={control} name="password" label="password" type="password" error={errors.password} />
                    <Input control={control} name="confirmPassword" label="confirm password" type="password" error={errors.confirmPassword} />
                    <button className="bg-gray-800 p-2 rounded-lg text-white">Enviar</button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-600">
                    do you have account?
                    <span 
                    onClick={() => onClickNavigate("/login")}
                    className="cursor-pointer font-semibold text-gray-900 hover:underline"> login</span>
                </p>
            </section>
        </main>
    );
};
