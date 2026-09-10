import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import Routes from "./src/navigation/index";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* cuida das telas do app */}
      <Routes />

      {/* mostra mensagens rapidas, como erro ou sucesso */}
      <Toast />
    </QueryClientProvider>
  );
}
