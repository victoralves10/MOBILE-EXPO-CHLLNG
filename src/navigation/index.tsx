import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../global/colors";
import { authController } from "../controllers/authController";

import Login from "../screens/Login/Index";
import Home from "../screens/Home/Index";
import Consulta from "../screens/Consulta/Index";
import DetalheConsulta from "../screens/Consulta/DetalhesConsulta";
import Paciente from "../screens/Paciente/Index";
import DetalhePaciente from "../screens/Paciente/DetalhesPaciente";
import Conta from "../screens/Conta/Index";

// navegador de pilha (telas que aparecem uma na frente da outra)
const Stack = createNativeStackNavigator();

// navegador de abas (barra de navegação lá embaixo)
const Tab = createBottomTabNavigator();

// função que monta as 4 abas principais do app
function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerTitleAlign: "left",
                tabBarShowLabel: false,
                headerStyle: {
                    backgroundColor: colors.white,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitleStyle: {
                    color: colors.bluePrimary,
                    fontWeight: "700",
                    fontSize: 26,
                },
                tabBarActiveTintColor: colors.bluePrimary,
                tabBarInactiveTintColor: colors.grayMedium,
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 5,
                    paddingTop: 5,
                    borderTopWidth: 1,
                    borderTopColor: colors.grayLight,
                    backgroundColor: colors.white,
                },
                tabBarIcon: ({ color }) => {
                    let iconName: any;
                    if (route.name === "Home") iconName = "home";
                    else if (route.name === "Consultas") iconName = "calendar-outline";
                    else if (route.name === "Pacientes") iconName = "people-outline";
                    else if (route.name === "Conta") iconName = "person-circle-outline";
                    return <Ionicons name={iconName} size={28} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ title: "Clínica Veterinária" }} />
            <Tab.Screen name="Consultas" component={Consulta} options={{ title: "Consultas" }} />
            <Tab.Screen name="Pacientes" component={Paciente} options={{ title: "Pacientes" }} />
            <Tab.Screen name="Conta" component={Conta} options={{ title: "Conta" }} />
        </Tab.Navigator>
    );
}

// componente principal que controla toda a navegação do app
export default function Routes() {
    const [carregando, setCarregando] = useState(true);
    const [logado, setLogado] = useState(false);

    // roda 1 vez quando o app abre
    useEffect(() => {
        async function verificarSessao() {
            const sessaoAtiva = await authController.verificarSessao();
            setLogado(sessaoAtiva);
            setCarregando(false);
        }
        verificarSessao();
    }, []);

    // enquanto verifica a sessão mostra o círculo girando
    if (carregando) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={colors.bluePrimary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={logado ? "App" : "Login"}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="App" component={TabRoutes} />

                {/* tela de detalhe da consulta, aparece por cima das abas com o seu proprio header */}
                <Stack.Screen
                    name="DetalheConsulta"
                    component={DetalheConsulta}
                    options={{
                        headerShown: true,
                        headerTitle: "Detalhes da Consulta",
                        headerTintColor: colors.bluePrimary,
                        headerStyle: { backgroundColor: colors.white },
                    }}
                />

                {/* tela de ficha do paciente, aparece por cima das abas com o seu proprio header */}
                <Stack.Screen
                    name="DetalhePaciente"
                    component={DetalhePaciente}
                    options={{
                        headerShown: true,
                        headerTitle: "Ficha do Paciente",
                        headerTintColor: colors.bluePrimary,
                        headerStyle: { backgroundColor: colors.white },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}