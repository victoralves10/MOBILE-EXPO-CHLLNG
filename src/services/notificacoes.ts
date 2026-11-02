import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Lembrete } from "../models/Consulta";
import { log } from "../utils/log";

// tudo que mexe com as notificações do celular fica aqui
// o backend diz QUANDO avisar e O QUE escrever; aqui só agenda, cancela e abre

const CHAVE_ATIVOS = "@clyvovet:lembretes-ativos";

// cada consulta tem até 2 avisos ("antes" e "inicio"); o id de cada um vem pronto do backend
// aqui só montamos os mesmos ids pra conseguir cancelar os dois de uma consulta
const idsDaConsulta = (idConsulta: number) => [`consulta-${idConsulta}-antes`, `consulta-${idConsulta}-inicio`];

// configura como a notificação aparece quando chega com o app aberto
// (igual à aula 44: só o setNotificationHandler, sem canal extra no Android)
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

// pede permissão pro usuário (só pergunta na primeira vez)
export async function pedirPermissao(): Promise<boolean> {
    const atual = await Notifications.getPermissionsAsync();
    if (atual.granted) return true;
    const pedido = await Notifications.requestPermissionsAsync();
    return pedido.granted;
}

// o usuário pode desligar os lembretes no Perfil (vem ligado por padrão)
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

// agenda (ou reagenda) um aviso no horário que o backend mandou
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

// troca os avisos de uma consulta pelos que o backend mandou (lista vazia = só cancela)
export async function reagendarConsulta(idConsulta: number, lembretes: Lembrete[]) {
    await cancelarLembrete(idConsulta);
    for (const lembrete of lembretes) await agendarLembrete(lembrete);
}

// cancela os avisos de uma consulta (editada pra concluída, removida...)
export async function cancelarLembrete(idConsulta: number) {
    for (const id of idsDaConsulta(idConsulta)) {
        await Notifications.cancelScheduledNotificationAsync(id).catch(() => {});
    }
}

// cancela tudo (logout ou lembretes desligados)
export async function cancelarTodos() {
    await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
    log.notificacao("todos os lembretes cancelados");
}

// apaga o que estava agendado e agenda de novo a lista que veio do backend
export async function sincronizarLembretes(lembretes: Lembrete[]) {
    await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
    if (!(await lembretesAtivos()) || !(await pedirPermissao())) return;
    for (const lembrete of lembretes) await agendarLembrete(lembrete);
    log.notificacao(`${lembretes.length} lembrete(s) sincronizado(s) com o backend`);
}

// quantos avisos estão agendados neste celular (aparece no Perfil)
export async function contarAgendados(): Promise<number> {
    const agendados = await Notifications.getAllScheduledNotificationsAsync();
    return agendados.length;
}

// notificação de teste daqui a 5 segundos, pra conferir se está tudo funcionando
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

// quando o usuário toca numa notificação, devolve o id da consulta (se tiver)
export function aoTocarNotificacao(callback: (idConsulta: number) => void) {
    const tratar = (resposta: Notifications.NotificationResponse | null) => {
        const id = resposta?.notification.request.content.data?.id_consulta;
        if (typeof id === "number") callback(id);
    };

    // app fechado: abriu pela notificação
    Notifications.getLastNotificationResponseAsync().then(tratar).catch(() => {});

    // app aberto ou em segundo plano
    const inscricao = Notifications.addNotificationResponseReceivedListener(tratar);
    return () => inscricao.remove();
}
