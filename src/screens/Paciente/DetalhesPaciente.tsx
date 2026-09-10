import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import ModalFormulario from "../../components/ModalFormulario/Index";
import ModalConfirmacao from "../../components/ModalConfirmacao/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { useDetalhePaciente } from "../../hooks/useDetalhePaciente";
import { formatarData } from "../../utils/formatacao";
import { toastAviso } from "../../utils/toast";
import { styles } from "./styles";

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

export default function DetalhePaciente() {
    const {
        animal,
        responsavel,
        consultas,
        carregando,
        abrirDetalheConsulta,

        modalVisivel,
        abrirModalEditar,
        fecharModalEditar,
        nmAnimal, setNmAnimal,
        especieAnimal, setEspecieAnimal,
        racaAnimal, setRacaAnimal,
        dtNascimento, setDtNascimento,
        pesoAnimal, setPesoAnimal,
        rgAnimal, setRgAnimal,
        microchip, setMicrochip,
        nmResponsavel, setNmResponsavel,
        cpfResponsavel, setCpfResponsavel,
        telefoneResponsavel, setTelefoneResponsavel,
        handleSalvar,
        salvando,

        remover,
        removendo,
    } = useDetalhePaciente();

    const [confirmarRemoverAberto, setConfirmarRemoverAberto] = useState(false);

    if (carregando || !animal || !responsavel) {
        return <TelaCarregando telaCheia />;
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

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

                    <TouchableOpacity
                        style={styles.botaoWhatsApp}
                        onPress={() => toastAviso(`Abrindo conversa com ${responsavel.nm_responsavel} pelo WhatsApp.`)}
                    >
                        <Ionicons name="logo-whatsapp" size={18} color={colors.white} />
                        <Text style={styles.textoBotaoWhatsApp}>Abrir WhatsApp</Text>
                    </TouchableOpacity>
                </View>

                {/* histórico de consultas — cada card é clicável */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Histórico de Consultas</Text>

                    {consultas.length === 0 ? (
                        <Text style={styles.textoSemConsulta}>Nenhuma consulta registrada.</Text>
                    ) : (
                        consultas.map((consulta) => {
                            const statusEstilo = getStatusEstilo(consulta.st_consulta);
                            return (
                                <TouchableOpacity
                                    key={consulta.id_consulta}
                                    style={styles.cardConsulta}
                                    onPress={() => abrirDetalheConsulta(consulta.id_consulta)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.linhaConsulta}>
                                        <Text style={styles.textoConsultaMotivo}>
                                            {consulta.historico_consulta}
                                        </Text>
                                        <View style={[styles.tagStatus, { backgroundColor: statusEstilo.bg }]}>
                                            <Text style={[styles.textoStatus, { color: statusEstilo.texto }]}>
                                                {consulta.st_consulta}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.textoConsultaData}>
                                        {formatarData(consulta.dt_consulta)} às {consulta.hr_consulta}
                                    </Text>
                                    <View style={styles.linhaVerDetalhes}>
                                        <Text style={styles.textoVerDetalhes}>Ver detalhes</Text>
                                        <Ionicons name="chevron-forward" size={14} color={colors.bluePrimary} />
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    )}
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

            {/* modal de edição do animal e responsável */}
            <ModalFormulario
                visivel={modalVisivel}
                titulo="Editar Paciente"
                onFechar={fecharModalEditar}
                onSalvar={handleSalvar}
                carregando={salvando}
                labelSalvar="Salvar"
            >
                <CustomTextInput title="Nome do Animal *" placeholder="Ex: Rex" value={nmAnimal} onChangeText={setNmAnimal} />
                <CustomTextInput title="Espécie *" placeholder="Ex: Cão, Gato" value={especieAnimal} onChangeText={setEspecieAnimal} />
                <CustomTextInput title="Raça" placeholder="Ex: Labrador" value={racaAnimal} onChangeText={setRacaAnimal} />
                <CustomTextInput title="Data de Nascimento" placeholder="DD/MM/AAAA" value={dtNascimento} onChangeText={setDtNascimento} />
                <CustomTextInput title="Peso (kg)" placeholder="Ex: 12.5" value={pesoAnimal} onChangeText={setPesoAnimal} keyboardType="numeric" />
                <CustomTextInput title="RG do Animal" placeholder="Ex: 123456" value={rgAnimal} onChangeText={setRgAnimal} />
                <CustomTextInput title="Microchip" placeholder="Ex: 985112345678901" value={microchip} onChangeText={setMicrochip} keyboardType="numeric" />

                <CustomTextInput title="Nome do Responsável *" placeholder="Ex: João Silva" value={nmResponsavel} onChangeText={setNmResponsavel} />
                <CustomTextInput title="CPF do Responsável *" placeholder="Ex: 000.000.000-00" value={cpfResponsavel} onChangeText={setCpfResponsavel} keyboardType="numeric" />
                <CustomTextInput title="Telefone do Responsável *" placeholder="Ex: (11) 99999-9999" value={telefoneResponsavel} onChangeText={setTelefoneResponsavel} keyboardType="numeric" />
            </ModalFormulario>

            {/* confirmação de remover */}
            <ModalConfirmacao
                visivel={confirmarRemoverAberto}
                titulo="Remover Paciente"
                mensagem="Deseja realmente remover este paciente? Todas as consultas associadas também serão removidas."
                labelConfirmar="Remover"
                perigoso
                onConfirmar={() => { setConfirmarRemoverAberto(false); remover(); }}
                onCancelar={() => setConfirmarRemoverAberto(false)}
            />

        </View>
    );
}