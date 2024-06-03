import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from "@expo/vector-icons"
import SignIn from './pages/signIn'
import Home from './pages/home'
import SignUp from './pages/signUp'
import Create from "./pages/create"
import Read from "./pages/read"
import Update from "./pages/update"
import Delete from "./pages/delete"

const Pilha = createStackNavigator()
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
                name="SignIn"
                component={SignIn}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="user" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Create"
                component={Create}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="folder-plus" size={size} color={color} />
                    )
                }} />
            <Tab.Screen
                name="Mapa"
                component={Mapa}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="file" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Update"
                component={Update}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="edit" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Delete"
                component={Delete}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="delete" size={size} color={color} />
                    )
                }} />
        </Tab.Navigator>
    );
}



export default function Routers() {
    return (
        <NavigationContainer>
            <Pilha.Navigator>

                <Pilha.Screen
                    name="MyTabs"
                    component={MyTabs}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ headerShown: false }}
                />


                <Pilha.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="Create"
                    component={Create}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="Read"
                    component={Read}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="Update"
                    component={Update}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="Delete"
                    component={Delete}
                    options={{ headerShown: false }}
                />

            </Pilha.Navigator>
        </NavigationContainer>
    )
}