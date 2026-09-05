// testing

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