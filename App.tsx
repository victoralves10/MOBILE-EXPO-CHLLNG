import { QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import Routes from "./src/navigation/index";
import { AuthProvider } from "./src/context/AuthContext";
import { queryClient } from "./src/services/queryClient";

// raiz do app: React Query por fora, sessão no meio e as rotas dentro
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Routes />
                <Toast />
            </AuthProvider>
        </QueryClientProvider>
    );
}