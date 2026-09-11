import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import Routes from "./src/navigation/index";
import { AuthProvider } from "./src/context/AuthContext";

const queryClient = new QueryClient();

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
