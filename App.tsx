import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import Routes from "./src/navigation/index";
import { executarSeedSeNecessario } from "./src/storage/seedStorage";

const queryClient = new QueryClient();

export default function App() {
  // Coloca os dados iniciais no app quando ele abre
  useEffect(() => {
    executarSeedSeNecessario();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Cuida das telas do app */}
      <Routes />

      {/* Mostra mensagens rápidas, como erro ou sucesso */}
      <Toast />
    </QueryClientProvider>
  );
}