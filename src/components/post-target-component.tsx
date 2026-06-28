interface Props {
  contenido:string;
  fecha:string;
  likes:number,
  comentarios?:string[]
}

export const PostTargetComponent = ({contenido, fecha, likes, comentarios}:Props) => {
  return (
    <div className="border rounded-lg h-80">
        <div className="border-b h-[15%]">
          <p>nombre usuario</p>
          <p>{fecha}</p>
        </div>
        <div className="h-[75%]">
          <p>{contenido}</p>
        </div>
        <div className="border-t h-[10%] grid grid-cols-3">
            <div className="border-r">likes{likes}</div>
            {/* cuando le de click abrira un dialog con todos los comentarios y un input para comentar */}
            <div className="border-r">comentario</div>
            {/* copiara el id del post */}
            <div className="">compartir</div>
        </div>
    </div>
  );
};