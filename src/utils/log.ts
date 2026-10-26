// mostra no terminal do Expo o que o app tá fazendo (só em desenvolvimento)
// usa console.log porque o warn/error abre aviso por cima da tela do celular
function escrever(origem: string, mensagem: string) {
    if (!__DEV__) return;
    const hora = new Date().toTimeString().slice(0, 8);
    console.log(`[${hora}] [${origem}] ${mensagem}`);
}

// um atalho pra cada parte do app, assim dá pra saber de onde veio o log
export const log = {
    api: (mensagem: string) => escrever("API", mensagem),
    sessao: (mensagem: string) => escrever("Sessão", mensagem),
};