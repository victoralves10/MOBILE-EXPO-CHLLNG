import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";
import { corDoStatus, transparente } from "../../theme/paletas";
import BotaoAcao from "../../components/BotaoAcao/Index";
import LinhaInfo from "../../components/LinhaInfo/Index";
import CustomTextInput from "../../components/CustomTextInput/Index";
import FiltroTabs from "../../components/FiltroTabs/Index";
import ModalFormulario from "../../components/ModalFormulario/Index";
import ModalConfirmacao from "../../components/ModalConfirmacao/Index";
import SeletorCalendario from "../../components/SeletorCalendario/Index";
import SeletorNativo from "../../components/SeletorNativo/Index";
import SeletorOpcoes from "../../components/SeletorOpcoes/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { useDetalheConsulta } from "../../hooks/useDetalheConsulta";
import { StatusConsulta } from "../../models/Consulta";

// ícone de cada status, só visual
const ICONE_STATUS = { Agendado: "time", Atrasado: "alert-circle", Concluido: "checkmark-circle" } as const;

// tela de detalhe da consulta: tudo já vem formatado do backend, a tela só mostra
export default function DetalheConsulta() {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();
    const d = useDetalheConsulta();
    const { consulta } = d;

    // opções da situação no modal de edição
    const opcoesStatus: { valor: StatusConsulta; label: string; cor: string; icone: keyof typeof Ionicons.glyphMap }[] = [
        { valor: "Agendado", label: "Agendar", cor: cores.agendado, icone: "calendar" },
        { valor: "Concluido", label: "Já realizada", cor: cores.concluido, icone: "checkmark-done" },
    ];

    if (d.carregando) return <TelaCarregando telaCheia />;
    if (!consulta) return <Text style={styles.textoVazio}>{d.erro ?? "Consulta não encontrada."}</Text>;

    const { animal, responsavel } = consulta;
    const cor = corDoStatus(cores, consulta.st_consulta);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* card do topo: animal, data e status */}
                <View style={styles.destaque}>
                    <View style={[styles.avatarGrande, { backgroundColor: transparente(cor, 0.15) }]}>
                        <Text style={[styles.textoAvatarGrande, { color: cor }]}>{animal.inicial_animal}</Text>
                    </View>
                    <Text style={styles.nomeDestaque}>{animal.nm_animal}</Text>
                    <Text style={styles.subtituloDestaque}>{consulta.data_hora_exibicao}</Text>

                    <View style={[styles.seloStatus, { backgroundColor: transparente(cor, 0.15) }]}>
                        <Ionicons name={ICONE_STATUS[consulta.st_consulta]} size={15} color={cor} />
                        <Text style={[styles.textoSeloStatus, { color: cor }]}>{consulta.st_consulta_rotulo}</Text>
                    </View>
                </View>

                {/* ações rápidas: links prontos que vêm do backend */}
                <View style={styles.linhaAcoes}>
                    <BotaoAcao
                        icone="videocam"
                        texto="Videochamada"
                        cor={cores.primaria}
                        onPress={() => Linking.openURL(consulta.link_consulta_online)}
                    />
                    <BotaoAcao
                        icone="logo-whatsapp"
                        texto="WhatsApp"
                        cor={cores.whatsapp}
                        onPress={() => Linking.openURL(responsavel.link_whatsapp)}
                    />
                    <BotaoAcao icone="folder-open" texto="Ficha" cor={cores.pacientes} onPress={d.abrirFichaPaciente} />
                </View>

                {/* consulta */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Consulta</Text>
                    <LinhaInfo icone="document-text" cor={cores.primaria} rotulo="Motivo" valor={consulta.historico_consulta} />
                    <LinhaInfo icone="calendar" cor={cores.ceu} rotulo="Data e horário" valor={consulta.data_hora_exibicao} />
                    {/* só aparece quando tem diagnóstico registrado */}
                    {consulta.ds_doenca && (
                        <LinhaInfo icone="medkit" cor={cores.atrasado} rotulo="Diagnóstico / suspeita" valor={consulta.ds_doenca_exibicao} />
                    )}
                </View>

                {/* animal */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Animal</Text>
                    <LinhaInfo
                        icone="paw"
                        cor={cores.pacientes}
                        rotulo="Espécie e raça"
                        valor={`${animal.especie_animal} • ${animal.raca_animal_exibicao}`}
                    />
                    <LinhaInfo icone="gift" cor={cores.rosa} rotulo="Nascimento" valor={animal.dt_nascimento_animal_exibicao} />
                    <LinhaInfo icone="barbell" cor={cores.laranja} rotulo="Peso" valor={animal.peso_animal_exibicao} />
                    <LinhaInfo icone="card" cor={cores.ceu} rotulo="RG" valor={animal.rg_animal_exibicao} />
                    <LinhaInfo icone="hardware-chip" cor={cores.primaria} rotulo="Microchip" valor={animal.nr_microchip_animal_exibicao} />
                </View>

                {/* responsável */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Responsável</Text>
                    <LinhaInfo icone="person" cor={cores.rosa} rotulo="Nome" valor={responsavel.nm_responsavel} />
                    <LinhaInfo icone="id-card" cor={cores.primaria} rotulo="CPF" valor={responsavel.cpf_responsavel_exibicao} />
                    <LinhaInfo icone="call" cor={cores.whatsapp} rotulo="Telefone" valor={responsavel.nr_telefone_responsavel_exibicao} />
                    <LinhaInfo icone="location" cor={cores.laranja} rotulo="Região" valor={responsavel.nm_regiao_exibicao} />
                </View>

                {/* editar e remover */}
                <View style={styles.containerBotoes}>
                    <TouchableOpacity style={styles.botaoEditar} onPress={d.abrirModalEditar}>
                        <Ionicons name="pencil" size={18} color={cores.textoSobreCor} />
                        <Text style={styles.textoBotaoEditar}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.botaoRemover, d.removendo && { opacity: 0.6 }]}
                        onPress={d.abrirConfirmarRemover}
                        disabled={d.removendo}
                    >
                        <Ionicons name="trash" size={18} color={cores.atrasado} />
                        <Text style={styles.textoBotaoRemover}>Remover</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* modal de edição */}
            <ModalFormulario
                visivel={d.modalEditarAberto}
                titulo="Editar consulta"
                onFechar={d.fecharModalEditar}
                onSalvar={d.salvar}
                carregando={d.salvando}
            >
                <CustomTextInput
                    title="Motivo da consulta *"
                    placeholder="Ex: Vacinação anual"
                    leftIconName="document-text-outline"
                    value={d.form.historico_consulta}
                    onChangeText={d.mudar("historico_consulta")}
                />
                <SeletorCalendario titulo="Data *" valor={d.form.dt_consulta} onChange={d.mudar("dt_consulta")} />
                <SeletorNativo titulo="Horário *" valor={d.form.hr_consulta} onChange={d.mudar("hr_consulta")} />

                <Text style={styles.labelStatus}>Situação</Text>
                <View style={styles.containerAbasModal}>
                    <FiltroTabs opcoes={opcoesStatus} valorSelecionado={d.form.st_consulta} onSelecionar={d.mudar("st_consulta")} />
                </View>

                {/* opcional: o que o animal tem; entra no mapa de ocorrências da Home */}
                <SeletorOpcoes
                    titulo="Diagnóstico / suspeita (opcional)"
                    opcoes={d.doencas.map((doenca) => ({ valor: doenca, rotulo: doenca }))}
                    selecionado={d.form.ds_doenca}
                    onSelecionar={d.mudar("ds_doenca")}
                />
            </ModalFormulario>

            {/* confirmação antes de remover */}
            <ModalConfirmacao
                visivel={d.confirmarRemoverAberto}
                titulo="Remover consulta?"
                mensagem="O paciente e o responsável continuam cadastrados."
                labelConfirmar="Remover"
                perigoso
                icone="trash"
                onConfirmar={d.confirmarRemover}
                onCancelar={d.fecharConfirmarRemover}
            />
        </View>
    );
}
