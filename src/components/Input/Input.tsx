import { Controller } from "react-hook-form";
import type { Control, FieldError, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    type: string;
    error?: FieldError
    label: string;
}

export const Input = <T extends FieldValues>({name, control, type, error, label}:Props<T>) => {
  return (
    <>
    <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
    <Controller
        name={name}
        control={control}
        render={({field}) => (<input {...field} type={type} id={name}     
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"/>)}
    />
    { error && <p className="text-red-500">{error.message}</p>}
    </>

  );
};
