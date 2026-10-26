import React from "react";
import { Text, View } from "react-native";
import ModalFormulario from "../ModalFormulario/Index";
import CustomTextInput from "../CustomTextInput/Index";
import FiltroTabs from "../FiltroTabs/Index";
import CampoBusca from "../CampoBusca/Index";
import SeletorCalendario from "../SeletorCalendario/Index";
import SeletorNativo from "../SeletorNativo/Index";
import SeletorOpcoes from "../SeletorOpcoes/Index";
import { colors } from "../../global/colors";
import { useNovaConsulta, Modo } from "../../hooks/useNovaConsulta";
import { StatusConsulta } from "../../models/Consulta";
import { mascararCpf, mascararPeso, mascararTelefone } from "../../utils/mascaras";
import { styles } from "./styles";

interface Props {
    visivel: boolean;
    onFechar: () => void;
}

// opções das abinhas do formulário
const OPCOES_STATUS: { valor: StatusConsulta; label: string; cor: string }[] = [
    { valor: "Agendado", label: "Agendar", cor: colors.bluePrimary },
    { valor: "Concluido", label: "Já realizada", cor: colors.success },
];
const OPCOES_PACIENTE: { valor: Modo; label: string; cor: string }[] = [
    { valor: "existente", label: "Paciente cadastrado", cor: colors.bluePrimary },
    { valor: "novo", label: "Novo paciente", cor: colors.bluePrimary },
];
const OPCOES_RESPONSAVEL: { valor: Modo; label: string; cor: string }[] = [
    { valor: "existente", label: "Responsável cadastrado", cor: colors.bluePrimary },
    { valor: "novo", label: "Novo responsável", cor: colors.bluePrimary },
];

// modal de nova consulta com os 3 casos: paciente cadastrado, animal novo com
// responsável cadastrado, ou os dois novos
export default function ModalNovaConsulta({ visivel, onFechar }: Props) {
    const nc = useNovaConsulta(onFechar);
    const { form, mudar } = nc;

    // fechar sem salvar também limpa o formulário
    function fechar() {
        nc.limpar();
        onFechar();
    }

    return (
        <ModalFormulario
            visivel={visivel}
            titulo="Nova Consulta"
            onFechar={fechar}
            onSalvar={nc.salvar}
            carregando={nc.salvando}
        >
            {/* ---------- consulta ---------- */}
            <Text style={styles.secao}>Consulta</Text>

            <CustomTextInput
                title="Motivo da consulta *"
                placeholder="Ex: Vacinação anual"
                value={form.historico_consulta}
                onChangeText={mudar("historico_consulta")}
            />
            <SeletorCalendario titulo="Data *" valor={form.dt_consulta} onChange={mudar("dt_consulta")} />
            <SeletorNativo titulo="Horário *" valor={form.hr_consulta} onChange={mudar("hr_consulta")} />

            <Text style={styles.rotulo}>Situação</Text>
            <View style={styles.abas}>
                <FiltroTabs opcoes={OPCOES_STATUS} valorSelecionado={form.st_consulta} onSelecionar={mudar("st_consulta")} />
            </View>
            <Text style={styles.dica}>Se a data já passou e não foi realizada, o sistema marca como atrasada sozinho.</Text>

            {/* ---------- paciente ---------- */}
            <Text style={styles.secao}>Paciente</Text>
            <View style={styles.abas}>
                <FiltroTabs opcoes={OPCOES_PACIENTE} valorSelecionado={nc.modoPaciente} onSelecionar={nc.setModoPaciente} />
            </View>

            {nc.modoPaciente === "existente" ? (
                // caso 1: escolhe um paciente que já existe
                <CampoBusca
                    titulo="Buscar paciente *"
                    placeholder="Nome do animal ou do responsável"
                    busca={nc.buscaPaciente}
                    onChangeBusca={nc.setBuscaPaciente}
                    carregando={nc.buscandoPacientes}
                    resultados={nc.pacientes.map((p) => ({
                        id: p.id_animal,
                        inicial: p.inicial_animal,
                        titulo: p.nm_animal,
                        subtitulo: `${p.especie_animal} • ${p.nm_responsavel}`,
                    }))}
                    selecionado={
                        nc.pacienteEscolhido && {
                            id: nc.pacienteEscolhido.id_animal,
                            inicial: nc.pacienteEscolhido.inicial_animal,
                            titulo: nc.pacienteEscolhido.nm_animal,
                            subtitulo: `${nc.pacienteEscolhido.especie_animal} • ${nc.pacienteEscolhido.nm_responsavel}`,
                        }
                    }
                    onSelecionar={nc.escolherPaciente}
                    onTrocar={nc.trocarPaciente}
                />
            ) : (
                <>
                    {/* casos 2 e 3: cadastra o animal */}
                    <CustomTextInput title="Nome do animal *" placeholder="Ex: Rex" value={form.nm_animal} onChangeText={mudar("nm_animal")} />
                    <CustomTextInput title="Espécie *" placeholder="Ex: Cão, Gato" value={form.especie_animal} onChangeText={mudar("especie_animal")} />
                    <CustomTextInput title="Raça" placeholder="Ex: Labrador" value={form.raca_animal} onChangeText={mudar("raca_animal")} />
                    <SeletorCalendario titulo="Data de nascimento" valor={form.dt_nascimento_animal} onChange={mudar("dt_nascimento_animal")} />
                    <CustomTextInput
                        title="Peso (kg)"
                        placeholder="Ex: 12,5"
                        keyboardType="decimal-pad"
                        value={form.peso_animal}
                        onChangeText={(v) => mudar("peso_animal")(mascararPeso(v))}
                    />
                    <CustomTextInput title="RG do animal" placeholder="Ex: 123456" value={form.rg_animal} onChangeText={mudar("rg_animal")} />
                    <CustomTextInput
                        title="Microchip"
                        placeholder="Ex: 985112345678901"
                        keyboardType="numeric"
                        value={form.nr_microchip_animal}
                        onChangeText={mudar("nr_microchip_animal")}
                    />

                    {/* ---------- responsável ---------- */}
                    <Text style={styles.secao}>Responsável</Text>
                    <View style={styles.abas}>
                        <FiltroTabs opcoes={OPCOES_RESPONSAVEL} valorSelecionado={nc.modoResponsavel} onSelecionar={nc.setModoResponsavel} />
                    </View>

                    {nc.modoResponsavel === "existente" ? (
                        // caso 2: escolhe um responsável que já existe
                        <CampoBusca
                            titulo="Buscar responsável *"
                            placeholder="Nome, CPF ou telefone"
                            busca={nc.buscaResponsavel}
                            onChangeBusca={nc.setBuscaResponsavel}
                            carregando={nc.buscandoResponsaveis}
                            resultados={nc.responsaveis.map((r) => ({
                                id: r.id_responsavel,
                                inicial: r.inicial_responsavel,
                                titulo: r.nm_responsavel,
                                subtitulo: `${r.cpf_responsavel_exibicao} • ${r.nr_telefone_responsavel_exibicao}`,
                            }))}
                            selecionado={
                                nc.responsavelEscolhido && {
                                    id: nc.responsavelEscolhido.id_responsavel,
                                    inicial: nc.responsavelEscolhido.inicial_responsavel,
                                    titulo: nc.responsavelEscolhido.nm_responsavel,
                                    subtitulo: `${nc.responsavelEscolhido.cpf_responsavel_exibicao} • ${nc.responsavelEscolhido.nr_telefone_responsavel_exibicao}`,
                                }
                            }
                            onSelecionar={nc.escolherResponsavel}
                            onTrocar={nc.trocarResponsavel}
                        />
                    ) : (
                        <>
                            {/* caso 3: cadastra o responsável também */}
                            <CustomTextInput title="Nome *" placeholder="Ex: João Silva" value={form.nm_responsavel} onChangeText={mudar("nm_responsavel")} />
                            <CustomTextInput
                                title="CPF *"
                                placeholder="000.000.000-00"
                                keyboardType="numeric"
                                value={form.cpf_responsavel}
                                onChangeText={(v) => mudar("cpf_responsavel")(mascararCpf(v))}
                            />
                            <CustomTextInput
                                title="Telefone *"
                                placeholder="(11) 99999-9999"
                                keyboardType="phone-pad"
                                value={form.nr_telefone_responsavel}
                                onChangeText={(v) => mudar("nr_telefone_responsavel")(mascararTelefone(v))}
                            />
                            <SeletorOpcoes
                                titulo="Região (opcional)"
                                opcoes={nc.regioes.map((r) => ({ valor: r.id_regiao, rotulo: r.nm_regiao }))}
                                selecionado={form.id_regiao}
                                onSelecionar={mudar("id_regiao")}
                            />
                        </>
                    )}
                </>
            )}
        </ModalFormulario>
    );
}