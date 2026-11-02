import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./src/navigation/index";
import { AuthProvider } from "./src/context/AuthContext";
import { queryClient } from "./src/services/queryClient";
import { TemaProvider, useTema } from "./src/theme/TemaContext";
import ToastTema from "./src/theme/ToastTema";
import { configurarNotificacoes } from "./src/services/notificacoes";

// deixa as notificações prontas assim que o app abre
configurarNotificacoes();

// barra de status do celular (hora, bateria) clara ou escura conforme o tema
function BarraDeStatus() {
    const { escuro } = useTema();
    return <StatusBar style={escuro ? "light" : "dark"} />;
}

// raiz do app: área segura da tela, tema, React Query, sessão e as rotas dentro
export default function App() {
    return (
        <SafeAreaProvider>
            <TemaProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <BarraDeStatus />
                        <Routes />
                        <ToastTema />
                    </AuthProvider>
                </QueryClientProvider>
            </TemaProvider>
        </SafeAreaProvider>
    );
}
