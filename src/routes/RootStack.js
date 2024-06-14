import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

// importo todas las pantallas
import HomeScreen from "../screens/Usuarios/HomeScreen";
import RegisterUser from "../screens/Usuarios/RegisterUser";
import UpdateUser from "../screens/Usuarios/UpdateUser";
import DeleteUser from "../screens/Usuarios/DeleteUser";
import ViewUser from "../screens/Usuarios/ViewUser";
import ViewAllUsers from "../screens/Usuarios/ViewAllUsers"
import InicioPagina from "../screens/Inicio"

const RootStack = () => {
    return (
        <>
        <NavigationContainer>
             <Stack.Navigator initialRouteName="InicioPagina">

            {/* Index */}
            <Stack.Screen
                name="InicioPagina"
                component={InicioPagina}
            />    

            {/* home */}
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: "Administración de usuarios",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            {/* crear de usuario */}
            <Stack.Screen
                name="RegisterUser"
                component={RegisterUser}
                options={{
                    title: "Registrar Usuario",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            {/* update de usuario */}
            <Stack.Screen
                name="UpdateUser"
                component={UpdateUser}
                options={{
                    title: "Actualizar Usuario",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            {/* borrar un usuario */}
            <Stack.Screen
                name="DeleteUser"
                component={DeleteUser}
                options={{
                    title: "Borrar Usuario",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            {/* ver un usuario */}
            <Stack.Screen
                name="ViewUser"
                component={ViewUser}
                options={{
                    title: "Ver Usuario",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            {/* ver todos los usuario */}
            <Stack.Screen
                name="ViewAllUsers"
                component={ViewAllUsers}
                options={{
                    title: "Ver todos los Usuario",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
        </Stack.Navigator>
        </NavigationContainer>
        </>
    )
}

export default RootStack
