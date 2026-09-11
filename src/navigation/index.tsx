import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../global/colors";
import { useAuth } from "../context/AuthContext";

import Login from "../screens/Login/Index";
import Cadastro from "../screens/Cadastro/Index";
import Home from "../screens/Home/Index";
import Consulta from "../screens/Consulta/Index";
import DetalheConsulta from "../screens/Consulta/DetalhesConsulta";
import Paciente from "../screens/Paciente/Index";
import DetalhePaciente from "../screens/Paciente/DetalhesPaciente";
import Perfil from "../screens/Perfil/Index";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
                    else if (route.name === "Perfil") iconName = "person-circle-outline";
                    return <Ionicons name={iconName} size={28} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ title: "Clínica Veterinária" }} />
            <Tab.Screen name="Consultas" component={Consulta} options={{ title: "Consultas" }} />
            <Tab.Screen name="Pacientes" component={Paciente} options={{ title: "Pacientes" }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{ title: "Perfil" }} />
        </Tab.Navigator>
    );
}

export default function Routes() {
    const { logado, carregando } = useAuth();

    if (carregando) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={colors.bluePrimary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {/* rotas só existem quando o usuário está logado */}
                {logado ? (
                    <Stack.Group>
                        <Stack.Screen name="App" component={TabRoutes} />

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
