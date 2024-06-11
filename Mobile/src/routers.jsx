import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from "@expo/vector-icons";
import Login from "./pages/login/index";
import Mapa from "./pages/mapa/mapa";
import Detalhes from "./pages/detalhes/detalhes";
import Registro from "./pages/signUp/cadastrar";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'black',
                    paddingBottom: 1,
                    paddingTop: 1,
                    borderTopColor: 'transparent'
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#555'
            }}
        >
            <Tab.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="user" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Mapa"
                component={Mapa}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="map" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Registro"
                component={Registro}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="map" size={size} color={color} />
                    )
                }}
            />

        </Tab.Navigator>
    );
}

export default function Routers() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen
                    name="Tabs"
                    component={MyTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Mapa"
                    component={Mapa}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Detalhes"
                    component={Detalhes}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Registro"
                    component={Registro}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
