import { useEffect } from "react";
import { AppState } from "react-native";
import { consultaService } from "../services/consultaService";
import { painelService } from "../services/painelService";
import { mostrarAgora, sincronizarLembretes } from "../services/notificacoes";
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

// busca os avisos que o backend deixou esperando e mostra cada um na hora
async function buscarAvisos() {
    try {
        const avisos = await painelService.buscarAvisos();
        for (const aviso of avisos) await mostrarAgora(aviso);
    } catch {
        // sem conexão: tenta de novo na próxima volta
    }
}

// de quanto em quanto tempo confere de novo com o app aberto
// (pega consultas criadas por outro lugar e os avisos mandados pelo Swagger)
const INTERVALO_MS = 15_000;


export function useSincronizarLembretes(logado: boolean) {
    useEffect(() => {
        if (!logado) return;
        sincronizar();
        buscarAvisos();

        const inscricao = AppState.addEventListener("change", (estado) => {
            if (estado === "active") sincronizar();
        });
        const timer = setInterval(() => {
            if (AppState.currentState !== "active") return;
            sincronizar();
            buscarAvisos();
        }, INTERVALO_MS);

        return () => {
            inscricao.remove();
            clearInterval(timer);
        };
    }, [logado]);
}
