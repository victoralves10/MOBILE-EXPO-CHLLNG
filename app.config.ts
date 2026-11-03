/// <reference types="node" />
import { ExpoConfig, ConfigContext } from "expo/config";
import { execSync } from "child_process";

// configuração do app com o commit e a data do build

// commit atual
function lerCommit(): string {
    // build no EAS
    const doEas = process.env.EAS_BUILD_GIT_COMMIT_HASH;
    if (doEas) return doEas.slice(0, 7);

    // rodando no computador
    try {
        return execSync("git rev-parse --short HEAD").toString().trim();
    } catch {
        return "sem commit";
    }
}

// data do build
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
