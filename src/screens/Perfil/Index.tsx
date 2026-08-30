import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import ModalConfirmacao from "../../components/ModalConfirmacao/Index";
import ModalFormulario from "../../components/ModalFormulario/Index";
import { usePerfil } from "../../hooks/usePerfil";

export default function Perfil() {
    const {
        usuario,
        inicial,
        consultasDoMes,
        agendadas,
        atrasadas,
        totalPacientes,
        taxaRetorno,
        carregandoKpis,

        modalSairAberto,
        setModalSairAberto,
        sair,

        modalEditarAberto,
        abrirModalEditar,
        fecharModalEditar,
        nome,
        setNome,
        email,
        setEmail,
        novaSenha,
        setNovaSenha,
        senhaVisivel,
        confirmarEdicao,
        editandoPerfil,

        modalApagarAberto,
        abrirModalApagar,
        fecharModalApagar,
        senhaConfirmacao,
        setSenhaConfirmacao,
        senhaConfirmacaoVisivel,
        confirmarApagarConta,
        modalConfirmarApagarAberto,
        setModalConfirmarApagarAberto,
        executarApagarConta,
        apagandoConta,
    } = usePerfil();

    return (
        <ScrollView style={styles.containerTela} contentContainerStyle={styles.containerScroll}>

            {/* cabeçalho: avatar + nome + email */}
            <View style={styles.containerCabecalho}>
                <View style={styles.avatar}>
                    <Text style={styles.textoAvatar}>{inicial}</Text>
                </View>
                <Text style={styles.textoNome}>{usuario?.nm_usuario ?? "..."}</Text>
                <Text style={styles.textoEmail}>{usuario?.email_usuario ?? ""}</Text>
            </View>

            {/* grid 2x2 dos KPIs simples */}
            {carregandoKpis ? (
                <TelaCarregando />
            ) : (
                <>
                    <View style={styles.gridKpis}>
                        <View style={styles.cardKpi}>
                            <Text style={styles.numeroKpi}>{consultasDoMes}</Text>
                            <Text style={styles.labelKpi}>Consultas{"\n"}este mês</Text>
                        </View>

                        <View style={styles.cardKpi}>
                            <Text style={[styles.numeroKpi, { color: colors.bluePrimary }]}>{agendadas}</Text>
                            <Text style={styles.labelKpi}>Agendadas</Text>
                        </View>

                        <View style={[styles.cardKpi, atrasadas > 0 && styles.cardKpiAlerta]}>
                            <Text style={[styles.numeroKpi, { color: atrasadas > 0 ? colors.danger : colors.dark }]}>
                                {atrasadas}
                            </Text>
                            <Text style={styles.labelKpi}>Atrasadas</Text>
                        </View>

                        <View style={styles.cardKpi}>
                            <Text style={styles.numeroKpi}>{totalPacientes}</Text>
                            <Text style={styles.labelKpi}>Pacientes{"\n"}cadastrados</Text>
                        </View>
                    </View>

                    {/* card de destaque: taxa de retorno */}
                    <View style={styles.cardDestaque}>
                        <View style={styles.containerDestaqueTexto}>
                            <Text style={styles.numeroDestaque}>{taxaRetorno}%</Text>
                            <Text style={styles.labelDestaque}>dos seus pacientes já retornaram para uma nova consulta</Text>
                        </View>
                        <Ionicons name="trending-up" size={32} color={colors.white} />
                    </View>
                </>
            )}

            {/* menu de ações */}
            <View style={styles.containerMenu}>
                <TouchableOpacity style={styles.itemMenu} onPress={abrirModalEditar}>
                    <Ionicons name="create-outline" size={22} color={colors.dark} />
                    <Text style={styles.textoItemMenu}>Editar meus dados</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.grayMedium} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemMenu} onPress={abrirModalApagar}>
                    <Ionicons name="trash-outline" size={22} color={colors.danger} />
                    <Text style={[styles.textoItemMenu, { color: colors.danger }]}>Apagar conta</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.grayMedium} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.botaoSair} onPress={() => setModalSairAberto(true)}>
                <Ionicons name="log-out-outline" size={20} color={colors.white} />
                <Text style={styles.textoBotaoSair}>Sair da conta</Text>
            </TouchableOpacity>

            {/* modal: editar meus dados */}
            <ModalFormulario
                visivel={modalEditarAberto}
                titulo="Editar meus dados"
                onFechar={fecharModalEditar}
                onSalvar={confirmarEdicao}
                carregando={editandoPerfil}
                labelSalvar="Salvar"
            >
                <CustomTextInput
                    title="Nome"
                    value={nome}
                    onChangeText={setNome}
                    autoCapitalize="words"
                />
                <CustomTextInput
                    title="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <CustomTextInput
                    title="Nova senha (opcional)"
                    placeholder="Deixe em branco pra manter a atual"
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    rightIconName={senhaVisivel.iconeNome}
                    rightIconType="button"
                    onRightIconPress={senhaVisivel.alternar}
                    secureTextEntry={senhaVisivel.escondida}
                />
            </ModalFormulario>

            {/* modal: apagar conta (pede senha primeiro) */}
            <ModalFormulario
                visivel={modalApagarAberto}
                titulo="Apagar conta"
                onFechar={fecharModalApagar}
                onSalvar={confirmarApagarConta}
                carregando={apagandoConta}
                labelSalvar="Apagar"
            >
                <Text style={styles.textoAvisoModal}>
                    Digite sua senha atual pra confirmar. Essa ação não pode ser desfeita.
                </Text>
                <CustomTextInput
                    title="Senha atual"
                    value={senhaConfirmacao}
                    onChangeText={setSenhaConfirmacao}
                    rightIconName={senhaConfirmacaoVisivel.iconeNome}
                    rightIconType="button"
                    onRightIconPress={senhaConfirmacaoVisivel.alternar}
                    secureTextEntry={senhaConfirmacaoVisivel.escondida}
                />
            </ModalFormulario>

            {/* confirmação final de apagar conta (depois de digitar a senha) */}
            <ModalConfirmacao
                visivel={modalConfirmarApagarAberto}
                titulo="Apagar conta"
                mensagem="Essa ação não pode ser desfeita. Todos os seus pacientes e consultas serão apagados junto. Tem certeza?"
                labelConfirmar="Apagar"
                perigoso
                onConfirmar={executarApagarConta}
                onCancelar={() => setModalConfirmarApagarAberto(false)}
            />

            {/* confirmação de sair */}
            <ModalConfirmacao
                visivel={modalSairAberto}
                titulo="Sair"
                mensagem="Tem certeza que quer sair da conta?"
                labelConfirmar="Sair"
                perigoso
                onConfirmar={() => { setModalSairAberto(false); sair(); }}
                onCancelar={() => setModalSairAberto(false)}
            />

        </ScrollView>
    );
}