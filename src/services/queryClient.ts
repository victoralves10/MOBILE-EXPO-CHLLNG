import { QueryClient } from "@tanstack/react-query";

// cliente do React Query usado no app inteiro
// fica num arquivo separado pra o logout conseguir limpar o cache dele
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: 1, staleTime: 30_000 },
        mutations: { retry: 0 },
    },
});