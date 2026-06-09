import { Controller } from "react-hook-form";
import type { Control, FieldError, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    type: string;
    error?: FieldError
    label: string;
}

export const InputComponent = <T extends FieldValues>({name, control, type, error, label}:Props<T>) => {
  return (
    <>
    <label htmlFor={name}>{label}</label>
    <Controller
        name={name}
        control={control}
        render={({field}) => (<input {...field} type={type} id={name}/>)}
    />
    { error && <p>{error.message}</p>}
    </>

  );
};
