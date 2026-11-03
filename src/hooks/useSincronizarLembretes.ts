import { useEffect } from "react";
import { AppState } from "react-native";
import { consultaService } from "../services/consultaService";
import { painelService } from "../services/painelService";
import { mostrarAgora, sincronizarLembretes } from "../services/notificacoes";
import { log } from "../utils/log";

const INTERVALO_MS = 15_000;

// evita duas sincronizações ao mesmo tempo
let sincronizando = false;

// agenda no celular os lembretes do backend
async function sincronizar() {
    if (sincronizando) return;
    sincronizando = true;
    try {
        await sincronizarLembretes(await consultaService.listarLembretes());
    } catch {
        log.notificacao("não deu pra sincronizar os lembretes agora");
    } finally {
        sincronizando = false;
    }
}

// mostra os avisos que o backend deixou na fila
async function buscarAvisos() {
    try {
        const avisos = await painelService.buscarAvisos();
        for (const aviso of avisos) await mostrarAgora(aviso);
    } catch {
        log.notificacao("não deu pra buscar os avisos agora");
    }
}

// sincroniza lembretes e avisos
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
