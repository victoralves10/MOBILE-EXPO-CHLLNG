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
import ItemLista from "../../components/ItemLista/Index";
import ModalFormulario from "../../components/ModalFormulario/Index";
import ModalConfirmacao from "../../components/ModalConfirmacao/Index";
import SeletorCalendario from "../../components/SeletorCalendario/Index";
import SeletorOpcoes from "../../components/SeletorOpcoes/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { useDetalhePaciente } from "../../hooks/useDetalhePaciente";
import { mascararCpf, mascararPeso, mascararTelefone } from "../../utils/mascaras";

// ficha do paciente: tudo já vem formatado do backend, a tela só mostra
export default function DetalhePaciente() {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();
    const d = useDetalhePaciente();
    const { ficha, form, mudar } = d;

    if (d.carregando) return <TelaCarregando telaCheia />;
    if (!ficha) return <Text style={styles.textoVazio}>{d.erro ?? "Paciente não encontrado."}</Text>;

    const { animal, responsavel, consultas } = ficha;

    // título de cada parte do modal, com ícone colorido
    function SecaoModal({ icone, cor, texto }: { icone: keyof typeof Ionicons.glyphMap; cor: string; texto: string }) {
        return (
            <View style={styles.secaoModal}>
                <View style={[styles.iconeSecaoModal, { backgroundColor: transparente(cor, 0.15) }]}>
                    <Ionicons name={icone} size={16} color={cor} />
                </View>
                <Text style={styles.textoSecaoModal}>{texto}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* card do topo com o animal */}
                <View style={styles.destaque}>
                    <View style={styles.avatarGrande}>
                        <Text style={styles.textoAvatarGrande}>{animal.inicial_animal}</Text>
                    </View>
                    <Text style={styles.nomeDestaque}>{animal.nm_animal}</Text>
                    <Text style={styles.subtituloDestaque}>
                        {animal.especie_animal} • {animal.raca_animal_exibicao}
                    </Text>
                    <View style={styles.seloConsultas}>
                        <Ionicons name="calendar" size={14} color={cores.primaria} />
                        <Text style={styles.textoSeloConsultas}>
                            {ficha.total_consultas} {ficha.total_consultas === 1 ? "consulta" : "consultas"}
                        </Text>
                    </View>
                </View>

                {/* ações rápidas: links prontos que vêm do backend */}
                <View style={styles.linhaAcoes}>
                    <BotaoAcao
                        icone="logo-whatsapp"
                        texto="WhatsApp"
                        cor={cores.whatsapp}
                        onPress={() => Linking.openURL(responsavel.link_whatsapp)}
                    />
                    <BotaoAcao icone="create" texto="Editar" cor={cores.primaria} onPress={d.abrirModalEditar} />
                </View>

                {/* animal */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Animal</Text>
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

                {/* histórico de consultas, mesmo visual das listas */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Histórico de consultas</Text>
                    {consultas.length === 0 ? (
                        <Text style={styles.textoSemConsulta}>Nenhuma consulta registrada.</Text>
                    ) : (
                        <View style={styles.listaHistorico}>
                            {consultas.map((consulta) => (
                                <ItemLista
                                    key={consulta.id_consulta}
                                    inicial={animal.inicial_animal}
                                    cor={corDoStatus(cores, consulta.st_consulta)}
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

            {/* modal de edição do animal e do responsável */}
            <ModalFormulario
                visivel={d.modalEditarAberto}
                titulo="Editar paciente"
                onFechar={d.fecharModalEditar}
                onSalvar={d.salvar}
                carregando={d.salvando}
            >
                <SecaoModal icone="paw" cor={cores.pacientes} texto="Animal" />
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

                <SecaoModal icone="person" cor={cores.rosa} texto="Responsável" />

                {/* aviso pronto do backend quando o responsável tem outros pacientes */}
                {responsavel.aviso_edicao && (
                    <View style={styles.avisoModal}>
                        <Ionicons name="information-circle" size={20} color={cores.aviso} />
                        <Text style={styles.textoAvisoModal}>{responsavel.aviso_edicao}</Text>
                    </View>
                )}

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
                titulo="Remover paciente?"
                mensagem="As consultas dele também serão removidas. O responsável continua cadastrado."
                icone="trash"
                labelConfirmar="Remover"
                perigoso
                onConfirmar={d.confirmarRemover}
                onCancelar={d.fecharConfirmarRemover}
            />
        </View>
    );
}
