import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Platform, ActivityIndicator } from "react-native";
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { criarEstilos } from "./styles";
import { estiloMapaClaro, estiloMapaEscuro } from "./estiloMapaEscuro";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";
import { Cores, transparente } from "../../theme/paletas";
import { Mapa, NivelRegiao } from "../../models/Painel";
import { toastAviso } from "../../utils/toast";

// cor de cada nível que o backend manda (só visual)
const corDoNivel = (c: Cores, nivel: NivelRegiao) =>
    nivel === "surto" ? c.atrasado : nivel === "atencao" ? c.aviso : c.primaria;

interface Props {
    mapa: Mapa;
}

// mapa da Home: cada região é um círculo com a quantidade de consultas
// tocar numa região mostra os detalhes logo abaixo do mapa
export default function MapaRegioes({ mapa }: Props) {
    const styles = useEstilos(criarEstilos);
    const { cores, escuro } = useTema();
    const mapaRef = useRef<MapView>(null);

    const [idSelecionada, setIdSelecionada] = useState<number | null>(mapa.regioes[0]?.id_regiao ?? null);
    const [minhaPosicao, setMinhaPosicao] = useState<{ latitude: number; longitude: number } | null>(null);
    const [localizando, setLocalizando] = useState(false);

    const selecionada = mapa.regioes.find((r) => r.id_regiao === idSelecionada) ?? null;

    // região inicial: o centro que o backend calculou
    const regiaoInicial = {
        latitude: mapa.centro.latitude,
        longitude: mapa.centro.longitude,
        latitudeDelta: mapa.centro.latitude_delta,
        longitudeDelta: mapa.centro.longitude_delta,
    };

    // tocou numa região: seleciona e aproxima a câmera nela
    function selecionar(id: number) {
        const regiao = mapa.regioes.find((r) => r.id_regiao === id);
        if (!regiao) return;
        setIdSelecionada(id);
        mapaRef.current?.animateToRegion(
            { latitude: regiao.latitude, longitude: regiao.longitude, latitudeDelta: 0.06, longitudeDelta: 0.06 },
            500
        );
    }

    // volta pra visão com todas as regiões
    function verTodas() {
        mapaRef.current?.animateToRegion(regiaoInicial, 500);
    }

    // igual à aula: pede permissão, pega a posição do celular e leva o mapa até ela
    async function irParaMinhaPosicao() {
        setLocalizando(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                toastAviso("Sem permissão de localização. Você pode liberar nas configurações do celular.");
                return;
            }
            const local = await Location.getCurrentPositionAsync({});
            const posicao = { latitude: local.coords.latitude, longitude: local.coords.longitude };
            setMinhaPosicao(posicao);
            mapaRef.current?.animateToRegion({ ...posicao, latitudeDelta: 0.08, longitudeDelta: 0.08 }, 500);
        } catch {
            toastAviso("Não deu pra achar sua localização agora.");
        } finally {
            setLocalizando(false);
        }
    }

    return (
        <View style={styles.container}>
            {/* ---------- o mapa ---------- */}
            <View style={styles.caixaMapa}>
                <MapView
                    ref={mapaRef}
                    style={styles.mapa}
                    // no Android usa o Google Maps (o tema escuro do mapa só funciona nele)
                    provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
                    customMapStyle={escuro ? estiloMapaEscuro : estiloMapaClaro}
                    initialRegion={regiaoInicial}
                    toolbarEnabled={false}
                    rotateEnabled={false}
                >
                    {mapa.regioes.map((regiao) => {
                        const cor = corDoNivel(cores, regiao.nivel);
                        const ativa = regiao.id_regiao === idSelecionada;
                        return (
                            <React.Fragment key={regiao.id_regiao}>
                                {/* área da região: maior quanto mais consultas/casos */}
                                <Circle
                                    center={{ latitude: regiao.latitude, longitude: regiao.longitude }}
                                    radius={regiao.raio_metros}
                                    fillColor={transparente(cor, ativa ? 0.32 : 0.18)}
                                    strokeColor={cor}
                                    strokeWidth={ativa ? 2.5 : 1.5}
                                />
                                {/* bolinha com o número de consultas */}
                                <Marker
                                    coordinate={{ latitude: regiao.latitude, longitude: regiao.longitude }}
                                    onPress={() => selecionar(regiao.id_regiao)}
                                    anchor={{ x: 0.5, y: 0.5 }}
                                >
                                    <View style={[styles.bolha, { backgroundColor: cor }, ativa && styles.bolhaAtiva]}>
                                        {regiao.nivel === "surto" ? (
                                            <Ionicons name="warning" size={14} color={cores.textoSobreCor} />
                                        ) : (
                                            <Text style={styles.textoBolha}>{regiao.total_consultas}</Text>
                                        )}
                                    </View>
                                </Marker>
                            </React.Fragment>
                        );
                    })}

                    {/* onde o veterinário está (depois de tocar no botão de localização) */}
                    {minhaPosicao && <Marker coordinate={minhaPosicao} title="Você está aqui" pinColor={cores.ceu} />}
                </MapView>

                {/* botões flutuantes no canto do mapa */}
                <View style={styles.botoesFlutuantes}>
                    <TouchableOpacity style={styles.botaoFlutuante} onPress={irParaMinhaPosicao} disabled={localizando}>
                        {localizando ? (
                            <ActivityIndicator size="small" color={cores.primaria} />
                        ) : (
                            <Ionicons name="locate" size={20} color={cores.primaria} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoFlutuante} onPress={verTodas}>
                        <Ionicons name="scan" size={20} color={cores.primaria} />
                    </TouchableOpacity>
                </View>

                {/* sem nenhuma região ainda */}
                {mapa.mensagem_vazio && (
                    <View style={styles.avisoVazio}>
                        <Ionicons name="map-outline" size={18} color={cores.textoSecundario} />
                        <Text style={styles.textoAvisoVazio}>{mapa.mensagem_vazio}</Text>
                    </View>
                )}
            </View>

            {/* ---------- legenda ---------- */}
            <View style={styles.legenda}>
                {mapa.legenda.map((item) => (
                    <View key={item.nivel} style={styles.itemLegenda}>
                        <View style={[styles.pontoLegenda, { backgroundColor: corDoNivel(cores, item.nivel) }]} />
                        <Text style={styles.textoLegenda}>{item.rotulo}</Text>
                    </View>
                ))}
            </View>

            {/* ---------- detalhes da região tocada ---------- */}
            {selecionada && (
                <View style={styles.cartaoRegiao}>
                    <View style={styles.cabecalhoRegiao}>
                        <View style={[styles.iconeRegiao, { backgroundColor: transparente(corDoNivel(cores, selecionada.nivel), 0.15) }]}>
                            <Ionicons name="location" size={20} color={corDoNivel(cores, selecionada.nivel)} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.nomeRegiao}>{selecionada.nm_regiao}</Text>
                            <Text style={styles.resumoRegiao}>{selecionada.resumo}</Text>
                        </View>
                        <View style={[styles.seloNivel, { backgroundColor: transparente(corDoNivel(cores, selecionada.nivel), 0.15) }]}>
                            <Text style={[styles.textoSeloNivel, { color: corDoNivel(cores, selecionada.nivel) }]}>
                                {selecionada.rotulo_nivel}
                            </Text>
                        </View>
                    </View>

                    {selecionada.aviso_atrasadas && (
                        <View style={styles.linhaDetalhe}>
                            <Ionicons name="alert-circle" size={16} color={cores.atrasado} />
                            <Text style={styles.textoDetalhe}>{selecionada.aviso_atrasadas}</Text>
                        </View>
                    )}

                    {/* doenças registradas na região (vêm do diagnóstico das consultas) */}
                    {selecionada.doencas.map((doenca) => (
                        <View key={doenca.ds_doenca} style={styles.linhaDetalhe}>
                            <Ionicons
                                name={doenca.possivel_surto ? "warning" : "medkit"}
                                size={16}
                                color={doenca.possivel_surto ? cores.atrasado : cores.aviso}
                            />
                            <Text style={styles.textoDetalhe}>{doenca.descricao}</Text>
                        </View>
                    ))}

                    {selecionada.possivel_surto && <Text style={styles.textoRodape}>{mapa.legenda_surto}</Text>}
                    {selecionada.doencas.length > 0 && <Text style={styles.textoRodape}>{mapa.periodo_exibicao}</Text>}
                </View>
            )}
        </View>
    );
}
