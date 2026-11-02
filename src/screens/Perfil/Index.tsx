import React, { useLayoutEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Pressable, Modal, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema, PreferenciaTema } from "../../theme/TemaContext";
import { transparente } from "../../theme/paletas";
import CustomTextInput from "../../components/CustomTextInput/Index";
import ModalFormulario from "../../components/ModalFormulario/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { usePerfil } from "../../hooks/usePerfil";
import { useConfigNotificacoes } from "../../hooks/useConfigNotificacoes";

type NomeIcone = keyof typeof Ionicons.glyphMap;

// tela de perfil: quem está logado e como está o consultório
// as opções da conta ficam no menu ☰ do canto de cima
export default function Perfil() {
    const styles = useEstilos(criarEstilos);
    const { cores, preferencia, mudarPreferencia } = useTema();
    const p = usePerfil();
    const { usuario, dashboard } = p;
    const navigation = useNavigation();

    // menuzinho do canto e modal de aparência
    const [menuAberto, setMenuAberto] = useState(false);
    const [aparenciaAberta, setAparenciaAberta] = useState(false);
    const [notificacoesAberta, setNotificacoesAberta] = useState(false);
    const notif = useConfigNotificacoes(notificacoesAberta);

    // coloca o botão ☰ no cabeçalho da tela
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.botaoMenu}>
                    <Ionicons name="menu" size={22} color={cores.texto} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, styles, cores]);

    // opções do menu: fecha o menu e faz a ação
    const opcoesMenu: { icone: NomeIcone; texto: string; cor: string; acao: () => void }[] = [
        { icone: "person", texto: "Dados pessoais", cor: cores.primaria, acao: () => p.abrirModal("dados") },
        { icone: "lock-closed", texto: "Alterar senha", cor: cores.ceu, acao: () => p.abrirModal("senha") },
        { icone: "notifications", texto: "Notificações", cor: cores.aviso, acao: () => setNotificacoesAberta(true) },
        { icone: "color-palette", texto: "Aparência", cor: cores.rosa, acao: () => setAparenciaAberta(true) },
        { icone: "log-out", texto: "Sair da conta", cor: cores.laranja, acao: p.sair },
        { icone: "trash", texto: "Apagar conta", cor: cores.atrasado, acao: () => p.abrirModal("apagar") },
    ];

    // as 3 opções de tema
    const opcoesTema: { valor: PreferenciaTema; titulo: string; descricao: string; icone: NomeIcone; cor: string }[] = [
        { valor: "automatico", titulo: "Automático", descricao: "Segue o tema do celular", icone: "phone-portrait", cor: cores.primaria },
        { valor: "claro", titulo: "Claro", descricao: "Fundo claro o tempo todo", icone: "sunny", cor: cores.aviso },
        { valor: "escuro", titulo: "Escuro", descricao: "Mais confortável à noite", icone: "moon", cor: cores.ceu },
    ];

    // os 4 números do consultório; cada um leva pra lista certa
    const indicadores = dashboard
        ? [
              { icone: "checkmark-done" as NomeIcone, cor: cores.concluido, numero: dashboard.consultas_realizadas_mes, rotulo: "Realizadas no mês", acao: () => p.abrirConsultas("concluidas") },
              { icone: "calendar" as NomeIcone, cor: cores.agendado, numero: dashboard.consultas_agendadas, rotulo: "Agendadas", acao: () => p.abrirConsultas("agendadas") },
              { icone: "alert-circle" as NomeIcone, cor: cores.atrasado, numero: dashboard.consultas_atrasadas, rotulo: "Atrasadas", acao: () => p.abrirConsultas("atrasadas") },
              { icone: "paw" as NomeIcone, cor: cores.pacientes, numero: dashboard.pacientes_cadastrados, rotulo: "Pacientes", acao: p.abrirPacientes },
          ]
        : [];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* ---------- cabeçalho: faixa colorida, avatar, nome e e-mail ---------- */}
                <View style={styles.cabecalho}>
                    <LinearGradient
                        colors={[cores.primaria, cores.secundaria]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.faixa}
                    />
                    <View style={styles.avatar}>
                        <Text style={styles.textoAvatar}>{usuario?.inicial_usuario ?? ""}</Text>
                    </View>
                    <Text style={styles.nome}>{usuario?.nm_usuario ?? ""}</Text>
                    <Text style={styles.email}>{usuario?.email_usuario ?? ""}</Text>

                    <TouchableOpacity style={styles.botaoEditarPerfil} onPress={() => p.abrirModal("dados")}>
                        <Ionicons name="pencil" size={14} color={cores.primaria} />
                        <Text style={styles.textoEditarPerfil}>Editar perfil</Text>
                    </TouchableOpacity>
                </View>

                {/* ---------- números do consultório ---------- */}
                <Text style={styles.tituloGrupo}>Seu consultório</Text>

                {p.carregandoDashboard || !dashboard ? (
                    <TelaCarregando />
                ) : (
                    <>
                        {/* aviso de atrasadas (texto pronto do backend) */}
                        {dashboard.aviso_atrasadas && (
                            <TouchableOpacity style={styles.aviso} onPress={() => p.abrirConsultas("atrasadas")}>
                                <Ionicons name="alert-circle" size={22} color={cores.atrasado} />
                                <Text style={styles.textoAviso}>{dashboard.aviso_atrasadas}</Text>
                                <Ionicons name="chevron-forward" size={18} color={cores.atrasado} />
                            </TouchableOpacity>
                        )}

                        <View style={styles.gradeIndicadores}>
                            {indicadores.map((i) => (
                                <TouchableOpacity key={i.rotulo} style={styles.indicador} onPress={i.acao} activeOpacity={0.8}>
                                    <View style={[styles.iconeIndicador, { backgroundColor: transparente(i.cor, 0.15) }]}>
                                        <Ionicons name={i.icone} size={20} color={i.cor} />
                                    </View>
                                    <Text style={styles.numeroIndicador}>{i.numero}</Text>
                                    <Text style={styles.rotuloIndicador}>{i.rotulo}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* taxa de retorno com barrinha de progresso em degradê */}
                        <View style={styles.cartaoRetorno}>
                            <View style={styles.linhaRetorno}>
                                <View style={styles.tituloComIcone}>
                                    <Ionicons name="trending-up" size={18} color={cores.secundaria} />
                                    <Text style={styles.tituloRetorno}>Taxa de retorno</Text>
                                </View>
                                <Text style={styles.valorRetorno}>{dashboard.taxa_retorno_exibicao}</Text>
                            </View>
                            <View style={styles.trilhaBarra}>
                                <LinearGradient
                                    colors={[cores.secundaria, cores.primaria]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[styles.barra, { width: `${dashboard.taxa_retorno_percentual}%` }]}
                                />
                            </View>
                            <Text style={styles.descricaoRetorno}>{dashboard.taxa_retorno_descricao}</Text>
                        </View>
                    </>
                )}

                <Text style={styles.rodape}>Clyvo ELLV · gestão veterinária inteligente</Text>
            </ScrollView>

            {/* ---------- menu do canto: caixinha com as opções ---------- */}
            {menuAberto && (
                <>
                    {/* tocar fora fecha o menu */}
                    <Pressable style={styles.fundoMenu} onPress={() => setMenuAberto(false)} />

                    <View style={styles.caixaMenu}>
                        {opcoesMenu.map((opcao) => (
                            <TouchableOpacity
                                key={opcao.texto}
                                style={styles.itemMenu}
                                onPress={() => {
                                    setMenuAberto(false);
                                    opcao.acao();
                                }}
                            >
                                <View style={[styles.iconeItemMenu, { backgroundColor: transparente(opcao.cor, 0.15) }]}>
                                    <Ionicons name={opcao.icone} size={17} color={opcao.cor} />
                                </View>
                                <Text style={styles.textoItemMenu}>{opcao.texto}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}

            {/* ---------- modal: aparência (claro, escuro ou automático) ---------- */}
            <Modal visible={aparenciaAberta} transparent animationType="fade" onRequestClose={() => setAparenciaAberta(false)}>
                <View style={styles.fundoAparencia}>
                    <Pressable style={styles.fundoMenu} onPress={() => setAparenciaAberta(false)} />

                    <View style={styles.cardAparencia}>
                        <View style={styles.cabecalhoAparencia}>
                            <Text style={styles.tituloAparencia}>Aparência</Text>
                            <TouchableOpacity style={styles.botaoFechar} onPress={() => setAparenciaAberta(false)}>
                                <Ionicons name="close" size={20} color={cores.textoSecundario} />
                            </TouchableOpacity>
                        </View>

                        {/* tocar numa opção já troca o tema na hora */}
                        {opcoesTema.map((opcao) => {
                            const ativa = preferencia === opcao.valor;
                            return (
                                <TouchableOpacity
                                    key={opcao.valor}
                                    style={[styles.opcaoTema, ativa && { borderColor: opcao.cor, backgroundColor: transparente(opcao.cor, 0.08) }]}
                                    onPress={() => mudarPreferencia(opcao.valor)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[styles.iconeTema, { backgroundColor: transparente(opcao.cor, 0.16) }]}>
                                        <Ionicons name={opcao.icone} size={22} color={opcao.cor} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.tituloTema}>{opcao.titulo}</Text>
                                        <Text style={styles.descricaoTema}>{opcao.descricao}</Text>
                                    </View>
                                    <Ionicons
                                        name={ativa ? "radio-button-on" : "radio-button-off"}
                                        size={22}
                                        color={ativa ? opcao.cor : cores.textoSuave}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </Modal>

            {/* ---------- modal: notificações ---------- */}
            <Modal visible={notificacoesAberta} transparent animationType="fade" onRequestClose={() => setNotificacoesAberta(false)}>
                <View style={styles.fundoAparencia}>
                    <Pressable style={styles.fundoMenu} onPress={() => setNotificacoesAberta(false)} />

                    <View style={styles.cardAparencia}>
                        <View style={styles.cabecalhoAparencia}>
                            <Text style={styles.tituloAparencia}>Notificações</Text>
                            <TouchableOpacity style={styles.botaoFechar} onPress={() => setNotificacoesAberta(false)}>
                                <Ionicons name="close" size={20} color={cores.textoSecundario} />
                            </TouchableOpacity>
                        </View>

                        {/* liga e desliga os lembretes */}
                        <View style={styles.opcaoTema}>
                            <View style={[styles.iconeTema, { backgroundColor: transparente(cores.aviso, 0.16) }]}>
                                <Ionicons name="alarm" size={22} color={cores.aviso} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.tituloTema}>Lembretes de consulta</Text>
                                <Text style={styles.descricaoTema}>Aviso no celular antes de cada consulta agendada</Text>
                            </View>
                            <Switch
                                value={notif.ativos}
                                onValueChange={notif.alternar}
                                trackColor={{ false: cores.borda, true: cores.primaria }}
                                thumbColor={cores.superficie}
                            />
                        </View>

                        {/* quantos avisos estão agendados neste celular */}
                        <View style={styles.opcaoTema}>
                            <View style={[styles.iconeTema, { backgroundColor: transparente(cores.primaria, 0.16) }]}>
                                <Ionicons name="calendar" size={22} color={cores.primaria} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.tituloTema}>{notif.agendados} agendado(s)</Text>
                                <Text style={styles.descricaoTema}>Avisos já programados neste celular</Text>
                            </View>
                        </View>

                        {/* notificação de exemplo */}
                        <TouchableOpacity style={styles.botaoTeste} onPress={notif.testar}>
                            <Ionicons name="paper-plane" size={18} color={cores.textoSobreCor} />
                            <Text style={styles.textoBotaoTeste}>Enviar notificação de teste</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* ---------- modal: dados pessoais ---------- */}
            <ModalFormulario
                visivel={p.modal === "dados"}
                titulo="Dados pessoais"
                onFechar={p.fecharModal}
                onSalvar={p.salvar}
                carregando={p.salvando}
            >
                <CustomTextInput title="Nome" leftIconName="person-outline" value={p.nome} onChangeText={p.setNome} />
                <CustomTextInput
                    title="E-mail"
                    leftIconName="mail-outline"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={p.email}
                    onChangeText={p.setEmail}
                />
            </ModalFormulario>

            {/* ---------- modal: alterar senha ---------- */}
            <ModalFormulario
                visivel={p.modal === "senha"}
                titulo="Alterar senha"
                onFechar={p.fecharModal}
                onSalvar={p.salvar}
                carregando={p.salvando}
            >
                <View style={styles.caixaDica}>
                    <Ionicons name="shield-checkmark" size={20} color={cores.ceu} />
                    <Text style={styles.textoDica}>
                        Use pelo menos 8 caracteres, com letra maiúscula, minúscula, número e símbolo.
                    </Text>
                </View>
                <CustomTextInput
                    title="Nova senha"
                    leftIconName="lock-closed-outline"
                    secureTextEntry={p.senhaVisivel.escondida}
                    rightIconName={p.senhaVisivel.iconeNome}
                    rightIconType="button"
                    onRightIconPress={p.senhaVisivel.alternar}
                    value={p.senha}
                    onChangeText={p.setSenha}
                />
            </ModalFormulario>

            {/* ---------- modal: apagar conta ---------- */}
            <ModalFormulario
                visivel={p.modal === "apagar"}
                titulo="Apagar conta"
                onFechar={p.fecharModal}
                onSalvar={p.apagarConta}
                carregando={p.apagando}
                labelSalvar="Apagar"
                perigoso
            >
                <View style={styles.caixaPerigo}>
                    <Ionicons name="warning" size={20} color={cores.atrasado} />
                    <Text style={styles.textoPerigo}>
                        Isso apaga sua conta e todos os pacientes e consultas cadastrados. Não dá pra desfazer.
                    </Text>
                </View>
                <CustomTextInput
                    title="Digite sua senha para confirmar"
                    leftIconName="lock-closed-outline"
                    secureTextEntry={p.senhaVisivel.escondida}
                    rightIconName={p.senhaVisivel.iconeNome}
                    rightIconType="button"
                    onRightIconPress={p.senhaVisivel.alternar}
                    value={p.senha}
                    onChangeText={p.setSenha}
                />
            </ModalFormulario>
        </View>
    );
}
