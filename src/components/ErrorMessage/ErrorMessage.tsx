import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
}
export const ErrorMessage = ({ open, children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="
        m-auto
        w-[90%]
        max-w-md
        rounded-2xl
        bg-white
        p-8
        shadow-2xl
        backdrop:bg-black/50
    "
    >
      <div className="flex flex-col items-center text-center">
        {/* Icono */}
        <div
          className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                border-4
                border-red-500
                bg-red-50
            "
        >
          <span className="text-5xl font-bold text-red-500">×</span>
        </div>

        {/* Título */}
        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          ¡Ha ocurrido un error!
        </h2>

        {/* Mensaje */}
        <div className="mt-2 text-sm text-gray-500">{children}</div>

        {/* Botón */}
        <button
          onClick={closeDialog}
          className="
                mt-7
                w-full
                rounded-xl
                bg-red-500
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:bg-red-600
                active:scale-[0.98]
                focus:outline-none
                focus:ring-4
                focus:ring-red-200
            "
        >
          Cerrar
        </button>
      </div>
    </dialog>
  );
};
