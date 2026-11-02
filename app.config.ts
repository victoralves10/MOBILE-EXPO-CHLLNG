/// <reference types="node" />
import { ExpoConfig, ConfigContext } from "expo/config";
import { execSync } from "child_process";

// esse arquivo roda no computador (ou no servidor do EAS) na hora de iniciar/buildar o app
// ele pega tudo do app.json e só acrescenta o commit e a data do build, pra tela "Sobre o App"

// hash curto do commit atual (ex: "a1b2c3d")
function lerCommit(): string {
    // no build do EAS o próprio EAS já manda o commit nessa variável
    const doEas = process.env.EAS_BUILD_GIT_COMMIT_HASH;
    if (doEas) return doEas.slice(0, 7);

    // rodando local: pergunta pro git
    try {
        return execSync("git rev-parse --short HEAD").toString().trim();
    } catch {
        return "sem commit";
    }
}

// data e hora do build já no formato brasileiro (ex: "02/11/2026 18:40")
function dataDoBuild(): string {
    return new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).replace(",", "");
}

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: config.name ?? "Clyvo ELLV",
    slug: config.slug ?? "clyvo-mobile",
    extra: {
        ...config.extra,
        commit: lerCommit(),
        dataBuild: dataDoBuild(),
    },
});
