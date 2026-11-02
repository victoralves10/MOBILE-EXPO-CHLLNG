import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme, Theme, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { useTema } from "../theme/TemaContext";
import { transparente } from "../theme/paletas";
import { aoTocarNotificacao } from "../services/notificacoes";
import { useSincronizarLembretes } from "../hooks/useSincronizarLembretes";

import Login from "../screens/Login/Index";
import Cadastro from "../screens/Cadastro/Index";
import Home from "../screens/Home/Index";
import Consulta from "../screens/Consulta/Index";
import DetalheConsulta from "../screens/Consulta/DetalhesConsulta";
import Paciente from "../screens/Paciente/Index";
import DetalhePaciente from "../screens/Paciente/DetalhesPaciente";
import Perfil from "../screens/Perfil/Index";

const Stack = createNativeStackNavigator();

// referência da navegação, pra conseguir abrir uma tela de fora dela (ex: ao tocar na notificação)
const navegacao = createNavigationContainerRef<any>();
const Tab = createBottomTabNavigator();

function abrirConsulta(idConsulta: number, tentativas = 20) {
    if (navegacao.isReady()) {
        navegacao.navigate("DetalheConsulta", { id_consulta: idConsulta });
        return;
    }
    if (tentativas > 0) setTimeout(() => abrirConsulta(idConsulta, tentativas - 1), 300);
}

type NomeIcone = keyof typeof Ionicons.glyphMap;

// ícone de cada aba: cheio quando está ativa, contorno quando não está
const ICONES_ABAS: Record<string, { ativo: NomeIcone; inativo: NomeIcone }> = {
    Home: { ativo: "home", inativo: "home-outline" },
    Consultas: { ativo: "calendar", inativo: "calendar-outline" },
    Pacientes: { ativo: "paw", inativo: "paw-outline" },
    Perfil: { ativo: "person-circle", inativo: "person-circle-outline" },
};

// as 4 abas de baixo
function TabRoutes() {
    const { cores } = useTema();

    // espaço dos botões do sistema (Android) ou da barrinha do iPhone embaixo da tela
    const { bottom } = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerTitleAlign: "left",
                headerShadowVisible: false,
                headerStyle: { backgroundColor: cores.fundo },
                headerTitleStyle: { color: cores.texto, fontWeight: "800", fontSize: 26 },
                sceneStyle: { backgroundColor: cores.fundo },

                tabBarActiveTintColor: cores.primaria,
                tabBarInactiveTintColor: cores.textoSuave,
                tabBarLabelStyle: { fontSize: 11, fontWeight: "700", marginTop: 2 },
                tabBarIconStyle: { width: 56, height: 30 },
                // altura = ícone + texto + o espaço dos botões do sistema, pra nada ficar embaixo deles
                tabBarStyle: {
                    height: 66 + bottom,
                    paddingTop: 6,
                    paddingBottom: bottom + 6,
                    backgroundColor: cores.superficie,
                    borderTopWidth: 0,
                    elevation: 12,
                    shadowColor: cores.sombra,
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.06,
                    shadowRadius: 12,
                },

                // ícone dentro de uma "pílula" colorida quando a aba está ativa
                tabBarIcon: ({ focused, color }) => (
                    <View
                        style={{
                            width: 56,
                            height: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 15,
                            backgroundColor: focused ? transparente(cores.primaria, 0.14) : "transparent",
                        }}
                    >
                        <Ionicons
                            name={focused ? ICONES_ABAS[route.name].ativo : ICONES_ABAS[route.name].inativo}
                            size={22}
                            color={color}
                        />
                    </View>
                ),
            })}
        >
            {/* a Home desenha o próprio cabeçalho (saudação colorida) */}
            <Tab.Screen name="Home" component={Home} options={{ title: "Início", headerShown: false }} />
            <Tab.Screen name="Consultas" component={Consulta} options={{ title: "Consultas" }} />
            <Tab.Screen name="Pacientes" component={Paciente} options={{ title: "Pacientes" }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{ title: "Perfil" }} />
        </Tab.Navigator>
    );
}

// rotas do app: as telas internas só existem quando o usuário está logado
export default function Routes() {
    const { logado, carregando } = useAuth();
    const { cores, escuro } = useTema();

    // logado: mantém os lembretes do celular em dia com o backend
    useSincronizarLembretes(logado);

    // tocou na notificação: abre o detalhe daquela consulta
    useEffect(() => {
        if (!logado) return;
        return aoTocarNotificacao((idConsulta) => abrirConsulta(idConsulta));
    }, [logado]);

    // tema da navegação acompanhando o nosso (fundo das telas, cabeçalhos, animações)
    const base = escuro ? DarkTheme : DefaultTheme;
    const temaNavegacao: Theme = {
        ...base,
        colors: {
            ...base.colors,
            primary: cores.primaria,
            background: cores.fundo,
            card: cores.superficie,
            text: cores.texto,
            border: cores.borda,
            notification: cores.atrasado,
        },
    };

    // estilo dos cabeçalhos das telas de detalhe
    const cabecalhoDetalhe = {
        headerShown: true,
        headerShadowVisible: false,
        headerTintColor: cores.primaria,
        headerStyle: { backgroundColor: cores.fundo },
        headerTitleStyle: { color: cores.texto, fontWeight: "800" as const },
    };

    if (carregando) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: cores.fundo }}>
                <ActivityIndicator size="large" color={cores.primaria} />
            </View>
        );
    }

    return (
        <NavigationContainer ref={navegacao} theme={temaNavegacao}>
            <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: cores.fundo } }}>
                {logado ? (
                    <Stack.Group>
                        <Stack.Screen name="App" component={TabRoutes} />
                        <Stack.Screen
                            name="DetalheConsulta"
                            component={DetalheConsulta}
                            options={{ ...cabecalhoDetalhe, headerTitle: "Detalhes da consulta" }}
                        />
                        <Stack.Screen
                            name="DetalhePaciente"
                            component={DetalhePaciente}
                            options={{ ...cabecalhoDetalhe, headerTitle: "Ficha do paciente" }}
                        />
                    </Stack.Group>
                ) : (
                    <Stack.Group>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Cadastro" component={Cadastro} />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}