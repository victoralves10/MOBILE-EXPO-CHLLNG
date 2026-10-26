import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import ItemLista from "../../components/ItemLista/Index";
import ModalFormulario from "../../components/ModalFormulario/Index";
import ModalConfirmacao from "../../components/ModalConfirmacao/Index";
import SeletorCalendario from "../../components/SeletorCalendario/Index";
import SeletorOpcoes from "../../components/SeletorOpcoes/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { useDetalhePaciente } from "../../hooks/useDetalhePaciente";
import { mascararCpf, mascararPeso, mascararTelefone } from "../../utils/mascaras";
import { styles } from "./styles";

// cor de cada status (só visual, o status vem do backend)
const COR_STATUS = {
    Agendado: colors.bluePrimary,
    Atrasado: colors.danger,
    Concluido: colors.success,
};

// uma linha com ícone e texto
function Linha({ icone, texto }: { icone: keyof typeof Ionicons.glyphMap; texto: string }) {
    return (
        <View style={styles.linha}>
            <Ionicons name={icone} size={18} color={colors.bluePrimary} />
            <Text style={styles.textoLinha}>{texto}</Text>
        </View>
    );
}

// ficha do paciente: tudo já vem formatado do backend, a tela só mostra
export default function DetalhePaciente() {
    const d = useDetalhePaciente();
    const { ficha, form, mudar } = d;

    if (d.carregando) return <TelaCarregando telaCheia />;
    if (!ficha) return <Text style={styles.textoVazio}>{d.erro ?? "Paciente não encontrado."}</Text>;

    const { animal, responsavel, consultas } = ficha;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {/* animal */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Animal</Text>
                    <Linha icone="paw-outline" texto={animal.nm_animal} />
                    <Linha icone="leaf-outline" texto={`${animal.especie_animal} • ${animal.raca_animal_exibicao}`} />
                    <Linha icone="calendar-outline" texto={`Nascimento: ${animal.dt_nascimento_animal_exibicao}`} />
                    <Linha icone="fitness-outline" texto={`Peso: ${animal.peso_animal_exibicao}`} />
                    <Linha icone="card-outline" texto={`RG: ${animal.rg_animal_exibicao}`} />
                    <Linha icone="hardware-chip-outline" texto={`Microchip: ${animal.nr_microchip_animal_exibicao}`} />
                </View>

                {/* responsável */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Responsável</Text>
                    <Linha icone="person-outline" texto={responsavel.nm_responsavel} />
                    <Linha icone="id-card-outline" texto={`CPF: ${responsavel.cpf_responsavel_exibicao}`} />
                    <Linha icone="call-outline" texto={responsavel.nr_telefone_responsavel_exibicao} />
                    <Linha icone="location-outline" texto={`Região: ${responsavel.nm_regiao_exibicao}`} />

                    {/* abre o WhatsApp já com a mensagem pronta (link vem do backend) */}
                    <TouchableOpacity style={styles.botaoWhatsApp} onPress={() => Linking.openURL(responsavel.link_whatsapp)}>
                        <Ionicons name="logo-whatsapp" size={18} color={colors.white} />
                        <Text style={styles.textoBotaoWhatsApp}>Conversar no WhatsApp</Text>
                    </TouchableOpacity>
                </View>

                {/* histórico de consultas, mesmo visual das listas */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Histórico de consultas ({ficha.total_consultas})</Text>

                    {consultas.length === 0 ? (
                        <Text style={styles.textoSemConsulta}>Nenhuma consulta registrada.</Text>
                    ) : (
                        <View style={styles.listaHistorico}>
                            {consultas.map((consulta) => (
                                <ItemLista
                                    key={consulta.id_consulta}
                                    inicial={animal.inicial_animal}
                                    cor={COR_STATUS[consulta.st_consulta]}
                                    titulo={consulta.historico_consulta}
                                    subtitulo={consulta.data_hora_exibicao}
                                    selo={consulta.st_consulta_rotulo}
                                    onPress={() => d.abrirDetalheConsulta(consulta.id_consulta)}
                                />
                            ))}
                        </View>
                    )}
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

            {/* modal de edição do animal e do responsável */}
            <ModalFormulario
                visivel={d.modalEditarAberto}
                titulo="Editar Paciente"
                onFechar={d.fecharModalEditar}
                onSalvar={d.salvar}
                carregando={d.salvando}
            >
                <Text style={styles.secaoModal}>Animal</Text>
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

                <Text style={styles.secaoModal}>Responsável</Text>

                {/* aviso pronto do backend quando o responsável tem outros pacientes */}
                {responsavel.aviso_edicao && <Text style={styles.avisoModal}>{responsavel.aviso_edicao}</Text>}

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
                    opcoes={d.regioes.map((r) => ({ valor: r.id_regiao, rotulo: r.nm_regiao }))}
                    selecionado={form.id_regiao}
                    onSelecionar={mudar("id_regiao")}
                />
            </ModalFormulario>

            {/* confirmação antes de remover */}
            <ModalConfirmacao
                visivel={d.confirmarRemoverAberto}
                titulo="Remover paciente"
                mensagem="Deseja remover este paciente? As consultas dele também serão removidas. O responsável continua cadastrado."
                labelConfirmar="Remover"
                perigoso
                onConfirmar={d.confirmarRemover}
                onCancelar={d.fecharConfirmarRemover}
            />
        </View>
    );
}