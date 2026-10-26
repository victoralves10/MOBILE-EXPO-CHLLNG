import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import FiltroTabs from "../../components/FiltroTabs/Index";
import ModalFormulario from "../../components/ModalFormulario/Index";
import ModalConfirmacao from "../../components/ModalConfirmacao/Index";
import SeletorCalendario from "../../components/SeletorCalendario/Index";
import SeletorNativo from "../../components/SeletorNativo/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { useDetalheConsulta } from "../../hooks/useDetalheConsulta";
import { StatusConsulta } from "../../models/Consulta";
import { styles } from "./styles";

// cor de cada status (só visual, o status vem do backend)
const COR_STATUS = {
    Agendado: colors.bluePrimary,
    Atrasado: colors.danger,
    Concluido: colors.success,
};

// opções da situação no modal de edição
const OPCOES_STATUS: { valor: StatusConsulta; label: string; cor: string }[] = [
    { valor: "Agendado", label: "Agendar", cor: colors.bluePrimary },
    { valor: "Concluido", label: "Já realizada", cor: colors.success },
];

// uma linha com ícone e texto
function Linha({ icone, texto }: { icone: keyof typeof Ionicons.glyphMap; texto: string }) {
    return (
        <View style={styles.linha}>
            <Ionicons name={icone} size={18} color={colors.bluePrimary} />
            <Text style={styles.textoLinha}>{texto}</Text>
        </View>
    );
}

// tela de detalhe da consulta: tudo já vem formatado do backend, a tela só mostra
export default function DetalheConsulta() {
    const d = useDetalheConsulta();
    const { consulta } = d;

    if (d.carregando) return <TelaCarregando telaCheia />;
    if (!consulta) return <Text style={styles.textoVazio}>{d.erro ?? "Consulta não encontrada."}</Text>;

    const { animal, responsavel } = consulta;
    const cor = COR_STATUS[consulta.st_consulta];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {/* selo do status no topo */}
                <View style={[styles.tagStatus, { backgroundColor: cor + "20" }]}>
                    <Text style={[styles.textoStatus, { color: cor }]}>{consulta.st_consulta_rotulo}</Text>
                </View>

                {/* consulta */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Consulta</Text>
                    <Linha icone="document-text-outline" texto={consulta.historico_consulta} />
                    <Linha icone="calendar-outline" texto={consulta.data_hora_exibicao} />

                    {/* abre a sala real da consulta online (link vem do backend) */}
                    <TouchableOpacity style={styles.botaoOnline} onPress={() => Linking.openURL(consulta.link_consulta_online)}>
                        <Ionicons name="videocam-outline" size={18} color={colors.white} />
                        <Text style={styles.textoBotaoOnline}>Iniciar consulta online</Text>
                    </TouchableOpacity>
                </View>

                {/* animal */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Animal</Text>
                    <Linha icone="paw-outline" texto={animal.nm_animal} />
                    <Linha icone="leaf-outline" texto={`${animal.especie_animal} • ${animal.raca_animal_exibicao}`} />
                    <Linha icone="calendar-outline" texto={`Nascimento: ${animal.dt_nascimento_animal_exibicao}`} />
                    <Linha icone="fitness-outline" texto={`Peso: ${animal.peso_animal_exibicao}`} />
                    <Linha icone="card-outline" texto={`RG: ${animal.rg_animal_exibicao}`} />
                    <Linha icone="hardware-chip-outline" texto={`Microchip: ${animal.nr_microchip_animal_exibicao}`} />

                    <TouchableOpacity style={styles.botaoContorno} onPress={d.abrirFichaPaciente}>
                        <Ionicons name="folder-open-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoBotaoContorno}>Ver ficha do paciente</Text>
                    </TouchableOpacity>
                </View>

                {/* responsável */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Responsável</Text>
                    <Linha icone="person-outline" texto={responsavel.nm_responsavel} />
                    <Linha icone="id-card-outline" texto={`CPF: ${responsavel.cpf_responsavel_exibicao}`} />
                    <Linha icone="call-outline" texto={responsavel.nr_telefone_responsavel_exibicao} />
                    <Linha icone="location-outline" texto={`Região: ${responsavel.nm_regiao_exibicao}`} />

                    {/* abre o WhatsApp já com a mensagem pronta (link vem do backend) */}
                    <TouchableOpacity style={styles.botaoWhatsapp} onPress={() => Linking.openURL(responsavel.link_whatsapp)}>
                        <Ionicons name="logo-whatsapp" size={18} color={colors.white} />
                        <Text style={styles.textoBotaoOnline}>Conversar no WhatsApp</Text>
                    </TouchableOpacity>
                </View>

                {/* editar e remover */}
                <View style={styles.containerBotoes}>
                    <TouchableOpacity style={styles.botaoEditar} onPress={d.abrirModalEditar}>
                        <Ionicons name="pencil-outline" size={18} color={colors.white} />
                        <Text style={styles.textoBotao}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.botaoRemover, d.removendo && { opacity: 0.7 }]}
                        onPress={d.abrirConfirmarRemover}
                        disabled={d.removendo}
                    >
                        <Ionicons name="trash-outline" size={18} color={colors.white} />
                        <Text style={styles.textoBotao}>Remover</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* modal de edição */}
            <ModalFormulario
                visivel={d.modalEditarAberto}
                titulo="Editar Consulta"
                onFechar={d.fecharModalEditar}
                onSalvar={d.salvar}
                carregando={d.salvando}
            >
                <CustomTextInput
                    title="Motivo da consulta *"
                    placeholder="Ex: Vacinação anual"
                    value={d.form.historico_consulta}
                    onChangeText={d.mudar("historico_consulta")}
                />
                <SeletorCalendario titulo="Data *" valor={d.form.dt_consulta} onChange={d.mudar("dt_consulta")} />
                <SeletorNativo titulo="Horário *" valor={d.form.hr_consulta} onChange={d.mudar("hr_consulta")} />

                <Text style={styles.labelStatus}>Situação</Text>
                <View style={styles.containerAbasModal}>
                    <FiltroTabs opcoes={OPCOES_STATUS} valorSelecionado={d.form.st_consulta} onSelecionar={d.mudar("st_consulta")} />
                </View>
            </ModalFormulario>

            {/* confirmação antes de remover */}
            <ModalConfirmacao
                visivel={d.confirmarRemoverAberto}
                titulo="Remover consulta"
                mensagem="Deseja remover esta consulta? O paciente e o responsável continuam cadastrados."
                labelConfirmar="Remover"
                perigoso
                onConfirmar={d.confirmarRemover}
                onCancelar={d.fecharConfirmarRemover}
            />
        </View>
    );
}