// log no terminal do Expo (só em desenvolvimento)
function escrever(origem: string, mensagem: string) {
    if (!__DEV__) return;
    const hora = new Date().toTimeString().slice(0, 8);
    console.log(`[${hora}] [${origem}] ${mensagem}`);
}

export const log = {
    api: (mensagem: string) => escrever("API", mensagem),
    sessao: (mensagem: string) => escrever("Sessão", mensagem),
    notificacao: (mensagem: string) => escrever("Notificação", mensagem),
};
