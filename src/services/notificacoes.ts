import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Lembrete } from "../models/Consulta";
import { Aviso } from "../models/Painel";
import { log } from "../utils/log";

const CHAVE_ATIVOS = "@clyvovet:lembretes-ativos";

// ids dos dois lembretes de uma consulta
const idsDaConsulta = (idConsulta: number) => [`consulta-${idConsulta}-antes`, `consulta-${idConsulta}-inicio`];

// configura as notificações
export function configurarNotificacoes() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
}

// pede permissão de notificação
export async function pedirPermissao(): Promise<boolean> {
    const atual = await Notifications.getPermissionsAsync();
    if (atual.granted) return true;
    const pedido = await Notifications.requestPermissionsAsync();
    return pedido.granted;
}

// lembretes ligados ou desligados
export async function lembretesAtivos(): Promise<boolean> {
    try {
        return (await AsyncStorage.getItem(CHAVE_ATIVOS)) !== "nao";
    } catch {
        return true;
    }
}

export async function definirLembretesAtivos(ativos: boolean) {
    await AsyncStorage.setItem(CHAVE_ATIVOS, ativos ? "sim" : "nao");
}

// agenda um lembrete
export async function agendarLembrete(lembrete: Lembrete) {
    if (!(await lembretesAtivos())) return;
    if (!(await pedirPermissao())) return;

    await Notifications.scheduleNotificationAsync({
        identifier: lembrete.id_lembrete,
        content: {
            title: lembrete.titulo,
            body: lembrete.mensagem,
            data: { id_consulta: lembrete.id_consulta },
            sound: true,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: new Date(lembrete.disparar_em),
        },
    });
    log.notificacao(`agendado (${lembrete.tipo}): consulta ${lembrete.id_consulta} em ${lembrete.disparar_em}`);
}

// troca os lembretes de uma consulta
export async function reagendarConsulta(idConsulta: number, lembretes: Lembrete[]) {
    await cancelarLembrete(idConsulta);
    for (const lembrete of lembretes) await agendarLembrete(lembrete);
}

// cancela os lembretes de uma consulta
export async function cancelarLembrete(idConsulta: number) {
    for (const id of idsDaConsulta(idConsulta)) {
        await Notifications.cancelScheduledNotificationAsync(id).catch(() => {});
    }
}

// cancela todos os lembretes
export async function cancelarTodos() {
    await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
    log.notificacao("todos os lembretes cancelados");
}

// sincroniza com o backend
export async function sincronizarLembretes(lembretes: Lembrete[]) {
    await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
    if (!(await lembretesAtivos()) || !(await pedirPermissao())) return;
    for (const lembrete of lembretes) await agendarLembrete(lembrete);
    log.notificacao(`${lembretes.length} lembrete(s) sincronizado(s)`);
}

// mostra um aviso na hora
export async function mostrarAgora(aviso: Aviso) {
    if (!(await pedirPermissao())) return;
    await Notifications.scheduleNotificationAsync({
        identifier: aviso.id_aviso,
        content: {
            title: aviso.titulo,
            body: aviso.mensagem,
            data: aviso.id_consulta ? { id_consulta: aviso.id_consulta } : {},
            sound: true,
        },
        trigger: null,
    });
    log.notificacao(`aviso mostrado: ${aviso.titulo}`);
}

// total de lembretes agendados
export async function contarAgendados(): Promise<number> {
    const agendados = await Notifications.getAllScheduledNotificationsAsync();
    return agendados.length;
}

// notificação de teste em 5 segundos
export async function enviarTeste(): Promise<boolean> {
    if (!(await pedirPermissao())) return false;
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Lembretes ligados 🐾",
            body: "É assim que o Clyvo ELLV vai te avisar das próximas consultas.",
            sound: true,
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 5 },
    });
    return true;
}

// toque na notificação
export function aoTocarNotificacao(callback: (idConsulta: number) => void) {
    const tratar = (resposta: Notifications.NotificationResponse | null) => {
        if (!resposta) return;
        const dados = resposta.notification.request.content.data;
        log.notificacao(`tocou: ${resposta.notification.request.content.title}`);
        Notifications.clearLastNotificationResponse();

        const id = Number(dados?.id_consulta);
        if (id > 0) callback(id);
    };

    // app aberto pela notificação
    tratar(Notifications.getLastNotificationResponse());

    // app aberto ou em segundo plano
    const inscricao = Notifications.addNotificationResponseReceivedListener(tratar);
    return () => inscricao.remove();
}
