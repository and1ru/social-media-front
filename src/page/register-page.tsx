import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema, type registerType } from "../schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputComponent } from "../components/Input-component";

export const RegisterPage = () => {
    const { handleSubmit, control, formState:{errors} } = useForm<registerType>({
        defaultValues:{
            confirmPassword: "",
            email: "",
            name: "",
            password: ""
        },
        mode: "onBlur",
        resolver: zodResolver(registerSchema)
    })

    const handleForm:SubmitHandler<registerType> = (data) => {
        console.log(data)
    }

  return (
    <>
        <form onSubmit={handleSubmit(handleForm)}>
            <InputComponent control={control} name="name" label="name" type="text" error={errors.name}/>
            <InputComponent control={control} name="email" label="email" type="email" error={errors.email}/>
            <InputComponent control={control} name="password" label="password" type="password" error={errors.password}/>
            <InputComponent control={control} name="confirmPassword" label="confirm password" type="password" error={errors.confirmPassword}/>
        </form>
    </>
  );
};
