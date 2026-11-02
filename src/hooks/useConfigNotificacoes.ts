import { useEffect, useState } from "react";
import { consultaService } from "../services/consultaService";
import {
    contarAgendados,
    definirLembretesAtivos,
    enviarTeste,
    lembretesAtivos,
    sincronizarLembretes,
    cancelarTodos,
} from "../services/notificacoes";
import { toastErro, toastSucesso } from "../utils/toast";

// lógica do modal de notificações do Perfil: ligar/desligar, ver quantos avisos tem e testar
export function useConfigNotificacoes(aberto: boolean) {
    const [ativos, setAtivos] = useState(true);
    const [agendados, setAgendados] = useState(0);

    // toda vez que o modal abre, lê como está agora
    useEffect(() => {
        if (!aberto) return;
        lembretesAtivos().then(setAtivos);
        contarAgendados().then(setAgendados).catch(() => {});
    }, [aberto]);

    // liga: busca os lembretes no backend e agenda; desliga: cancela tudo
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

    // manda uma notificação de exemplo em 5 segundos
    async function testar() {
        const ok = await enviarTeste();
        if (ok) toastSucesso("Notificação de teste chega em 5 segundos.");
        else toastErro("Permita as notificações nas configurações do celular.");
    }

    return { ativos, agendados, alternar, testar };
}