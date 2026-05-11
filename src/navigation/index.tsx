import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../global/colors";

import Login from "../screens/Login/Index"
import Home from "../screens/Home/Index"
import Consulta from "../screens/Consulta/Index";
import Paciente from "../screens/Paciente/Index";
import Conta from "../screens/Conta/Index";
import { styles } from "../screens/Login/styles";

// Stack — controla Login - App principal
const Stack = createNativeStackNavigator();

// Tabs — controla a barra de abas
const Tab = createBottomTabNavigator();

// Abas do app (após login)
function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        tabBarActiveTintColor: colors.bluePrimary,
        tabBarInactiveTintColor: colors.grayMedium,
        tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            paddingTop: 5,

        },
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Consultas") iconName = "calendar";
          else if (route.name === "Pacientes") iconName = "paw";
          else if (route.name === "Conta") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
        <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{ 
                title: "Clinica Veterinária",
                tabBarLabel: "Home",
                headerTitleStyle: {
                color: colors.bluePrimary,
                fontWeight: "bold",
                fontSize: 24,
                },
            }} 
        />

        <Tab.Screen 
            name="Consultas" 
            component={Consulta} 
            options={{ 
                title: "Consultas",
                tabBarLabel: "Consultas",
                headerTitleStyle: {
                color: colors.bluePrimary,
                fontWeight: "bold",
                fontSize: 24,
                },
            }} 
        />

        <Tab.Screen 
            name="Pacientes" 
            component={Paciente} 
            options={{ 
                title: "Pacientes",
                tabBarLabel: "Pacientes",
                headerTitleStyle: {
                color: colors.bluePrimary,
                fontWeight: "bold",
                fontSize: 24,
                },
            }} 
        />
        <Tab.Screen 
            name="Conta" 
            component={Conta} 
            options={{ 
                title: "Conta",
                tabBarLabel: "Conta",
                headerTitleStyle: {
                color: colors.bluePrimary,
                fontWeight: "bold",
                fontSize: 24,
                },
            }} 
        />
    </Tab.Navigator>
  );
}

// Navegação principal
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="App" component={TabRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}