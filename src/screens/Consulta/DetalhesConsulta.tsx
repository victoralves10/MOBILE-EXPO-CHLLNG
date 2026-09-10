import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import ModalFormulario from "../../components/ModalFormulario/Index";
import ModalConfirmacao from "../../components/ModalConfirmacao/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { useDetalheConsulta } from "../../hooks/useDetalheConsulta";
import { formatarData } from "../../utils/formatacao";
import { toastAviso } from "../../utils/toast";
import { StatusConsulta } from "../../models/Consulta";
import { styles } from "./styles";

const STATUS_OPCOES: StatusConsulta[] = ["Agendado", "Concluido", "Atrasado"];

// retorna a cor de fundo e do texto dependendo do status da consulta
function getStatusEstilo(status: string) {
    switch (status) {
        case "Concluido":
            return { bg: colors.success + "20", texto: colors.success };
        case "Atrasado":
            return { bg: colors.danger + "20", texto: colors.danger };
        default:
            return { bg: colors.bluePrimary + "20", texto: colors.bluePrimary };
    }
}

export default function DetalheConsulta() {
    const {
        consulta,
        animal,
        responsavel,
        carregando,

        modalVisivel,
        abrirModalEditar,
        fecharModalEditar,
        historico, setHistorico,
        dtConsulta, setDtConsulta,
        hrConsulta, setHrConsulta,
        status, setStatus,
        handleSalvar,
        salvando,

        remover,
        removendo,
    } = useDetalheConsulta();

    const [confirmarRemoverAberto, setConfirmarRemoverAberto] = useState(false);

    if (carregando || !consulta || !animal || !responsavel) {
        return <TelaCarregando telaCheia />;
    }

    const statusEstilo = getStatusEstilo(consulta.st_consulta);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {/* badge colorido do status no topo */}
                <View style={[styles.tagStatus, { backgroundColor: statusEstilo.bg }]}>
                    <Text style={[styles.textoStatus, { color: statusEstilo.texto }]}>
                        {consulta.st_consulta}
                    </Text>
                </View>

                {/* seção com os dados da consulta */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Consulta</Text>
                    <View style={styles.linha}>
                        <Ionicons name="document-text-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{consulta.historico_consulta}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="calendar-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{formatarData(consulta.dt_consulta)}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="time-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{consulta.hr_consulta}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.botaoOnline}
                        onPress={() => toastAviso("Levando você para a consulta online.")}
                    >
                        <Ionicons name="videocam-outline" size={18} color={colors.white} />
                        <Text style={styles.textoBotaoOnline}>Iniciar Consulta Online</Text>
                    </TouchableOpacity>
                </View>

                {/* seção com os dados do animal */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Animal</Text>
                    <View style={styles.linha}>
                        <Ionicons name="paw-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{animal.nm_animal}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="leaf-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{animal.especie_animal} • {animal.raca_animal ?? "-"}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="calendar-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>Nascimento: {animal.dt_nascimento_animal ? formatarData(animal.dt_nascimento_animal) : "-"}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="fitness-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>Peso: {animal.peso_animal ?? "-"} kg</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="card-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>RG: {animal.rg_animal ?? "-"}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="wifi-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>Microchip: {animal.nr_microchip_animal ?? "-"}</Text>
                    </View>
                </View>

                {/* seção com os dados do responsável */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Responsável</Text>
                    <View style={styles.linha}>
                        <Ionicons name="person-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{responsavel.nm_responsavel}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="id-card-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>CPF: {responsavel.cpf_responsavel}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="call-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{responsavel.nr_telefone_responsavel}</Text>
                    </View>
                </View>

                {/* botões de editar e remover no final da tela */}
                <View style={styles.containerBotoes}>
                    <TouchableOpacity style={styles.botaoEditar} onPress={abrirModalEditar}>
                        <Ionicons name="pencil-outline" size={18} color={colors.white} />
                        <Text style={styles.textoBotao}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.botaoRemover, removendo && { opacity: 0.7 }]}
                        onPress={() => setConfirmarRemoverAberto(true)}
                        disabled={removendo}
                    >
                        <Ionicons name="trash-outline" size={18} color={colors.white} />
                        <Text style={styles.textoBotao}>Remover</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* modal de edição da consulta */}
            <ModalFormulario
                visivel={modalVisivel}
                titulo="Editar Consulta"
                onFechar={fecharModalEditar}
                onSalvar={handleSalvar}
                carregando={salvando}
                labelSalvar="Salvar"
            >
                <CustomTextInput title="Histórico / Motivo *" placeholder="Ex: Vacinação anual" value={historico} onChangeText={setHistorico} />
                <CustomTextInput title="Data *" placeholder="DD/MM/AAAA" value={dtConsulta} onChangeText={setDtConsulta} />
                <CustomTextInput title="Horário *" placeholder="HH:MM" value={hrConsulta} onChangeText={setHrConsulta} />

                <View style={styles.containerStatus}>
                    <Text style={styles.labelStatus}>Status</Text>
                    <View style={styles.containerOpcoes}>
                        {STATUS_OPCOES.map((opcao) => (
                            <TouchableOpacity
                                key={opcao}
                                style={[styles.opcaoStatus, status === opcao && styles.opcaoStatusAtiva]}
                                onPress={() => setStatus(opcao)}
                            >
                                <Text style={[styles.textoOpcaoStatus, status === opcao && styles.textoOpcaoStatusAtiva]}>
                                    {opcao}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ModalFormulario>

            {/* confirmação de remover */}
            <ModalConfirmacao
                visivel={confirmarRemoverAberto}
                titulo="Remover Consulta"
                mensagem="Deseja realmente remover esta consulta?"
                labelConfirmar="Remover"
                perigoso
                onConfirmar={() => { setConfirmarRemoverAberto(false); remover(); }}
                onCancelar={() => setConfirmarRemoverAberto(false)}
            />

        </View>
    );
}