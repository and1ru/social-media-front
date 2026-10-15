import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
}
export const SuccessMessage = ({ open, children }: Props) => {
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
    <dialog ref={dialogRef}className=" m-auto w-[90%] max-w-md rounded-2xl bg-white p-8 shadow-2xl backdrop:bg-black/50">
      <div className="flex flex-col items-center text-center">
        <div className=" flex h-24 w-24 items-center justify-center rounded-full border-4 border-green-500 bg-green-50">
          <span className="text-5xl font-bold text-green-500">✓</span>
        </div>

        <div className="mt-7">
          <p className="text-green-700 font-medium">{children}</p>
        </div>

        <button
          onClick={closeDialog}
          className=" mt-7 w-full rounded-xl bg-green-500 px-5 py-3 font-semibold text-white transition hover:bg-green-600 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-green-200">
          Cerrar
        </button>
      </div>
    </dialog>
  );
};
