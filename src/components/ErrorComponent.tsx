interface Props{
    ref: React.RefObject<HTMLDialogElement | null>
    message: string;
}

export const ErrorComponent = ({ref, message}:Props) => {

    const closeDialog = () =>{
        ref.current?.close()
    }

  return (
    <dialog ref={ref}>
        <p>Algo salio mal, intenta de nuevo</p>
        <p>{message}</p>
        <button onClick={closeDialog}>Cerrar</button>
    </dialog>
  );
};
