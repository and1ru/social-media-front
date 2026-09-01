// mejorar la hora de los mensajes ✔
// header del chat ✔
// mejorar la fecha de los post ✔
// mejorar el tamaño de los post ✔
// mensaje de que se creo el post ✔
// mejorar los comentarios ✔
// cuando busque a alguien no importa si es en mayuscula o minuscula 
// cuando busque a alguien por el nombre y este incompleto hacer algo como a%
// cuando busque a alguien si son amigos no mostrar el button de agregar, si ya envio la peticion entonces poner un mensaje como "en espera de respuesta"
// pagina responsive
// pagina con dark mode
// pagina con cambio de idioma
// authenticacion con el userId ✔
// button de eliminar ✔
// transicion suave entre pagina
// delete a post ✔

import { AuthProvider } from "./context/auth/AuthProvider";
import { RoutesProvider } from "./routes/routes-provider";

const App = () => {
  return (
    <AuthProvider>
      <RoutesProvider/>
    </AuthProvider>
  );
};

export default App