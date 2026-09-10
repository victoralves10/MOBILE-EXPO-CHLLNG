import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import ConsultaCard from "../../components/ConsultaCard/Index";
import FiltroTabs from "../../components/FiltroTabs/Index";
import ModalFormulario from "../../components/ModalFormulario/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { useConsultas } from "../../hooks/useConsultas";
import { toastAviso } from "../../utils/toast";

// cor de cada aba de filtro
const CORES_STATUS = {
    Agendado: colors.bluePrimary,
    Atrasado: colors.danger,
    Concluido: colors.success,
};

export default function ConsultaTela() {
    const {
        busca, setBusca,
        filtroStatus, setFiltroStatus,
        FILTROS_STATUS,
        carregando,
        consultasFiltradas,
        abrirDetalheConsulta,

        modalVisivel,
        abrirModalNovaConsulta,
        fecharModalNovaConsulta,
        salvandoConsulta,
        handleSalvar,

        historico, setHistorico,
        dtConsulta, setDtConsulta,
        hrConsulta, setHrConsulta,
        status, setStatus,
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
    } = useConsultas();

    return (
        <View style={styles.container}>

            {/* barra de busca + abas de filtro por status */}
            <View style={styles.containerBusca}>
                <CustomTextInput
                    placeholder="Buscar consulta..."
                    leftIconName="search"
                    value={busca}
                    onChangeText={setBusca}
                    containerStyle={{ marginBottom: 0 }}
                />

                <FiltroTabs
                    opcoes={FILTROS_STATUS.map((s) => ({ valor: s, label: s, cor: CORES_STATUS[s] }))}
                    valorSelecionado={filtroStatus}
                    onSelecionar={setFiltroStatus}
                />
            </View>

            {/* lista de cards de consulta */}
            <View style={styles.containerLista}>
                {carregando ? (
                    <TelaCarregando telaCheia />
                ) : (
                    <FlatList
                        data={consultasFiltradas}
                        keyExtractor={({ consulta }) => String(consulta.id_consulta)}
                        renderItem={({ item }) => (
                            <ConsultaCard
                                consulta={item.consulta}
                                animal={item.animal}
                                onPress={() => abrirDetalheConsulta(item.consulta.id_consulta)}
                                onPressIcone={() => toastAviso("Levando você para a consulta online.")}
                            />
                        )}
                        ListEmptyComponent={
                            <Text style={styles.textoVazio}>Nenhuma consulta encontrada.</Text>
                        }
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                )}
            </View>

            {/* botão "+" flutuante para criar nova consulta */}
            <TouchableOpacity style={styles.botaoAdicionar} onPress={abrirModalNovaConsulta}>
                <Ionicons name="add" size={32} color={colors.white} />
            </TouchableOpacity>

            {/* modal de criar nova consulta */}
            <ModalFormulario
                visivel={modalVisivel}
                titulo="Nova Consulta"
                onFechar={fecharModalNovaConsulta}
                onSalvar={handleSalvar}
                carregando={salvandoConsulta}
                labelSalvar="Salvar"
            >
                {/* dados da consulta */}
                <CustomTextInput title="Histórico / Motivo *" placeholder="Ex: Vacinação anual" value={historico} onChangeText={setHistorico} />
                <CustomTextInput title="Data *" placeholder="DD/MM/AAAA" value={dtConsulta} onChangeText={setDtConsulta} />
                <CustomTextInput title="Horário *" placeholder="HH:MM" value={hrConsulta} onChangeText={setHrConsulta} />

                {/* seletor de status */}
                <View style={styles.containerStatus}>
                    <Text style={styles.labelStatus}>Status</Text>
                    <View style={styles.containerOpcoes}>
                        {FILTROS_STATUS.map((opcao) => (
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

                {/* dados do animal */}
                <CustomTextInput title="Nome do Animal *" placeholder="Ex: Rex" value={nmAnimal} onChangeText={setNmAnimal} />
                <CustomTextInput title="Espécie *" placeholder="Ex: Cão, Gato" value={especieAnimal} onChangeText={setEspecieAnimal} />
                <CustomTextInput title="Raça" placeholder="Ex: Labrador" value={racaAnimal} onChangeText={setRacaAnimal} />
                <CustomTextInput title="Data de Nascimento" placeholder="DD/MM/AAAA" value={dtNascimento} onChangeText={setDtNascimento} />
                <CustomTextInput title="Peso (kg)" placeholder="Ex: 12.5" value={pesoAnimal} onChangeText={setPesoAnimal} keyboardType="numeric" />
                <CustomTextInput title="RG do Animal" placeholder="Ex: 123456" value={rgAnimal} onChangeText={setRgAnimal} />
                <CustomTextInput title="Microchip" placeholder="Ex: 985112345678901" value={microchip} onChangeText={setMicrochip} keyboardType="numeric" />

                {/* dados do responsável */}
                <CustomTextInput title="Nome do Responsável *" placeholder="Ex: João Silva" value={nmResponsavel} onChangeText={setNmResponsavel} />
                <CustomTextInput title="CPF do Responsável *" placeholder="Ex: 000.000.000-00" value={cpfResponsavel} onChangeText={setCpfResponsavel} keyboardType="numeric" />
                <CustomTextInput title="Telefone do Responsável *" placeholder="Ex: (11) 99999-9999" value={telefoneResponsavel} onChangeText={setTelefoneResponsavel} />
            </ModalFormulario>

        </View>
    );
}