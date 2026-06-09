import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputComponent } from "../components/Input-component";
import { loginSchema, type loginType } from "../schemas/login-schema";

export const LoginPage = () => {
    const { handleSubmit, control, formState:{errors} } = useForm<loginType>({
        defaultValues:{
            email: "",
            password: ""
        },
        mode: "onBlur",
        resolver: zodResolver(loginSchema)
    })

    const handleForm:SubmitHandler<loginType> = (data) => {
        console.log(data)
    }

  return (
    <>
        <form onSubmit={handleSubmit(handleForm)}>
            <InputComponent control={control} name="email" label="email" type="email" error={errors.email}/>
            <InputComponent control={control} name="password" label="password" type="password" error={errors.password}/>
        </form>
    </>
  );
};
