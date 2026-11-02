import React from "react";
import { View, Text, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { criarEstilos } from "./style";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";
import { transparente } from "../../theme/paletas";
import ConsultaCard from "../../components/ConsultaCard/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import MapaRegioes from "../../components/MapaRegioes/Index";
import { useHome } from "../../hooks/useHome";

// tela inicial: saudação, atalhos, próximas consultas e o mapa das regiões
export default function Home() {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();
    const { usuario, proximas, carregando, abrirDetalheConsulta, atalhos, mapa, carregandoMapa } = useHome();

    // os 3 atalhos coloridos
    const botoesAtalho: { icone: keyof typeof Ionicons.glyphMap; texto: string; cor: string; acao: () => void }[] = [
        { icone: "add-circle", texto: "Nova consulta", cor: cores.primaria, acao: atalhos.novaConsulta },
        { icone: "alert-circle", texto: "Atrasadas", cor: cores.atrasado, acao: atalhos.atrasadas },
        { icone: "paw", texto: "Pacientes", cor: cores.pacientes, acao: atalhos.pacientes },
    ];

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* saudação num card com degradê */}
                <LinearGradient
                    colors={[cores.primaria, cores.primariaForte]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.saudacao}
                >
                    {/* bolhas de enfeite */}
                    <View style={styles.bolha1} />
                    <View style={styles.bolha2} />

                    <View style={styles.linhaSaudacao}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textoOla}>Olá,</Text>
                            <Text style={styles.textoNome} numberOfLines={1}>{usuario?.nm_usuario ?? ""} 👋</Text>
                        </View>
                        <View style={styles.circuloPata}>
                            <Ionicons name="paw" size={26} color={cores.textoSobreCor} />
                        </View>
                    </View>

                    <Text style={styles.textoResumo}>
                        {proximas.length > 0
                            ? `Você tem ${proximas.length} ${proximas.length === 1 ? "consulta agendada" : "consultas agendadas"} pela frente.`
                            : "Nenhuma consulta agendada por enquanto."}
                    </Text>
                </LinearGradient>

                {/* atalhos */}
                <View style={styles.linhaAtalhos}>
                    {botoesAtalho.map((b) => (
                        <TouchableOpacity key={b.texto} style={styles.atalho} onPress={b.acao} activeOpacity={0.8}>
                            <View style={[styles.iconeAtalho, { backgroundColor: transparente(b.cor, 0.14) }]}>
                                <Ionicons name={b.icone} size={24} color={b.cor} />
                            </View>
                            <Text style={styles.textoAtalho}>{b.texto}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* próximas consultas */}
                <View style={styles.containerTitulo}>
                    <Text style={styles.tituloSecao}>Próximas consultas</Text>
                    {proximas.length > 0 && (
                        <View style={styles.badgeContador}>
                            <Text style={styles.textoBadgeContador}>{proximas.length}</Text>
                        </View>
                    )}
                </View>

                {carregando ? (
                    <TelaCarregando />
                ) : proximas.length === 0 ? (
                    <View style={styles.containerVazio}>
                        <Ionicons name="calendar-clear-outline" size={32} color={cores.textoSuave} />
                        <Text style={styles.textoVazio}>Nenhuma consulta agendada no momento.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={proximas}
                        keyExtractor={(item) => String(item.id_consulta)}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListCarrossel}
                        renderItem={({ item }) => (
                            <View style={styles.cardCarrossel}>
                                <ConsultaCard consulta={item} variante="cartao" onPress={() => abrirDetalheConsulta(item.id_consulta)} />
                            </View>
                        )}
                    />
                )}

                {/* mapa: onde estão os pacientes, consultas atrasadas e possíveis surtos */}
                <View style={styles.containerTitulo}>
                    <Text style={styles.tituloSecao}>{mapa?.titulo ?? "Mapa"}</Text>
                    {mapa?.possui_surto && (
                        <View style={[styles.badgeContador, { backgroundColor: cores.atrasado }]}>
                            <Ionicons name="warning" size={13} color={cores.textoSobreCor} />
                        </View>
                    )}
                </View>
                {mapa?.resumo_geral && <Text style={styles.subtituloSecao}>{mapa.resumo_geral}</Text>}

                {carregandoMapa ? <TelaCarregando /> : mapa && <MapaRegioes mapa={mapa} />}
            </ScrollView>
        </SafeAreaView>
    );
}
