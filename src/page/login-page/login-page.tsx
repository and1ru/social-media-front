import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputComponent } from "../../components/Input-component/Input-component";
import { loginSchema, type loginType } from "../../schemas/login-schema";
import { useNavigate } from "react-router-dom";
import { useLoging } from "../cutomhooks/useLogin";

export const LoginPage = () => {
    const { error, loading, success, login } = useLoging()
    const { handleSubmit, control, formState: { errors } } = useForm<loginType>({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onBlur",
        resolver: zodResolver(loginSchema)
    })

    const navegar = useNavigate()

    const handleForm: SubmitHandler<loginType> = (data) => {
        login(data)
        if(success){
            navegar("/private/chats", {replace:true})
        }
    }

    function onClickNavigate() {
        navegar("/register", { replace: true })
    }

return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <section className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900">
                Welcome
            </h1>
            <p className="text-center text-gray-500 mt-2">
                Sign in to continue
            </p>

            {error && (
                <p className="mt-5 rounded-lg bg-red-100 text-red-700 p-3 text-sm">
                    {error}
                </p>
            )}

            {loading && (
                <p className="mt-5 rounded-lg bg-blue-100 text-blue-700 p-3 text-sm">
                    Loading...
                </p>
            )}

            <form
                onSubmit={handleSubmit(handleForm)}
                className="mt-8 flex flex-col gap-5"
            >
                <InputComponent control={control} name="email" label="Email" type="email" error={errors.email}/>
                <InputComponent control={control} name="password" label="Password" type="password" error={errors.password}/>

                <button className="w-full rounded-xl bg-gray-900 py-3 text-white font-medium transition hover:bg-gray-700 active:scale-95 disabled:opacity-50">
                    Login
                </button>
            </form>
            <p className="mt-8 text-center text-sm text-gray-600">
                Don't have an account? 
                <span
                    onClick={onClickNavigate}
                    className="cursor-pointer font-semibold text-gray-900 hover:underline"
                >
                    Register
                </span>
            </p>
        </section>
    </main>
);
};
