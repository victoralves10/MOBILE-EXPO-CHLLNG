import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";
import { Cores, transparente } from "../../theme/paletas";
import { NivelRegiao, ResumoRegioes } from "../../models/Painel";

// cor de cada nível
const corDoNivel = (c: Cores, nivel: NivelRegiao) =>
    nivel === "surto" ? c.atrasado : nivel === "atencao" ? c.aviso : c.primaria;

const ICONE_NIVEL = { normal: "checkmark-circle", atencao: "alert-circle", surto: "warning" } as const;

interface Props {
    resumo: ResumoRegioes;
}

// painel com o resumo de cada região
export default function PainelRegioes({ resumo }: Props) {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();
    const [aberta, setAberta] = useState<number | null>(null);

    if (resumo.mensagem_vazio) {
        return (
            <View style={styles.vazio}>
                <Ionicons name="location-outline" size={30} color={cores.textoSuave} />
                <Text style={styles.textoVazio}>{resumo.mensagem_vazio}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* legenda */}
            <View style={styles.legenda}>
                {resumo.legenda.map((item) => (
                    <View key={item.nivel} style={styles.itemLegenda}>
                        <View style={[styles.pontoLegenda, { backgroundColor: corDoNivel(cores, item.nivel) }]} />
                        <Text style={styles.textoLegenda}>{item.rotulo}</Text>
                    </View>
                ))}
            </View>

            {resumo.regioes.map((regiao) => {
                const cor = corDoNivel(cores, regiao.nivel);
                const expandida = aberta === regiao.id_regiao;
                const temDetalhes = !!regiao.aviso_atrasadas || regiao.doencas.length > 0;

                return (
                    <TouchableOpacity
                        key={regiao.id_regiao}
                        style={[styles.cartao, regiao.possivel_surto && { borderColor: cor }]}
                        onPress={() => setAberta(expandida ? null : regiao.id_regiao)}
                        activeOpacity={0.8}
                        disabled={!temDetalhes}
                    >
                        {/* nome e situação */}
                        <View style={styles.cabecalho}>
                            <View style={[styles.icone, { backgroundColor: transparente(cor, 0.15) }]}>
                                <Ionicons name="location" size={20} color={cor} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.nome}>{regiao.nm_regiao}</Text>
                                <Text style={styles.resumo}>{regiao.resumo}</Text>
                            </View>
                            <View style={[styles.selo, { backgroundColor: transparente(cor, 0.15) }]}>
                                <Ionicons name={ICONE_NIVEL[regiao.nivel]} size={13} color={cor} />
                                <Text style={[styles.textoSelo, { color: cor }]}>{regiao.rotulo_nivel}</Text>
                            </View>
                        </View>

                        {/* barra de movimento */}
                        <View style={styles.trilha}>
                            <View style={[styles.barra, { width: `${regiao.percentual_barra}%`, backgroundColor: cor }]} />
                        </View>

                        {/* doença principal */}
                        {!expandida && regiao.resumo_doencas && (
                            <Text style={styles.doencaPrincipal} numberOfLines={1}>
                                {regiao.resumo_doencas}
                            </Text>
                        )}

                        {/* detalhes */}
                        {expandida && (
                            <View style={styles.detalhes}>
                                {regiao.aviso_atrasadas && (
                                    <View style={styles.linhaDetalhe}>
                                        <Ionicons name="alert-circle" size={16} color={cores.atrasado} />
                                        <Text style={styles.textoDetalhe}>{regiao.aviso_atrasadas}</Text>
                                    </View>
                                )}
                                {regiao.doencas.map((doenca) => (
                                    <View key={doenca.ds_doenca} style={styles.linhaDetalhe}>
                                        <Ionicons
                                            name={doenca.possivel_surto ? "warning" : "medkit"}
                                            size={16}
                                            color={doenca.possivel_surto ? cores.atrasado : cores.aviso}
                                        />
                                        <Text style={styles.textoDetalhe}>{doenca.descricao}</Text>
                                    </View>
                                ))}
                                {regiao.possivel_surto && <Text style={styles.rodape}>{resumo.legenda_surto}</Text>}
                                {regiao.doencas.length > 0 && <Text style={styles.rodape}>{resumo.periodo_exibicao}</Text>}
                            </View>
                        )}

                        {temDetalhes && (
                            <Ionicons
                                name={expandida ? "chevron-up" : "chevron-down"}
                                size={18}
                                color={cores.textoSuave}
                                style={styles.seta}
                            />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
