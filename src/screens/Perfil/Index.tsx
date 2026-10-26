import React, { useLayoutEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import ModalFormulario from "../../components/ModalFormulario/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { usePerfil } from "../../hooks/usePerfil";

// um número do consultório; tocar leva pra lista correspondente
function Indicador({
    icone,
    cor,
    numero,
    rotulo,
    onPress,
}: {
    icone: keyof typeof Ionicons.glyphMap;
    cor: string;
    numero: number;
    rotulo: string;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity style={styles.indicador} onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.iconeIndicador, { backgroundColor: cor + "1A" }]}>
                <Ionicons name={icone} size={18} color={cor} />
            </View>
            <Text style={styles.numeroIndicador}>{numero}</Text>
            <Text style={styles.rotuloIndicador}>{rotulo}</Text>
        </TouchableOpacity>
    );
}

// tela de perfil: quem está logado e como está o consultório
// as opções da conta ficam no menu ☰ do canto de cima
export default function Perfil() {
    const p = usePerfil();
    const { usuario, dashboard } = p;
    const navigation = useNavigation();

    // menuzinho do canto aberto ou fechado
    const [menuAberto, setMenuAberto] = useState(false);

    // coloca o botão ☰ no cabeçalho da tela
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.botaoMenu}>
                    <Ionicons name="menu" size={26} color={colors.dark} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    // opções do menu: fecha o menu e faz a ação
    const opcoesMenu: { icone: keyof typeof Ionicons.glyphMap; texto: string; perigo?: boolean; acao: () => void }[] = [
        { icone: "person-outline", texto: "Dados pessoais", acao: () => p.abrirModal("dados") },
        { icone: "lock-closed-outline", texto: "Alterar senha", acao: () => p.abrirModal("senha") },
        { icone: "log-out-outline", texto: "Sair da conta", perigo: true, acao: p.sair },
        { icone: "trash-outline", texto: "Apagar conta", perigo: true, acao: () => p.abrirModal("apagar") },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* ---------- cabeçalho com avatar, nome e e-mail ---------- */}
                <View style={styles.cabecalho}>
                    <View style={styles.avatar}>
                        <Text style={styles.textoAvatar}>{usuario?.inicial_usuario ?? ""}</Text>
                    </View>
                    <Text style={styles.nome}>{usuario?.nm_usuario ?? ""}</Text>
                    <Text style={styles.email}>{usuario?.email_usuario ?? ""}</Text>

                    <TouchableOpacity style={styles.botaoEditarPerfil} onPress={() => p.abrirModal("dados")}>
                        <Ionicons name="pencil" size={14} color={colors.bluePrimary} />
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
                                <Ionicons name="alert-circle" size={20} color={colors.danger} />
                                <Text style={styles.textoAviso}>{dashboard.aviso_atrasadas}</Text>
                                <Ionicons name="chevron-forward" size={18} color={colors.danger} />
                            </TouchableOpacity>
                        )}

                        <View style={styles.gradeIndicadores}>
                            <Indicador
                                icone="checkmark-done"
                                cor={colors.success}
                                numero={dashboard.consultas_realizadas_mes}
                                rotulo="Realizadas no mês"
                                onPress={() => p.abrirConsultas("concluidas")}
                            />
                            <Indicador
                                icone="calendar"
                                cor={colors.bluePrimary}
                                numero={dashboard.consultas_agendadas}
                                rotulo="Agendadas"
                                onPress={() => p.abrirConsultas("agendadas")}
                            />
                            <Indicador
                                icone="alert-circle"
                                cor={colors.danger}
                                numero={dashboard.consultas_atrasadas}
                                rotulo="Atrasadas"
                                onPress={() => p.abrirConsultas("atrasadas")}
                            />
                            <Indicador
                                icone="paw"
                                cor={colors.purple}
                                numero={dashboard.pacientes_cadastrados}
                                rotulo="Pacientes"
                                onPress={p.abrirPacientes}
                            />
                        </View>

                        {/* taxa de retorno com barrinha de progresso */}
                        <View style={styles.cartaoRetorno}>
                            <View style={styles.linhaRetorno}>
                                <Text style={styles.tituloRetorno}>Taxa de retorno</Text>
                                <Text style={styles.valorRetorno}>{dashboard.taxa_retorno_exibicao}</Text>
                            </View>
                            <View style={styles.trilhaBarra}>
                                <View style={[styles.barra, { width: `${dashboard.taxa_retorno_percentual}%` }]} />
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
                                <Ionicons name={opcao.icone} size={20} color={opcao.perigo ? colors.danger : colors.dark} />
                                <Text style={[styles.textoItemMenu, opcao.perigo && { color: colors.danger }]}>{opcao.texto}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}

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
                <Text style={styles.textoModal}>
                    Use pelo menos 8 caracteres, com letra maiúscula, minúscula, número e símbolo.
                </Text>
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
            >
                <Text style={styles.textoModalPerigo}>
                    Isso apaga sua conta e todos os pacientes e consultas cadastrados. Não dá pra desfazer.
                </Text>
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