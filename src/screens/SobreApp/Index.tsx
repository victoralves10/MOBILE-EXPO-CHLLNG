import React from "react";
import { View, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";
import { transparente } from "../../theme/paletas";
import LinhaInfo from "../../components/LinhaInfo/Index";

type NomeIcone = keyof typeof Ionicons.glyphMap;

// quem fez o app
const INTEGRANTES = [
    { rm: "RM561713", nome: "Eduardo Batista Locaspi", turma: "2TDSPI" },
    { rm: "RM565799", nome: "Leticia Santiago e Silva", turma: "2TDSPW" },
    { rm: "RM565698", nome: "Liana Lyumi Morisita Fujisima", turma: "2TDSPI" },
    { rm: "RM561833", nome: "Victor Alves Lopes", turma: "2TDSPI" },
];

// o que usamos pra construir
const TECNOLOGIAS: { nome: string; icone: NomeIcone }[] = [
    { nome: "React Native", icone: "logo-react" },
    { nome: "Expo", icone: "rocket" },
    { nome: "TypeScript", icone: "code-slash" },
    { nome: "Node.js", icone: "logo-nodejs" },
    { nome: "Oracle", icone: "server" },
    { nome: "TanStack Query", icone: "sync" },
];

// tela "Sobre o App": versão, commit do build e a equipe
export default function SobreApp() {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();

    // essas informações vêm do app.config.ts, preenchidas na hora do build
    const versao = Constants.expoConfig?.version ?? "1.0.0";
    const extra = Constants.expoConfig?.extra ?? {};
    const commit: string = extra.commit ?? "sem commit";
    const dataBuild: string = extra.dataBuild ?? "—";

    // rodando pelo Expo Go ou instalado pelo APK do Firebase
    const ambiente = Constants.executionEnvironment === "storeClient" ? "Expo Go (desenvolvimento)" : "APK instalado";

    const coresAvatar = [cores.primaria, cores.ceu, cores.rosa, cores.laranja];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

            {/* ---------- topo colorido com o logo ---------- */}
            <LinearGradient
                colors={[cores.primaria, cores.secundaria]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.hero}
            >
                <View style={styles.logo}>
                    <Ionicons name="paw" size={38} color={cores.primaria} />
                </View>
                <Text style={styles.nomeApp}>Clyvo ELLV</Text>
                <Text style={styles.slogan}>gestão veterinária inteligente</Text>

                <View style={styles.seloVersao}>
                    <Ionicons name="git-commit" size={14} color={cores.textoSobreCor} />
                    <Text style={styles.textoSelo}>v{versao} · {commit}</Text>
                </View>
            </LinearGradient>

            {/* ---------- informações do build ---------- */}
            <Text style={styles.tituloGrupo}>Versão instalada</Text>
            <View style={styles.cartao}>
                <LinhaInfo icone="pricetag" cor={cores.primaria} rotulo="Versão do app" valor={versao} />
                <LinhaInfo icone="git-commit" cor={cores.laranja} rotulo="Commit do build" valor={commit} />
                <LinhaInfo icone="time" cor={cores.ceu} rotulo="Gerado em" valor={dataBuild} />
                <LinhaInfo icone="phone-portrait" cor={cores.concluido} rotulo="Rodando em" valor={ambiente} />
            </View>

            {/* ---------- sobre o projeto ---------- */}
            <Text style={styles.tituloGrupo}>O projeto</Text>
            <View style={styles.cartao}>
                <Text style={styles.texto}>
                    O Clyvo ELLV ajuda clínicas veterinárias a não perder consultas de retorno, vacinas e
                    protocolos: reúne pacientes, responsáveis e o histórico de cada animal num lugar só, e
                    avisa antes de cada consulta.
                </Text>
                <View style={styles.linhaParceria}>
                    <Ionicons name="school" size={16} color={cores.primaria} />
                    <Text style={styles.textoParceria}>Challenge FIAP 2026 · em parceria com a Clyvo Vet</Text>
                </View>
            </View>

            {/* ---------- equipe ---------- */}
            <Text style={styles.tituloGrupo}>Equipe</Text>
            <View style={styles.cartao}>
                {INTEGRANTES.map((pessoa, i) => (
                    <View key={pessoa.rm} style={styles.linhaPessoa}>
                        <View style={[styles.avatar, { backgroundColor: transparente(coresAvatar[i], 0.16) }]}>
                            <Text style={[styles.inicial, { color: coresAvatar[i] }]}>{pessoa.nome[0]}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.nomePessoa}>{pessoa.nome}</Text>
                            <Text style={styles.rmPessoa}>
                                {pessoa.rm} · {pessoa.turma}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* ---------- tecnologias ---------- */}
            <Text style={styles.tituloGrupo}>Feito com</Text>
            <View style={styles.gradeChips}>
                {TECNOLOGIAS.map((tec) => (
                    <View key={tec.nome} style={styles.chip}>
                        <Ionicons name={tec.icone} size={15} color={cores.primaria} />
                        <Text style={styles.textoChip}>{tec.nome}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.rodape}>Feito com 💜 pela equipe ELLV</Text>
        </ScrollView>
    );
}
