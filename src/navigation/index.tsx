import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../global/colors";
import Login from "../screens/Login/Index";
import Home from "../screens/Home/Index";
import Consulta from "../screens/Consulta/Index";
import Paciente from "../screens/Paciente/Index";
import Conta from "../screens/Conta/Index";

// Stack
const Stack = createNativeStackNavigator();

// Tabs
const Tab = createBottomTabNavigator();

// Tabs do app
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

        tabBarIcon: ({ color, size }) => {

          let iconName: any;

          if (route.name === "Home") {
            iconName = "home";
          }

          else if (route.name === "Consultas") {
            iconName = "calendar-outline";
          }

          else if (route.name === "Pacientes") {
            iconName = "people-outline";
          }

          else if (route.name === "Conta") {
            iconName = "person-circle-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={28}
              color={color}
            />
          );
        },
      })}
    >

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Clínica Veterinária",
        }}
      />

      <Tab.Screen
        name="Consultas"
        component={Consulta}
        options={{
          title: "Consultas",
        }}
      />

      <Tab.Screen
        name="Pacientes"
        component={Paciente}
        options={{
          title: "Pacientes",
        }}
      />

      <Tab.Screen
        name="Conta"
        component={Conta}
        options={{
          title: "Conta",
        }}
      />

    </Tab.Navigator>
  );
}

// Rotas principais
export default function Routes() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="App"
          component={TabRoutes}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}