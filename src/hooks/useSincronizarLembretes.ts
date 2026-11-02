import { useEffect } from "react";
import { AppState } from "react-native";
import { consultaService } from "../services/consultaService";
import { sincronizarLembretes } from "../services/notificacoes";
import { log } from "../utils/log";

// guarda a sincronização que está rodando, pra não rodar duas ao mesmo tempo
// (no Android, o pedido de permissão faz o app "voltar pra frente" e chamaria de novo)
let emAndamento: Promise<void> | null = null;

// busca os lembretes no backend e agenda no celular
function sincronizar() {
    if (emAndamento) return emAndamento;
    emAndamento = (async () => {
        try {
            const lembretes = await consultaService.listarLembretes();
            await sincronizarLembretes(lembretes);
        } catch {
            log.notificacao("não deu pra sincronizar os lembretes agora");
        } finally {
            emAndamento = null;
        }
    })();
    return emAndamento;
}

// enquanto o usuário está logado, mantém os lembretes do celular iguais aos do backend:
// sincroniza ao entrar e toda vez que o app volta pra frente
export function useSincronizarLembretes(logado: boolean) {
    useEffect(() => {
        if (!logado) return;
        sincronizar();

        const inscricao = AppState.addEventListener("change", (estado) => {
            if (estado === "active") sincronizar();
        });
        return () => inscricao.remove();
    }, [logado]);
}