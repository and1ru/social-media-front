// pagina con dark mode ✔ (poner la pagina en dark)
// en el chat (si pone un id de alguien pero no es el amigo o si ingresa un id no valido) pantalla de error
// si al intentar buscar un usuario por el id no lo encuentra o pone el id mal, pantalla de error

import { AuthProvider } from "./context/auth/AuthProvider";
import { LanguajeProvider } from "./context/languaje/LanguajeProvider";
import { ThemeProvider } from "./context/theme/ThemeProvider";
import { RoutesProvider } from "./routes/routes-provider";

const App = () => {
  return (
    <LanguajeProvider>
      <ThemeProvider>
        <AuthProvider>
          <RoutesProvider />
        </AuthProvider>
      </ThemeProvider>
    </LanguajeProvider>
  );
};

export default App