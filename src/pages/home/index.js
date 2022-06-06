import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import { Ionicons } from '@expo/vector-icons';
import IndexProfile from '../profile/index'
import Favorite from '../favorite/favorite';


const Tab = createBottomTabNavigator();

export default BottomNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: '#489687',
                headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: '#489687',
                },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                    headerTitleAlign: 'center'
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorite}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" color={color} size={size} />
                    ),
                    headerTitleAlign: 'center'
                }}
            />
            <Tab.Screen
                name="IndexProfile"
                component={IndexProfile}
                options={() => ({
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                    headerShown: false
                })}
            />
        </Tab.Navigator>
    );
}