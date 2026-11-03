import { useEffect, useState } from "react";
import { consultaService } from "../services/consultaService";
import {
    cancelarTodos,
    contarAgendados,
    definirLembretesAtivos,
    enviarTeste,
    horarioExatoLiberado,
    lembretesAtivos,
    liberarHorarioExato,
    sincronizarLembretes,
} from "../services/notificacoes";
import { toastErro, toastSucesso } from "../utils/toast";

// lógica do modal de notificações do Perfil
export function useConfigNotificacoes(aberto: boolean) {
    const [ativos, setAtivos] = useState(true);
    const [agendados, setAgendados] = useState(0);
    const [horarioExato, setHorarioExato] = useState(true);

    // lê a situação ao abrir o modal
    useEffect(() => {
        if (!aberto) return;
        lembretesAtivos().then(setAtivos);
        contarAgendados().then(setAgendados).catch(() => {});
        horarioExatoLiberado().then(setHorarioExato);
    }, [aberto]);

    // liga ou desliga os lembretes
    async function alternar(ligar: boolean) {
        setAtivos(ligar);
        await definirLembretesAtivos(ligar);
        if (ligar) {
            try {
                await sincronizarLembretes(await consultaService.listarLembretes());
                toastSucesso("Lembretes ligados.");
            } catch {
                toastErro("Não deu pra buscar os lembretes agora.");
            }
        } else {
            await cancelarTodos();
            toastSucesso("Lembretes desligados.");
        }
        setAgendados(await contarAgendados().catch(() => 0));
    }

    // libera o horário exato e agenda de novo
    async function liberarExato() {
        const liberado = await liberarHorarioExato();
        setHorarioExato(liberado);
        if (!liberado) return;
        await sincronizarLembretes(await consultaService.listarLembretes()).catch(() => {});
        toastSucesso("Pronto! Os lembretes chegam na hora certa.");
    }

    async function testar() {
        const ok = await enviarTeste();
        if (ok) toastSucesso("Notificação de teste chega em 5 segundos.");
        else toastErro("Permita as notificações nas configurações do celular.");
    }

    return { ativos, agendados, horarioExato, alternar, liberarExato, testar };
}
