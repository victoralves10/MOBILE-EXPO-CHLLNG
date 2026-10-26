// nomes das consultas do React Query num lugar só
// assim, depois de criar/editar/apagar, dá pra mandar recarregar tudo de consultas de uma vez
export const chaves = {
    usuario: ["usuario"] as const,

    consultas: {
        todas: ["consultas"] as const,
        lista: (aba: string, busca: string) => ["consultas", "lista", aba, busca] as const,
        proximas: ["consultas", "proximas"] as const,
        detalhe: (id: number) => ["consultas", "detalhe", id] as const,
    },
};